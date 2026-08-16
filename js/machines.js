// ============================================================
// SAMA - SOLEX AI MAINTENANCE ASSISTANT
// SOLEX MACHINE MASTER DATABASE
// File: machines.js
// ============================================================
//
// NOTE:
// Current parameter values are prototype/demo values.
// Later these can be replaced by live PLC / MES / database values.
//
// ============================================================



const machineDatabase = {



    // ========================================================
    // STRINGER - 01
    // MAKE: ATW
    // ========================================================

    "Stringer-01": {

        id: "STR-L1-01",

        assetCode: "SAMA-STR-001",

        name: "Stringer-01",

        shortName: "Stringer 01",

        type: "Automatic Stringer",

        process: "Cell Stringing",

        department: "Production",

        line: "Line-1",

        manufacturer: "ATW",

        location: "Stringing Section",

        status: "Running",

        health: 96,

        criticality: "High",


        parameters: {

            solderingTemperature: "365°C",

            vacuumPressure: "-82 kPa",

            airPressure: "5.8 Bar",

            productionSpeed: "18 CPM",

            cellPickupVacuum: "Normal",

            ribbonTension: "Normal",

            alignmentCamera: "Healthy",

            servoStatus: "Healthy",

            plcCommunication: "Online",

            vibration: "Normal"

        },


        parameterLimits: {

            vacuumPressure: {
                normal: "-75 to -90 kPa",
                warning: "Below -70 kPa"
            },

            airPressure: {
                normal: "5.5 - 6.5 Bar",
                warning: "Below 5.0 Bar"
            },

            solderingTemperature: {
                normal: "Process recipe dependent",
                warning: "Deviation from approved recipe"
            }

        },


        runtime: 12450,


        lastMaintenance: "28-Jul-2026",

        nextPM: "28-Aug-2026",


        maintenanceStatus: "On Schedule",


        criticalMonitoringPoints: [

            "Cell pickup vacuum",

            "Ribbon tension",

            "Soldering temperature",

            "Cell alignment",

            "Servo axis condition",

            "Camera alignment",

            "Air pressure",

            "Cell breakage trend"

        ],


        criticalSpares: [

            "Servo Drive",

            "Servo Motor",

            "Encoder Cable",

            "Vacuum Sensor",

            "Proximity Sensor",

            "Solenoid Valve",

            "Vacuum Cup",

            "Ribbon Feeding Components",

            "Camera / Vision Components"

        ],


        activeAlarms: [],


        breakdownHistory: [

            {

                date: "25-Jul-2026",

                alarm: "E37",

                category: "Servo",

                issue: "Servo communication / positioning error",

                symptom: "Machine stopped during stringing cycle",

                downtimeMinutes: 35,

                rootCause: "Encoder feedback / communication instability",

                correctiveAction:
                    "Encoder connection and servo communication inspected before restart",

                status: "Resolved"

            },


            {

                date: "15-Jul-2026",

                alarm: "S01",

                category: "Sensor / Vacuum",

                issue: "Cell pickup vacuum low",

                symptom: "Cell pickup unstable",

                downtimeMinutes: 20,

                rootCause: "Vacuum path / pickup condition required inspection",

                correctiveAction:
                    "Vacuum line, pickup cup and sensor feedback inspected",

                status: "Resolved"

            }

        ]

    },





    // ========================================================
    // STRINGER - 02
    // MAKE: ATW
    // ========================================================

    "Stringer-02": {

        id: "STR-L1-02",

        assetCode: "SAMA-STR-002",

        name: "Stringer-02",

        shortName: "Stringer 02",

        type: "Automatic Stringer",

        process: "Cell Stringing",

        department: "Production",

        line: "Line-1",

        manufacturer: "ATW",

        location: "Stringing Section",

        status: "Running",

        health: 94,

        criticality: "High",


        parameters: {

            solderingTemperature: "363°C",

            vacuumPressure: "-80 kPa",

            airPressure: "5.9 Bar",

            productionSpeed: "18 CPM",

            cellPickupVacuum: "Normal",

            ribbonTension: "Normal",

            alignmentCamera: "Healthy",

            servoStatus: "Healthy",

            plcCommunication: "Online",

            vibration: "Normal"

        },


        runtime: 11890,


        lastMaintenance: "02-Aug-2026",

        nextPM: "02-Sep-2026",


        maintenanceStatus: "On Schedule",


        criticalMonitoringPoints: [

            "Cell pickup vacuum",

            "Ribbon tension",

            "Cell alignment",

            "Soldering temperature",

            "Servo condition"

        ],


        activeAlarms: [],


        breakdownHistory: []

    },





    // ========================================================
    // LAMINATOR - 01
    // MAKE: SC
    // ========================================================

    "Laminator-01": {

        id: "LAM-L1-01",

        assetCode: "SAMA-LAM-001",

        name: "Laminator-01",

        shortName: "Laminator 01",

        type: "Solar Module Laminator",

        process: "Module Lamination",

        department: "Production",

        line: "Line-1",

        manufacturer: "SC",

        location: "Lamination Section",

        status: "Running",

        health: 91,

        criticality: "Critical",


        parameters: {

            temperature: "145°C",

            vacuumPressure: "-95 kPa",

            airPressure: "8 Bar",

            cycleTime: "12 min",

            heatingSystem: "Normal",

            vacuumPump: "Healthy",

            thermocoupleStatus: "Healthy",

            pressureSystem: "Normal",

            plcCommunication: "Online",

            vibration: "Normal"

        },


        parameterLimits: {

            temperature: {
                normal: "As per approved lamination recipe",
                warning: "Recipe deviation"
            },

            vacuumPressure: {
                normal: "-90 to -100 kPa",
                warning: "Vacuum deterioration"
            },

            airPressure: {
                normal: "7 - 8 Bar",
                warning: "Below process requirement"
            }

        },


        runtime: 18500,


        lastMaintenance: "20-Jul-2026",

        nextPM: "20-Aug-2026",


        maintenanceStatus: "PM Due Soon",


        criticalMonitoringPoints: [

            "Vacuum pressure",

            "Heating plate temperature",

            "Temperature uniformity",

            "Vacuum pump performance",

            "Thermocouple feedback",

            "SSR output",

            "Air pressure",

            "Lamination cycle time",

            "Membrane condition"

        ],


        criticalSpares: [

            "Thermocouple",

            "SSR",

            "Heater",

            "Vacuum Pump",

            "Vacuum Pump Seal Kit",

            "Solenoid Valve",

            "Pressure Sensor",

            "Temperature Controller",

            "Contactor",

            "Relay"

        ],


        activeAlarms: [],


        breakdownHistory: [

            {

                date: "30-Jul-2026",

                alarm: "T01",

                category: "Temperature",

                issue: "Temperature deviation",

                symptom:
                    "Heating zone temperature deviated from process requirement",

                downtimeMinutes: 45,

                rootCause:
                    "Heating control circuit / SSR required inspection",

                correctiveAction:
                    "SSR output, heater current and temperature feedback checked",

                status: "Resolved"

            },


            {

                date: "12-Jul-2026",

                alarm: "P01",

                category: "Vacuum",

                issue: "Vacuum pressure low",

                symptom:
                    "Required vacuum level not achieved",

                downtimeMinutes: 30,

                rootCause:
                    "Vacuum system leakage / pump performance required inspection",

                correctiveAction:
                    "Vacuum circuit and pump condition inspected",

                status: "Resolved"

            }

        ]

    },





    // ========================================================
    // EL TESTER - 01
    // ========================================================

    "EL-Tester-01": {

        id: "EL-L1-01",

        assetCode: "SAMA-EL-001",

        name: "EL-Tester-01",

        shortName: "EL Tester 01",

        type: "Electroluminescence Inspection System",

        process: "EL Inspection",

        department: "Quality",

        line: "Line-1",

        manufacturer: "To Be Updated",

        location: "Inspection Section",

        status: "Running",

        health: 94,

        criticality: "High",


        parameters: {

            cameraStatus: "Healthy",

            imageQuality: "Good",

            communication: "Online",

            inspectionSystem: "Normal",

            illumination: "Stable"

        },


        runtime: 8600,


        lastMaintenance: "22-Jul-2026",

        nextPM: "22-Aug-2026",


        maintenanceStatus: "On Schedule",


        criticalMonitoringPoints: [

            "Camera health",

            "Image quality",

            "Electrical contact",

            "Communication",

            "Calibration"

        ],


        criticalSpares: [

            "Industrial Camera",

            "Communication Cable",

            "Power Supply",

            "Contact Components",

            "Inspection PC Components"

        ],


        activeAlarms: [],


        breakdownHistory: [

            {

                date: "22-Jul-2026",

                alarm: "CAM01",

                category: "Vision",

                issue: "Image quality issue",

                symptom:
                    "EL image quality unstable",

                downtimeMinutes: 25,

                rootCause:
                    "Camera / illumination condition required correction",

                correctiveAction:
                    "Camera and inspection system calibrated",

                status: "Resolved"

            }

        ]

    },





    // ========================================================
    // AOI - 01
    // ========================================================

    "AOI-01": {

        id: "AOI-L1-01",

        assetCode: "SAMA-AOI-001",

        name: "AOI-01",

        shortName: "AOI 01",

        type: "Automatic Optical Inspection",

        process: "Visual Quality Inspection",

        department: "Quality",

        line: "Line-1",

        manufacturer: "To Be Updated",

        location: "Inspection Section",

        status: "Running",

        health: 89,

        criticality: "Medium",


        parameters: {

            cameraStatus: "Healthy",

            inspectionRate: "98.5%",

            falseReject: "1.2%",

            lightingStatus: "Stable",

            communication: "Online"

        },


        runtime: 9200,


        lastMaintenance: "18-Jul-2026",

        nextPM: "18-Aug-2026",


        maintenanceStatus: "PM Due Soon",


        criticalMonitoringPoints: [

            "Camera focus",

            "Lighting intensity",

            "Inspection threshold",

            "False rejection trend",

            "Calibration"

        ],


        criticalSpares: [

            "Industrial Camera",

            "Camera Lens",

            "Lighting Controller",

            "Communication Cable",

            "Power Supply"

        ],


        activeAlarms: [],


        breakdownHistory: [

            {

                date: "18-Jul-2026",

                alarm: "AOI01",

                category: "Inspection",

                issue: "High false rejection",

                symptom:
                    "AOI false NG increased",

                downtimeMinutes: 40,

                rootCause:
                    "Inspection threshold / calibration required optimization",

                correctiveAction:
                    "Inspection parameters reviewed and optimized",

                status: "Resolved"

            }

        ]

    }

};





