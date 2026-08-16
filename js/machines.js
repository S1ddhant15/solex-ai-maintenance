// =====================================================
// SAMA - Solex AI Maintenance Assistant
// Machine Master & Health Database
// File: machines.js
// =====================================================
//
// NOTE:
// Current parameter values are SIMULATED prototype data.
// Later these can come from PLC / MES / MySQL.
//
// =====================================================


const machineDatabase = {


    // =================================================
    // ATW STRINGER 01
    // =================================================

    "Stringer-01":{

        id:"STR-01",

        name:"Stringer-01",

        machineType:"Stringer",

        manufacturer:"ATW",

        process:"Cell Stringing",

        line:"Line-1",

        criticality:"Critical",

        status:"Running",

        healthScore:92,

        lastPM:"2026-08-10",

        nextPM:"2026-08-17",


        parameters:{

            pneumaticPressure:{
                value:0.62,
                unit:"MPa",
                min:0.50,
                max:0.70
            },

            vacuumPressure:{
                value:-72,
                unit:"kPa",
                min:-90,
                max:-60
            },

            solderingTemperature:{
                value:345,
                unit:"°C",
                min:330,
                max:360
            },

            cycleTime:{
                value:3.8,
                unit:"sec",
                min:3.0,
                max:5.0
            },

            cellBreakage:{
                value:0.42,
                unit:"%",
                min:0,
                max:0.80
            }

        }

    },



    // =================================================
    // ATW STRINGER 02
    // =================================================

    "Stringer-02":{

        id:"STR-02",

        name:"Stringer-02",

        machineType:"Stringer",

        manufacturer:"ATW",

        process:"Cell Stringing",

        line:"Line-1",

        criticality:"Critical",

        status:"Running",

        healthScore:88,

        lastPM:"2026-08-09",

        nextPM:"2026-08-16",


        parameters:{

            pneumaticPressure:{
                value:0.59,
                unit:"MPa",
                min:0.50,
                max:0.70
            },

            vacuumPressure:{
                value:-64,
                unit:"kPa",
                min:-90,
                max:-60
            },

            solderingTemperature:{
                value:351,
                unit:"°C",
                min:330,
                max:360
            },

            cycleTime:{
                value:4.1,
                unit:"sec",
                min:3.0,
                max:5.0
            },

            cellBreakage:{
                value:0.68,
                unit:"%",
                min:0,
                max:0.80
            }

        }

    },



    // =================================================
    // SC LAMINATOR 01
    // =================================================

    "Laminator-01":{

        id:"LAM-01",

        name:"Laminator-01",

        machineType:"Laminator",

        manufacturer:"SC",

        process:"Module Lamination",

        line:"Line-1",

        criticality:"Critical",

        status:"Running",

        healthScore:94,

        lastPM:"2026-08-08",

        nextPM:"2026-08-18",


        parameters:{

            temperatureZone1:{
                value:148,
                unit:"°C",
                min:140,
                max:155
            },

            temperatureZone2:{
                value:150,
                unit:"°C",
                min:140,
                max:155
            },

            temperatureZone3:{
                value:149,
                unit:"°C",
                min:140,
                max:155
            },

            vacuumPressure:{
                value:-96,
                unit:"kPa",
                min:-100,
                max:-90
            },

            pneumaticPressure:{
                value:0.61,
                unit:"MPa",
                min:0.50,
                max:0.70
            },

            cycleTime:{
                value:930,
                unit:"sec",
                min:850,
                max:1000
            }

        }

    },



    // =================================================
    // EL TESTER 01
    // =================================================

    "EL-Tester-01":{

        id:"EL-01",

        name:"EL-Tester-01",

        machineType:"EL Tester",

        manufacturer:"To Be Updated",

        process:"EL Inspection",

        line:"Line-1",

        criticality:"High",

        status:"Running",

        healthScore:96,

        lastPM:"2026-08-11",

        nextPM:"2026-08-18",


        parameters:{

            cameraStatus:{
                value:"OK",
                unit:"",
                type:"status"
            },

            communication:{
                value:"Online",
                unit:"",
                type:"status"
            },

            imageQuality:{
                value:97,
                unit:"%",
                min:90,
                max:100
            },

            falseRejectRate:{
                value:0.35,
                unit:"%",
                min:0,
                max:1
            }

        }

    },



    // =================================================
    // AOI 01
    // =================================================

    "AOI-01":{

        id:"AOI-01",

        name:"AOI-01",

        machineType:"AOI",

        manufacturer:"To Be Updated",

        process:"Automatic Optical Inspection",

        line:"Line-1",

        criticality:"High",

        status:"Running",

        healthScore:91,

        lastPM:"2026-08-09",

        nextPM:"2026-08-16",


        parameters:{

            cameraStatus:{
                value:"OK",
                unit:"",
                type:"status"
            },

            lightingStatus:{
                value:"OK",
                unit:"",
                type:"status"
            },

            communication:{
                value:"Online",
                unit:"",
                type:"status"
            },

            falseRejectRate:{
                value:0.72,
                unit:"%",
                min:0,
                max:1
            }

        }

    }

};



