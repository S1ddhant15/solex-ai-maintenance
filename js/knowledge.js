// =====================================================
// SAMA - Solex AI Maintenance Assistant
// Industrial Troubleshooting Knowledge Base
// File: knowledge.js
// =====================================================



const maintenanceKnowledge = {



    // =================================================
    // ATW STRINGER
    // =================================================

    "stringer":{


        machine:"Stringer",

        manufacturer:"ATW",

        process:"Cell Stringing",


        issues:{



            // ==========================================
            // CELL BREAKAGE
            // ==========================================

            "cell breakage":{


                symptom:
                "High cell breakage during stringing process",


                possibleCause:[

                    "Excessive pickup vacuum",

                    "Incorrect cell pickup position",

                    "Cell alignment error",

                    "Vacuum cup hardness / wear",

                    "Sudden servo acceleration",

                    "Mechanical vibration",

                    "Cell support / conveyor issue",

                    "Incoming cell microcrack or weak cell"

                ],


                checks:[

                    "Check cell pickup vacuum pressure",

                    "Inspect vacuum cups",

                    "Verify pickup height and position",

                    "Check camera alignment",

                    "Review servo acceleration / movement",

                    "Inspect conveyor support",

                    "Check mechanical vibration",

                    "Review cell breakage trend by lot / supplier"

                ],


                action:

                "Stabilize cell handling, verify pickup alignment and vacuum condition, then confirm whether breakage is process-related or incoming-material-related.",


                rcaFocus:[

                    "Vacuum",

                    "Handling",

                    "Servo movement",

                    "Cell alignment",

                    "Incoming material"

                ]


            },



            // ==========================================
            // VACUUM PROBLEM
            // ==========================================

            "vacuum":{


                symptom:
                "Cell pickup vacuum unstable or vacuum pressure low",


                possibleCause:[

                    "Vacuum cup leakage",

                    "Vacuum tube leakage",

                    "Vacuum generator issue",

                    "Vacuum sensor drift",

                    "Low pneumatic pressure",

                    "Solenoid valve malfunction"

                ],


                checks:[

                    "Check actual vacuum pressure",

                    "Inspect vacuum cups",

                    "Check tubing and fittings",

                    "Verify vacuum sensor signal",

                    "Check supply air pressure",

                    "Check solenoid valve operation"

                ],


                action:

                "Restore stable vacuum pressure and confirm sensor feedback before restarting production.",


                rcaFocus:[

                    "Vacuum cup",

                    "Leakage",

                    "Sensor",

                    "Valve",

                    "Air pressure"

                ]


            },



            // ==========================================
            // RIBBON SHIFTING
            // ==========================================

            "ribbon":{


                symptom:
                "Ribbon shifting, ribbon feeding instability or soldering alignment defect",


                possibleCause:[

                    "Ribbon tension variation",

                    "Ribbon feeder roller wear",

                    "Incorrect feeder alignment",

                    "Ribbon spool drag",

                    "Soldering head alignment issue",

                    "Flux distribution issue",

                    "Cell position variation"

                ],


                checks:[

                    "Check ribbon feeder movement",

                    "Inspect ribbon tension",

                    "Inspect feeding roller",

                    "Verify ribbon alignment",

                    "Check soldering head position",

                    "Check flux supply",

                    "Verify cell positioning"

                ],


                action:

                "Stabilize ribbon feeding and alignment before adjusting soldering parameters.",


                rcaFocus:[

                    "Ribbon tension",

                    "Feeder alignment",

                    "Roller wear",

                    "Cell alignment",

                    "Soldering position"

                ]


            },



            // ==========================================
            // SOLDERING DEFECT
            // ==========================================

            "solder":{


                symptom:
                "Poor soldering, dry solder, weak bond or ribbon adhesion issue",


                possibleCause:[

                    "Incorrect soldering temperature",

                    "Temperature instability",

                    "Flux quantity variation",

                    "Ribbon contamination",

                    "Cell metallization variation",

                    "Insufficient contact pressure",

                    "Soldering head contamination"

                ],


                checks:[

                    "Verify soldering temperature",

                    "Check temperature stability",

                    "Check flux level and distribution",

                    "Inspect ribbon cleanliness",

                    "Inspect soldering head",

                    "Verify contact pressure",

                    "Review defect trend by cell / ribbon lot"

                ],


                action:

                "Validate temperature, flux and mechanical contact conditions before changing process recipe.",


                rcaFocus:[

                    "Temperature",

                    "Flux",

                    "Ribbon",

                    "Cell metallization",

                    "Contact pressure"

                ]


            },



            // ==========================================
            // CAMERA / ALIGNMENT
            // ==========================================

            "alignment":{


                symptom:
                "Cell alignment or vision positioning error",


                possibleCause:[

                    "Camera calibration drift",

                    "Lens contamination",

                    "Lighting instability",

                    "Camera mounting movement",

                    "Incorrect vision threshold",

                    "Mechanical reference shift"

                ],


                checks:[

                    "Clean camera lens",

                    "Check lighting",

                    "Verify camera mounting",

                    "Run calibration check",

                    "Review vision threshold",

                    "Inspect mechanical reference position"

                ],


                action:

                "Restore stable vision condition and recalibrate before making mechanical adjustments.",


                rcaFocus:[

                    "Camera",

                    "Lighting",

                    "Calibration",

                    "Mechanical reference"

                ]


            },



            // ==========================================
            // MACHINE STOPPED
            // ==========================================

            "not running":{


                symptom:
                "ATW Stringer stopped or unable to complete cycle",


                possibleCause:[

                    "Active servo alarm",

                    "Sensor interlock missing",

                    "Low vacuum confirmation",

                    "Air pressure low",

                    "PLC communication fault",

                    "Mechanical obstruction"

                ],


                checks:[

                    "Check active alarms",

                    "Review PLC alarm history",

                    "Verify servo ready status",

                    "Check vacuum confirmation",

                    "Check air pressure",

                    "Inspect sensor feedback",

                    "Check axis movement for obstruction"

                ],


                action:

                "Do not repeatedly reset the machine. Identify whether the stop is caused by alarm, interlock, communication or mechanical obstruction.",


                rcaFocus:[

                    "Alarm",

                    "Servo",

                    "Sensor",

                    "Vacuum",

                    "Communication",

                    "Mechanical"

                ]


            }


        }


    },





    // =================================================
    // SC LAMINATOR
    // =================================================

    "laminator":{


        machine:"Laminator",

        manufacturer:"SC",

        process:"Module Lamination",


        issues:{



            // ==========================================
            // BUBBLE DEFECT
            // ==========================================

            "bubble":{


                symptom:
                "Bubble formation observed after lamination",


                possibleCause:[

                    "Insufficient vacuum",

                    "Vacuum leakage",

                    "Incorrect lamination recipe",

                    "Material moisture",

                    "Temperature non-uniformity",

                    "Poor vacuum pump performance",

                    "Membrane / sealing condition issue"

                ],


                checks:[

                    "Review vacuum pressure trend",

                    "Check vacuum pump condition",

                    "Perform vacuum leak inspection",

                    "Verify temperature profile",

                    "Check material storage / moisture exposure",

                    "Inspect membrane condition",

                    "Review lamination cycle recipe"

                ],


                action:

                "Correlate bubble location with vacuum and temperature behavior before changing recipe. Verify equipment condition first.",


                rcaFocus:[

                    "Vacuum",

                    "Temperature",

                    "Recipe",

                    "Material moisture",

                    "Membrane"

                ]


            },



            // ==========================================
            // TEMPERATURE
            // ==========================================

            "temperature":{


                symptom:
                "Laminator heating-zone temperature deviation or instability",


                possibleCause:[

                    "Heater failure",

                    "SSR failure",

                    "Thermocouple drift / failure",

                    "Loose electrical connection",

                    "Temperature controller issue",

                    "Uneven heating plate condition"

                ],


                checks:[

                    "Compare actual vs set temperature",

                    "Measure heater current",

                    "Check SSR output",

                    "Verify thermocouple feedback",

                    "Inspect terminal tightness",

                    "Check temperature uniformity"

                ],


                action:

                "Confirm heater, SSR and thermocouple loop condition before changing PID or recipe parameters.",


                rcaFocus:[

                    "Heater",

                    "SSR",

                    "Thermocouple",

                    "Controller",

                    "Uniformity"

                ]


            },



            // ==========================================
            // VACUUM LOW
            // ==========================================

            "vacuum":{


                symptom:
                "Required vacuum pressure not achieved or vacuum cycle slow",


                possibleCause:[

                    "Vacuum pump degradation",

                    "Vacuum system leakage",

                    "Seal leakage",

                    "Valve malfunction",

                    "Vacuum pressure sensor error",

                    "Filter blockage"

                ],


                checks:[

                    "Check vacuum pressure trend",

                    "Inspect vacuum pump",

                    "Check pump oil / filter condition",

                    "Inspect vacuum piping",

                    "Check chamber sealing",

                    "Verify vacuum valve operation",

                    "Check pressure sensor feedback"

                ],


                action:

                "Perform systematic leak and pump-performance checks before adjusting cycle time or recipe.",


                rcaFocus:[

                    "Vacuum pump",

                    "Leakage",

                    "Seal",

                    "Valve",

                    "Sensor"

                ]


            },



            // ==========================================
            // HEATING SLOW
            // ==========================================

            "heating":{


                symptom:
                "Laminator takes excessive time to reach temperature setpoint",


                possibleCause:[

                    "Heater degradation",

                    "SSR partial failure",

                    "Power supply issue",

                    "Loose contactor / terminal",

                    "Thermocouple reading error"

                ],


                checks:[

                    "Measure heater current",

                    "Compare heating rate across zones",

                    "Check SSR",

                    "Inspect contactor",

                    "Inspect electrical terminals",

                    "Verify thermocouple signal"

                ],


                action:

                "Identify the weak heating zone electrically before changing process settings.",


                rcaFocus:[

                    "Heater current",

                    "SSR",

                    "Contactor",

                    "Thermocouple"

                ]


            },



            // ==========================================
            // MEMBRANE
            // ==========================================

            "membrane":{


                symptom:
                "Membrane damage, deformation or poor chamber sealing",


                possibleCause:[

                    "Membrane ageing",

                    "Excessive mechanical stress",

                    "High-temperature degradation",

                    "Improper installation",

                    "Foreign material damage"

                ],


                checks:[

                    "Inspect membrane surface",

                    "Check sealing edge",

                    "Inspect for cracks / deformation",

                    "Check chamber cleanliness",

                    "Review membrane service life"

                ],


                action:

                "Replace damaged membrane and verify chamber sealing before further production.",


                rcaFocus:[

                    "Membrane age",

                    "Sealing",

                    "Mechanical damage",

                    "Temperature exposure"

                ]


            }


        }


    },





    // =================================================
    // EL TESTER
    // =================================================

    "el tester":{


        machine:"EL Tester",

        manufacturer:"To Be Updated",

        process:"EL Inspection",


        issues:{



            "dark":{


                symptom:
                "Dark cell / dark area observed in EL image",


                possibleCause:[

                    "Cell crack",

                    "Poor soldering",

                    "Ribbon interruption",

                    "Electrical contact issue",

                    "String discontinuity"

                ],


                checks:[

                    "Review EL image location",

                    "Check string continuity",

                    "Inspect soldering",

                    "Check electrical contact",

                    "Compare pre-lamination / post-lamination history"

                ],


                action:

                "Use defect location and process history to identify whether the defect originated from stringing, layup, lamination or contact.",


                rcaFocus:[

                    "Cell crack",

                    "Soldering",

                    "Ribbon",

                    "Electrical contact"

                ]


            },



            "image":{


                symptom:
                "EL image quality poor or unstable",


                possibleCause:[

                    "Camera focus issue",

                    "Lens contamination",

                    "Electrical contact instability",

                    "Communication issue",

                    "Calibration drift"

                ],


                checks:[

                    "Clean camera lens",

                    "Verify camera focus",

                    "Check electrical contact",

                    "Check communication",

                    "Verify calibration"

                ],


                action:

                "Stabilize imaging and electrical contact condition before analyzing module defects.",


                rcaFocus:[

                    "Camera",

                    "Contact",

                    "Communication",

                    "Calibration"

                ]


            }


        }


    },





    // =================================================
    // AOI
    // =================================================

    "aoi":{


        machine:"AOI",

        manufacturer:"To Be Updated",

        process:"Automatic Optical Inspection",


        issues:{



            "false":{


                symptom:
                "High false NG / false rejection from AOI",


                possibleCause:[

                    "Camera focus issue",

                    "Lighting variation",

                    "Incorrect inspection threshold",

                    "Recipe mismatch",

                    "Calibration drift",

                    "Surface reflection variation"

                ],


                checks:[

                    "Check camera focus",

                    "Verify lighting condition",

                    "Review threshold settings",

                    "Check correct recipe",

                    "Perform calibration check",

                    "Review false NG images"

                ],


                action:

                "Use actual false-NG samples to optimize threshold and lighting; avoid reducing sensitivity without defect validation.",


                rcaFocus:[

                    "Camera",

                    "Lighting",

                    "Threshold",

                    "Recipe",

                    "Calibration"

                ]


            },



            "camera":{


                symptom:
                "AOI camera or vision system unavailable",


                possibleCause:[

                    "Camera power issue",

                    "Communication cable issue",

                    "Vision software fault",

                    "Network problem",

                    "Camera hardware failure"

                ],


                checks:[

                    "Check camera power",

                    "Inspect communication cable",

                    "Check network status",

                    "Verify vision software",

                    "Check camera health"

                ],


                action:

                "Restore camera communication and validate inspection accuracy before releasing modules.",


                rcaFocus:[

                    "Power",

                    "Communication",

                    "Network",

                    "Camera"

                ]


            }


        }


    }


};