// ============================================================
// NORMALIZE MACHINE SEARCH TEXT
// ============================================================

function normalizeMachineText(value) {

    return String(value || "")
        .toLowerCase()
        .trim()
        .replace(/_/g, "-")
        .replace(/\s+/g, " ");

}





// ============================================================
// GET MACHINE DETAILS
// ============================================================

function getMachineDetails(machineName) {


    const search =
        normalizeMachineText(machineName);



    if(!search) {

        return null;

    }



    // Exact search

    for(const key in machineDatabase) {


        if(
            normalizeMachineText(key) === search
        ) {

            return machineDatabase[key];

        }

    }



    // Flexible search

    for(const key in machineDatabase) {


        const machine =
            machineDatabase[key];


        const combined =
            [

                key,

                machine.name,

                machine.shortName,

                machine.type,

                machine.id,

                machine.assetCode,

                machine.manufacturer

            ]
            .join(" ")
            .toLowerCase();



        if(
            combined.includes(search)
        ) {

            return machine;

        }

    }



    // Generic Stringer

    if(
        search === "stringer"
    ) {

        return machineDatabase["Stringer-01"];

    }



    // Generic Laminator

    if(
        search === "laminator"
    ) {

        return machineDatabase["Laminator-01"];

    }



    // Generic EL

    if(
        search === "el" ||
        search === "el tester"
    ) {

        return machineDatabase["EL-Tester-01"];

    }



    // Generic AOI

    if(
        search === "aoi"
    ) {

        return machineDatabase["AOI-01"];

    }



    return null;

}