// =====================================================
// GET MACHINE
// =====================================================

function getMachine(machineName){


    if(!machineName){

        return null;

    }


    const search =
        String(machineName)
        .toLowerCase()
        .trim();


    // Direct ID/name match

    for(
        const key in machineDatabase
    ){

        if(
            key.toLowerCase() ===
            search
        ){

            return machineDatabase[key];

        }

    }


    // Machine type search

    for(
        const key in machineDatabase
    ){

        const machine =
            machineDatabase[key];


        if(
            search.includes(
                machine.machineType
                .toLowerCase()
            )
        ){

            return machine;

        }

    }


    // Manufacturer search

    for(
        const key in machineDatabase
    ){

        const machine =
            machineDatabase[key];


        if(
            search.includes(
                machine.manufacturer
                .toLowerCase()
            )
        ){

            return machine;

        }

    }


    return null;

}



// =====================================================
// PARAMETER STATUS
// =====================================================

function getParameterStatus(parameter){


    if(!parameter){

        return {

            status:"Unknown",
            icon:"⚪"

        };

    }


    // Status-type parameter

    if(
        parameter.type ===
        "status"
    ){

        const value =
            String(
                parameter.value
            )
            .toLowerCase();


        if(
            value === "ok" ||
            value === "online" ||
            value === "running"
        ){

            return {

                status:"Normal",
                icon:"🟢"

            };

        }


        return {

            status:"Abnormal",
            icon:"🔴"

        };

    }



    // Numeric parameter

    const value =
        Number(
            parameter.value
        );


    if(
        Number.isNaN(value)
    ){

        return {

            status:"Unknown",
            icon:"⚪"

        };

    }


    if(
        parameter.min !== undefined
        &&
        value < parameter.min
    ){

        return {

            status:"Low",
            icon:"🔴"

        };

    }


    if(
        parameter.max !== undefined
        &&
        value > parameter.max
    ){

        return {

            status:"High",
            icon:"🔴"

        };

    }



    // Warning band near limits

    if(
        parameter.min !== undefined
        &&
        parameter.max !== undefined
    ){

        const range =
            parameter.max -
            parameter.min;


        const warningBand =
            Math.abs(range) *
            0.10;


        if(
            value <=
            parameter.min +
            warningBand
        ){

            return {

                status:"Near Lower Limit",
                icon:"🟡"

            };

        }


        if(
            value >=
            parameter.max -
            warningBand
        ){

            return {

                status:"Near Upper Limit",
                icon:"🟡"

            };

        }

    }


    return {

        status:"Normal",
        icon:"🟢"

    };

}



// =====================================================
// FORMAT PARAMETER NAME
// =====================================================

function formatParameterName(name){


    return String(name)

        .replace(
            /([A-Z])/g,
            " $1"
        )

        .replace(
            /^./,
            char =>
                char.toUpperCase()
        );

}



// =====================================================
// GET ABNORMAL PARAMETERS
// =====================================================

function getAbnormalParameters(
    machineName
){


    const machine =
        getMachine(
            machineName
        );


    if(!machine){

        return [];

    }


    const results = [];


    for(
        const key
        in machine.parameters
    ){

        const parameter =
            machine.parameters[key];


        const condition =
            getParameterStatus(
                parameter
            );


        if(
            condition.status !==
            "Normal"
        ){

            results.push({

                parameter:key,

                name:
                    formatParameterName(
                        key
                    ),

                value:
                    parameter.value,

                unit:
                    parameter.unit,

                status:
                    condition.status,

                icon:
                    condition.icon

            });

        }

    }


    return results;

}



// =====================================================
// HEALTH STATUS
// =====================================================

function getHealthStatus(score){


    const value =
        Number(score);


    if(value >= 90){

        return {

            status:"Healthy",

            icon:"🟢"

        };

    }


    if(value >= 75){

        return {

            status:"Attention",

            icon:"🟡"

        };

    }


    if(value >= 60){

        return {

            status:"Warning",

            icon:"🟠"

        };

    }


    return {

        status:"Critical",

        icon:"🔴"

    };

}



// =====================================================
// MACHINE HEALTH REPORT
// =====================================================

