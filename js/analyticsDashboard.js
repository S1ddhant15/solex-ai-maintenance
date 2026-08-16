// =====================================================
// SAMA - Role-Based Analytics Dashboard Controller
// =====================================================

(function initialiseAnalyticsDashboard() {
    "use strict";

    const access = window.SAMA_ACCESS;
    const data = window.SAMA_OPERATIONAL_DATA;
    if (!access || !data || !access.require("sama.operations.view")) return;

    const user = access.user;
    const colours = { blue: "#1674ef", orange: "#f7941d", green: "#20b779", red: "#e04b52", yellow: "#e7aa23" };

    function byId(id) { return document.getElementById(id); }
    function can(permission) { return access.can(permission); }
    function number(value) { return Number(value).toLocaleString("en-IN"); }
    function percent(value) { return `${Number(value).toFixed(2)}%`; }
    function initials(name) { return String(name).split(/\s+/).map(word => word[0]).slice(0, 2).join("").toUpperCase(); }
    function parameterCondition(parameter) {
        if (parameter.actual < parameter.min || parameter.actual > parameter.max) return "Out of spec";
        const margin = (parameter.max - parameter.min) * 0.1;
        if (parameter.actual <= parameter.min + margin || parameter.actual >= parameter.max - margin) return "Near limit";
        return "Normal";
    }
    function selectedLine() { return byId("analyticsLineFilter").value; }
    function selectedLineRecord() { return data.lineData.find(item => item.line === selectedLine()) || null; }
    function selectedMachines() { return selectedLine() === "all" ? data.machines : data.machines.filter(item => item.line === selectedLine()); }

    function agentProfile() {
        if (user.department === "Production") return { name: "Production Intelligence Agent", description: "Prioritises production count, plan gap, line takt, machine state and rejection loss." };
        if (user.department === "Quality") return { name: "Quality & Process Intelligence Agent", description: "Prioritises inspected quantity, yield, grade loss, defects and process-parameter limits." };
        if (user.department === "Maintenance") return { name: "Maintenance Reliability Agent", description: "Prioritises running condition, breakdowns, downtime, MTTR, MTBF and PM risk." };
        if (user.department === "Process Engineering") return { name: "Process Engineering Agent", description: "Prioritises process stability, parameter limits, rejection correlation and change control." };
        if (user.department === "Management") return { name: "Management Operations Agent", description: "Combines production, quality and reliability into one executive performance view." };
        return { name: "Operations Excellence Intelligence Agent", description: "Provides complete cross-functional visibility and prioritised plant actions." };
    }

    function configurePage() {
        const profile = agentProfile();
        byId("analyticsUserName").textContent = user.name;
        byId("analyticsDepartment").textContent = `${user.department} · ${user.role}`;
        byId("analyticsInitials").textContent = initials(user.name);
        byId("analyticsAgentName").textContent = profile.name;
        byId("analyticsRoleDescription").textContent = profile.description;
        byId("analyticsSubtitle").textContent = `${user.department} performance view generated from the shared SAMA dataset`;
        byId("analyticsRefreshTime").textContent = `${data.mode.toUpperCase()} · ${new Date(data.generatedAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}`;

        data.lineData.forEach(line => byId("analyticsLineFilter").insertAdjacentHTML("beforeend", `<option value="${line.line}">${line.line}</option>`));
        byId("parameterAnalyticsPanel").hidden = !can("sama.parameters.view");
        byId("qualityAnalyticsPanel").hidden = user.department === "Maintenance";
    }

    function roleKpis() {
        const line = selectedLineRecord();
        const machines = selectedMachines();
        const running = machines.filter(item => item.status === "Running").length;
        const actual = line ? line.actual : data.plantSummary.productionActual;
        const plan = line ? line.plan : data.plantSummary.productionPlan;
        const achievement = actual / plan * 100;
        const rejection = line ? line.rejection : data.plantSummary.rejectionRate;
        const yieldValue = line ? line.yield : data.plantSummary.yield;
        const takt = line ? line.takt : data.plantSummary.taktActual;

        if (user.department === "Production") return [
            { label: "Production Count", value: number(actual), detail: `Plan ${number(plan)}`, icon: "fa-solar-panel", colour: "orange" },
            { label: "Plan Achievement", value: percent(achievement), detail: `${number(plan - actual)} module gap`, icon: "fa-bullseye", colour: achievement >= 95 ? "green" : "yellow" },
            { label: "Line Takt", value: `${takt} sec`, detail: `Target ${data.plantSummary.taktTarget} sec`, icon: "fa-stopwatch", colour: "blue" },
            { label: "Machines Running", value: `${running}/${machines.length}`, detail: "Current selected scope", icon: "fa-circle-play", colour: "green" },
            { label: "Rejection", value: percent(rejection), detail: `Target ≤ ${percent(data.plantSummary.rejectionTarget)}`, icon: "fa-circle-xmark", colour: rejection <= data.plantSummary.rejectionTarget ? "green" : "red" }
        ];
        if (user.department === "Quality" || user.department === "Process Engineering") return [
            { label: "Modules Inspected", value: number(line ? line.actual : data.qualitySummary.inspected), detail: line ? line.line : "All lines", icon: "fa-magnifying-glass", colour: "blue" },
            { label: "Yield", value: percent(yieldValue), detail: `FPY ${percent(data.qualitySummary.firstPassYield)}`, icon: "fa-circle-check", colour: "green" },
            { label: "Downgrade", value: line ? percent(line.rejection) : number(data.qualitySummary.downgrade), detail: line ? "Selected line rate" : percent(data.qualitySummary.downgradeRate), icon: "fa-arrow-trend-down", colour: "red" },
            { label: "Rework", value: number(data.qualitySummary.rework), detail: "Current shift", icon: "fa-rotate", colour: "yellow" },
            { label: "Parameter Alerts", value: data.parameters.filter(item => parameterCondition(item) !== "Normal" && (selectedLine() === "all" || item.line === selectedLine())).length, detail: "Near / outside limits", icon: "fa-sliders", colour: "orange" }
        ];
        if (user.department === "Maintenance") return [
            { label: "Machines Running", value: `${running}/${machines.length}`, detail: "Selected scope", icon: "fa-circle-play", colour: "green" },
            { label: "Downtime", value: `${data.maintenanceSummary.downtimeMinutes} min`, detail: "Current shift", icon: "fa-clock", colour: "red" },
            { label: "MTTR", value: `${data.maintenanceSummary.mttrMinutes} min`, detail: "Repair effectiveness", icon: "fa-screwdriver-wrench", colour: "orange" },
            { label: "MTBF", value: `${data.maintenanceSummary.mtbfHours} hr`, detail: "Reliability interval", icon: "fa-shield-heart", colour: "blue" },
            { label: "PM Pending", value: data.maintenanceSummary.pmPending, detail: `${data.maintenanceSummary.criticalAlerts} critical alerts`, icon: "fa-calendar-check", colour: "yellow" }
        ];
        return [
            { label: "Production", value: number(actual), detail: `${percent(achievement)} of plan`, icon: "fa-solar-panel", colour: "orange" },
            { label: "Yield", value: percent(yieldValue), detail: `Rejection ${percent(rejection)}`, icon: "fa-circle-check", colour: "green" },
            { label: "Machines Running", value: `${running}/${machines.length}`, detail: "Current availability", icon: "fa-industry", colour: "blue" },
            { label: "Downtime", value: `${data.maintenanceSummary.downtimeMinutes} min`, detail: `MTTR ${data.maintenanceSummary.mttrMinutes} min`, icon: "fa-clock", colour: "red" },
            { label: "Plan Gap", value: number(plan - actual), detail: "Modules to recover", icon: "fa-bullseye", colour: "yellow" }
        ];
    }

    function renderKpis() {
        byId("analyticsKpis").innerHTML = roleKpis().map(kpi => `<article class="analytics-kpi" style="--accent:${colours[kpi.colour]}"><span><i class="fa-solid ${kpi.icon}"></i>${kpi.label}</span><strong>${kpi.value}</strong><small>${kpi.detail}</small></article>`).join("");
    }

    function renderHourlyProduction() {
        const line = selectedLineRecord();
        const factor = line ? line.actual / data.plantSummary.productionActual : 1;
        const planFactor = line ? line.plan / data.plantSummary.productionPlan : 1;
        const actual = line ? line.actual : data.plantSummary.productionActual;
        const plan = line ? line.plan : data.plantSummary.productionPlan;
        const achievement = actual / plan * 100;
        byId("productionProgressLabel").textContent = `${number(actual)} / ${number(plan)} · ${percent(achievement)}`;
        byId("achievementBar").style.width = `${Math.min(achievement, 100)}%`;
        const maximum = Math.max(...data.hourlyProduction.map(item => item.plan * planFactor));
        byId("hourlyChart").innerHTML = data.hourlyProduction.map(item => {
            const hourActual = Math.round(item.actual * factor);
            const height = hourActual / maximum * 100;
            return `<div class="hour-column"><b>${number(hourActual)}</b><div class="bar-shell"><i style="height:${height}%"></i></div><small>${item.hour}</small></div>`;
        }).join("");
    }

    function renderMachineCondition() {
        const machines = selectedMachines();
        const states = ["Running", "Maintenance", "Breakdown", "Idle"];
        const stateColours = { Running: colours.green, Maintenance: colours.yellow, Breakdown: colours.red, Idle: "#77848d" };
        let offset = 0;
        const segments = states.map(state => {
            const count = machines.filter(item => item.status === state).length;
            const start = offset;
            offset += machines.length ? count / machines.length * 100 : 0;
            return `${stateColours[state]} ${start}% ${offset}%`;
        }).join(",");
        byId("analyticsMachineDonut").style.background = `conic-gradient(${segments})`;
        const running = machines.filter(item => item.status === "Running").length;
        byId("donutAvailability").textContent = `${running}/${machines.length}`;
        byId("analyticsMachineLegend").innerHTML = states.map(state => `<div><span><i style="background:${stateColours[state]}"></i>${state}</span><b>${machines.filter(item => item.status === state).length}</b></div>`).join("");
    }

    function renderTrend() {
        const line = selectedLineRecord();
        const factor = line ? line.actual / data.plantSummary.productionActual : 1;
        const planFactor = line ? line.plan / data.plantSummary.productionPlan : 1;
        const actualValues = data.dailyTrend.map(item => item.production * factor);
        const planValues = data.dailyTrend.map(item => item.plan * planFactor);
        const all = [...actualValues, ...planValues];
        const minimum = Math.min(...all) * 0.96;
        const maximum = Math.max(...all) * 1.02;
        const width = 660;
        const height = 180;
        const point = (value, index) => `${index * (width / 6)},${height - ((value - minimum) / (maximum - minimum) * (height - 20)) - 10}`;
        const actualPoints = actualValues.map(point).join(" ");
        const planPoints = planValues.map(point).join(" ");
        const circles = actualValues.map((value, index) => {
            const [x, y] = point(value, index).split(",");
            return `<circle cx="${x}" cy="${y}" r="4" fill="${colours.orange}"><title>${data.dailyTrend[index].day}: ${number(Math.round(value))}</title></circle>`;
        }).join("");
        byId("productionTrend").innerHTML = `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-label="Seven day production trend">
            <g stroke="#283138" stroke-width="1"><line x1="0" y1="45" x2="${width}" y2="45"/><line x1="0" y1="90" x2="${width}" y2="90"/><line x1="0" y1="135" x2="${width}" y2="135"/></g>
            <polyline points="${planPoints}" fill="none" stroke="${colours.blue}" stroke-width="3" stroke-dasharray="8 7"/>
            <polyline points="${actualPoints}" fill="none" stroke="${colours.orange}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>
            ${circles}</svg>
            <div class="trend-labels">${data.dailyTrend.map(item => `<span>${item.day}</span>`).join("")}</div>
            <div class="trend-legend"><span><i style="background:${colours.orange}"></i>Actual</span><span><i style="background:${colours.blue}"></i>Plan</span></div>`;
    }

    function renderLineTable() {
        const lines = selectedLine() === "all" ? data.lineData : data.lineData.filter(item => item.line === selectedLine());
        byId("analyticsLineTable").innerHTML = lines.map(line => `<tr><td><b>${line.line}</b></td><td>${number(line.actual)} / ${number(line.plan)}</td><td>${percent(line.actual / line.plan * 100)}</td><td>${percent(line.rejection)}</td><td>${line.takt} sec</td><td><span class="line-state ${line.status === "Attention" ? "attention" : ""}">${line.status}</span></td></tr>`).join("");
    }

    function renderQuality() {
        const q = data.qualitySummary;
        byId("qualityYieldBadge").textContent = `Yield ${percent(data.plantSummary.yield)}`;
        const metrics = [
            { label: "A Grade", value: number(q.aGrade), cls: "good" },
            { label: "B Grade", value: number(q.bGrade), cls: "warning" },
            { label: "Reject", value: number(q.reject), cls: "bad" },
            { label: "Scrap", value: number(q.scrap), cls: "bad" },
            { label: "Rework", value: number(q.rework), cls: "warning" },
            { label: "Top defect", value: `${q.topDefectCount} · ${q.topDefect}`, cls: "" }
        ];
        byId("qualityBreakdown").innerHTML = metrics.map(item => `<div class="quality-metric ${item.cls}"><span>${item.label}</span><b>${item.value}</b></div>`).join("");
    }

    function renderParameters() {
        if (!can("sama.parameters.view")) return;
        let parameters = selectedLine() === "all" ? data.parameters : data.parameters.filter(item => item.line === selectedLine());
        parameters = parameters.sort((a, b) => (parameterCondition(a) === "Normal") - (parameterCondition(b) === "Normal")).slice(0, 5);
        byId("parameterWatchList").innerHTML = parameters.map(parameter => {
            const state = parameterCondition(parameter);
            return `<div class="analytics-watch ${state === "Out of spec" ? "critical" : ""}"><i class="fa-solid fa-sliders"></i><div><b>${parameter.machine} · ${parameter.name}</b><small>Limit ${parameter.min}–${parameter.max} ${parameter.unit}</small></div><span>${parameter.actual} ${parameter.unit}<br>${state}</span></div>`;
        }).join("") || `<div class="analytics-watch"><i class="fa-solid fa-circle-check"></i><div><b>No parameter alerts</b><small>Selected line</small></div><span>Normal</span></div>`;
    }

    function renderMaintenance() {
        const machines = selectedMachines().filter(item => item.status !== "Running");
        byId("maintenanceWatchList").innerHTML = machines.map(machine => `<div class="analytics-watch ${machine.status === "Breakdown" ? "critical" : ""}"><i class="fa-solid ${machine.status === "Breakdown" ? "fa-triangle-exclamation" : "fa-screwdriver-wrench"}"></i><div><b>${machine.name} · ${machine.status}</b><small>${machine.process} · ${machine.line}</small></div><span>${machine.maintenance}<br>PM ${machine.nextPM}</span></div>`).join("") || `<div class="analytics-watch"><i class="fa-solid fa-circle-check"></i><div><b>All machines running</b><small>Selected scope</small></div><span>Healthy</span></div>`;
    }

    function renderInsight() {
        const line = selectedLineRecord();
        const scope = line ? line.line : "the plant";
        let title = `Recover the production gap while protecting process limits`;
        let text = `${scope} has produced ${number(line ? line.actual : data.plantSummary.productionActual)} against ${number(line ? line.plan : data.plantSummary.productionPlan)} plan. Prioritise Framing-01 recovery and Line-2 loss containment.`;
        if (user.department === "Production") {
            title = `${number((line ? line.plan - line.actual : data.plantSummary.productionPlan - data.plantSummary.productionActual))} modules remain to plan`;
            text = `${scope} achievement is ${percent((line ? line.actual / line.plan : data.plantSummary.planAchievement / 100) * 100)}. Keep takt at or below target and recover output without increasing rejection.`;
        } else if (user.department === "Quality" || user.department === "Process Engineering") {
            title = `Line-2 quality and Laminator-02 vacuum need containment`;
            text = `Plant rejection is ${percent(data.plantSummary.rejectionRate)} against ≤ ${percent(data.plantSummary.rejectionTarget)}. Verify the -89 kPa Laminator-02 vacuum reading before restart and review ${data.qualitySummary.topDefect}.`;
        } else if (user.department === "Maintenance") {
            title = `Restore Framing-01, then release Stringer-02 PM`;
            text = `Current downtime is ${data.maintenanceSummary.downtimeMinutes} minutes with MTTR ${data.maintenanceSummary.mttrMinutes} minutes. Confirm cylinder pressure and complete post-maintenance cycle verification.`;
        } else if (user.department === "Management") {
            title = `Production is ${percent(data.plantSummary.planAchievement)} of plan with ${percent(data.plantSummary.yield)} yield`;
            text = `The immediate constraint is Framing-01 breakdown plus Line-2 rejection. Cross-functional recovery should close the ${number(data.plantSummary.productionPlan - data.plantSummary.productionActual)}-module gap without relaxing process controls.`;
        }
        byId("aiInsightTitle").textContent = title;
        byId("aiInsightText").textContent = text;
    }

    function renderAll() {
        renderKpis();
        renderHourlyProduction();
        renderMachineCondition();
        renderTrend();
        renderLineTable();
        renderQuality();
        renderParameters();
        renderMaintenance();
        renderInsight();
    }

    function bindEvents() {
        byId("analyticsLineFilter").addEventListener("change", renderAll);
        byId("analyticsMenu").addEventListener("click", () => byId("analyticsSidebar").classList.toggle("open"));
        byId("askAgentButton").addEventListener("click", () => {
            sessionStorage.setItem("samaPendingQuestion", "Give me my complete update");
            location.href = "../index.html";
        });
        document.addEventListener("click", event => {
            if (window.innerWidth <= 930 && !byId("analyticsSidebar").contains(event.target) && !byId("analyticsMenu").contains(event.target)) byId("analyticsSidebar").classList.remove("open");
        });
    }

    function initialise() {
        configurePage();
        renderAll();
        bindEvents();
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialise);
    else initialise();
})();
