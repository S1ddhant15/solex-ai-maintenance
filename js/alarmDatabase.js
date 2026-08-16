// =====================================================
// SAMA - Solex AI Maintenance Assistant
// Industrial Alarm Database
// File: alarmDatabase.js
// =====================================================
//
// IMPORTANT:
// These are SAMA prototype/internal alarm mappings.
// Replace codes/descriptions with actual ATW / SC OEM alarms
// once PLC alarm list or machine manuals are available.
//
// =====================================================



const alarmDatabase = {



    // =================================================
    // ATW STRINGER - SERVO / MOTION
    // =================================================

    "E37":{

        machine:"Stringer-01",

        manufacturer:"ATW",

        category:"Servo / Motion",

        severity:"High",

        description:
        "Servo communication or positioning error",


        symptoms:[

            "Axis does not reach commanded position",

            "Machine stops during movement",

            "Servo ready signal lost",

            "Repeated positioning fault"

        ],


        possibleCauses:[

            "Encoder feedback instability",

            "Loose servo cable",

            "Servo drive communication interruption",

            "Mechanical axis obstruction",

            "Incorrect servo parameter",

            "Servo motor overload"

        ],


        checks:[

            "Check servo drive alarm history",

            "Verify encoder connector and cable",

            "Check servo motor cable",

            "Verify PLC-to-servo communication",

            "Inspect axis for mechanical obstruction",

            "Check coupling and linear guide movement"

        ],


        action:

        "Identify servo or mechanical root cause before resetting the machine.",


        spareSuggestion:[

            "Servo Drive",

            "Servo Motor",

            "Encoder Cable",

            "Communication Cable"

        ]


    },



    "E01":{

        machine:"Stringer-01",

        manufacturer:"ATW",

        category:"Servo Overload",

        severity:"High",

        description:
        "Servo motor overload or excessive axis load",


        symptoms:[

            "Servo trips during movement",

            "Motor temperature increases",

            "Axis movement becomes heavy",

            "Repeated servo overload alarm"

        ],


        possibleCauses:[

            "Mechanical jam",

            "Excessive axis load",

            "Bearing or linear guide resistance",

            "Incorrect servo tuning",

            "Motor problem"

        ],


        checks:[

            "Check free mechanical movement",

            "Inspect guide rail and bearing",

            "Check motor temperature",

            "Review servo parameters",

            "Inspect coupling and transmission components"

        ],


        action:

        "Remove mechanical resistance and verify servo load before restarting.",


        spareSuggestion:[

            "Servo Motor",

            "Servo Drive",

            "Bearing",

            "Linear Guide Block",

            "Coupling"

        ]


    },



    // =================================================
    // ATW STRINGER - VACUUM
    // =================================================

    "V01":{

        machine:"Stringer-01",

        manufacturer:"ATW",

        category:"Vacuum",

        severity:"High",

        description:
        "Cell pickup vacuum pressure low",


        symptoms:[

            "Cell pickup unstable",

            "Cell drops during transfer",

            "Vacuum confirmation not received",

            "Machine cycle stops at pickup station"

        ],


        possibleCauses:[

            "Vacuum cup damaged",

            "Vacuum line leakage",

            "Vacuum sensor issue",

            "Vacuum generator performance low",

            "Pneumatic pressure insufficient"

        ],


        checks:[

            "Check pickup vacuum pressure",

            "Inspect vacuum cups",

            "Check hose leakage",

            "Verify vacuum sensor feedback",

            "Check supply air pressure"

        ],


        action:

        "Restore stable pickup vacuum and verify sensor feedback before production restart.",


        spareSuggestion:[

            "Vacuum Cup",

            "Vacuum Sensor",

            "Vacuum Generator",

            "Pneumatic Tube",

            "Solenoid Valve"

        ]


    },



    // =================================================
    // ATW STRINGER - CELL SENSOR
    // =================================================

    "S01":{

        machine:"Stringer-01",

        manufacturer:"ATW",

        category:"Sensor",

        severity:"Medium",

        description:
        "Cell detection sensor failure",


        symptoms:[

            "Cell presence not detected",

            "Cell loading sequence stops",

            "Intermittent sensor feedback",

            "False cell missing alarm"

        ],


        possibleCauses:[

            "Sensor contaminated",

            "Sensor alignment issue",

            "Damaged cable",

            "Loose connector",

            "PLC input issue"

        ],


        checks:[

            "Clean sensor",

            "Check sensor LED status",

            "Verify sensor alignment",

            "Inspect cable and connector",

            "Verify PLC input status"

        ],


        action:

        "Correct sensor alignment or replace faulty sensor after confirming PLC input.",


        spareSuggestion:[

            "Photoelectric Sensor",

            "Proximity Sensor",

            "Sensor Cable"

        ]


    },



    // =================================================
    // ATW STRINGER - RIBBON
    // =================================================

    "R01":{

        machine:"Stringer-01",

        manufacturer:"ATW",

        category:"Ribbon Feeding",

        severity:"Medium",

        description:
        "Ribbon feeding abnormality",


        symptoms:[

            "Ribbon not feeding",

            "Ribbon position unstable",

            "Ribbon tension fluctuating",

            "Soldering alignment issue"

        ],


        possibleCauses:[

            "Ribbon feeder jam",

            "Feeding roller worn",

            "Tension mechanism issue",

            "Sensor feedback error",

            "Ribbon spool problem"

        ],


        checks:[

            "Inspect ribbon feeder",

            "Check feeding roller",

            "Verify ribbon tension",

            "Check sensor feedback",

            "Inspect ribbon spool movement"

        ],


        action:

        "Restore stable ribbon feeding and verify alignment before restarting.",


        spareSuggestion:[

            "Ribbon Feeding Roller",

            "Ribbon Sensor",

            "Tension Component",

            "Servo / Stepper Motor"

        ]


    },



    // =================================================
    // ATW STRINGER - CAMERA / VISION
    // =================================================

    "CAM01":{

        machine:"Stringer-01",

        manufacturer:"ATW",

        category:"Vision",

        severity:"High",

        description:
        "Cell alignment camera communication or image failure",


        symptoms:[

            "Camera image unavailable",

            "Cell alignment error",

            "Machine stops before stringing",

            "Vision communication offline"

        ],


        possibleCauses:[

            "Camera power failure",

            "Communication cable loose",

            "Camera software communication issue",

            "Lens contamination",

            "Lighting instability"

        ],


        checks:[

            "Verify camera power",

            "Inspect communication cable",

            "Clean camera lens",

            "Check lighting",

            "Verify vision software status"

        ],


        action:

        "Restore camera communication and verify alignment accuracy before production.",


        spareSuggestion:[

            "Industrial Camera",

            "Camera Cable",

            "Camera Lens",

            "Lighting Controller"

        ]


    },



    // =================================================
    // SC LAMINATOR - VACUUM
    // =================================================

    "P01":{

        machine:"Laminator-01",

        manufacturer:"SC",

        category:"Vacuum",

        severity:"Critical",

        description:
        "Laminator vacuum pressure low",


        symptoms:[

            "Required vacuum not achieved",

            "Vacuum cycle takes longer than normal",

            "Lamination cycle interrupted",

            "Bubble defect risk increases"

        ],


        possibleCauses:[

            "Vacuum leakage",

            "Vacuum pump performance low",

            "Vacuum valve malfunction",

            "Seal leakage",

            "Pressure sensor issue"

        ],


        checks:[

            "Check vacuum pressure trend",

            "Inspect vacuum pump",

            "Check vacuum hose and piping",

            "Inspect chamber sealing",

            "Verify solenoid valve operation",

            "Check vacuum pressure sensor"

        ],


        action:

        "Perform vacuum system leak check and restore stable vacuum before lamination.",


        spareSuggestion:[

            "Vacuum Pump",

            "Vacuum Pump Seal Kit",

            "Vacuum Solenoid Valve",

            "Vacuum Pressure Sensor",

            "Vacuum Hose"

        ]


    },



    // =================================================
    // SC LAMINATOR - TEMPERATURE
    // =================================================

    "T01":{

        machine:"Laminator-01",

        manufacturer:"SC",

        category:"Temperature",

        severity:"Critical",

        description:
        "Heating zone temperature deviation",


        symptoms:[

            "Heating zone below setpoint",

            "Heating zone above setpoint",

            "Uneven temperature profile",

            "Lamination quality instability"

        ],


        possibleCauses:[

            "Heater failure",

            "SSR failure",

            "Thermocouple issue",

            "Loose electrical connection",

            "Temperature controller problem"

        ],


        checks:[

            "Check actual vs set temperature",

            "Measure heater current",

            "Check SSR output",

            "Verify thermocouple signal",

            "Inspect electrical terminals",

            "Review temperature controller response"

        ],


        action:

        "Verify heater, SSR and thermocouple circuit before continuing lamination.",


        spareSuggestion:[

            "Thermocouple",

            "SSR",

            "Heater",

            "Temperature Controller",

            "Contactor"

        ]


    },



    // =================================================
    // SC LAMINATOR - HEATER
    // =================================================

    "H01":{

        machine:"Laminator-01",

        manufacturer:"SC",

        category:"Heating System",

        severity:"Critical",

        description:
        "Heating element abnormality",


        symptoms:[

            "Zone heating slow",

            "Temperature cannot reach setpoint",

            "Heater current abnormal",

            "Repeated temperature deviation"

        ],


        possibleCauses:[

            "Heater open circuit",

            "SSR output failure",

            "Loose power connection",

            "Contactor failure"

        ],


        checks:[

            "Measure heater resistance",

            "Check heater current",

            "Inspect SSR output",

            "Inspect contactor",

            "Check terminal connection"

        ],


        action:

        "Confirm heater electrical integrity and switching circuit condition.",


        spareSuggestion:[

            "Heater",

            "SSR",

            "Contactor",

            "Relay"

        ]


    },



    // =================================================
    // SC LAMINATOR - THERMOCOUPLE
    // =================================================

    "TC01":{

        machine:"Laminator-01",

        manufacturer:"SC",

        category:"Temperature Sensor",

        severity:"High",

        description:
        "Thermocouple signal abnormal",


        symptoms:[

            "Temperature reading unstable",

            "Sudden temperature jump",

            "Temperature value missing",

            "Heating control unstable"

        ],


        possibleCauses:[

            "Thermocouple damaged",

            "Loose thermocouple connection",

            "Cable shielding issue",

            "Controller input fault"

        ],


        checks:[

            "Inspect thermocouple connection",

            "Check thermocouple continuity",

            "Verify sensor signal",

            "Inspect extension cable",

            "Verify controller input"

        ],


        action:

        "Repair or replace thermocouple after validating signal wiring.",


        spareSuggestion:[

            "Thermocouple",

            "Thermocouple Cable",

            "Temperature Controller"

        ]


    },



    // =================================================
    // SC LAMINATOR - PNEUMATIC
    // =================================================

    "AIR01":{

        machine:"Laminator-01",

        manufacturer:"SC",

        category:"Pneumatic",

        severity:"High",

        description:
        "Pneumatic pressure low",


        symptoms:[

            "Cylinder movement incomplete",

            "Valve operation unstable",

            "Cycle interrupted",

            "Pressure alarm active"

        ],


        possibleCauses:[

            "Plant air pressure low",

            "FRL issue",

            "Air leakage",

            "Regulator setting incorrect",

            "Solenoid valve problem"

        ],


        checks:[

            "Check main air pressure",

            "Inspect FRL unit",

            "Check regulator setting",

            "Inspect leakage",

            "Verify solenoid valve operation"

        ],


        action:

        "Restore stable pneumatic pressure before operating the machine.",


        spareSuggestion:[

            "Solenoid Valve",

            "FRL Unit",

            "Pressure Sensor",

            "Pneumatic Tube",

            "Pneumatic Cylinder"

        ]


    },



    // =================================================
    // GENERAL PLC COMMUNICATION
    // =================================================

    "C01":{

        machine:"General",

        manufacturer:"General",

        category:"Communication",

        severity:"High",

        description:
        "PLC or industrial communication failure",


        symptoms:[

            "Machine communication offline",

            "IO module not responding",

            "HMI value frozen",

            "Servo / device communication lost"

        ],


        possibleCauses:[

            "Network cable issue",

            "EtherCAT / Ethernet communication interruption",

            "Module power failure",

            "Switch / connector issue",

            "PLC communication configuration issue"

        ],


        checks:[

            "Check communication LEDs",

            "Inspect Ethernet / fieldbus cables",

            "Check module power",

            "Verify network switch",

            "Review PLC communication diagnostics"

        ],


        action:

        "Restore communication after confirming network and module health.",


        spareSuggestion:[

            "Communication Cable",

            "Ethernet Switch",

            "IO Module",

            "PLC Communication Module"

        ]


    }

};



