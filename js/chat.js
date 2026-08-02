// ==========================================
// SOLEX AI MAINTENANCE ASSISTANT
// CHAT ENGINE
// ==========================================


const chatMessages = document.getElementById("chatMessages");


// Dummy Maintenance Knowledge Base

const knowledge = {

    "vacuum error": {

        title:"Laminator Vacuum Error",

        response:`

<b>Possible Causes:</b><br><br>

1. Vacuum pump not running<br>
2. Vacuum leakage in pipe line<br>
3. Solenoid valve failure<br>
4. Vacuum sensor malfunction<br>
5. Filter blockage<br><br>


<b>Recommended Checks:</b><br><br>

✓ Check vacuum pump status<br>
✓ Inspect vacuum hose leakage<br>
✓ Verify solenoid valve operation<br>
✓ Check sensor feedback in PLC<br>
✓ Clean vacuum filter<br><br>


<b>Estimated Repair Time:</b><br>

20-30 minutes

`

    },


    "servo alarm": {


        title:"Servo Alarm",

        response:`

<b>Possible Causes:</b><br><br>

1. Servo overload<br>
2. Encoder cable loose<br>
3. Motor temperature high<br>
4. Servo drive fault<br>
5. Mechanical obstruction<br><br>


<b>Recommended Checks:</b><br><br>

✓ Check servo drive alarm code<br>
✓ Inspect motor movement<br>
✓ Verify encoder connection<br>
✓ Check mechanical alignment<br><br>


<b>Estimated Repair Time:</b><br>

15-30 minutes

`

    },


    "heater": {


        title:"Heater Temperature Issue",

        response:`

<b>Possible Causes:</b><br><br>

1. Heater failure<br>
2. SSR damaged<br>
3. Thermocouple issue<br>
4. PID controller error<br><br>


<b>Recommended Checks:</b><br><br>

✓ Measure heater current<br>
✓ Check SSR output<br>
✓ Verify thermocouple reading<br>
✓ Check PID parameters<br><br>


<b>Estimated Repair Time:</b><br>

30 minutes

`

    },


    "camera": {


        title:"EL Camera Fault",

        response:`

<b>Possible Causes:</b><br><br>

1. Camera communication error<br>
2. Lighting issue<br>
3. Lens contamination<br>
4. Software trigger problem<br><br>


<b>Recommended Checks:</b><br><br>

✓ Restart camera software<br>
✓ Clean lens<br>
✓ Check Ethernet connection<br>
✓ Verify trigger signal<br><br>


<b>Estimated Repair Time:</b><br>

15 minutes

`

    }


};



// Send Message


function sendMessage(){


    let input=document.getElementById("userInput");

    let message=input.value.trim();


    if(message===""){
        return;
    }


    addMessage(message,"user");


    input.value="";


    setTimeout(()=>{

        generateAIResponse(message);

    },800);


}



// Enter Button

function checkEnter(event){

    if(event.key==="Enter"){

        sendMessage();

    }

}




// Suggested Buttons

function sendSuggestion(text){

    document.getElementById("userInput").value=text;

    sendMessage();

}





// Add Message


function addMessage(message,type){


    let div=document.createElement("div");

    div.className="message "+type;


    div.innerHTML=message;


    chatMessages.appendChild(div);


    chatMessages.scrollTop=
    chatMessages.scrollHeight;


}




// AI Response


function generateAIResponse(question){


    let answer=

    `I am analyzing your problem... 🔍`;


    let found=false;


    for(let key in knowledge){


        if(question.toLowerCase().includes(key)){


            answer=

            "<b>"+knowledge[key].title+
            "</b><br><br>"+
            knowledge[key].response;


            found=true;

            break;

        }

    }



    if(!found){


        answer=`

I could not find an exact match.

Please provide:

<br><br>

• Machine Name<br>
• Alarm Code<br>
• Error Message<br>
• Current Condition

<br>

Example:

<br>

"Laminator vacuum error"

`;

    }



    showTyping();


    setTimeout(()=>{

        removeTyping();

        addMessage(answer,"bot");


    },1500);



}




// Typing Animation


function showTyping(){


    let typing=document.createElement("div");

    typing.id="typing";

    typing.className="message bot";

    typing.innerHTML="🤖 AI is thinking...";


    chatMessages.appendChild(typing);


}




function removeTyping(){


    let typing=document.getElementById("typing");


    if(typing){

        typing.remove();

    }

}
