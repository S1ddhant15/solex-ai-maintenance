// =====================================================
// SAMA - AI Maintenance Assistant
// Advanced AI Decision Engine
// =====================================================



// =====================================================
// MAIN AI RESPONSE GENERATOR
// =====================================================


function generateAIResponse(query){


let input = query.toLowerCase();



let machine =
detectMachine(input);



let intent =
detectIntent(input);



let alarm =
detectAlarm(input);



let response = "";





// =====================================================
// Alarm Diagnosis
// =====================================================


if(intent === "alarm")
{


response =
analyzeAlarm(alarm,machine);


}







// =====================================================
// Breakdown History
// =====================================================


else if(

input.includes("history") ||

input.includes("previous") ||

input.includes("last breakdown") ||

input.includes("breakdown history")

)

{


if(typeof generateBreakdownReport === "function")
{


response =
generateBreakdownReport(machine);


}

else

{


response =

`
<b>📋 Breakdown History</b>

<br><br>

History database not connected.

`;

}


}







// =====================================================
// Breakdown Analysis
// =====================================================


else if(intent === "breakdown")
{


response =
analyzeBreakdown(machine);


}







// =====================================================
// PM Recommendation
// =====================================================


else if(intent === "pm")
{


if(typeof generatePMReport === "function")
{


response =
generatePMReport(machine);


}

else

{


response =
generatePM(machine);


}


}








// =====================================================
// Spare Recommendation
// =====================================================


else if(intent === "spare")
{


if(typeof generateSpareReport === "function")
{


response =
generateSpareReport(machine);


}

else

{


response =
recommendSpare(machine,input);


}


}








// =====================================================
// Machine Health
// =====================================================


else if(intent === "health")
{


response =
machineHealth(machine);


}







// =====================================================
// Knowledge Troubleshooting
// =====================================================


else
{


let knowledgeResult =
analyzeKnowledge(query);



if(knowledgeResult)

{


response =
knowledgeResult;


}

else

{


response =
generalMaintenanceResponse(machine);


}


}






return response;


}









// =====================================================
// INTENT DETECTION
// =====================================================


function detectIntent(text){



if(

text.includes("alarm") ||

text.includes("error") ||

text.includes("fault") ||

text.includes("code")

)

return "alarm";





if(

text.includes("stop") ||

text.includes("breakdown") ||

text.includes("not running") ||

text.includes("failure")

)

return "breakdown";






if(

text.includes("pm") ||

text.includes("maintenance") ||

text.includes("service")

)

return "pm";







if(

text.includes("spare") ||

text.includes("part") ||

text.includes("replace")

)

return "spare";







if(

text.includes("health") ||

text.includes("condition") ||

text.includes("status")

)

return "health";






return "general";


}









// =====================================================
// MACHINE DETECTION
// =====================================================


function detectMachine(text){



if(text.includes("stringer"))

return "Stringer-01";



if(text.includes("laminator"))

return "Laminator-01";



if(text.includes("el tester") || text.includes("el"))

return "EL-Tester-01";



if(text.includes("aoi"))

return "AOI-01";



if(text.includes("jbox"))

return "JBOX";



if(text.includes("framing"))

return "Framing";



return "Unknown Machine";


}









// =====================================================
// ALARM DETECTION
// =====================================================


function detectAlarm(text){


let match =
text.match(/[a-zA-Z]+\d+/);



if(match)

return match[0].toUpperCase();



return null;


}









// =====================================================
// ALARM ANALYSIS
// =====================================================


