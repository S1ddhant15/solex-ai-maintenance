// =====================================================
// SAMA - Solex AI Maintenance Assistant
// Industrial Troubleshooting Knowledge Base
// =====================================================



const maintenanceKnowledge = {



/* =====================================================
   STRINGER MACHINE
===================================================== */


"stringer":{


machine:"Stringer",


issues:{



"cell breakage":{


symptom:
"High cell breakage during stringing process",


possibleCause:[

"Excessive pickup vacuum pressure",

"Cell alignment issue",

"Incorrect stringer parameters",

"Mechanical vibration",

"Damaged conveyor support"

],


checks:[

"Check vacuum pickup pressure",

"Verify camera alignment",

"Check cell handling movement",

"Review stringer recipe parameters",

"Inspect mechanical guides"

],


action:
"Optimize handling parameters and verify alignment accuracy"


},






"vacuum":{


symptom:
"Vacuum pickup failure or cell dropping",


possibleCause:[

"Vacuum pressure low",

"Vacuum cup damage",

"Air leakage",

"Vacuum sensor failure"

],


checks:[

"Check vacuum gauge",

"Inspect vacuum cup",

"Check pneumatic leakage",

"Verify sensor feedback"

],


action:
"Restore stable vacuum pressure before production restart"


},







"ribbon":{


symptom:
"Ribbon shifting or soldering defect",


possibleCause:[

"Ribbon tension variation",

"Solder temperature fluctuation",

"Ribbon alignment issue",

"Flux problem"

],


checks:[

"Check ribbon feeder",

"Verify solder temperature",

"Inspect flux supply",

"Check ribbon position"

],


action:
"Stabilize soldering parameters and ribbon alignment"


}



}


},









/* =====================================================
   LAMINATOR
===================================================== */


"laminator":{


machine:"Laminator",


issues:{



"bubble":{


symptom:
"Bubble formation after lamination",


possibleCause:[

"Vacuum level insufficient",

"Moisture in EVA/POE",

"Incorrect lamination recipe",

"Heating profile variation"

],


checks:[

"Check vacuum pump condition",

"Verify vacuum pressure",

"Check material moisture",

"Review lamination temperature profile"

],


action:
"Stabilize vacuum and lamination recipe"


},





"temperature":{


symptom:
"Temperature deviation during lamination",


possibleCause:[

"Heater failure",

"SSR failure",

"Thermocouple issue",

"PID parameter problem"

],


checks:[

"Measure heater current",

"Check SSR output",

"Verify thermocouple feedback",

"Review temperature controller"

],


action:
"Repair heating control loop"


}



}


},







/* =====================================================
   EL INSPECTION
===================================================== */


"el tester":{


machine:"EL Tester",


issues:{



"dark":{


symptom:
"Dark area detected in EL image",


possibleCause:[

"Cell crack",

"Poor solder joint",

"Ribbon damage",

"Contact issue"

],


checks:[

"Review EL image",

"Check soldering quality",

"Verify string output"

],


action:
"Perform root cause analysis from stringing process"


}



}


},









/* =====================================================
   AOI
===================================================== */


"aoi":{


machine:"AOI",


issues:{



"false":{


symptom:
"High false rejection from AOI",


possibleCause:[

"Camera focus issue",

"Lighting variation",

"Incorrect threshold setting",

"Calibration error"

],


checks:[

"Check camera calibration",

"Verify lighting",

"Review inspection parameters"

],


action:
"Optimize AOI recipe and inspection parameters"


}



}


}



};









// =====================================================
// SEARCH KNOWLEDGE
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



for(
let key in data.issues
)

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
// LIST AVAILABLE KNOWLEDGE
// =====================================================


function getKnowledgeList(){



let result=[];



for(
let machine in maintenanceKnowledge
)

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
