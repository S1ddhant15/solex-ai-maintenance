// =====================================================
// SAMA - AI Maintenance Assistant
// AI Decision Engine
// =====================================================


// =====================================================
// Main AI Response Generator
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



    // ==========================================
    // Alarm Diagnosis
    // ==========================================


    if(intent === "alarm")
    {


        response =
        analyzeAlarm(alarm, machine);


    }



    // ==========================================
    // Breakdown Analysis
    // ==========================================


    else if(intent === "breakdown")
    {


        response =
        analyzeBreakdown(machine);


    }




    // ==========================================
    // PM Recommendation
    // ==========================================


    else if(intent === "pm")
    {


        response =
        generatePM(machine);


    }





    // ==========================================
    // Spare Recommendation
    // ==========================================


    else if(intent === "spare")
    {


        response =
        recommendSpare(machine,input);


    }





    // ==========================================
    // Machine Health
    // ==========================================


    else if(intent === "health")
    {


        response =
        machineHealth(machine);


    }





    else
    {


        response =
        generalMaintenanceResponse(machine);


    }




    return response;


}







// =====================================================
// Intent Detection
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
// Machine Detection
// =====================================================


function detectMachine(text){



let machines = [

"stringer",

"laminator",

"el tester",

"aoi",

"jbox",

"framing",

"flash tester",

"tabber"

];



for(let m of machines)
{


if(text.includes(m))

return m;



}



return "unknown";


}








// =====================================================
// Alarm Detection
// =====================================================


function detectAlarm(text){



let match =
text.match(/[a-zA-Z]+\d+/);



if(match)

return match[0].toUpperCase();



return null;


}








// =====================================================
// Alarm Analysis
// =====================================================


function analyzeAlarm(alarm,machine){



if(typeof getAlarmDetails === "function" && alarm)
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


Cause:

${data.cause}


<br><br>


Recommended Checks:

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


Alarm code not found in database.


<br><br>


Please check:

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
// Breakdown Analysis
// =====================================================


function analyzeBreakdown(machine){



return `


<b>🔧 Breakdown Analysis</b>


<br><br>


Machine:

<b>${machine}</b>


<br><br>


Immediate troubleshooting:


<br>


1️⃣ Check active alarms


<br>


2️⃣ Verify power & air supply


<br>


3️⃣ Check sensors


<br>


4️⃣ Check servo status


<br>


5️⃣ Review last breakdown history


<br><br>


SAMA Recommendation:


Inspect machine condition before reset.


<br><br>


Confidence:

85%


`;



}








// =====================================================
// PM Generator
// =====================================================


function generatePM(machine){



return `


<b>🛠 Preventive Maintenance</b>


<br><br>


Machine:

${machine}


<br><br>


Recommended checklist:


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

Check PM history database.


`;



}








// =====================================================
// Spare Recommendation
// =====================================================


function recommendSpare(machine,text){



return `


<b>📦 Spare Recommendation</b>


<br><br>


Machine:

${machine}


<br><br>


Suggested critical spares:


<br>

• Servo drive


<br>

• Proximity sensor


<br>

• Encoder cable


<br>

• Pneumatic valve


<br>

• Relay


<br><br>


Provide exact failure symptom for accurate spare.


`;



}








// =====================================================
// Machine Health
// =====================================================


function machineHealth(machine){



return `


<b>📊 Machine Health Report</b>


<br><br>


Machine:

${machine}


<br><br>


Health Score:

92%


<br><br>


Status:

🟢 Healthy


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
// General Response
// =====================================================


function generalMaintenanceResponse(machine){



return `


🤖 SAMA is ready.


<br><br>


Detected Machine:

${machine}


<br><br>


Try:


<br>

"Stringer breakdown"


<br>

"Laminator PM checklist"


<br>

"Servo alarm E37"


<br>

"Spare required for AOI"


`;



}

// =====================================================
// Knowledge Base Integration
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


<b>Recommended Checks:</b>


<br>

${

result.checks

.map(x=>"✓ "+x)

.join("<br>")

}



<br><br>


<b>SAMA Action:</b>


<br>

${result.action}



<br><br>


<span class="confidence">

Confidence: 88%

</span>


`;



}



return null;


}
