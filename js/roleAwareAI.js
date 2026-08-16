// =====================================================
// SAMA - Department-Controlled AI Agent
// Every operational answer is filtered by the central login permissions.
// =====================================================

(function initialiseRoleAwareAI() {
    "use strict";

    const access = window.SAMA_ACCESS;
    const data = window.SAMA_OPERATIONAL_DATA;
    if (!access || !data) return;

    const user = access.user;
    const summary = data.plantSummary;
    const quality = data.qualitySummary;
    const maintenance = data.maintenanceSummary;

    function can(permission) { return access.can(permission); }
    function safe(value) {
        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }
    function number(value) { return Number(value).toLocaleString("en-IN"); }
    function percent(value) { return `${Number(value).toFixed(2)}%`; }
    function condition(parameter) {
        if (parameter.actual < parameter.min || parameter.actual > parameter.max) return "Out of spec";
        const margin = (parameter.max - parameter.min) * 0.1;
        if (parameter.actual <= parameter.min + margin || parameter.actual >= parameter.max - margin) return "Near limit";
        return "Normal";
    }
    function pendingRequests() {
        try {
            const requests = JSON.parse(localStorage.getItem("samaParameterChangeRequests")) || [];
            return requests.filter(item => item.status === "Pending").length;
        } catch {
            return 0;
        }
    }
    function findMachine(text) {
        const compact = String(text).toLowerCase().replaceAll(/[^a-z0-9]/g, "");
        return data.machines.find(machine => compact.includes(machine.name.toLowerCase().replaceAll(/[^a-z0-9]/g, ""))) ||
            data.machines.find(machine => compact.includes(machine.id.toLowerCase().replaceAll(/[^a-z0-9]/g, ""))) || null;
    }
    function roleTitle() {
        if (user.department === "Production") return "Production SAMA Agent";
        if (user.department === "Quality") return "Quality & Process SAMA Agent";
        if (user.department === "Maintenance") return "Maintenance Reliability Agent";
        if (user.department === "Process Engineering") return "Process Engineering Agent";
        if (user.department === "Management") return "Management Operations Agent";
        return "Operations Excellence SAMA Agent";
    }
    function responseHeader(title) {
        return `<b>🤖 ${safe(roleTitle())}</b><br><small>${safe(user.name)} · ${safe(user.department)} · ${safe(data.shift)}</small><br><br><b>${safe(title)}</b><br><br>`;
    }
    function freshness() {
        const time = new Date(data.generatedAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
        return `<br><br><small>Source: SAMA operational dataset · ${safe(data.mode.toUpperCase())} · refreshed ${time}</small>`;
    }
    function restrictedResponse(topic, requiredProfile) {
        return responseHeader("🔒 Access-Controlled Answer") +
            `Your <b>${safe(user.department)}</b> login is not authorised to view ${safe(topic)}.<br><br>` +
            `Required profile: <b>${safe(requiredProfile)}</b>.<br>` +
            `I can still answer questions that are included in your active SAMA access profile.`;
    }
    function machineLists() {
        const running = data.machines.filter(item => item.status === "Running").map(item => item.name).join(", ");
        const attention = data.machines.filter(item => item.status !== "Running").map(item => `${item.name} (${item.status}: ${item.maintenance})`).join("<br>• ");
        return { running, attention };
    }

    function productionResponse() {
        if (!can("sama.production.view")) return restrictedResponse("production counts, plan achievement and line output", "Production, PPC, Management or Operations Excellence");
        const gap = summary.productionPlan - summary.productionActual;
        const lines = data.lineData.map(line => `• <b>${safe(line.line)}:</b> ${number(line.actual)} / ${number(line.plan)} (${(line.actual / line.plan * 100).toFixed(1)}%) · Rejection ${percent(line.rejection)}`).join("<br>");
        return responseHeader("📈 Current Production Update") +
            `<b>Produced:</b> ${number(summary.productionActual)} modules<br>` +
            `<b>Plan:</b> ${number(summary.productionPlan)} modules<br>` +
            `<b>Achievement:</b> ${percent(summary.planAchievement)}<br>` +
            `<b>Gap:</b> ${number(gap)} modules behind plan<br>` +
            `<b>Line takt:</b> ${summary.taktActual} sec against ${summary.taktTarget} sec target<br>` +
            `<b>WIP before inspection:</b> ${number(summary.wipBeforeInspection)} modules<br><br>` +
            `<b>Line-wise output:</b><br>${lines}` + freshness();
    }

    function productionRejectionResponse() {
        if (!can("sama.production.view")) return restrictedResponse("production rejection summary", "Production, Quality, Management or Operations Excellence");
        const lines = data.lineData.map(line => `• <b>${safe(line.line)}:</b> ${percent(line.rejection)} rejection`).join("<br>");
        return responseHeader("📉 Production Rejection Summary") +
            `<b>Plant rejection:</b> ${percent(summary.rejectionRate)} against target ≤ ${percent(summary.rejectionTarget)}<br>` +
            `<b>Yield:</b> ${percent(summary.yield)}<br><br>${lines}<br><br>` +
            `Detailed defect categories, grade analysis and process parameters are restricted for this login.` + freshness();
    }

    function qualityResponse() {
        if (!can("sama.quality.view")) return productionRejectionResponse();
        const abnormal = data.parameters.filter(parameter => condition(parameter) !== "Normal");
        const parameterText = can("sama.parameters.view")
            ? abnormal.map(parameter => `• ${safe(parameter.machine)} ${safe(parameter.name)}: <b>${parameter.actual} ${safe(parameter.unit)}</b> (${condition(parameter)}; limit ${parameter.min}–${parameter.max})`).join("<br>")
            : "Process-parameter detail is restricted for this login.";
        return responseHeader("🔎 Quality & Yield Update") +
            `<b>Inspected:</b> ${number(quality.inspected)} modules<br>` +
            `<b>A Grade:</b> ${number(quality.aGrade)}<br>` +
            `<b>Yield:</b> ${percent(summary.yield)} · <b>FPY:</b> ${percent(quality.firstPassYield)}<br>` +
            `<b>B Grade:</b> ${number(quality.bGrade)} · <b>Reject:</b> ${number(quality.reject)} · <b>Scrap:</b> ${number(quality.scrap)}<br>` +
            `<b>Total downgrade:</b> ${number(quality.downgrade)} (${percent(quality.downgradeRate)})<br>` +
            `<b>Top defect:</b> ${safe(quality.topDefect)} (${quality.topDefectCount})<br><br>` +
            `<b>Parameter watch:</b><br>${parameterText}` + freshness();
    }

    function maintenanceResponse() {
        if (!can("sama.maintenance.view")) return restrictedResponse("maintenance, PM, downtime, MTTR and MTBF", "Maintenance, Management or Operations Excellence");
        const lists = machineLists();
        return responseHeader("🛠 Maintenance & Reliability Update") +
            `<b>Running:</b> ${maintenance.runningMachines} / ${maintenance.totalMachines} machines<br>` +
            `<b>Breakdown:</b> ${maintenance.breakdownMachines} · <b>Planned maintenance:</b> ${maintenance.plannedMaintenance} · <b>Idle:</b> ${maintenance.idleMachines}<br>` +
            `<b>Downtime:</b> ${number(maintenance.downtimeMinutes)} minutes<br>` +
            `<b>MTTR:</b> ${maintenance.mttrMinutes} minutes · <b>MTBF:</b> ${maintenance.mtbfHours} hours<br>` +
            `<b>PM pending:</b> ${maintenance.pmPending} · <b>Critical alerts:</b> ${maintenance.criticalAlerts}<br><br>` +
            `<b>Machines needing attention:</b><br>• ${lists.attention}` + freshness();
    }

    function managementResponse() {
        return responseHeader("📋 Authorised Operations Update") +
            `${can("sama.production.view") ? `<b>Production:</b> ${number(summary.productionActual)} / ${number(summary.productionPlan)} (${percent(summary.planAchievement)})<br>` : ""}` +
            `${can("sama.quality.view") ? `<b>Yield:</b> ${percent(summary.yield)} · <b>Rejection:</b> ${percent(summary.rejectionRate)}<br>` : ""}` +
            `${can("sama.maintenance.view") ? `<b>Machine availability:</b> ${maintenance.runningMachines} / ${maintenance.totalMachines} running<br><b>Downtime:</b> ${maintenance.downtimeMinutes} min · <b>MTTR:</b> ${maintenance.mttrMinutes} min · <b>MTBF:</b> ${maintenance.mtbfHours} hr<br>` : ""}` +
            `${can("sama.parameters.view") ? `<b>Parameter alert:</b> Laminator-02 vacuum is outside its approved limit.<br>` : ""}` + freshness();
    }

    function roleSummary() {
        if (user.department === "Production") return productionResponse();
        if (user.department === "Quality" || user.department === "Process Engineering") return qualityResponse();
        if (user.department === "Maintenance") return maintenanceResponse();
        return managementResponse();
    }

    function machineStatusResponse(text) {
        if (!can("sama.operations.view")) return restrictedResponse("machine condition and cycle status", "SAMA operational viewer");
        const machine = findMachine(text);
        if (machine) {
            return responseHeader(`⚙ ${machine.name} Status`) +
                `<b>Line / Process:</b> ${safe(machine.line)} · ${safe(machine.process)}<br>` +
                `<b>Status:</b> ${safe(machine.status)}<br>` +
                `<b>Cycle time:</b> ${machine.cycle} ${safe(machine.unit)} against ${machine.targetCycle} ${safe(machine.unit)}<br>` +
                `${can("sama.production.view") ? `<b>Processed:</b> ${number(machine.processed)}<br><b>Rejection:</b> ${percent(machine.reject)}<br>` : ""}` +
                `${can("sama.maintenance.view") ? `<b>Maintenance:</b> ${safe(machine.maintenance)} · Next PM ${safe(machine.nextPM)}` : ""}` + freshness();
        }
        const lists = machineLists();
        return responseHeader("🏭 Live Machine Condition") +
            `<b>Running (${maintenance.runningMachines}):</b> ${safe(lists.running)}<br><br>` +
            `<b>Not running / attention:</b><br>• ${lists.attention}` + freshness();
    }

    function cycleResponse(text) {
        if (!can("sama.operations.view")) return restrictedResponse("machine cycle time", "SAMA operational viewer");
        const machine = findMachine(text);
        const selected = machine ? [machine] : data.machines;
        const rows = selected.map(item => {
            const variance = (item.cycle - item.targetCycle) / item.targetCycle * 100;
            return `• <b>${safe(item.name)}:</b> ${item.cycle} ${safe(item.unit)} / target ${item.targetCycle} ${safe(item.unit)} (${variance > 0 ? "+" : ""}${variance.toFixed(1)}%)`;
        }).join("<br>");
        return responseHeader("⏱ Cycle-Time Update") + rows + freshness();
    }

    function parameterResponse(text) {
        if (!can("sama.parameters.view")) return restrictedResponse("machine process parameters, setpoints, vacuum pressure and temperature", "Quality, Maintenance, Process Engineering, Management or Operations Excellence");
        const machine = findMachine(text);
        let selected = machine ? data.parameters.filter(item => item.machine === machine.name) : data.parameters;
        if (text.includes("vacuum")) selected = selected.filter(item => item.name.toLowerCase().includes("vacuum"));
        if (text.includes("temperature")) selected = selected.filter(item => item.name.toLowerCase().includes("temperature"));
        const rows = selected.map(parameter => `• <b>${safe(parameter.machine)} ${safe(parameter.name)}:</b> actual ${parameter.actual} ${safe(parameter.unit)} · setpoint ${parameter.setpoint} ${safe(parameter.unit)} · limit ${parameter.min}–${parameter.max} · ${condition(parameter)}`).join("<br>");
        const changeRequested = /(modify|change|update|setpoint|adjust)/.test(text);
        const modification = changeRequested
            ? can("sama.parameters.request")
                ? `<br><br><b>Modification authority:</b> You may submit a controlled change request. Independent approval is required before execution.`
                : `<br><br><b>Modification authority:</b> This login is view-only and cannot request a setpoint change.`
            : "";
        return responseHeader("🎛 Process Parameter Update") + (rows || "No matching parameter was found.") + modification + freshness();
    }

    function changeRequestResponse() {
        if (!can("sama.audit.view")) return restrictedResponse("parameter change requests and approval history", "Authorised audit viewer");
        let requests = [];
        try { requests = JSON.parse(localStorage.getItem("samaParameterChangeRequests")) || []; } catch { requests = []; }
        const pending = requests.filter(item => item.status === "Pending");
        const rows = pending.length
            ? pending.map(item => `• <b>${safe(item.id)}:</b> ${safe(item.parameterId)} · ${item.oldValue} → ${item.proposedValue} ${safe(item.unit)} · requested by ${safe(item.requesterName)}`).join("<br>")
            : "No pending request is stored in this prototype session.";
        return responseHeader("✅ Parameter Change-Control Update") + `<b>Pending requests:</b> ${pending.length}<br><br>${rows}<br><br><b>Your authority:</b> ${can("sama.parameters.approve") ? "Independent approval is enabled; self-approval remains blocked." : "Approval is not included in this login."}` + freshness();
    }

    function accessProfileResponse() {
        const visible = [];
        if (can("sama.operations.view")) visible.push("Machine Status", "Cycle Time");
        if (can("sama.production.view")) visible.push("Production Count", "Production Rejection");
        if (can("sama.quality.view")) visible.push("Detailed Quality & Defects");
        if (can("sama.maintenance.view")) visible.push("Maintenance, PM, Downtime, MTTR & MTBF");
        if (can("sama.parameters.view")) visible.push("Process Parameters");
        if (can("sama.parameters.request")) visible.push("Parameter Change Request");
        if (can("sama.parameters.approve")) visible.push("Independent Approval");
        return responseHeader("👤 Your SAMA Access Profile") +
            `<b>Employee:</b> ${safe(user.name)} (${safe(user.id)})<br>` +
            `<b>Department:</b> ${safe(user.department)}<br>` +
            `<b>Role:</b> ${safe(user.role)}<br>` +
            `<b>Available answers:</b> ${visible.join(", ") || "No operational dataset assigned"}.`;
    }

    window.generateRoleAwareOperationalResponse = function generateRoleAwareOperationalResponse(query) {
        const text = String(query || "").trim().toLowerCase();
        if (!text) return null;

        if (/(who am i|my access|my role|login type|department access|what can you answer)/.test(text)) return accessProfileResponse();
        if (/(my update|update me|today update|daily update|plant update|overall update|complete update|everything|all update|executive summary|management update)/.test(text)) return roleSummary();
        if (/(pending parameter|parameter request|change request|approval status)/.test(text)) return changeRequestResponse();
        if (/(vacuum|temperature|air pressure|motor current|servo load|process parameter|setpoint|parameter change|modify parameter|adjust parameter)/.test(text)) return parameterResponse(text);
        if (/(production count|production update|production status|plan vs actual|output|produced|production gap|line performance)/.test(text)) return productionResponse();
        if (/(rejection|reject rate|yield|downgrade|b grade|scrap|quality update|fpy|defect count)/.test(text)) return qualityResponse();
        if (/(which machine|machines running|machine running|under maintenance|machine status|plant status|stopped machine|breakdown machine)/.test(text)) return machineStatusResponse(text);
        if (/(cycle time|takt time|machine cycle|slow machine)/.test(text)) return cycleResponse(text);
        if (/(maintenance update|maintenance status|plant downtime|overall downtime|plant mttr|plant mtbf|pm pending|pending pm|which pm)/.test(text)) return maintenanceResponse();
        return null;
    };

    window.getSAMAFallbackAccessResponse = function getSAMAFallbackAccessResponse(query) {
        const text = String(query || "").toLowerCase();
        if (/(vacuum|temperature|pressure setting|setpoint|process parameter|change parameter|modify parameter)/.test(text) && !can("sama.parameters.view")) return restrictedResponse("process parameter details", "Parameter-authorised profile");
        if (/(defect category|root cause.*defect|quality grade|b grade|downgrade|scrap analysis|fpy)/.test(text) && !can("sama.quality.view")) return restrictedResponse("detailed quality and defect intelligence", "Quality, Process Engineering, Management or Operations Excellence");
        if (/(production plan|production count|line output|plan vs actual)/.test(text) && !can("sama.production.view")) return restrictedResponse("production intelligence", "Production, Management or Operations Excellence");
        if (/(alarm|breakdown|preventive maintenance|\bpm\b|spare|repair|troubleshoot|mttr|mtbf|downtime)/.test(text) && !can("sama.maintenance.view")) return restrictedResponse("maintenance troubleshooting and reliability intelligence", "Maintenance, Management or Operations Excellence");
        return null;
    };

    window.getRoleAwareWelcomeMessage = function getRoleAwareWelcomeMessage() {
        return responseHeader(`Welcome, ${user.name.split(" ")[0]}`) +
            `I recognised your <b>${safe(user.department)}</b> login. Every answer will be checked against your active department permissions before information is shown.<br><br>` +
            `<b>Ask:</b> “Give me my update”, “Which machines are running?”, “What is my access?” or a permitted troubleshooting question.`;
    };

    function roleQuestions() {
        if (user.department === "Production") return ["Give me my production update", "What is the production rejection?", "Which machines are running?", "Show cycle time status"];
        if (user.department === "Quality") return ["Give me my quality update", "Show rejection and yield", "Laminator vacuum pressure", "Show pending parameter changes"];
        if (user.department === "Maintenance") return ["Give me my maintenance update", "Which machines need attention?", "Show plant downtime and MTTR", "Which PM is pending?"];
        if (user.department === "Process Engineering") return ["Give me my process update", "Show abnormal process parameters", "Laminator vacuum pressure", "Show pending parameter changes"];
        return ["Give me complete plant update", "Production count and gap", "Show quality and yield", "Show maintenance status"];
    }

    function applyChatProfile() {
        const quickActions = document.getElementById("roleQuickActions") || document.querySelector(".quick-actions");
        if (quickActions) {
            quickActions.innerHTML = "";
            roleQuestions().forEach(question => {
                const button = document.createElement("button");
                button.type = "button";
                button.textContent = question;
                button.addEventListener("click", () => {
                    if (typeof window.askQuickQuestion === "function") window.askQuickQuestion(question);
                });
                quickActions.appendChild(button);
            });
        }
        const chatStatus = document.querySelector(".chat-header-status");
        if (chatStatus) chatStatus.innerHTML = `<span>${safe(user.department)} Agent</span><span class="online-dot"></span>`;
        const input = document.getElementById("userInput");
        if (input) input.placeholder = `Ask your ${user.department} SAMA agent…`;
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", applyChatProfile);
    else applyChatProfile();
})();
