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

    function isCrossFunctional() {
        return Boolean(user.admin || ["Management", "Operations Excellence"].includes(user.department));
    }

    function canDetailedMaintenance() {
        return Boolean(can("sama.maintenance.view") && (user.admin || ["Maintenance", "Process Engineering", "Management", "Operations Excellence"].includes(user.department)));
    }

    function visibleProblems() {
        if (isCrossFunctional()) return data.problemBoard;
        if (user.department === "Maintenance") return data.problemBoard.filter(item => item.department === "Maintenance" || item.category === "Breakdown" || item.category === "Process deviation");
        if (user.department === "Quality") return data.problemBoard.filter(item => item.department === "Quality" || ["Defect trend", "Process deviation"].includes(item.category));
        if (user.department === "Process Engineering") return data.problemBoard.filter(item => ["Quality", "Maintenance"].includes(item.department) || item.category === "Process deviation");
        if (user.department === "PPC") return data.problemBoard.filter(item => item.department === "PPC" || item.category === "Material flow");
        return data.problemBoard;
    }

    function handoverDepartmentNote() {
        const handover = data.shiftHandover;
        if (user.department === "Production") return handover.productionNote;
        if (user.department === "Quality") return handover.qualityNote;
        if (user.department === "Maintenance") return handover.maintenanceNote;
        if (user.department === "PPC") return handover.ppcNote;
        if (user.department === "Process Engineering") return `${handover.qualityNote} ${handover.maintenanceNote}`;
        return handover.managementNote;
    }

    function handoverResponse() {
        if (!can("sama.operations.view")) return restrictedResponse("shift handover and carry-forward items", "SAMA operational viewer");
        const handover = data.shiftHandover;
        const problems = visibleProblems().slice(0, 5).map(item =>
            `• <b>${safe(item.priority)} · ${safe(item.machine)}:</b> ${safe(item.issue)}<br>&nbsp;&nbsp;Owner: ${safe(item.owner)} · ${safe(item.status)} · Impact: ${safe(item.impact)}`
        ).join("<br>");
        return responseHeader(`🔄 ${handover.fromShift} → ${handover.toShift} Handover`) +
            `<b>Handover time:</b> ${safe(handover.handoverAt)}<br>` +
            `<b>Overall condition:</b> ${safe(handover.overallStatus)}<br>` +
            `<b>Safety:</b> ${safe(handover.safetyStatus)}<br>` +
            `<b>Carry-forward:</b> ${handover.carryForwardCount} items · ${handover.acknowledgedCount} acknowledged<br><br>` +
            `<b>Your ${safe(user.department)} briefing:</b><br>${safe(handoverDepartmentNote())}<br><br>` +
            `<b>Authorised priority items:</b><br>${problems || "No open item is assigned to this access profile."}` + freshness();
    }

    function previousShiftResponse() {
        if (!can("sama.operations.view")) return restrictedResponse("previous-shift operational intelligence", "SAMA operational viewer");
        const previous = data.previousShift;
        const lines = can("sama.production.view") ? previous.lineSummary.map(line =>
            `• <b>${safe(line.line)}:</b> ${number(line.actual)} / ${number(line.plan)} · rejection ${percent(line.rejection)} · downtime ${line.downtime} min`
        ).join("<br>") : "Line output is not included in this login.";
        const defects = can("sama.quality.view") ? data.previousShiftDefects.slice(0, 4).map(item =>
            `• <b>${safe(item.defect)}:</b> ${number(item.count)} · ${safe(item.line)} · ${safe(item.trend)} trend · ${safe(item.containment)}`
        ).join("<br>") : "Detailed defect categories are restricted for this login.";
        const breakdowns = canDetailedMaintenance() ? data.breakdowns.map(item =>
            `• <b>${safe(item.machine)}:</b> ${item.downtimeMinutes} min · ${safe(item.status)} · ${safe(item.alarm)}`
        ).join("<br>") : data.breakdowns.map(item =>
            `• <b>${safe(item.machine)}:</b> ${safe(item.status)} · ${item.downtimeMinutes} min · ${safe(item.productionImpact)}`
        ).join("<br>");
        return responseHeader(`🕘 ${previous.shift} Performance & Handover`) +
            `${can("sama.production.view") ? `<b>Production:</b> ${number(previous.productionActual)} / ${number(previous.productionPlan)} (${percent(previous.planAchievement)})<br>` : ""}` +
            `${can("sama.quality.view") ? `<b>Yield:</b> ${percent(previous.yield)} · <b>Rejection:</b> ${percent(previous.rejectionRate)}<br>` : ""}` +
            `${can("sama.maintenance.view") ? `<b>Downtime:</b> ${previous.downtimeMinutes} min · <b>Breakdowns:</b> ${previous.breakdownCount}<br>` : ""}` +
            `<b>Unresolved at handover:</b> ${previous.unresolvedItems}<br><br>` +
            `<b>Line performance:</b><br>${lines}<br><br>` +
            `<b>Previous-shift defects:</b><br>${defects}<br><br>` +
            `<b>Breakdowns:</b><br>${breakdowns}` + freshness();
    }

    function activeProblemsResponse() {
        if (!can("sama.operations.view")) return restrictedResponse("the active problem and ownership board", "SAMA operational viewer");
        const rows = visibleProblems().map(item => {
            const detail = user.department === "Production" && !isCrossFunctional()
                ? `${safe(item.impact)}<br>&nbsp;&nbsp;Safe action: ${safe(item.safeOperatorAction)}`
                : `${safe(item.issue)}<br>&nbsp;&nbsp;Probable cause: ${safe(item.probableCause)}<br>&nbsp;&nbsp;Next action: ${safe(item.nextAction)}`;
            return `• <b>${safe(item.priority)} · ${safe(item.id)} · ${safe(item.machine)}</b><br>&nbsp;&nbsp;${detail}<br>&nbsp;&nbsp;Owner: ${safe(item.owner)} · Status: ${safe(item.status)}`;
        }).join("<br><br>");
        return responseHeader("🚦 Active Problem & Ownership Board") +
            `<b>Visible open items:</b> ${visibleProblems().length}<br><br>${rows || "No active problem is assigned to your department profile."}` + freshness();
    }

    function previousDefectsResponse() {
        if (!can("sama.quality.view")) {
            if (can("sama.production.view")) {
                return responseHeader("📉 Previous-Shift Rejection Summary") +
                    `<b>Rejection:</b> ${percent(data.previousShift.rejectionRate)} · <b>Yield:</b> ${percent(data.previousShift.yield)}<br>` +
                    `<b>Operator action:</b> Follow active containment instructions and preserve barcode traceability. Detailed defect categories remain restricted to Quality-authorised profiles.` + freshness();
            }
            return restrictedResponse("previous-shift defect categories and containment", "Quality, Process Engineering, Management or Operations Excellence");
        }
        const rows = data.previousShiftDefects.map(item =>
            `• <b>${safe(item.defect)}:</b> ${number(item.count)} (${item.contribution.toFixed(1)}%) · ${safe(item.line)} / ${safe(item.process)} · Trend ${safe(item.trend)}<br>&nbsp;&nbsp;Containment: ${safe(item.containment)} · Owner: ${safe(item.owner)}`
        ).join("<br><br>");
        return responseHeader("🔎 Previous-Shift Defect Intelligence") +
            `<b>Total inspected:</b> ${number(data.previousShift.inspected)}<br>` +
            `<b>Yield:</b> ${percent(data.previousShift.yield)} · <b>Rejection:</b> ${percent(data.previousShift.rejectionRate)}<br>` +
            `<b>Top defect:</b> ${safe(data.previousShift.topDefect)} (${data.previousShift.topDefectCount})<br><br>${rows}` + freshness();
    }

    function findBreakdown(text) {
        const compact = String(text).toLowerCase().replaceAll(/[^a-z0-9]/g, "");
        return data.breakdowns.find(item => compact.includes(item.machine.toLowerCase().replaceAll(/[^a-z0-9]/g, ""))) || null;
    }

    function breakdownResponse(text) {
        const found = findBreakdown(text);
        const selected = found ? [found] : data.breakdowns;
        if (!canDetailedMaintenance()) {
            if (!can("sama.operations.view")) return restrictedResponse("breakdown operational status", "SAMA operational viewer");
            const impactRows = selected.map(item =>
                `• <b>${safe(item.machine)}:</b> ${safe(item.status)} · ${item.downtimeMinutes} min<br>&nbsp;&nbsp;Production impact: ${safe(item.productionImpact)}<br>&nbsp;&nbsp;Control: Keep traceability and follow the assigned Maintenance/Quality release instruction.`
            ).join("<br><br>");
            return responseHeader("⚠ Breakdown Operational Status") + impactRows +
                `<br><br><b>Access control:</b> Root cause, repair and guarded-area diagnosis remain visible only to authorised Maintenance/Engineering profiles.` + freshness();
        }
        const rows = selected.map(item =>
            `• <b>${safe(item.id)} · ${safe(item.machine)} · ${safe(item.status)}</b><br>` +
            `&nbsp;&nbsp;Alarm/symptom: ${safe(item.alarm)} — ${safe(item.symptom)}<br>` +
            `&nbsp;&nbsp;Root cause: ${safe(item.rootCause)}<br>` +
            `&nbsp;&nbsp;Action: ${safe(item.actionTaken)}<br>` +
            `&nbsp;&nbsp;Restoration: ${safe(item.restorationPlan)}<br>` +
            `&nbsp;&nbsp;Downtime/impact: ${item.downtimeMinutes} min · ${safe(item.productionImpact)}`
        ).join("<br><br>");
        return responseHeader(found ? `🛠 ${found.machine} Breakdown Record` : "🛠 Previous-Shift Breakdown Review") + rows + freshness();
    }

    function findPlaybook(text) {
        const normalized = String(text).toLowerCase();
        return data.troubleshootingPlaybooks.find(item => item.keywords.some(keyword => normalized.includes(keyword))) || null;
    }

    function troubleshootingResponse(text) {
        if (!can("sama.operations.view")) return restrictedResponse("problem troubleshooting", "SAMA operational viewer");
        const playbook = findPlaybook(text);
        if (!playbook) return activeProblemsResponse();
        const common = `<b>Safety/risk:</b> ${safe(playbook.risk)}<br><br>`;
        const production = `<b>Safe production checks:</b><br>${playbook.productionChecks.map((step, index) => `${index + 1}. ${safe(step)}`).join("<br>")}`;
        const maintenanceSteps = canDetailedMaintenance()
            ? `<br><br><b>Maintenance diagnosis:</b><br>${playbook.maintenanceChecks.map((step, index) => `${index + 1}. ${safe(step)}`).join("<br>")}`
            : "";
        const qualitySteps = can("sama.quality.view")
            ? `<br><br><b>Quality containment/release:</b><br>${playbook.qualityChecks.map((step, index) => `${index + 1}. ${safe(step)}`).join("<br>")}`
            : "";
        const limitation = !canDetailedMaintenance()
            ? `<br><br><b>Control:</b> Your login receives safe operator actions only. Maintenance diagnosis and guarded-area work remain restricted.`
            : "";
        return responseHeader(`🧭 Troubleshooting: ${playbook.title}`) + common + production + maintenanceSteps + qualitySteps + limitation +
            `<br><br><b>Escalation:</b> ${safe(playbook.escalation)}` + freshness();
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
        if (can("sama.operations.view")) visible.push("Machine Status", "Cycle Time", "Shift Handover", "Active Problem Board", "Safe Operator Troubleshooting");
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
        if (/(shift handover|handover update|handover briefing|carry forward|carry-forward|next shift|incoming shift|outgoing shift)/.test(text)) return handoverResponse();
        if (/(previous shift|last shift|night shift|shift c)/.test(text)) return previousShiftResponse();
        if (/(active problem|open problem|problem board|priority problem|pending issue|all problem|all active problem|problem and owner|problems and owners|issues and owners)/.test(text)) return activeProblemsResponse();
        if (/(troubleshoot|troubleshooting|how to solve|how to fix|corrective action|problem solving|diagnose|problem with|problem in|issue with|issue in|machine problem|breakdown in)/.test(text)) return troubleshootingResponse(text);
        if (/(previous.*defect|last.*defect|defect trend|top defect|micro-crack|micro crack|bubble defect|frame gap)/.test(text)) return previousDefectsResponse();
        if (/(breakdown history|previous breakdown|last breakdown|breakdown record|root cause.*breakdown|restoration plan|show breakdown|current breakdown|breakdown update)/.test(text)) return breakdownResponse(text);
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
        if (/(breakdown root cause|repair action|maintenance diagnosis|restoration plan)/.test(text) && !canDetailedMaintenance()) return restrictedResponse("detailed breakdown diagnosis and restoration actions", "Maintenance, Process Engineering, Management or Operations Excellence");
        if (/(alarm|breakdown|preventive maintenance|\bpm\b|spare|repair|troubleshoot|mttr|mtbf|downtime)/.test(text) && !can("sama.maintenance.view")) return restrictedResponse("maintenance troubleshooting and reliability intelligence", "Maintenance, Management or Operations Excellence");
        return null;
    };

    window.getRoleAwareWelcomeMessage = function getRoleAwareWelcomeMessage() {
        return responseHeader(`Welcome, ${user.name.split(" ")[0]}`) +
            `I recognised your <b>${safe(user.department)}</b> login. Every answer will be checked against your active department permissions before information is shown.<br><br>` +
            `<b>New operational context:</b> shift handover, previous-shift production, defects, breakdowns, active problems, ownership and role-safe troubleshooting.<br><br>` +
            `<b>Ask:</b> “Give me the shift handover”, “Show active problems”, “Explain the previous shift” or a permitted troubleshooting question.`;
    };

    function roleQuestions() {
        if (user.department === "Production") return ["Give me the shift handover", "Show active problems and safe actions", "Give me my production update", "Which machines are running?"];
        if (user.department === "Quality") return ["Give me the shift handover", "Show previous shift defects", "Troubleshoot Laminator bubble defect", "Show rejection and yield"];
        if (user.department === "Maintenance") return ["Give me the shift handover", "Show all active problems and owners", "Troubleshoot Framing-01 cylinder alarm", "Show previous breakdowns"];
        if (user.department === "Process Engineering") return ["Give me the shift handover", "Show previous shift defects", "Troubleshoot Laminator vacuum deviation", "Show abnormal process parameters"];
        if (user.department === "PPC") return ["Give me the shift handover", "Show material flow problems", "Give me the previous shift production", "Show production gap"];
        return ["Give me the complete shift handover", "Show all active problems and owners", "Explain the previous shift", "Give me complete plant update"];
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
