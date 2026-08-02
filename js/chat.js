// =====================================================
// SAMA - Solex AI Maintenance Assistant
// CHAT CONTROLLER
// =====================================================


let conversationHistory = [];

let chatBox;



// =====================================================
// INITIALIZATION
// =====================================================


document.addEventListener(
"DOMContentLoaded",
()=>{


    chatBox = document.getElementById("chatBox");


    if(!chatBox){

        console.error(
        "SAMA ERROR: chatBox not found"
        );

        return;

    }


    initializeSAMA();


});





// =====================================================
// START MESSAGE
// =====================================================


function initializeSAMA(){



addBotMessage(`


👋 Welcome to <b>SAMA</b>


<br><br>


I am <b>Solex AI Maintenance Assistant</b>


<br><br>


I can help you with:


<br><br>


⚙ Machine Breakdown Analysis


<br>

🚨 Alarm Troubleshooting


<br>

🛠 Preventive Maintenance


<br>

📦 Spare Recommendation


<br>

📊 Machine Health


<br><br>


Try asking:


<br><br>


<b>"Stringer breakdown"</b>


<br>


<b>"Servo alarm E37"</b>


<br>


<b>"Laminator PM checklist"</b>


<br>


<b>"AOI false rejection"</b>



`);


}






// =====================================================
// SEND MESSAGE
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
// AI ENGINE CONNECTION
// =====================================================


function processSAMAQuery(query){



try{



if(
typeof generateAIResponse === "function"
){



return generateAIResponse(query);


}



return fallbackResponse(query);



}


catch(error){



console.error(
"SAMA ERROR:",
error
);



return `


⚠️ SAMA AI Error


<br><br>


Please check:


<br>

✓ aiEngine.js


<br>

✓ knowledge.js


<br>

✓ alarmDatabase.js



`;



}



}








// =====================================================
// USER MESSAGE
// =====================================================


function addUserMessage(message){



let div =
document.createElement("div");



div.className =
"user-message";



div.innerHTML = `


<div class="message-header">

👨‍🔧 Operator

</div>


${message}


`;



chatBox.appendChild(div);


scrollChat();



}







// =====================================================
// BOT MESSAGE
// =====================================================


function addBotMessage(message){



let div =
document.createElement("div");



div.className =
"bot-message";



div.innerHTML = `


<div class="message-header">

🤖 SAMA

</div>


${message}


`;



chatBox.appendChild(div);


scrollChat();



}







// =====================================================
// TYPING EFFECT
// =====================================================


function showTyping(){



let div =
document.createElement("div");



div.id =
"typing";



div.className =
"bot-message";



div.innerHTML = `

🤖 SAMA is analyzing...

`;



chatBox.appendChild(div);



scrollChat();



}




function removeTyping(){



let typing =
document.getElementById("typing");



if(typing)

typing.remove();



}







// =====================================================
// AUTO SCROLL
// =====================================================


function scrollChat(){



if(chatBox)

{

chatBox.scrollTop =
chatBox.scrollHeight;

}


}







// =====================================================
// FALLBACK AI
// =====================================================


function fallbackResponse(query){



let text =
query.toLowerCase();




if(text.includes("stringer"))

{


return `


<b>Machine Detected:</b> Stringer


<br><br>


Please provide:


<br>

1. Alarm Code


<br>

2. Current condition


<br>

3. Production status


<br><br>


Check:


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



if(text.includes("alarm"))

{


return `


<b>🚨 Alarm Investigation</b>


<br><br>


Please provide:


<br>

Machine Name


<br>

Alarm Code


<br>

Problem Symptom



<br><br>


Example:


<br>


Stringer Alarm E37



`;

}





return `


🤖 I received:


<br><br>


<b>${query}</b>


<br><br>


Please provide machine name or alarm code.


`;



}








// =====================================================
// QUICK QUESTIONS
// =====================================================


function addSuggestionButtons(){



let div =
document.createElement("div");



div.className =
"bot-message";



div.innerHTML = `


<b>Try:</b>


<br><br>


<button onclick="sendSuggestion('Stringer breakdown')">

Stringer Breakdown

</button>


<button onclick="sendSuggestion('Servo alarm E37')">

Servo Alarm E37

</button>


<button onclick="sendSuggestion('Laminator PM')">

Laminator PM

</button>


`;



chatBox.appendChild(div);


}





function sendSuggestion(text){



document.getElementById("userInput").value=text;


sendMessage();


}
