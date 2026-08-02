// =====================================================
// SAMA - AI Maintenance Assistant
// Advanced Chat Controller
// =====================================================


// Global Chat Memory

let conversationHistory = [];


// Initialize Chat

document.addEventListener("DOMContentLoaded", () => {

    initializeSAMA();

});



function initializeSAMA(){


    console.log("SAMA AI Engine Connected");


    addBotMessage(`

    👋 Welcome back!

    I am <b>SAMA</b> - Solex AI Maintenance Assistant.

    <br><br>

    I can help with:

    <br>

    ⚙ Machine Breakdown Analysis

    <br>

    🚨 Alarm Troubleshooting

    <br>

    🛠 Preventive Maintenance

    <br>

    📦 Spare Recommendation

    <br>

    📊 Machine Health Analysis

    <br>

    📚 Maintenance History

    `);
addSuggestionButtons();

}





// =====================================================
// Send User Message
// =====================================================


function sendMessage(){


    let input =
    document.getElementById("userInput");


    let query =
    input.value.trim();



    if(query==="")
    return;



    addUserMessage(query);



    input.value="";



    conversationHistory.push({

        role:"user",

        message:query

    });



    showTyping();



    setTimeout(()=>{


        removeTyping();



        let response =
        processSAMAQuery(query);



        addBotMessage(response);



        conversationHistory.push({

            role:"assistant",

            message:response

        });



    },800);



}





// =====================================================
// AI Engine Connection
// =====================================================


function processSAMAQuery(query){



    try{


        // Connect with AI Engine


        if(typeof generateAIResponse === "function"){


            return generateAIResponse(query);


        }




        return fallbackResponse(query);



    }


    catch(error){


        console.error(error);


        return `

        ⚠️ SAMA encountered an error.

        Please check AI Engine connection.

        `;


    }



}







// =====================================================
// Chat UI Functions
// =====================================================


function addUserMessage(message){



let div =
document.createElement("div");


div.className="user-message";


div.innerHTML=`

<div class="message-header">

👨‍🔧 Operator

</div>

${message}

`;



document.getElementById("chatBox")
.appendChild(div);



scrollChat();


}




function addBotMessage(message){



let div =
document.createElement("div");


div.className="bot-message";


div.innerHTML=`

<div class="message-header">

🤖 SAMA

</div>


${message}

`;



document.getElementById("chatBox")
.appendChild(div);



scrollChat();


}





// =====================================================
// Typing Animation
// =====================================================


function showTyping(){


let div =
document.createElement("div");


div.id="typing";


div.className="bot-message";


div.innerHTML=

`

🤖 SAMA is analyzing...

`;



document.getElementById("chatBox")
.appendChild(div);



scrollChat();


}




function removeTyping(){


let typing =
document.getElementById("typing");


if(typing)

typing.remove();


}





function scrollChat(){


let box =
document.getElementById("chatBox");


box.scrollTop =
box.scrollHeight;


}





// =====================================================
// Offline Fallback Intelligence
// =====================================================


function fallbackResponse(query){


let q =
query.toLowerCase();



if(q.includes("stringer"))

{


return `

<b>Machine Detected:</b> Stringer

<br><br>

I need more details:

<br>

1. Alarm code

<br>

2. Current condition

<br>

3. Production status

<br><br>

Meanwhile check:

<br>

✓ Servo drive

<br>

✓ Vacuum pressure

<br>

✓ Cell loading sensor

<br>

✓ PLC alarm history


`;

}




if(q.includes("alarm"))

{


return `

<b>Alarm Analysis Required</b>

<br><br>

Please provide:

<br>

Machine Name + Alarm Code

<br><br>

Example:

<br>

"Stringer 02 Alarm E37"

`;

}




return `

I understand your query:

<b>${query}</b>

<br><br>

Please provide machine name or alarm code for detailed troubleshooting.

`;

}

// =====================================================
// SAMA Suggested Questions
// =====================================================


function addSuggestionButtons(){


let box =

document.getElementById("chatBox");



let div =
document.createElement("div");



div.className="bot-message";



div.innerHTML=`

<div class="message-header">
🤖 Try asking:
</div>


<button class="suggestion"
onclick="sendSuggestion('Stringer breakdown')">

Stringer Breakdown

</button>


<button class="suggestion"
onclick="sendSuggestion('Servo alarm E37')">

Servo Alarm E37

</button>


<button class="suggestion"
onclick="sendSuggestion('Laminator bubble defect')">

Laminator Bubble

</button>


<button class="suggestion"
onclick="sendSuggestion('AOI false rejection')">

AOI False NG

</button>



`;



box.appendChild(div);


}





function sendSuggestion(text){


document.getElementById("userInput").value=text;


sendMessage();


}
