// =====================================================
// SAMA - AI Maintenance Assistant
// Industrial Maintenance Knowledge Base
// File: knowledge.js
// =====================================================



const maintenanceKnowledge = {



    // =====================================================
    // STRINGER MACHINE
    // =====================================================


    "stringer":{


        machine:"Stringer",


        issues:{


            "cell breakage":{


                symptom:
                "High cell breakage during stringing process",


                possibleCause:[

                    "Excessive vacuum pickup force",

                    "Cell alignment error",

                    "High conveyor pressure",

                    "Incorrect stringer parameters",

                    "Mechanical vibration"

                ],


                checks:[

                    "Check vacuum pressure",

                    "Verify cell pickup position",

                    "Check camera alignment",

                    "Review stringer recipe",

                    "Check servo movement"

                ],


                action:

                "Optimize handling parameters and verify mechanical alignment"


            },





            "ribbon":{


                symptom:
                "Ribbon shifting or soldering defect",


                possibleCause:[

                    "Ribbon tension variation",

                    "Solder temperature instability",

                    "Flux issue",

                    "Ribbon alignment problem"

                ],


                checks:[

                    "Check ribbon feeder",

                    "Verify solder temperature",

                    "Inspect flux supply",

                    "Check wire alignment"

                ],


                action:

                "Stabilize ribbon feeding and soldering parameters"


            },






            "not running":{


                symptom:
                "Stringer machine stopped",


                possibleCause:[

                    "Servo alarm",

                    "PLC communication fault",

                    "Vacuum pressure low",

                    "Sensor failure"

                ],


                checks:[

                    "Check PLC alarm history",

                    "Check servo drive",

                    "Verify sensors",

                    "Check air pressure"

                ],


                action:

                "Identify root cause before machine reset"


            }



        }



    },









    // =====================================================
    // LAMINATOR
    // =====================================================


    "laminator":{


        machine:"Laminator",


        issues:{


            "bubble":{


                symptom:

                "Bubble formation after lamination",


                possibleCause:[

                    "Low vacuum level",

                    "Moisture trapped in material",

                    "Incorrect lamination recipe",

                    "Temperature profile variation"

                ],


                checks:[

                    "Check vacuum pump",

                    "Verify vacuum pressure",

                    "Check heating zones",

                    "Review recipe parameters"

                ],


                action:

                "Stabilize vacuum and lamination profile"


            },






            "temperature":{


                symptom:

                "Temperature deviation in laminator",


                possibleCause:[

                    "Heater failure",

                    "SSR failure",

                    "Thermocouple problem"

                ],


                checks:[

                    "Measure heater current",

                    "Check SSR output",

                    "Verify temperature sensor"

                ],


                action:

                "Repair heating control system"


            }




        }


    },









    // =====================================================
    // EL INSPECTION
    // =====================================================


    "el tester":{


        machine:"EL Tester",


        issues:{


            "dark":{


                symptom:

                "Dark area visible in EL image",


                possibleCause:[

                    "Cell crack",

                    "Poor soldering",

                    "Ribbon damage",

                    "Contact issue"

                ],


                checks:[

                    "Review EL image",

                    "Check string quality",

                    "Verify solder joint"

                ],


                action:

                "Perform EL defect root cause analysis"


            }


        }



    },











    // =====================================================
    // AOI
    // =====================================================


    "aoi":{


        machine:"AOI",


        issues:{



            "false":{


                symptom:

                "High false NG rejection in AOI",


                possibleCause:[

                    "Camera focus issue",

                    "Incorrect inspection threshold",

                    "Lighting variation"

                ],


                checks:[

                    "Check camera calibration",

                    "Adjust inspection parameters",

                    "Verify lighting condition"

                ],


                action:

                "Optimize AOI inspection settings"


            }




        }



    }




};








// =====================================================
// Knowledge Search
// =====================================================


function searchKnowledge(machine,issue){



    machine =
    machine.toLowerCase();



    issue =
    issue.toLowerCase();




    if(
    maintenanceKnowledge[machine]
    )

    {


        let data =
        maintenanceKnowledge[machine];



        for(let key in data.issues)

        {


            if(issue.includes(key))

            {


                return data.issues[key];


            }


        }


    }




    return null;


}






// =====================================================
// List Knowledge
// =====================================================


function getKnowledgeList(){


let result=[];



for(let machine in maintenanceKnowledge)

{


result.push({

machine:
maintenanceKnowledge[machine].machine,


issues:
Object.keys(
maintenanceKnowledge[machine].issues
)


});


}



return result;


}
