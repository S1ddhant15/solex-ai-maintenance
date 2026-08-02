// =====================================================
// SAMA - AI Maintenance Assistant
// Chat Controller
// File: chat.js
// =====================================================


// =====================================================
// Global Variables
// =====================================================


let conversationHistory = [];

let chatBox;





// =====================================================
// INITIALIZE SAMA
// =====================================================


document.addEventListener(
"DOMContentLoaded",
()=>{


chatBox =
document.getElementById("chatBox");



initializeSAMA();


});






function initializeSAMA(){



addBotMessage(`


👋 Welcome to <b>SAMA</b>


<br><br>


<b>S</b>olex <b>A</b>I <b>M</b>aintenance Assistant


<br><br>


I can help with:


<br><br>


⚙ Machine Breakdown


<br>

🚨 Alarm Troubleshooting


<br>

🛠 Preventive Maintenance


<br>

📦 Spare Recommendation


<br>

📊 Machine Health


<br>

📚 Breakdown History


<br><br>


Try:


<br>

"Servo alarm E37"


<br>

"Stringer cell breakage"


<br>

"Laminator bubble defect"


<br>

"Stringer health"


`);


}









// =====================================================
// SEND MESSAGE
// =====================================================


function sendMessage(){



let input =
document.getElementById("userInput");



let message =
input.value.trim();



if(message==="")

return;




addUserMessage(message);



input.value="";



conversationHistory.push({


role:"user",

message:message


});



showTyping();




setTimeout(()=>{



removeTyping();



let response =
processSAMAQuery(message);



addBotMessage(response);



conversationHistory.push({


role:"assistant",

message:response


});



},800);



}









// =====================================================
// CONNECT AI ENGINE
// =====================================================


function processSAMAQuery(query){



try{



if(
typeof generateAIResponse === "function"
)

{


return generateAIResponse(query);


}



return `

⚠️ AI Engine not connected.

Check aiEngine.js

`;



}

catch(error){



console.error(error);



return `

⚠️ SAMA Error

<br>

${error}

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
// TYPING
// =====================================================


function showTyping(){



let div =
document.createElement("div");


div.id="typing";


div.className="bot-message";



div.innerHTML =

`

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
// SCROLL
// =====================================================


function scrollChat(){



if(chatBox)

{


chatBox.scrollTop =
chatBox.scrollHeight;


}



}









// =====================================================
// QUICK BUTTONS
// =====================================================


function sendSuggestion(text){



document.getElementById(
"userInput"
).value=text;



sendMessage();


}
