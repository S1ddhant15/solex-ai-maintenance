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
        ]
    };
})();