// =====================================================
// GET ALARM DETAILS
// =====================================================

function getAlarmDetails(alarmCode){


    if(!alarmCode){

        return null;

    }


    const code =
        String(alarmCode)
        .toUpperCase()
        .trim();


    return (
        alarmDatabase[code]
        ||
        null
    );

}



// =====================================================
// SEARCH ALARMS
// =====================================================

function searchAlarm(keyword){


    const search =
        String(keyword || "")
        .toLowerCase()
        .trim();


    const results = [];


    for(
        const code in alarmDatabase
    ){


        const alarm =
            alarmDatabase[code];


        const text =
            [

                code,

                alarm.machine,

                alarm.manufacturer,

                alarm.category,

                alarm.description,

                ...(alarm.symptoms || []),

                ...(alarm.possibleCauses || []),

                ...(alarm.checks || [])

            ]
            .join(" ")
            .toLowerCase();



        if(
            text.includes(search)
        ){


            results.push({

                code:code,

                machine:
                    alarm.machine,

                manufacturer:
                    alarm.manufacturer,

                category:
                    alarm.category,

                severity:
                    alarm.severity,

                description:
                    alarm.description

            });

        }

    }


    return results;

}



// =====================================================
// FORMAT LIST
// =====================================================

function formatAlarmList(
    list,
    icon="•"
){


    if(
        !Array.isArray(list)
        ||
        list.length === 0
    ){

        return "-";

    }


    return list
        .map(
            item =>
            `${icon} ${item}`
        )
        .join("<br>");

}