function generateMachineReport(
    machineName
){


    const machine =
        getMachine(
            machineName
        );


    if(!machine){

        return `

        <b>⚠ Machine Not Found</b>

        <br><br>

        Machine data is not available.

        `;

    }


    const health =
        getHealthStatus(
            machine.healthScore
        );


    let parameterHTML = "";


    for(
        const key
        in machine.parameters
    ){

        const parameter =
            machine.parameters[key];


        const condition =
            getParameterStatus(
                parameter
            );


        parameterHTML += `

        ${condition.icon}

        <b>
        ${formatParameterName(key)}:
        </b>

        ${parameter.value}
        ${parameter.unit || ""}

        <br>

        `;

    }



    // =================================================
    // BREAKDOWN DATA
    // =================================================

    let breakdownCount = "-";

    let downtime = "-";

    let mttr = "-";


    if(
        typeof getBreakdownCount ===
        "function"
    ){

        breakdownCount =
            getBreakdownCount(
                machine.name
            );

    }


    if(
        typeof getTotalDowntime ===
        "function"
    ){

        downtime =
            getTotalDowntime(
                machine.name
            );

    }


    if(
        typeof calculateBreakdownMTTR ===
        "function"
    ){

        mttr =
            calculateBreakdownMTTR(
                machine.name
            );

    }



    // =================================================
    // ABNORMAL PARAMETERS
    // =================================================

    const abnormal =
        getAbnormalParameters(
            machine.name
        );


    let recommendation;


    if(
        abnormal.length === 0
    ){

        recommendation =

        "No abnormal parameter detected in the current prototype dataset. Continue routine monitoring and preventive maintenance.";

    }
    else{

        const names =
            abnormal
            .map(
                item =>
                    item.name
            )
            .join(", ");


        recommendation =

        `Attention required for: ${names}. Verify the parameter trend and equipment condition before it develops into a breakdown.`;

    }



    return `

    <b>📊 Machine Health Report</b>

    <br><br>

    <b>Machine:</b>
    ${machine.name}

    <br>

    <b>Make:</b>
    ${machine.manufacturer}

    <br>

    <b>Process:</b>
    ${machine.process}

    <br>

    <b>Line:</b>
    ${machine.line}

    <br>

    <b>Status:</b>
    ${machine.status}

    <br>

    <b>Criticality:</b>
    ${machine.criticality}


    <br><br>


    <b>❤️ Health Score:</b>

    ${health.icon}

    ${machine.healthScore}%

    —

    ${health.status}


    <br><br>


    <b>📡 Machine Parameters</b>

    <br><br>

    ${parameterHTML}


    <br>


    <b>🛠 Maintenance</b>

    <br>

    Last PM:
    ${machine.lastPM}

    <br>

    Next PM:
    ${machine.nextPM}


    <br><br>


    <b>📉 Breakdown Performance</b>

    <br>

    Breakdown Count:
    ${breakdownCount}

    <br>

    Total Downtime:
    ${downtime}
    ${
        downtime !== "-"
        ?
        " min"
        :
        ""
    }

    <br>

    MTTR:
    ${mttr}
    ${
        mttr !== "-"
        ?
        " min"
        :
        ""
    }


    <br><br>


    <b>🤖 SAMA Recommendation:</b>

    <br>

    ${recommendation}


    <br><br>

    <small>
    ⚠ Current machine parameters are prototype/simulated values.
    </small>

    `;

}



// =====================================================
// GET MACHINE LIST
// =====================================================

function getMachineList(){


    return Object.values(
        machineDatabase
    )
    .map(
        machine => ({

            id:
                machine.id,

            name:
                machine.name,

            type:
                machine.machineType,

            manufacturer:
                machine.manufacturer,

            process:
                machine.process,

            line:
                machine.line,

            status:
                machine.status,

            healthScore:
                machine.healthScore

        })
    );

}



// =====================================================
// GET MACHINES BY TYPE
// =====================================================

function getMachinesByType(type){


    const search =
        String(type || "")
        .toLowerCase();


    return Object.values(
        machineDatabase
    )
    .filter(
        machine =>

            machine.machineType
            .toLowerCase()
            .includes(search)

    );

}



// =====================================================
// GET CRITICAL MACHINES
// =====================================================

function getCriticalMachines(){


    return Object.values(
        machineDatabase
    )
    .filter(
        machine =>

            machine.criticality ===
            "Critical"

    );

}



// =====================================================
// PLANT HEALTH SUMMARY
// =====================================================

function getPlantHealthSummary(){


    const machines =
        Object.values(
            machineDatabase
        );


    if(
        machines.length === 0
    ){

        return null;

    }


    const totalHealth =
        machines.reduce(
            (total,machine) =>

                total +
                Number(
                    machine.healthScore || 0
                ),

            0
        );


    const averageHealth =
        Number(
            (
                totalHealth /
                machines.length
            )
            .toFixed(1)
        );


    const running =
        machines.filter(
            machine =>
                machine.status ===
                "Running"
        ).length;


    const attention =
        machines.filter(
            machine =>
                machine.healthScore < 90
        ).length;


    return {

        totalMachines:
            machines.length,

        runningMachines:
            running,

        averageHealth:
            averageHealth,

        machinesRequiringAttention:
            attention

    };

}



// =====================================================
// UPDATE PARAMETER
// Future PLC / MES integration hook
// =====================================================

function updateMachineParameter(
    machineName,
    parameterName,
    newValue
){


    const machine =
        getMachine(
            machineName
        );


    if(!machine){

        return false;

    }


    if(
        !machine.parameters[
            parameterName
        ]
    ){

        return false;

    }


    machine.parameters[
        parameterName
    ].value =
        newValue;


    return true;

}



// =====================================================
// READY
// =====================================================

console.log(
    "✅ SAMA Machine Database Loaded"
);


console.log(
    "Machines:",
    getMachineList()
);