// ============================================================
// GET ALL MACHINES
// ============================================================

function getAllMachines() {

    return Object.keys(machineDatabase);

}





// ============================================================
// MACHINE HEALTH
// ============================================================

function getMachineHealth(machineName) {


    const machine =
        getMachineDetails(machineName);



    if(!machine) {

        return null;

    }



    let healthStatus;



    if(machine.health >= 90) {

        healthStatus =
            "Healthy";

    }

    else if(machine.health >= 75) {

        healthStatus =
            "Attention Required";

    }

    else {

        healthStatus =
            "Critical";

    }



    return {

        machine:
            machine.name,

        score:
            machine.health,

        status:
            healthStatus,

        runningStatus:
            machine.status,

        maintenanceStatus:
            machine.maintenanceStatus

    };

}





// ============================================================
// FORMAT PARAMETERS
// ============================================================

function formatMachineParameters(parameters) {


    if(!parameters) {

        return "No parameter data available.";

    }



    let html = "";



    Object.entries(parameters)
        .forEach(([key,value]) => {


            const label =
                key
                .replace(/([A-Z])/g," $1")
                .replace(/^./,char =>
                    char.toUpperCase()
                );


            html +=
            `

            <div class="machine-parameter">

                <span>
                    ${label}
                </span>

                <strong>
                    ${value}
                </strong>

            </div>

            `;

        });



    return html;

}





