// =====================================================
// SAMA - Shared Operational Data Adapter
// One data source for Operations, Analytics and Role-Aware AI.
// Replace the DEMO payload with authenticated API responses later.
// =====================================================

(function initialiseOperationalData() {
    "use strict";

    window.SAMA_OPERATIONAL_DATA = {
        mode: "demo",
        generatedAt: new Date().toISOString(),
        shift: "Shift A",

        plantSummary: {
            taktActual: 22.8,
            taktTarget: 24.0,
            productionActual: 8507,
            productionPlan: 9600,
            productionGap: -1093,
            planAchievement: 88.61,
            rejectionRate: 0.86,
            rejectionTarget: 0.80,
            yield: 99.14,
            inspected: 8479,
            wipBeforeInspection: 28
        },

        qualitySummary: {
            inspected: 8479,
            aGrade: 8406,
            bGrade: 38,
            reject: 24,
            scrap: 11,
            rework: 52,
            downgrade: 73,
            downgradeRate: 0.86,
            firstPassYield: 98.53,
            topDefect: "EL micro-crack",
            topDefectCount: 29
        },

        maintenanceSummary: {
            totalMachines: 8,
            runningMachines: 5,
            plannedMaintenance: 1,
            breakdownMachines: 1,
            idleMachines: 1,
            downtimeMinutes: 126,
            mttrMinutes: 42,
            mtbfHours: 186,
            pmPending: 2,
            criticalAlerts: 2
        },

        lineData: [
            { line: "Line-1", actual: 2864, plan: 3200, rejection: 0.74, yield: 99.26, takt: 22.1, status: "On track" },
            { line: "Line-2", actual: 2732, plan: 3200, rejection: 1.08, yield: 98.92, takt: 24.9, status: "Attention" },
            { line: "Line-3", actual: 2911, plan: 3200, rejection: 0.77, yield: 99.23, takt: 21.7, status: "On track" }
        ],

        hourlyProduction: [
            { hour: "06–07", actual: 940, plan: 1200 },
            { hour: "07–08", actual: 1072, plan: 1200 },
            { hour: "08–09", actual: 1114, plan: 1200 },
            { hour: "09–10", actual: 1090, plan: 1200 },
            { hour: "10–11", actual: 1068, plan: 1200 },
            { hour: "11–12", actual: 1118, plan: 1200 },
            { hour: "12–13", actual: 1082, plan: 1200 },
            { hour: "13–14", actual: 1023, plan: 1200 }
        ],

        dailyTrend: [
            { day: "10 Aug", production: 9210, plan: 9600, rejection: 0.92, downtime: 104 },
            { day: "11 Aug", production: 9388, plan: 9600, rejection: 0.81, downtime: 76 },
            { day: "12 Aug", production: 9472, plan: 9600, rejection: 0.74, downtime: 58 },
            { day: "13 Aug", production: 9148, plan: 9600, rejection: 1.02, downtime: 133 },
            { day: "14 Aug", production: 9521, plan: 9600, rejection: 0.69, downtime: 44 },
            { day: "15 Aug", production: 9360, plan: 9600, rejection: 0.78, downtime: 81 },
            { day: "16 Aug", production: 8507, plan: 9600, rejection: 0.86, downtime: 126 }
        ],

        machines: [
            { id: "STR-01", name: "Stringer-01", line: "Line-1", process: "Cell Stringing", status: "Running", cycle: 3.8, targetCycle: 4.0, unit: "sec", processed: 12640, reject: 0.42, nextPM: "18 Aug", maintenance: "Healthy" },
            { id: "STR-02", name: "Stringer-02", line: "Line-1", process: "Cell Stringing", status: "Maintenance", cycle: 4.1, targetCycle: 4.0, unit: "sec", processed: 9870, reject: 0.68, nextPM: "Today", maintenance: "PM in progress" },
            { id: "LAY-01", name: "Layup-01", line: "Line-1", process: "String Layup", status: "Running", cycle: 21.7, targetCycle: 22.0, unit: "sec", processed: 2921, reject: 0.19, nextPM: "20 Aug", maintenance: "Healthy" },
            { id: "LAM-01", name: "Laminator-01", line: "Line-1", process: "Lamination", status: "Running", cycle: 930, targetCycle: 930, unit: "sec", processed: 2880, reject: 0.31, nextPM: "18 Aug", maintenance: "Due in 2 days" },
            { id: "LAM-02", name: "Laminator-02", line: "Line-2", process: "Lamination", status: "Idle", cycle: 948, targetCycle: 930, unit: "sec", processed: 2656, reject: 0.57, nextPM: "19 Aug", maintenance: "Waiting for material" },
            { id: "EL-01", name: "EL-Tester-01", line: "Line-2", process: "EL Inspection", status: "Running", cycle: 20.9, targetCycle: 21.0, unit: "sec", processed: 2764, reject: 1.08, nextPM: "21 Aug", maintenance: "Healthy" },
            { id: "FRM-01", name: "Framing-01", line: "Line-3", process: "Framing", status: "Breakdown", cycle: 25.6, targetCycle: 22.0, unit: "sec", processed: 2184, reject: 0.35, nextPM: "Overdue", maintenance: "Cylinder alarm" },
            { id: "SUN-01", name: "Sun-Simulator-01", line: "Line-3", process: "IV Testing", status: "Running", cycle: 22.8, targetCycle: 24.0, unit: "sec", processed: 2911, reject: 0.77, nextPM: "22 Aug", maintenance: "Healthy" }
        ],

        parameters: [
            { id: "LAM-01-VAC", machine: "Laminator-01", line: "Line-1", name: "Vacuum Pressure", actual: -96, setpoint: -95, min: -100, max: -90, unit: "kPa", source: "PLC vacuum transmitter" },
            { id: "LAM-01-TZ1", machine: "Laminator-01", line: "Line-1", name: "Temperature Zone 1", actual: 148, setpoint: 148, min: 140, max: 155, unit: "°C", source: "PLC thermocouple" },
            { id: "LAM-01-TZ2", machine: "Laminator-01", line: "Line-1", name: "Temperature Zone 2", actual: 150, setpoint: 150, min: 140, max: 155, unit: "°C", source: "PLC thermocouple" },
            { id: "LAM-01-TZ3", machine: "Laminator-01", line: "Line-1", name: "Temperature Zone 3", actual: 154, setpoint: 150, min: 140, max: 155, unit: "°C", source: "PLC thermocouple" },
            { id: "LAM-01-PNEU", machine: "Laminator-01", line: "Line-1", name: "Pneumatic Pressure", actual: 0.61, setpoint: 0.60, min: 0.50, max: 0.70, unit: "MPa", source: "Pressure switch" },
            { id: "LAM-02-VAC", machine: "Laminator-02", line: "Line-2", name: "Vacuum Pressure", actual: -89, setpoint: -95, min: -100, max: -90, unit: "kPa", source: "PLC vacuum transmitter" },
            { id: "STR-01-SOLD", machine: "Stringer-01", line: "Line-1", name: "Soldering Temperature", actual: 345, setpoint: 345, min: 330, max: 360, unit: "°C", source: "Heater controller" },
            { id: "STR-01-VAC", machine: "Stringer-01", line: "Line-1", name: "Cell Vacuum", actual: -72, setpoint: -75, min: -90, max: -60, unit: "kPa", source: "Vacuum sensor" },
            { id: "FRM-01-AIR", machine: "Framing-01", line: "Line-3", name: "Air Pressure", actual: 0.47, setpoint: 0.60, min: 0.50, max: 0.70, unit: "MPa", source: "Pressure transmitter" }
        ],

        previousShift: {
            shift: "Shift C",
            window: "22:00–06:00",
            supervisor: "Night Operations Team",
            productionActual: 9264,
            productionPlan: 9600,
            planAchievement: 96.50,
            inspected: 9192,
            yield: 98.94,
            rejectionRate: 1.06,
            downtimeMinutes: 83,
            breakdownCount: 2,
            unresolvedItems: 4,
            topDefect: "EL micro-crack",
            topDefectCount: 34,
            lineSummary: [
                { line: "Line-1", actual: 3158, plan: 3200, rejection: 0.72, downtime: 18 },
                { line: "Line-2", actual: 2986, plan: 3200, rejection: 1.41, downtime: 42 },
                { line: "Line-3", actual: 3120, plan: 3200, rejection: 1.03, downtime: 23 }
            ]
        },

        shiftHandover: {
            fromShift: "Shift C",
            toShift: "Shift A",
            handoverAt: "06:00",
            overallStatus: "Attention required",
            safetyStatus: "No open safety incident",
            carryForwardCount: 4,
            acknowledgedCount: 3,
            productionNote: "Recover 336-module previous-shift gap; protect Line-2 output during Laminator-02 monitoring.",
            qualityNote: "Contain EL micro-crack increase on Line-2 and verify first three lots after vacuum stabilisation.",
            maintenanceNote: "Framing-01 cylinder alarm remains the highest priority; Stringer-02 PM is in progress.",
            ppcNote: "Backsheet material for Line-2 is released; confirm arrival at point-of-use before 08:30.",
            managementNote: "Line-2 is the shared cross-functional risk for output, rejection and downtime."
        },

        problemBoard: [
            {
                id: "PRB-2401", priority: "Critical", department: "Maintenance", owner: "Mechanical Maintenance",
                line: "Line-3", machine: "Framing-01", category: "Breakdown", status: "In progress",
                openedAt: "05:42", ageMinutes: 138, issue: "Frame clamping cylinder not reaching forward position",
                impact: "Line-3 framing stopped; estimated loss 118 modules/hour",
                probableCause: "Low air pressure or cylinder reed-switch alignment",
                safeOperatorAction: "Keep machine isolated, verify air supply indication and do not bypass the interlock",
                nextAction: "Leak test pneumatic circuit, align sensor and validate ten dry cycles"
            },
            {
                id: "PRB-2402", priority: "High", department: "Quality", owner: "Quality + Process Engineering",
                line: "Line-2", machine: "Laminator-02", category: "Process deviation", status: "Monitoring",
                openedAt: "04:55", ageMinutes: 185, issue: "Vacuum actual −89 kPa against approved maximum −90 kPa",
                impact: "Bubble/void risk; first three lots require enhanced inspection",
                probableCause: "Vacuum leakage, pump performance loss or seal contamination",
                safeOperatorAction: "Hold affected lot identification and inform Quality; do not change the setpoint",
                nextAction: "Maintenance leak check; Quality verifies post-lam visual and EL result"
            },
            {
                id: "PRB-2403", priority: "High", department: "Quality", owner: "Pre-Lam Quality",
                line: "Line-2", machine: "EL-Tester-01", category: "Defect trend", status: "Containment active",
                openedAt: "03:20", ageMinutes: 280, issue: "EL micro-crack contribution increased above shift baseline",
                impact: "34 affected modules; potential yield loss 0.37 percentage points",
                probableCause: "Cell handling stress, string transport alignment or upstream crack propagation",
                safeOperatorAction: "Segregate affected barcodes and preserve defect images for correlation",
                nextAction: "Correlate by stringer, hour and operator; verify layup vacuum pickup"
            },
            {
                id: "PRB-2404", priority: "Medium", department: "Maintenance", owner: "Electrical Maintenance",
                line: "Line-1", machine: "Stringer-02", category: "Planned maintenance", status: "In progress",
                openedAt: "06:10", ageMinutes: 110, issue: "Scheduled ribbon-path and vision-system PM",
                impact: "Stringer capacity reduced; Line-1 operating with planned buffer",
                probableCause: "Scheduled activity",
                safeOperatorAction: "Use released Stringer-01 buffer and maintain FIFO",
                nextAction: "Complete camera cleaning, ribbon alignment and dry-cycle validation"
            },
            {
                id: "PRB-2405", priority: "Medium", department: "PPC", owner: "PPC + Production",
                line: "Line-2", machine: "Laminator-02", category: "Material flow", status: "Material dispatched",
                openedAt: "06:25", ageMinutes: 95, issue: "Backsheet replenishment delayed at point-of-use",
                impact: "Laminator-02 temporarily idle; WIP sequence at risk",
                probableCause: "Material staging delay",
                safeOperatorAction: "Protect FIFO and do not substitute an unapproved material batch",
                nextAction: "Confirm batch at line and reconcile material registration before restart"
            }
        ],

        previousShiftDefects: [
            { id: "DEF-701", line: "Line-2", process: "Pre-Lam EL", defect: "Micro-crack", count: 34, contribution: 31.8, trend: "Up", containment: "Barcode segregation + image review", owner: "Quality" },
            { id: "DEF-702", line: "Line-2", process: "Post Lam", defect: "Bubble / void", count: 21, contribution: 19.6, trend: "Up", containment: "Enhanced VQC on three lots", owner: "Quality + Process" },
            { id: "DEF-703", line: "Line-1", process: "Stringing", defect: "Ribbon misalignment", count: 18, contribution: 16.8, trend: "Stable", containment: "First-off verification after PM", owner: "Production" },
            { id: "DEF-704", line: "Line-3", process: "Framing", defect: "Frame gap", count: 12, contribution: 11.2, trend: "Down", containment: "Clamp pressure check", owner: "Production + Quality" },
            { id: "DEF-705", line: "Line-3", process: "Final Inspection", defect: "J-box excess sealant", count: 8, contribution: 7.5, trend: "Stable", containment: "Workstation sample approval", owner: "Quality" }
        ],

        breakdowns: [
            {
                id: "BD-1182", machine: "Framing-01", line: "Line-3", start: "05:42", end: null,
                downtimeMinutes: 138, status: "Open", alarm: "Clamp forward timeout",
                symptom: "Cylinder does not reach forward sensor within configured time",
                rootCause: "Under investigation: air pressure measured below minimum and sensor alignment suspected",
                actionTaken: "Machine isolated; regulator, hose joints and reed switch inspection started",
                restorationPlan: "Restore ≥0.50 MPa, align sensor, perform ten dry cycles and release first-off module",
                productionImpact: "Estimated 271 modules delayed"
            },
            {
                id: "BD-1181", machine: "Laminator-02", line: "Line-2", start: "02:18", end: "03:00",
                downtimeMinutes: 42, status: "Restored / monitoring", alarm: "Vacuum level not achieved",
                symptom: "Vacuum plateaued at −87 kPa during evacuation stage",
                rootCause: "Door-seal contamination created a minor leakage path",
                actionTaken: "Seal cleaned, vacuum line inspected and empty cycle validated",
                restorationPlan: "Trend five production cycles; inspect first three lots for bubbles/voids",
                productionImpact: "Approx. 154 modules delayed"
            },
            {
                id: "BD-1180", machine: "Stringer-01", line: "Line-1", start: "00:46", end: "01:04",
                downtimeMinutes: 18, status: "Closed", alarm: "E37 servo following error",
                symptom: "Ribbon-feed axis stopped during indexing",
                rootCause: "Ribbon spool drag increased servo load beyond threshold",
                actionTaken: "Spool tension corrected; axis homed and five strings verified",
                restorationPlan: "Observe servo load each hour and inspect remaining spool condition",
                productionImpact: "Approx. 72 strings delayed; recovered within shift"
            }
        ],

        troubleshootingPlaybooks: [
            {
                id: "TS-FRM-CLAMP", machine: "Framing-01", keywords: ["frame", "framing", "clamp", "cylinder", "forward timeout"],
                title: "Framing clamp/cylinder timeout", risk: "Mechanical movement and stored pneumatic energy",
                productionChecks: ["Confirm the displayed alarm", "Stop automatic restart", "Verify supply-pressure indication", "Call Maintenance if the interlock remains active"],
                maintenanceChecks: ["Apply LOTO", "Verify regulator output and leakage", "Inspect solenoid command/LED", "Check cylinder reed-switch position", "Manually test the valve only under approved procedure", "Run ten guarded dry cycles"],
                qualityChecks: ["Hold the last module before the alarm", "Verify frame gap and squareness after restoration", "Release production after first-off approval"],
                escalation: "Escalate if pressure cannot be restored, cylinder binds mechanically or the safety circuit is abnormal."
            },
            {
                id: "TS-LAM-VAC", machine: "Laminator-02", keywords: ["laminator", "vacuum", "bubble", "void", "pressure"],
                title: "Laminator vacuum not achieved / bubble risk", risk: "Hot surface, vacuum system and product quality risk",
                productionChecks: ["Record actual vacuum and affected batch", "Do not change an approved setpoint", "Hold suspected lots and inform Quality"],
                maintenanceChecks: ["Inspect door seal and vacuum hose", "Check pump current and oil condition", "Perform approved leak test", "Validate empty cycle against the vacuum curve"],
                qualityChecks: ["Inspect first three lots after restoration", "Correlate bubble/void location with vacuum trend", "Release or contain lots based on approved criteria"],
                escalation: "Escalate to Process Engineering for recurring deviation or any proposed setpoint change."
            },
            {
                id: "TS-STR-E37", machine: "Stringer-01", keywords: ["stringer", "e37", "servo", "following error", "ribbon"],
                title: "Stringer servo E37 / ribbon-feed following error", risk: "Moving axis and hot soldering system",
                productionChecks: ["Record alarm code and axis", "Inspect visible ribbon jam without entering guarded area", "Call Maintenance after one approved reset attempt"],
                maintenanceChecks: ["Apply LOTO where required", "Check ribbon spool drag and guide alignment", "Inspect servo load and axis obstruction", "Home axis and verify five strings"],
                qualityChecks: ["Check ribbon alignment and solder coverage", "Segregate output since last good verification"],
                escalation: "Escalate after repeat E37, abnormal servo load or encoder feedback instability."
            },
            {
                id: "TS-EL-CRACK", machine: "EL-Tester-01", keywords: ["micro crack", "micro-crack", "el defect", "cell crack"],
                title: "EL micro-crack increase", risk: "Hidden quality loss and repeated upstream handling damage",
                productionChecks: ["Preserve barcode traceability", "Check handling and pickup sequence", "Do not mix held lots with released output"],
                maintenanceChecks: ["Inspect vacuum pickup balance", "Verify conveyor alignment and vibration", "Check camera/lighting only if image artefact is suspected"],
                qualityChecks: ["Classify crack pattern", "Correlate by stringer, hour, lot and operator", "Confirm whether the defect is real or imaging-related"],
                escalation: "Escalate to Process Engineering when contribution remains above limit for two consecutive hours."
            }
        ]
    };
})();
