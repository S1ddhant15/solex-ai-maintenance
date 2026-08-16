// =====================================================
// SAMA - Login-Aware Operational Intelligence Agent
// Answers from the shared dataset according to department permissions.
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
        return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
    }
    function number(value) { return Number(value).toLocaleString("en-IN"); }
    function percent(value) { return `${Number(value).toFixed(2)}%`; }
    function pendingRequests() {
        try {
            const requests = JSON.parse(localStorage.getItem("samaParameterChangeRequests")) || [];
            return requests.filter(item => item.status === "Pending").length;
        } catch (error) { return 0; }
    }
    function condition(parameter) {
        if (parameter.actual < parameter.min || parameter.actual > parameter.max) return "Out of spec";
        const margin = (parameter.max - parameter.min) * 0.1;
        if (parameter.actual <= parameter.min + margin || parameter.actual >= parameter.max - margin) return "Near limit";
        return "Normal";
    }
    function findMachine(text) {
        const compact = String(text).toLowerCase().replaceAll(/[^a-z0-9]/g, "");
        return data.machines.find(machine => compact.includes(machine.name.toLowerCase().replaceAll(/[^a-z0-9]/g, ""))) ||
            data.machines.find(machine => compact.includes(machine.id.toLowerCase().replaceAll(/[^a-z0-9]/g, ""))) || null;
    }
    function roleTitle() {
        if (user.department === "Production") return "Production Intelligence Agent";
        if (user.department === "Quality") return "Quality & Process Intelligence Agent";
        if (user.department === "Maintenance") return "Maintenance Reliability Agent";
        if (user.department === "Process Engineering") return "Process Engineering Agent";
        if (user.department === "Management") return "Management Operations Agent";
        return "Operations Excellence Intelligence Agent";
    }
    function responseHeader(title) {
        return `<b>🤖 ${safe(roleTitle())}</b><br><small>${safe(user.name)} · ${safe(user.department)} · ${safe(data.shift)}</small><br><br><b>${title}</b><br><br>`;
    }
    function freshness() {
        const time = new Date(data.generatedAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
        return `<br><br><small>Source: SAMA operational dataset · ${safe(data.mode.toUpperCase())} · refreshed ${time}</small>`;
    }
    function machineLists() {
        const running = data.machines.filter(item => item.status === "Running").map(item => item.name).join(", ");
        const attention = data.machines.filter(item => item.status !== "Running").map(item => `${item.name} (${item.status}: ${item.maintenance})`).join("<br>• ");
        return { running, attention };
    }

    function productionResponse() {
        const gap = summary.productionPlan - summary.productionActual;
        const lines = data.lineData.map(line => `• <b>${line.line}:</b> ${number(line.actual)} / ${number(line.plan)} (${(line.actual / line.plan * 100).toFixed(1)}%) · Rejection ${percent(line.rejection)}`).join("<br>");
        return responseHeader("📈 Current Production Update") +
            `<b>Produced:</b> ${number(summary.productionActual)} modules<br>` +
            `<b>Plan:</b> ${number(summary.productionPlan)} modules<br>` +
            `<b>Achievement:</b> ${percent(summary.planAchievement)}<br>` +
            `<b>Gap:</b> ${number(gap)} modules behind plan<br>` +
            `<b>Line takt:</b> ${summary.taktActual} sec against ${summary.taktTarget} sec target<br>` +
            `<b>WIP before inspection:</b> ${number(summary.wipBeforeInspection)} modules<br><br>` +
            `<b>Line-wise output:</b><br>${lines}<br><br>` +
            `<b>Agent action:</b> Recover Line-2 output first; its achievement and rejection are both below the plant requirement.` + freshness();
    }

    function qualityResponse() {
        const abnormal = data.parameters.filter(parameter => condition(parameter) !== "Normal");
        const parameterText = can("sama.parameters.view")
            ? abnormal.map(parameter => `• ${parameter.machine} ${parameter.name}: <b>${parameter.actual} ${parameter.unit}</b> (${condition(parameter)}; limit ${parameter.min}–${parameter.max})`).join("<br>")
            : "Process-parameter detail is restricted for this login.";
        return responseHeader("🔎 Quality & Yield Update") +
            `<b>Inspected:</b> ${number(quality.inspected)} modules<br>` +
            `<b>A Grade:</b> ${number(quality.aGrade)}<br>` +
            `<b>Yield:</b> ${percent(summary.yield)}<br>` +
            `<b>First-pass yield:</b> ${percent(quality.firstPassYield)}<br>` +
            `<b>B Grade:</b> ${number(quality.bGrade)} · <b>Reject:</b> ${number(quality.reject)} · <b>Scrap:</b> ${number(quality.scrap)}<br>` +
            `<b>Total downgrade:</b> ${number(quality.downgrade)} (${percent(quality.downgradeRate)})<br>` +
            `<b>Top defect:</b> ${quality.topDefect} (${quality.topDefectCount})<br><br>` +
            `<b>Parameter watch:</b><br>${parameterText}<br><br>` +
            `<b>Pending change requests:</b> ${pendingRequests()}<br>` +
            `<b>Agent action:</b> Contain Line-2 rejection and verify Laminator-02 vacuum before release.` + freshness();
    }

    function maintenanceResponse() {
        const lists = machineLists();
        return responseHeader("🛠 Maintenance & Reliability Update") +
            `<b>Running:</b> ${maintenance.runningMachines} / ${maintenance.totalMachines} machines<br>` +
            `<b>Breakdown:</b> ${maintenance.breakdownMachines} · <b>Planned maintenance:</b> ${maintenance.plannedMaintenance} · <b>Idle:</b> ${maintenance.idleMachines}<br>` +
            `<b>Downtime:</b> ${number(maintenance.downtimeMinutes)} minutes<br>` +
            `<b>MTTR:</b> ${maintenance.mttrMinutes} minutes · <b>MTBF:</b> ${maintenance.mtbfHours} hours<br>` +
            `<b>PM pending:</b> ${maintenance.pmPending} · <b>Critical alerts:</b> ${maintenance.criticalAlerts}<br><br>` +
            `<b>Machines needing attention:</b><br>• ${lists.attention}<br><br>` +
            `<b>Agent action:</b> Restore Framing-01 cylinder pressure first, then complete Stringer-02 PM and verify cycle time before handover.` + freshness();
    }

    function managementResponse() {
        return responseHeader("📊 Executive Operations Update") +
            `<b>Production:</b> ${number(summary.productionActual)} / ${number(summary.productionPlan)} (${percent(summary.planAchievement)})<br>` +
            `<b>Yield:</b> ${percent(summary.yield)} · <b>Rejection:</b> ${percent(summary.rejectionRate)} against ≤ ${percent(summary.rejectionTarget)}<br>` +
            `<b>Machine availability:</b> ${maintenance.runningMachines} / ${maintenance.totalMachines} running<br>` +
            `<b>Downtime:</b> ${maintenance.downtimeMinutes} min · <b>MTTR:</b> ${maintenance.mttrMinutes} min · <b>MTBF:</b> ${maintenance.mtbfHours} hr<br>` +
            `<b>Current constraints:</b> Framing-01 breakdown, Stringer-02 PM, Laminator-02 vacuum outside limit and Line-2 rejection ${percent(data.lineData[1].rejection)}.<br><br>` +
            `<b>Agent priority:</b> Recover the ${number(summary.productionPlan - summary.productionActual)}-module production gap without relaxing approved process limits.` + freshness();
    }

    function roleSummary() {
        if (user.department === "Production") return productionResponse();
        if (user.department === "Quality") return qualityResponse();
        if (user.department === "Maintenance") return maintenanceResponse();
        if (user.department === "Process Engineering") return qualityResponse();
        return managementResponse();
    }

    function machineStatusResponse(text) {
        const machine = findMachine(text);
        if (machine) {
            return responseHeader(`⚙ ${safe(machine.name)} Status`) +
                `<b>Line / Process:</b> ${machine.line} · ${machine.process}<br>` +
                `<b>Status:</b> ${machine.status}<br>` +
                `<b>Cycle time:</b> ${machine.cycle} ${machine.unit} against ${machine.targetCycle} ${machine.unit}<br>` +
                `<b>Processed:</b> ${number(machine.processed)}<br>` +
                `<b>Rejection:</b> ${percent(machine.reject)}<br>` +
                `<b>Maintenance:</b> ${machine.maintenance} · Next PM ${machine.nextPM}` + freshness();
        }
        const lists = machineLists();
        return responseHeader("🏭 Live Machine Condition") +
            `<b>Running (${maintenance.runningMachines}):</b> ${lists.running}<br><br>` +
            `<b>Not running / attention:</b><br>• ${lists.attention}` + freshness();
    }

    function cycleResponse(text) {
        const machine = findMachine(text);
        const selected = machine ? [machine] : data.machines;
        const rows = selected.map(item => {
            const variance = (item.cycle - item.targetCycle) / item.targetCycle * 100;
            return `• <b>${item.name}:</b> ${item.cycle} ${item.unit} / target ${item.targetCycle} ${item.unit} (${variance > 0 ? "+" : ""}${variance.toFixed(1)}%)`;
        }).join("<br>");
        return responseHeader("⏱ Cycle-Time Update") + rows + `<br><br><b>Agent action:</b> Framing-01 and Laminator-02 are above their cycle targets.` + freshness();
    }

    function parameterResponse(text) {
        if (!can("sama.parameters.view")) {
            return responseHeader("🔒 Restricted Process Information") +
                `Your ${safe(user.department)} login can view machine condition, cycle time, production and rejection, but detailed process setpoints are restricted to authorised Quality, Maintenance, Process Engineering and Management profiles.`;
        }
        const machine = findMachine(text);
        let selected = machine ? data.parameters.filter(item => item.machine === machine.name) : data.parameters;
        if (text.includes("vacuum")) selected = selected.filter(item => item.name.toLowerCase().includes("vacuum"));
        if (text.includes("temperature")) selected = selected.filter(item => item.name.toLowerCase().includes("temperature"));
        const rows = selected.map(parameter => `• <b>${parameter.machine} ${parameter.name}:</b> actual ${parameter.actual} ${parameter.unit} · setpoint ${parameter.setpoint} ${parameter.unit} · limit ${parameter.min}–${parameter.max} · ${condition(parameter)}`).join("<br>");
        const changeInstruction = /(modify|change|update|setpoint|adjust)/.test(text)
            ? can("sama.parameters.request")
                ? `<br><br><b>Modification control:</b> Open Operations Control → Process Parameters → Request parameter change. Your request requires independent approval before machine execution.`
                : `<br><br><b>Modification control:</b> This login is view-only. An authorised Quality or Process Engineering requester must raise the change.`
            : "";
        return responseHeader("🎛 Process Parameter Update") + (rows || "No matching parameter found.") + changeInstruction + freshness();
    }

    function accessProfileResponse() {
        const visible = ["Machine condition", "Cycle time", "Production", "Rejection", "Maintenance"];
        if (can("sama.parameters.view")) visible.push("Process parameters");
        if (can("sama.parameters.request")) visible.push("Parameter change request");
        if (can("sama.parameters.approve")) visible.push("Independent approval");
        return responseHeader("👤 Your SAMA Agent Profile") +
            `<b>Employee:</b> ${safe(user.name)} (${safe(user.id)})<br>` +
            `<b>Department:</b> ${safe(user.department)}<br>` +
            `<b>Role:</b> ${safe(user.role)}<br>` +
            `<b>Agent:</b> ${safe(roleTitle())}<br>` +
            `<b>Available intelligence:</b> ${visible.join(", ")}.`;
    }

    function changeRequestResponse() {
        if (!can("sama.audit.view")) {
            return responseHeader("🔒 Restricted Change-Control Information") +
                `Your ${safe(user.department)} login does not include the parameter-change audit view.`;
        }
        let requests = [];
        try { requests = JSON.parse(localStorage.getItem("samaParameterChangeRequests")) || []; } catch (error) { requests = []; }
        const pending = requests.filter(item => item.status === "Pending");
        const rows = pending.length ? pending.map(item => `• <b>${safe(item.id)}:</b> ${safe(item.parameterId)} · ${item.oldValue} → ${item.proposedValue} ${safe(item.unit)} · requested by ${safe(item.requesterName)}`).join("<br>") : "No pending request is stored in this prototype session.";
        const approval = can("sama.parameters.approve") ? "You may independently approve another employee's request; self-approval remains blocked." : "Your login can submit or view requests but cannot approve them.";
        return responseHeader("✅ Parameter Change-Control Update") + `<b>Pending requests:</b> ${pending.length}<br><br>${rows}<br><br><b>Your authority:</b> ${approval}` + freshness();
    }

    window.generateRoleAwareOperationalResponse = function generateRoleAwareOperationalResponse(query) {
        const text = String(query || "").trim().toLowerCase();
        if (!text) return null;

        if (/(who am i|my access|my role|login type|department access)/.test(text)) return accessProfileResponse();
        if (/(my update|update me|today update|daily update|plant update|overall update|complete update|everything|all update|executive summary|management update)/.test(text)) return roleSummary();
        if (/(pending parameter|parameter request|change request|approval status)/.test(text)) return changeRequestResponse();
        if (/(vacuum|temperature|process parameter|setpoint|parameter change|modify parameter|adjust parameter)/.test(text)) return parameterResponse(text);
        if (/(production count|production update|production status|plan vs actual|output|produced|production gap|line performance)/.test(text)) return productionResponse();
        if (/(rejection|reject rate|yield|downgrade|b grade|scrap|quality update|fpy|defect count)/.test(text)) return qualityResponse();
        if (/(which machine|machines running|machine running|under maintenance|machine status|plant status|stopped machine|breakdown machine)/.test(text)) return machineStatusResponse(text);
        if (/(cycle time|takt time|machine cycle|slow machine)/.test(text)) return cycleResponse(text);
        if (/(maintenance update|maintenance status|plant downtime|overall downtime|plant mttr|plant mtbf|pm pending|pending pm|which pm)/.test(text)) return maintenanceResponse();
        return null;
    };

    window.getRoleAwareWelcomeMessage = function getRoleAwareWelcomeMessage() {
        let focus = "operational performance";
        if (user.department === "Production") focus = "production count, plan achievement, machine condition, cycle time and rejection";
        if (user.department === "Quality") focus = "yield, rejection, defects and approved process parameters";
        if (user.department === "Maintenance") focus = "machine condition, breakdowns, PM, downtime, MTTR and MTBF";
        if (user.department === "Process Engineering") focus = "parameter trends, change requests, process limits and quality";
        if (user.department === "Management") focus = "executive production, quality and reliability performance";
        return responseHeader(`Welcome, ${safe(user.name.split(" ")[0])}`) +
            `I recognised your <b>${safe(user.department)}</b> login. I will prioritise ${focus} and will only show information allowed for your access profile.<br><br>` +
            `<b>Ask:</b> “Give me my update”, “Production count”, “Which machines are running?” or “Who am I?”`;
    };

    function roleQuestions() {
        if (user.department === "Production") return ["Give me my production update", "What is the production count?", "Which machines are running?", "Show cycle time status"];
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
