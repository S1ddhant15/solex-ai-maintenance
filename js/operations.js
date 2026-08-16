// =====================================================
// SAMA v3 - Operations & Process Control
// Prototype data adapter. Replace demo arrays with secured API calls.
// =====================================================

(function () {
    "use strict";

    const access = window.SAMA_ACCESS;
    if (!access || !access.require("sama.operations.view")) return;

    const user = access.user;
    const REQUEST_KEY = "samaParameterChangeRequests";
    const SETPOINT_KEY = "samaApprovedSetpoints";

    const sharedData = window.SAMA_OPERATIONAL_DATA;
    if (!sharedData) throw new Error("SAMA operational data adapter is not loaded.");
    const plantSummary = { ...sharedData.plantSummary, shift: sharedData.shift };
    const lineData = sharedData.lineData;
    const machines = sharedData.machines;
    const parameters = sharedData.parameters;

    const starterRequests = [
        {
            id: "PCR-260816-001", parameterId: "LAM-01-TZ3", oldValue: 149, proposedValue: 150,
            unit: "°C", reason: "Stabilise edge crosslinking after Quality trial review.",
            requesterId: "SX4001", requesterName: "Quality User", requesterDepartment: "Quality",
            submittedAt: "2026-08-16T08:40:00.000Z", status: "Approved",
            reviewerName: "Process Engineering User", reviewedAt: "2026-08-16T09:05:00.000Z"
        },
        {
            id: "PCR-260816-002", parameterId: "LAM-02-VAC", oldValue: -95, proposedValue: -96,
            unit: "kPa", reason: "Vacuum trend is near upper limit; trial requested before restart.",
            requesterId: "SX4001", requesterName: "Quality User", requesterDepartment: "Quality",
            submittedAt: "2026-08-16T09:20:00.000Z", status: "Pending",
            reviewerName: "", reviewedAt: ""
        }
    ];

    function can(permission) { return access.can(permission); }
    function byId(id) { return document.getElementById(id); }
    function escapeHtml(value) {
        return String(value ?? "")
            .replaceAll("&", "&amp;").replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
    }
    function initials(name) {
        return String(name || "User").split(/\s+/).map(word => word[0]).slice(0, 2).join("").toUpperCase();
    }
    function formatDateTime(value) {
        if (!value) return "—";
        return new Date(value).toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
    }
    function showToast(message) {
        const toast = byId("opsToast");
        toast.textContent = message;
        toast.classList.add("show");
        clearTimeout(showToast.timer);
        showToast.timer = setTimeout(() => toast.classList.remove("show"), 3000);
    }
    function loadJson(key, fallback) {
        try {
            const value = JSON.parse(localStorage.getItem(key));
            return value ?? fallback;
        } catch (error) { return fallback; }
    }
    function saveJson(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
    function loadRequests() {
        const stored = loadJson(REQUEST_KEY, null);
        if (Array.isArray(stored)) return stored;
        saveJson(REQUEST_KEY, starterRequests);
        return [...starterRequests];
    }
    function getSetpoints() { return loadJson(SETPOINT_KEY, {}); }
    function getParameter(parameterId) { return parameters.find(item => item.id === parameterId); }
    function parameterSetpoint(parameter) {
        const overrides = getSetpoints();
        return Object.prototype.hasOwnProperty.call(overrides, parameter.id) ? overrides[parameter.id] : parameter.setpoint;
    }
    function parameterCondition(parameter) {
        if (parameter.actual < parameter.min || parameter.actual > parameter.max) return "Out of spec";
        const margin = (parameter.max - parameter.min) * 0.1;
        if (parameter.actual <= parameter.min + margin || parameter.actual >= parameter.max - margin) return "Near limit";
        return "Normal";
    }
    function conditionClass(condition) {
        return condition.toLowerCase().replaceAll(" ", "-");
    }
    function metricClass(actual, target, lowerIsBetter) {
        const ratio = lowerIsBetter ? actual / target : target / actual;
        if (ratio <= 1) return "metric-good";
        if (ratio <= 1.08) return "metric-warning";
        return "metric-bad";
    }

    function configureUser() {
        byId("opsUserName").textContent = user.name;
        byId("opsUserDepartment").textContent = `${user.department} · ${user.role}`;
        byId("opsUserInitials").textContent = initials(user.name);

        let title = `${user.department} — Operational Viewer`;
        let description = "View machine status, maintenance condition, cycle time, production and rejection.";
        if (can("sama.parameters.approve")) {
            title = `${user.department} — Parameter Approver`;
            description = "Full operational visibility with independent parameter review, approval and audit rights.";
        } else if (can("sama.parameters.request")) {
            title = `${user.department} — Quality & Process Requester`;
            description = "View operating data and process parameters; submit controlled changes for independent approval.";
        } else if (user.department === "Maintenance") {
            title = "Maintenance — Reliability Viewer";
            description = "View equipment condition, planned maintenance, breakdown status and operating parameters.";
        }
        byId("accessProfile").textContent = title;
        byId("accessDescription").textContent = description;

        document.querySelectorAll("[data-permission]").forEach(element => {
            element.hidden = !can(element.dataset.permission);
        });
    }

    function renderKpis() {
        const running = machines.filter(machine => machine.status === "Running").length;
        const maintenance = machines.filter(machine => ["Maintenance", "Breakdown"].includes(machine.status)).length;
        const achievement = plantSummary.productionActual / plantSummary.productionPlan * 100;
        byId("runningKpi").textContent = `${running} / ${machines.length}`;
        byId("runningDetail").textContent = `${Math.round(running / machines.length * 100)}% equipment available`;
        byId("maintenanceKpi").textContent = maintenance;
        byId("maintenanceDetail").textContent = `${machines.filter(item => item.status === "Breakdown").length} breakdown · ${machines.filter(item => item.status === "Maintenance").length} planned PM`;
        byId("cycleKpi").textContent = `${plantSummary.taktActual} sec`;
        byId("cycleDetail").textContent = `Target ${plantSummary.taktTarget.toFixed(1)} sec`;
        byId("productionKpi").textContent = plantSummary.productionActual.toLocaleString("en-IN");
        byId("productionDetail").textContent = `${achievement.toFixed(1)}% of ${plantSummary.productionPlan.toLocaleString("en-IN")} plan`;
        byId("rejectionKpi").textContent = `${plantSummary.rejectionRate.toFixed(2)}%`;
        byId("rejectionDetail").textContent = `Target ≤ ${plantSummary.rejectionTarget.toFixed(2)}%`;

        const attention = machines.filter(item => ["Maintenance", "Breakdown"].includes(item.status)).map(item => `${item.name}: ${item.maintenance}`);
        byId("opsAlertText").textContent = attention.join(" · ") || "No machine requires immediate attention.";
    }

    function renderConditionChart() {
        const states = ["Running", "Maintenance", "Breakdown", "Idle"];
        const colours = { Running: "#20b779", Maintenance: "#e7aa23", Breakdown: "#e04b52", Idle: "#77848d" };
        let offset = 0;
        const segments = states.map(state => {
            const count = machines.filter(item => item.status === state).length;
            const start = offset;
            offset += count / machines.length * 100;
            return `${colours[state]} ${start}% ${offset}%`;
        }).join(", ");
        byId("machineConditionChart").style.background = `conic-gradient(${segments})`;
        byId("machineConditionChart").innerHTML = `<div><strong>${machines.length}</strong><small>Total machines</small></div>`;
        byId("machineConditionLegend").innerHTML = states.map(state => {
            const count = machines.filter(item => item.status === state).length;
            return `<div><span><i style="background:${colours[state]}"></i>${state}</span><b>${count}</b></div>`;
        }).join("");
    }

    function renderLinePerformance() {
        byId("linePerformance").innerHTML = lineData.map(line => {
            const performance = line.actual / line.plan * 100;
            return `<div class="line-row ${performance < 88 ? "warning" : ""}">
                <b>${line.line}</b>
                <div class="progress-track"><i style="width:${Math.min(performance, 100)}%"></i></div>
                <span>${line.actual.toLocaleString("en-IN")} / ${line.plan.toLocaleString("en-IN")} · ${line.rejection.toFixed(2)}%</span>
            </div>`;
        }).join("");
    }

    function renderWatchlist() {
        const watched = [
            { machine: "Framing-01", issue: "Breakdown: cylinder pressure alarm", action: "Maintenance response active", critical: true },
            { machine: "Laminator-02", issue: "Vacuum actual -89 kPa is outside limit", action: "Quality request pending", critical: true },
            { machine: "EL-Tester-01", issue: "Rejection 1.08% is above plant target", action: "Review EL defect Pareto", critical: false },
            { machine: "Stringer-02", issue: "Planned PM is currently in progress", action: "Expected release 14:30", critical: false }
        ];
        byId("watchlist").innerHTML = watched.map(item => `<div class="watch-item ${item.critical ? "critical" : ""}">
            <h4>${item.machine}</h4><p>${item.issue}</p><span>${item.action}</span>
        </div>`).join("");
    }

    function populateFilters() {
        const lines = [...new Set(machines.map(item => item.line))];
        byId("machineLineFilter").insertAdjacentHTML("beforeend", lines.map(line => `<option value="${line}">${line}</option>`).join(""));
        const parameterMachines = [...new Set(parameters.map(item => item.machine))];
        byId("parameterMachineFilter").insertAdjacentHTML("beforeend", parameterMachines.map(machine => `<option value="${machine}">${machine}</option>`).join(""));
        byId("changeParameter").innerHTML = parameters.map(parameter => `<option value="${parameter.id}">${parameter.machine} — ${parameter.name}</option>`).join("");
        updateChangeParameterDetails();
    }

    function renderMachines() {
        const search = byId("machineSearch").value.trim().toLowerCase();
        const line = byId("machineLineFilter").value;
        const state = byId("machineStateFilter").value;
        const filtered = machines.filter(machine => {
            const matchesSearch = `${machine.name} ${machine.process}`.toLowerCase().includes(search);
            return matchesSearch && (line === "all" || machine.line === line) && (state === "all" || machine.status === state);
        });
        byId("machineTableBody").innerHTML = filtered.length ? filtered.map(machine => {
            const cycleClass = metricClass(machine.cycle, machine.targetCycle, true);
            const rejectionClass = metricClass(machine.reject, plantSummary.rejectionTarget, true);
            return `<tr>
                <td class="machine-name"><b>${machine.name}</b><small>${machine.id}</small></td>
                <td>${machine.line}<br><small>${machine.process}</small></td>
                <td><span class="status-pill ${machine.status.toLowerCase()}">${machine.status}</span></td>
                <td class="${cycleClass}"><b>${machine.cycle} ${machine.unit}</b><br><small>Target ${machine.targetCycle}</small></td>
                <td><b>${machine.processed.toLocaleString("en-IN")}</b><br><small>${plantSummary.shift}</small></td>
                <td class="${rejectionClass}"><b>${machine.reject.toFixed(2)}%</b><br><small>Target ≤ ${plantSummary.rejectionTarget.toFixed(2)}%</small></td>
                <td><b>${machine.maintenance}</b><br><small>Next PM: ${machine.nextPM}</small></td>
            </tr>`;
        }).join("") : `<tr><td colspan="7">No machines match the selected filters.</td></tr>`;
    }

    function renderParameters() {
        if (!can("sama.parameters.view")) return;
        const machineFilter = byId("parameterMachineFilter").value;
        const conditionFilter = byId("parameterStateFilter").value;
        const filtered = parameters.filter(parameter => {
            const condition = parameterCondition(parameter);
            return (machineFilter === "all" || parameter.machine === machineFilter) && (conditionFilter === "all" || condition === conditionFilter);
        });
        byId("parameterGrid").innerHTML = filtered.map(parameter => {
            const condition = parameterCondition(parameter);
            const range = parameter.max - parameter.min;
            const position = Math.max(0, Math.min(100, (parameter.actual - parameter.min) / range * 100));
            return `<article class="parameter-card ${conditionClass(condition)}">
                <div class="parameter-top"><div><small>${parameter.machine} · ${parameter.line}</small><h3>${parameter.name}</h3></div><span class="condition-label">${condition}</span></div>
                <div class="parameter-reading"><strong>${parameter.actual}</strong><span>${parameter.unit}</span></div>
                <div class="parameter-scale"><i style="width:${position}%"></i></div>
                <div class="parameter-limits"><span>${parameter.min} ${parameter.unit}</span><span>${parameter.max} ${parameter.unit}</span></div>
                <div class="parameter-setpoint"><span>Approved setpoint</span><b>${parameterSetpoint(parameter)} ${parameter.unit}</b></div>
            </article>`;
        }).join("") || `<div class="ops-card">No process parameters match the selected filters.</div>`;
    }

    function renderRequests() {
        if (!can("sama.audit.view")) return;
        const requests = loadRequests().sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
        const pending = requests.filter(item => item.status === "Pending").length;
        byId("pendingBadge").textContent = pending;
        byId("requestCount").textContent = `${requests.length} records`;
        byId("changeTableBody").innerHTML = requests.length ? requests.map(request => {
            const parameter = getParameter(request.parameterId);
            const canReview = can("sama.parameters.approve") && request.status === "Pending" && request.requesterId !== user.id;
            const action = canReview
                ? `<div class="request-actions"><button data-approve="${request.id}">Approve</button><button class="reject" data-reject="${request.id}">Reject</button></div>`
                : `<div class="request-actions"><span>${request.reviewerName ? `By ${escapeHtml(request.reviewerName)}` : "—"}</span></div>`;
            return `<tr>
                <td><span class="request-id">${request.id}</span><br><small>${formatDateTime(request.submittedAt)}</small></td>
                <td><b>${parameter ? parameter.machine : "Unknown"}</b><br><small>${parameter ? parameter.name : request.parameterId}</small></td>
                <td><b>${request.oldValue} → ${request.proposedValue} ${request.unit}</b><br><small title="${escapeHtml(request.reason)}">${escapeHtml(request.reason).slice(0, 42)}${request.reason.length > 42 ? "…" : ""}</small></td>
                <td><b>${escapeHtml(request.requesterName)}</b><br><small>${escapeHtml(request.requesterDepartment)}</small></td>
                <td><span class="request-status ${request.status.toLowerCase()}">${request.status}</span></td>
                <td>${action}</td>
            </tr>`;
        }).join("") : `<tr><td colspan="6">No parameter change requests.</td></tr>`;

        document.querySelectorAll("[data-approve]").forEach(button => button.addEventListener("click", () => reviewRequest(button.dataset.approve, "Approved")));
        document.querySelectorAll("[data-reject]").forEach(button => button.addEventListener("click", () => reviewRequest(button.dataset.reject, "Rejected")));
    }

    function openTab(tabName) {
        const tab = document.querySelector(`[data-tab="${tabName}"]`);
        if (!tab || tab.hidden) return showToast("Your department does not have access to this view.");
        document.querySelectorAll("[data-tab]").forEach(button => button.classList.toggle("active", button.dataset.tab === tabName));
        document.querySelectorAll(".ops-panel").forEach(panel => panel.classList.remove("active"));
        byId(`${tabName}Panel`).classList.add("active");
    }

    function openChangeForm() {
        if (!can("sama.parameters.request")) return showToast("You have view-only parameter access.");
        openTab("changes");
        byId("changeRequestForm").hidden = false;
        document.querySelector(".change-layout").classList.remove("form-closed");
        updateChangeParameterDetails();
    }
    function closeChangeForm() {
        byId("changeRequestForm").hidden = true;
        document.querySelector(".change-layout").classList.add("form-closed");
    }
    function updateChangeParameterDetails() {
        const parameter = getParameter(byId("changeParameter").value);
        if (!parameter) return;
        byId("currentSetpoint").value = `${parameterSetpoint(parameter)} ${parameter.unit}`;
        byId("proposedSetpoint").min = parameter.min;
        byId("proposedSetpoint").max = parameter.max;
        byId("proposedSetpoint").value = parameterSetpoint(parameter);
        byId("parameterLimitHint").textContent = `Approved engineering range: ${parameter.min} to ${parameter.max} ${parameter.unit}. Current actual: ${parameter.actual} ${parameter.unit}.`;
    }
    function createRequest(event) {
        event.preventDefault();
        if (!can("sama.parameters.request")) return showToast("Change-request permission is required.");
        const parameter = getParameter(byId("changeParameter").value);
        const proposed = Number(byId("proposedSetpoint").value);
        const current = Number(parameterSetpoint(parameter));
        if (!Number.isFinite(proposed) || proposed < parameter.min || proposed > parameter.max) {
            return showToast(`Value must remain within ${parameter.min}–${parameter.max} ${parameter.unit}.`);
        }
        if (proposed === current) return showToast("Proposed value is the same as the approved setpoint.");
        const now = new Date();
        const requests = loadRequests();
        const request = {
            id: `PCR-${String(now.getFullYear()).slice(-2)}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${String(requests.length + 1).padStart(3, "0")}`,
            parameterId: parameter.id,
            oldValue: current,
            proposedValue: proposed,
            unit: parameter.unit,
            reason: byId("changeReason").value.trim(),
            requesterId: user.id,
            requesterName: user.name,
            requesterDepartment: user.department,
            submittedAt: now.toISOString(),
            status: "Pending",
            reviewerName: "",
            reviewedAt: ""
        };
        requests.push(request);
        saveJson(REQUEST_KEY, requests);
        event.currentTarget.reset();
        updateChangeParameterDetails();
        closeChangeForm();
        renderRequests();
        showToast(`${request.id} submitted for independent approval.`);
    }
    function reviewRequest(requestId, decision) {
        if (!can("sama.parameters.approve")) return showToast("Approval permission is required.");
        const requests = loadRequests();
        const request = requests.find(item => item.id === requestId);
        if (!request || request.status !== "Pending") return showToast("This request is no longer pending.");
        if (request.requesterId === user.id) return showToast("Self-approval is blocked. Another authorised user must review this request.");
        if (!window.confirm(`${decision === "Approved" ? "Approve" : "Reject"} ${request.id}?`)) return;
        request.status = decision;
        request.reviewerName = user.name;
        request.reviewedAt = new Date().toISOString();
        saveJson(REQUEST_KEY, requests);
        if (decision === "Approved") {
            const setpoints = getSetpoints();
            setpoints[request.parameterId] = request.proposedValue;
            saveJson(SETPOINT_KEY, setpoints);
            renderParameters();
        }
        renderRequests();
        showToast(`${request.id} ${decision.toLowerCase()}. Machine execution still requires the secured write service.`);
    }

    function bindEvents() {
        document.querySelectorAll("[data-tab]").forEach(button => button.addEventListener("click", () => openTab(button.dataset.tab)));
        document.querySelectorAll("[data-open-tab]").forEach(button => button.addEventListener("click", () => openTab(button.dataset.openTab)));
        ["machineSearch", "machineLineFilter", "machineStateFilter"].forEach(id => byId(id).addEventListener("input", renderMachines));
        ["parameterMachineFilter", "parameterStateFilter"].forEach(id => byId(id).addEventListener("change", renderParameters));
        byId("newChangeButton").addEventListener("click", openChangeForm);
        byId("openChangeFormButton").addEventListener("click", openChangeForm);
        byId("closeChangeForm").addEventListener("click", closeChangeForm);
        byId("changeParameter").addEventListener("change", updateChangeParameterDetails);
        byId("changeRequestForm").addEventListener("submit", createRequest);
        byId("opsMenuButton").addEventListener("click", () => byId("operationsSidebar").classList.toggle("open"));
        document.addEventListener("click", event => {
            if (window.innerWidth <= 930 && !byId("operationsSidebar").contains(event.target) && !byId("opsMenuButton").contains(event.target)) {
                byId("operationsSidebar").classList.remove("open");
            }
        });
    }

    function updateClock() {
        byId("opsClock").textContent = new Date().toLocaleString("en-IN", { weekday: "short", day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit", second: "2-digit" });
    }

    function initialise() {
        configureUser();
        renderKpis();
        renderConditionChart();
        renderLinePerformance();
        renderWatchlist();
        populateFilters();
        renderMachines();
        renderParameters();
        renderRequests();
        closeChangeForm();
        bindEvents();
        updateClock();
        setInterval(updateClock, 1000);
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialise);
    else initialise();
})();