// ============================================================
// GENERATE MACHINE HEALTH REPORT
// ============================================================

function generateMachineReport(machineName) {


    const machine =
        getMachineDetails(machineName);



    if(!machine) {


        return `

        <b>⚠ Machine Not Found</b>

        <br><br>

        SAMA could not find:

        <b>${machineName}</b>

        <br><br>

        Available machines:

        <br>

        ${getAllMachines().join("<br>")}

        `;

    }



    let healthStatus =
        "Healthy 🟢";


    if(machine.health < 90) {

        healthStatus =
            "Attention Required 🟡";

    }


    if(machine.health < 75) {

        healthStatus =
            "Critical 🔴";

    }



    return `


    <b>📊 Machine Health Report</b>


    <br><br>


    <b>Machine:</b>

    ${machine.name}


    <br>


    <b>Asset ID:</b>

    ${machine.id}


    <br>


    <b>Line:</b>

    ${machine.line}


    <br>


    <b>Process:</b>

    ${machine.process}


    <br>


    <b>Make:</b>

    ${machine.manufacturer}


    <br>


    <b>Status:</b>

    ${machine.status}


    <br>


    <b>Health Score:</b>

    ${machine.health}%


    <br>


    <b>Condition:</b>

    ${healthStatus}


    <br>


    <b>Runtime:</b>

    ${machine.runtime} Hours


    <br><br>


    <b>⚙ Machine Parameters</b>


    <br><br>


    ${formatMachineParameters(
        machine.parameters
    )}


    <br>


    <b>🛠 Last Maintenance:</b>

    ${machine.lastMaintenance}


    <br>


    <b>📅 Next PM:</b>

    ${machine.nextPM}


    <br>


    <b>Maintenance Status:</b>

    ${machine.maintenanceStatus}


    `;

}





// ============================================================
// BREAKDOWN HISTORY
// ============================================================

function getBreakdownHistory(machineName) {


    const machine =
        getMachineDetails(machineName);



    if(
        !machine ||
        !machine.breakdownHistory
    ) {

        return [];

    }



    return machine.breakdownHistory;

}





// ============================================================
// UPDATE MACHINE STATUS
// ============================================================

function updateMachineStatus(
    machineName,
    newStatus
) {


    const machine =
        getMachineDetails(machineName);



    if(!machine) {

        return false;

    }



    machine.status =
        newStatus;



    return true;

}





// ============================================================
// UPDATE MACHINE PARAMETER
// FUTURE PLC / MES USE
// ============================================================

function updateMachineParameter(
    machineName,
    parameter,
    value
) {


    const machine =
        getMachineDetails(machineName);



    if(!machine) {

        return false;

    }



    if(!machine.parameters) {

        machine.parameters = {};

    }



    machine.parameters[parameter] =
        value;



    return true;

}





// ============================================================
// GET MACHINES BY LINE
// ============================================================

function getMachinesByLine(line) {


    return Object.values(machineDatabase)
        .filter(machine =>

            machine.line
                .toLowerCase() ===
            line.toLowerCase()

        );

}





// ============================================================
// GET MACHINES BY MANUFACTURER
// ============================================================

function getMachinesByManufacturer(
    manufacturer
) {


    return Object.values(machineDatabase)
        .filter(machine =>

            machine.manufacturer
                .toLowerCase() ===
            manufacturer.toLowerCase()

        );

}





// ============================================================
// SAMA MACHINE DATABASE READY
// ============================================================

console.log(
    "✅ SAMA Solex Machine Database Loaded"
);

console.log(
    "Machines:",
    getAllMachines()
);
