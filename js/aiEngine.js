// =====================================================
// SAMA - AI Maintenance Assistant
// AI Decision Engine
// File: aiEngine.js
// =====================================================



// =====================================================
// MAIN AI RESPONSE
// =====================================================


function generateAIResponse(query){


let input =
query.toLowerCase();



let machine =
detectMachine(input);



let alarm =
detectAlarm(input);





// =====================================================
// Alarm Diagnosis
// =====================================================


if(
input.includes("alarm") ||
input.includes("error") ||
input.includes("fault") ||
alarm
)

{


return analyzeAlarm(alarm,machine);


}





// =====================================================
// Knowledge Base Search
// =====================================================


let knowledge =
analyzeKnowledge(query);



if(knowledge)

{

return knowledge;

}





// =====================================================
// Breakdown
// =====================================================


if(

input.includes("breakdown") ||

input.includes("stopped") ||

input.includes("not running")

)

{


return analyzeBreakdown(machine);


}






// =====================================================
// Preventive Maintenance
// =====================================================


if(

input.includes("pm") ||

input.includes("maintenance") ||

input.includes("service")

)

{


return generatePM(machine);


}







// =====================================================
// Machine Health
// =====================================================


if(

input.includes("health") ||

input.includes("status") ||

input.includes("condition")

)

{


return generateHealth(machine);


}








// =====================================================
// Breakdown History
// =====================================================


if(

input.includes("history") ||

input.includes("previous") ||

input.includes("last breakdown")

)

{


return generateHistory(machine);


}






// =====================================================
// Spare
// =====================================================


if(

input.includes("spare") ||

input.includes("part")

)

{


return generateSpare(machine);


}






return generalResponse(machine);


}









// =====================================================
// MACHINE DETECTION
// =====================================================


function detectMachine(text){


let machines=[


"stringer",

"laminator",

"el tester",

"aoi"


];



for(let m of machines)

{


if(text.includes(m))

return m;


}



return "unknown";


}








// =====================================================
// ALARM DETECTION
// =====================================================


function detectAlarm(text){


let match =
text.match(/[A-Z]+\d+/i);



if(match)

return match[0].toUpperCase();



return null;


}









// =====================================================
// ALARM ANALYSIS
// =====================================================


function analyzeAlarm(alarm,machine){



if(
typeof getAlarmDetails==="function" &&
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

<b>${data.machine}</b>


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


Alarm:

${alarm}


<br><br>


Not available in database.


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
// BREAKDOWN
// =====================================================


function analyzeBreakdown(machine){


return `


<b>🔧 Breakdown Analysis</b>


<br><br>


Machine:

<b>${machine}</b>


<br><br>


Immediate checks:


<br>

1️⃣ Check active alarms


<br>

2️⃣ Check power supply


<br>

3️⃣ Check air pressure


<br>

4️⃣ Check sensors


<br>

5️⃣ Check servo status


<br><br>


SAMA Recommendation:

<br>

Do not reset until root cause identified.


<br><br>


Confidence:

85%


`;



}









// =====================================================
// PM
// =====================================================


function generatePM(machine){


return `


<b>🛠 Preventive Maintenance</b>


<br><br>


Machine:

<b>${machine}</b>


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


<br><br>


Next:

Verify PM history.


`;



}









// =====================================================
// HEALTH REPORT
// =====================================================


function generateHealth(machine){


if(
typeof generateMachineReport==="function"
)

{


return generateMachineReport(machine);


}



return "Machine database not connected";


}









// =====================================================
// BREAKDOWN HISTORY
// =====================================================


function generateHistory(machine){


if(
typeof getBreakdownHistory==="function"
)

{


let data =
getBreakdownHistory(machine);



if(data.length)


{


let html="";


data.forEach(x=>{


html +=

`

<br>

📅 ${x.date}

<br>

Issue: ${x.issue}

<br>

Downtime: ${x.downtime}

<br>

`;



});



return `


<b>📚 Breakdown History</b>

<br><br>

Machine:

${machine}

${html}


`;



}



}



return "No history available";



}









// =====================================================
// SPARE
// =====================================================


function generateSpare(machine){


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

• Proximity Sensor


<br>

• Solenoid Valve


<br>

• Relay


`;



}









// =====================================================
// GENERAL
// =====================================================


function generalResponse(machine){


return `


🤖 SAMA Ready


<br><br>


Detected Machine:

${machine}


<br><br>


Try:


<br>

"Stringer cell breakage"


<br>

"Servo alarm E37"


<br>

"Laminator bubble defect"


<br>

"Stringer health"


`;



}