// =====================================================
// COMPATIBILITY FIELDS
// aiEngine.js currently expects data.cause and data.action
// =====================================================

for(
    const code
    in alarmDatabase
){


    const alarm =
        alarmDatabase[code];


    if(
        !alarm.cause
    ){


        alarm.cause =

        formatAlarmList(
            alarm.possibleCauses,
            "•"
        );

    }


    if(
        Array.isArray(
            alarm.action
        )
    ){


        alarm.action =

        formatAlarmList(
            alarm.action,
            "✓"
        );

    }


    // Add checks to action display

    if(
        Array.isArray(
            alarm.checks
        )
    ){


        alarm.action =

        formatAlarmList(
            alarm.checks,
            "✓"
        )

        +

        "<br><br>"

        +

        "<b>Corrective Guidance:</b>"

        +

        "<br>"

        +

        alarm.action;

    }

}



// =====================================================
// GET ALARMS BY MACHINE
// =====================================================

function getAlarmsByMachine(
    machineName
){


    const search =
        String(machineName || "")
        .toLowerCase();


    const results = [];


    for(
        const code
        in alarmDatabase
    ){


        const alarm =
            alarmDatabase[code];


        if(
            String(
                alarm.machine
            )
            .toLowerCase()
            .includes(search)
        ){


            results.push({

                code:code,

                ...alarm

            });

        }

    }


    return results;

}



// =====================================================
// GET CRITICAL ALARMS
// =====================================================

function getCriticalAlarms(){


    const results = [];


    for(
        const code
        in alarmDatabase
    ){


        const alarm =
            alarmDatabase[code];


        if(
            alarm.severity ===
            "Critical"
        ){


            results.push({

                code:code,

                ...alarm

            });

        }

    }


    return results;

}



// =====================================================
// READY
// =====================================================

console.log(
    "✅ SAMA Alarm Database Loaded"
);


console.log(
    "Alarm Count:",
    Object.keys(
        alarmDatabase
    ).length
);
