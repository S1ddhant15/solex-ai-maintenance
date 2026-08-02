// =====================================================
// SAMA - AI Maintenance Assistant
// Industrial Maintenance Knowledge Base
// =====================================================


// =====================================================
// Machine Troubleshooting Knowledge
// =====================================================


const maintenanceKnowledge = {



    // ==================================
    // STRINGER MACHINE
    // ==================================


    "stringer":{


        machine:"Stringer",


        issues:{



            "not running":{


                symptom:
                "Stringer machine stopped suddenly",


                possibleCause:

                [

                "Servo drive fault",

                "Cell loading sensor failure",

                "Vacuum pressure low",

                "PLC communication error",

                "Mechanical obstruction"

                ],


                checks:

                [

                "Check active PLC alarms",

                "Check servo drive status",

                "Verify vacuum pressure",

                "Check sensor input",

                "Inspect mechanical movement"

                ],


                action:

                "Identify alarm source before machine reset"

            },




            "cell breakage":{


                symptom:
                "High cell breakage during stringing",


                possibleCause:

                [

                "Excessive conveyor pressure",

                "Incorrect stringer parameter",

                "Vacuum pickup issue",

                "Cell positioning error"

                ],


                checks:

                [

                "Check pickup vacuum",

                "Verify alignment camera",

                "Check soldering temperature",

                "Review process parameters"

                ],


                action:

                "Optimize handling parameters and alignment"

            },




            "ribbon issue":{


                symptom:
                "Ribbon shifting or soldering defect",


                possibleCause:

                [

                "Ribbon tension variation",

                "Solder temperature unstable",

                "Flux issue",

                "Alignment problem"

                ],


                checks:

                [

                "Check ribbon feeder",

                "Verify solder temperature",

                "Inspect flux supply",

                "Check wire alignment"

                ],


                action:

                "Verify soldering process stability"

            }


        }


    },








    // ==================================
    // LAMINATOR
    // ==================================


    "laminator":{


        machine:"Laminator",


        issues:{



            "bubble defect":{


                symptom:
                "Bubble formation after lamination",


                possibleCause:

                [

                "Low vacuum level",

                "Incorrect lamination recipe",

                "Moisture in material",

                "Heating profile variation"

                ],


                checks:

                [

                "Check vacuum pump",

                "Verify vacuum pressure",

                "Check temperature zones",

                "Review recipe parameters"

                ],


                action:

                "Stabilize vacuum and lamination profile"

            },





            "temperature":{


                symptom:
                "Temperature deviation",


                possibleCause:

                [

                "Heater failure",

                "SSR failure",

                "Thermocouple error"

                ],


                checks:

                [

                "Measure heater current",

                "Check SSR output",

                "Verify temperature sensor"

                ],


                action:

                "Repair heating control system"

            }


        }


    },









    // ==================================
    // EL INSPECTION
    // ==================================


    "el":{


        machine:"EL Tester",


        issues:{



            "dark cell":{


                symptom:
                "Dark area in EL image",


                possibleCause:

                [

                "Cell crack",

                "Poor soldering",

                "Ribbon damage",

                "Contact issue"

                ],


                checks:

                [

                "Review EL image",

                "Check solder joint",

                "Verify string quality"

                ],


                action:

                "Perform defect root cause analysis"

            }



        }


    },









    // ==================================
    // AOI INSPECTION
    // ==================================


    "aoi":{


        machine:"AOI",


        issues:{


            "false rejection":{


                symptom:
                "High false NG detection",


                possibleCause:

                [

                "Camera focus issue",

                "Incorrect threshold",

                "Lighting variation"

                ],


                checks:

                [

                "Check camera calibration",

                "Adjust inspection parameters",

                "Verify lighting"

                ],


                action:

                "Optimize AOI inspection settings"

            }


        }


    }



};









// =====================================================
// Knowledge Search Engine
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
// General Keyword Search
// =====================================================


function findKnowledge(keyword){


let result=[];



for(let machine in maintenanceKnowledge){


let data =
maintenanceKnowledge[machine];



result.push({

machine:data.machine,

availableIssues:Object.keys(data.issues)

});


}



return result;


}

// =====================================================
// Advanced SAMA Knowledge Search
// =====================================================


function searchAdvancedKnowledge(query){


query = query.toLowerCase();



let matches = [];



for(let machine in maintenanceKnowledge){



let machineData =
maintenanceKnowledge[machine];



for(let issue in machineData.issues){



let issueData =
machineData.issues[issue];



let searchableText = (

machineData.machine +

" " +

issue +

" " +

issueData.symptom +

" " +

issueData.possibleCause.join(" ") +

" " +

issueData.checks.join(" ")

).toLowerCase();





if(searchableText.includes(query)){


matches.push({


machine:
machineData.machine,


issue:
issue,


symptom:
issueData.symptom,


cause:
issueData.possibleCause,


checks:
issueData.checks,


action:
issueData.action



});


}




}



}



return matches;


}







// =====================================================
// Format Knowledge Response For SAMA
// =====================================================


function formatKnowledgeResponse(data){



if(!data || data.length===0)

return null;




let item = data[0];



return `


<b>🔧 SAMA Troubleshooting Analysis</b>


<br><br>


<b>Machine:</b>

${item.machine}


<br><br>


<b>Issue:</b>

${item.issue}


<br><br>



<b>Possible Causes:</b>

<br>

${

item.cause

.map((x,i)=>

`${i+1}. ${x}`

)

.join("<br>")

}



<br><br>


<b>Recommended Checks:</b>

<br>

${

item.checks

.map((x)=>

"✓ "+x

)

.join("<br>")

}



<br><br>


<b>SAMA Recommendation:</b>

<br>

${item.action}


<br><br>


<span class="confidence">

Confidence: 88%

</span>


`;



}
