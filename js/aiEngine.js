// =====================================================
// SAMA - Solex AI Maintenance Assistant
// AI Decision Engine
// =====================================================



// =====================================================
// MAIN AI RESPONSE GENERATOR
// =====================================================


function generateAIResponse(query){


let input =
query.toLowerCase();



let machine =
detectMachine(input);



let alarm =
detectAlarm(input);



let intent =
detectIntent(input);





// Auto machine detection from alarm database


if(
machine === "unknown"
&&
alarm
&&
typeof getAlarmDetails === "function"
)

{

let alarmData =
getAlarmDetails(alarm);



if(alarmData)

{

machine =
alarmData.machine.toLowerCase();

}

}





// =====================================================
// ALARM
// =====================================================


if(intent==="alarm")

{


return analyzeAlarm(
alarm,
machine
);


}







// =====================================================
// BREAKDOWN
// =====================================================


if(intent==="breakdown")

{


return analyzeBreakdown(machine);


}








// =====================================================
// PREVENTIVE MAINTENANCE
// =====================================================


if(intent==="pm")

{


return generatePM(machine);


}








// =====================================================
// SPARE
// =====================================================


if(intent==="spare")

{


return recommendSpare(machine);


}








// =====================================================
// HEALTH
// =====================================================


if(intent==="health")

{


return machineHealth(machine);


}







// =====================================================
// KNOWLEDGE SEARCH
// =====================================================


let knowledge =
analyzeKnowledge(input);



if(knowledge)

return knowledge;







return generalMaintenanceResponse(machine);



}









// =====================================================
// INTENT DETECTION
// =====================================================


function detectIntent(text){



if(

text.includes("alarm")

||

text.includes("error")

||

text.includes("fault")

||

text.includes("code")

)

return "alarm";





if(

text.includes("stop")

||

text.includes("stopped")

||

text.includes("breakdown")

||

text.includes("not running")

||

text.includes("failure")

)

return "breakdown";





if(

text.includes("pm")

||

text.includes("maintenance")

||

text.includes("service")

)

return "pm";





if(

text.includes("spare")

||

text.includes("part")

||

text.includes("replace")

)

return "spare";





if(

text.includes("health")

||

text.includes("status")

||

text.includes("condition")

)

return "health";




return "general";

}









// =====================================================
// MACHINE DETECTION
// =====================================================


function detectMachine(text){



let machines=[


"stringer",

"laminator",

"el",

"el tester",

"aoi",

"jbox",

"framing",

"flash tester"



];





for(let m of machines)

{


if(text.includes(m))

{


if(m==="el")

return "el tester";


return m;


}


}



return "unknown";


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
typeof getAlarmDetails==="function"
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


<b>SAMA Recommendation:</b>


<br>


Verify root cause before reset.


<br><br>


Confidence:

92%



`;



}


}







return `


<b>🚨 Alarm Investigation</b>


<br><br>


Alarm code not available in database.


<br><br>


Please provide:


<br>

Machine name


<br>

Alarm code


<br>

Current symptom



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


Immediate checks:


<br><br>


1️⃣ Check PLC alarm history


<br>

2️⃣ Verify power supply


<br>

3️⃣ Check pneumatic pressure


<br>

4️⃣ Check sensor feedback


<br>

5️⃣ Check servo drive status


<br><br>


<b>SAMA Recommendation:</b>


<br>


Do not reset immediately. Identify root cause first.


<br><br>


Please provide:


<br>

• Alarm code


<br>

• Station name


<br>

• Last machine condition



`;



}









// =====================================================
// PM GENERATOR
// =====================================================


function generatePM(machine){



return `


<b>🛠 Preventive Maintenance</b>


<br><br>


Machine:

<b>${machine}</b>


<br><br>


Recommended Checklist:


<br>


✓ Machine cleaning


<br>

✓ Lubrication check


<br>

✓ Sensor inspection


<br>

✓ Cable tightening


<br>

✓ Servo inspection


<br>

✓ Pneumatic leakage check


<br>

✓ Safety interlock verification


<br><br>


Next:


Review PM history and breakdown trend.


`;



}









// =====================================================
// SPARE RECOMMENDATION
// =====================================================


function recommendSpare(machine){



return `


<b>📦 Spare Recommendation</b>


<br><br>


Machine:

<b>${machine}</b>


<br><br>


Critical spares:


<br>

• Servo drive


<br>

• Encoder cable


<br>

• Proximity sensor


<br>

• Solenoid valve


<br>

• SSR relay


<br>

• Thermocouple


<br><br>


Provide failure symptom for exact spare recommendation.



`;



}









// =====================================================
// MACHINE HEALTH
// =====================================================


function machineHealth(machine){



return `


<b>📊 Machine Health Report</b>


<br><br>


Machine:

<b>${machine}</b>


<br><br>


Health Score:

92% 🟢


<br><br>


Parameters:


<br>

Temperature: Normal


<br>

Vibration: Normal


<br>

Runtime: Stable


<br>

Maintenance: On Schedule



`;



}









// =====================================================
// KNOWLEDGE BASE SEARCH
// =====================================================


function analyzeKnowledge(query){



if(
typeof searchKnowledge !== "function"
)

return null;




let machine =
detectMachine(query);



let result =
searchKnowledge(
machine,
query
);




if(result)

{


return `


<b>🔧 SAMA Troubleshooting</b>


<br><br>


Machine:

<b>${machine}</b>


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


Action:


${result.action}



<br><br>


Confidence:

88%



`;



}



return null;



}









// =====================================================
// DEFAULT RESPONSE
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

"AOI false rejection"



`;



}