// =====================================================
// NORMALIZE MACHINE
// =====================================================

function normalizeKnowledgeMachineName(machine){


    const value =
        String(machine || "")
        .toLowerCase()
        .trim();


    if(
        value.includes("stringer") ||
        value.includes("atw")
    ){

        return "stringer";

    }


    if(
        value.includes("laminator") ||
        value.includes("sc laminator")
    ){

        return "laminator";

    }


    if(
        value.includes("el")
    ){

        return "el tester";

    }


    if(
        value.includes("aoi")
    ){

        return "aoi";

    }


    return value;

}



// =====================================================
// SEARCH KNOWLEDGE
// =====================================================

function searchKnowledge(
    machine,
    issue
){


    const machineKey =
        normalizeKnowledgeMachineName(
            machine
        );


    const issueText =
        String(issue || "")
        .toLowerCase();


    const data =
        maintenanceKnowledge[
            machineKey
        ];


    if(!data){

        return null;

    }



    // Exact issue-key search

    for(
        const key
        in data.issues
    ){


        if(
            issueText.includes(
                key
            )
        ){

            return {

                key:key,

                machine:
                    data.machine,

                manufacturer:
                    data.manufacturer,

                process:
                    data.process,

                ...data.issues[key]

            };

        }

    }



    // Flexible symptom / cause search

    for(
        const key
        in data.issues
    ){


        const item =
            data.issues[key];


        const searchable =
            [

                key,

                item.symptom,

                ...(item.possibleCause || []),

                ...(item.checks || []),

                ...(item.rcaFocus || [])

            ]
            .join(" ")
            .toLowerCase();


        if(
            issueText
            &&
            searchable.includes(
                issueText
            )
        ){

            return {

                key:key,

                machine:
                    data.machine,

                manufacturer:
                    data.manufacturer,

                process:
                    data.process,

                ...item

            };

        }

    }



    return null;

}



// =====================================================
// GET ALL KNOWLEDGE
// =====================================================

function getKnowledgeList(){


    const results = [];


    for(
        const machine
        in maintenanceKnowledge
    ){


        const data =
            maintenanceKnowledge[
                machine
            ];


        results.push({

            machine:
                data.machine,

            manufacturer:
                data.manufacturer,

            process:
                data.process,

            issues:
                Object.keys(
                    data.issues
                )

        });

    }


    return results;

}



// =====================================================
// GET MACHINE ISSUES
// =====================================================

function getMachineIssues(machine){


    const key =
        normalizeKnowledgeMachineName(
            machine
        );


    const data =
        maintenanceKnowledge[
            key
        ];


    if(!data){

        return [];

    }


    return Object.keys(
        data.issues
    );

}



// =====================================================
// READY
// =====================================================

console.log(
    "✅ SAMA Troubleshooting Knowledge Base Loaded"
);


console.log(
    getKnowledgeList()
);