function analyzeAlarm(alarm,machine){



if(

typeof getAlarmDetails === "function"

&&

alarm

)

{


let data =
getAlarmDetails(alarm);



if(data)

{


return `


<b>🚨 Alarm Diagnosis</b>


<br><br>


Machine:

<b>${machine}</b>


<br><br>


Alarm Code:

<b>${alarm}</b>


<br><br>


Description:

${data.description}


<br><br>


<b>Possible Cause:</b>


<br>

${data.cause}


<br><br>


<b>Recommended Action:</b>


<br>

${data.action}


<br><br>


Confidence:

92%


`;


}



}





return `


<b>🚨 Alarm Investigation</b>


<br><br>


Machine:

${machine}


<br><br>


Alarm not available in database.


<br><br>


Check:

<br>

✓ PLC alarm history

<br>

✓ Servo drive

<br>

✓ Sensor feedback

<br>

✓ Communication status


`;



}









// =====================================================
// BREAKDOWN ANALYSIS
// =====================================================


function analyzeBreakdown(machine){


return `


<b>🔧 Breakdown Analysis</b>


<br><br>


Machine:

<b>${machine}</b>


<br><br>


Immediate Checks:


<br>

1️⃣ Check active alarm


<br>

2️⃣ Verify power supply


<br>

3️⃣ Check air pressure


<br>

4️⃣ Check sensors


<br>

5️⃣ Check servo status


<br><br>


<b>SAMA Recommendation:</b>


<br>

Do not reset before finding root cause.


<br><br>


Confidence:

85%


`;



}









// =====================================================
// PM FALLBACK
// =====================================================


function generatePM(machine){


return `


<b>🛠 Preventive Maintenance</b>


<br><br>


Machine:

${machine}


<br><br>


Checklist:


<br>

✓ Cleaning


<br>

✓ Lubrication


<br>

✓ Sensor inspection


<br>

✓ Cable tightening


<br>

✓ Servo inspection


<br>

✓ Safety check


`;



}









// =====================================================
// SPARE FALLBACK
// =====================================================


function recommendSpare(machine,text){


return `


<b>📦 Spare Recommendation</b>


<br><br>


Machine:

${machine}


<br><br>


Critical Spares:


<br>

• Servo Drive


<br>

• Encoder Cable


<br>

• Sensor


<br>

• Pneumatic Valve


<br>

• Relay


`;



}









// =====================================================
// MACHINE HEALTH
// =====================================================


function machineHealth(machine){


if(typeof getMachineHealth==="function")

{


let data =
getMachineHealth(machine);



if(data)

{


return `


<b>📊 Machine Health Report</b>


<br><br>


Machine:

<b>${machine}</b>


<br><br>


Health Score:

${data.score}%


<br><br>


Status:

${data.status}


<br><br>


SAMA Prediction:

Machine condition is stable.


`;



}


}




return `


<b>📊 Machine Health</b>


<br><br>


Machine:

${machine}


<br><br>


Health data unavailable.


`;



}









// =====================================================
// KNOWLEDGE DATABASE CONNECTION
// =====================================================


function analyzeKnowledge(query){



if(typeof searchKnowledge !== "function")

return null;



let input =
query.toLowerCase();



let machine =
detectMachine(input);



let result =
searchKnowledge(
machine,
input
);



if(result)

{


return `


<b>🔧 SAMA Troubleshooting Analysis</b>


<br><br>


Machine:

${machine}


<br><br>


Problem:

${result.symptom}


<br><br>


<b>Possible Causes:</b>


<br>

${

result.possibleCause
.map(x=>"• "+x)
.join("<br>")

}


<br><br>


<b>Checks:</b>


<br>

${

result.checks
.map(x=>"✓ "+x)
.join("<br>")

}


<br><br>


<b>Action:</b>


<br>

${result.action}


<br><br>


Confidence:

88%


`;



}



return null;


}









// =====================================================
// GENERAL RESPONSE
// =====================================================


function generalMaintenanceResponse(machine){


return `


🤖 SAMA is ready.


<br><br>


Detected Machine:

<b>${machine}</b>


<br><br>


Try:


<br>

"Stringer breakdown"


<br>

"Servo alarm E37"


<br>

"Laminator PM"


<br>

"Stringer previous breakdown"


<br>

"AOI spare"


`;



}
