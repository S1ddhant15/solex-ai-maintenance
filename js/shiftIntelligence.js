// =====================================================
// SAMA - Role-aware shift continuity and problem board
// Uses the same central portal permission profile as the AI agent.
// =====================================================

(function initialiseShiftIntelligence() {
    "use strict";

    const access = window.SAMA_ACCESS;
    const data = window.SAMA_OPERATIONAL_DATA;
    if (!access || !data) return;

    const user = access.user;
    const department = String(user.department || "");

    function can(permission) {
        return access.can(permission);
    }

    function safe(value) {
        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    function number(value) {
        return Number(value).toLocaleString("en-IN");
    }

    function isCrossFunctional() {
        return Boolean(user.admin || ["Management", "Operations Excellence"].includes(department));
    }

    function canSeeProblem(problem) {
        if (isCrossFunctional()) return true;
        if (department === "Maintenance") return problem.department === "Maintenance" || problem.category === "Breakdown" || problem.category === "Process deviation";
        if (department === "Quality") return problem.department === "Quality" || problem.category === "Defect trend" || problem.category === "Process deviation";
        if (department === "Process Engineering") return ["Quality", "Maintenance"].includes(problem.department) || problem.category === "Process deviation";
        if (department === "PPC") return problem.department === "PPC" || problem.category === "Material flow";
        return can("sama.operations.view");
    }

    function handoverMessage() {
        const handover = data.shiftHandover;
        if (department === "Production") return handover.productionNote;
        if (department === "Quality") return handover.qualityNote;
        if (department === "Maintenance") return handover.maintenanceNote;
        if (department === "PPC") return handover.ppcNote;
        if (department === "Process Engineering") return `${handover.qualityNote} ${handover.maintenanceNote}`;
        return handover.managementNote;
    }

    function metric(label, value, tone) {
        return `<div class="context-metric ${tone || ""}"><span>${safe(label)}</span><b>${safe(value)}</b></div>`;
    }

    function renderPreviousShift() {
        const previous = data.previousShift;
        const target = document.getElementById("previousShiftMetrics");
        const label = document.getElementById("previousShiftName");
        if (!target || !label) return;

        label.textContent = previous.shift;
        let html = "";
        if (can("sama.production.view")) {
            html += metric("Production", number(previous.productionActual), previous.planAchievement >= 95 ? "good" : "warn");
            html += metric("Plan", `${previous.planAchievement.toFixed(1)}%`, previous.planAchievement >= 95 ? "good" : "warn");
        }
        if (can("sama.quality.view")) {
            html += metric("Yield", `${previous.yield.toFixed(2)}%`, previous.yield >= 99 ? "good" : "warn");
            html += metric("Rejection", `${previous.rejectionRate.toFixed(2)}%`, previous.rejectionRate <= .8 ? "good" : "bad");
        }
        if (can("sama.maintenance.view")) {
            html += metric("Downtime", `${previous.downtimeMinutes} min`, previous.downtimeMinutes <= 60 ? "good" : "bad");
            html += metric("Breakdowns", previous.breakdownCount, previous.breakdownCount ? "warn" : "good");
        }
        target.innerHTML = html || metric("Shift status", "Authorised summary", "good");
    }

    function problemDetail(problem) {
        if (isCrossFunctional() || department === "Maintenance" || department === "Quality" || department === "Process Engineering") {
            return problem.issue;
        }
        return problem.impact;
    }

    function renderPriorities() {
        const target = document.getElementById("priorityHandoverList");
        const count = document.getElementById("priorityCount");
        if (!target || !count) return;

        const visible = data.problemBoard.filter(canSeeProblem).slice(0, 4);
        count.textContent = `${visible.length} OPEN`;
        target.innerHTML = visible.map(problem => `
            <button type="button" class="priority-item ${safe(problem.priority.toLowerCase())}" data-sama-question="Troubleshoot ${safe(problem.machine)} ${safe(problem.issue)}">
                <span class="priority-code">${safe(problem.priority)}</span>
                <span class="priority-copy"><b>${safe(problem.machine)}</b><small>${safe(problemDetail(problem))}</small><em>${safe(problem.owner)} · ${safe(problem.status)}</em></span>
                <i>→</i>
            </button>`).join("") || `<p class="context-empty">No open item is assigned to your current access profile.</p>`;
    }

    function bindQuestionButtons() {
        document.querySelectorAll("[data-sama-question]").forEach(button => {
            button.addEventListener("click", () => {
                const question = button.dataset.samaQuestion;
                if (typeof window.askQuickQuestion === "function") {
                    window.askQuickQuestion(question);
                    return;
                }
                const input = document.getElementById("userInput");
                if (input) input.value = question;
            });
        });
    }

    function render() {
        const handover = data.shiftHandover;
        const activeShift = document.getElementById("activeShiftLabel");
        const from = document.getElementById("handoverFrom");
        const to = document.getElementById("handoverTo");
        const status = document.getElementById("handoverStatus");
        const summary = document.getElementById("handoverSummary");

        if (activeShift) activeShift.textContent = data.shift;
        if (from) from.textContent = handover.fromShift;
        if (to) to.textContent = handover.toShift;
        if (status) status.textContent = `${handover.carryForwardCount} CARRY FORWARD`;
        if (summary) summary.textContent = handoverMessage();

        renderPreviousShift();
        renderPriorities();
        bindQuestionButtons();
        document.body.classList.add("shift-intelligence-ready");
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", render);
    else render();
})();
