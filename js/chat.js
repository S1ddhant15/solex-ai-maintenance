// =====================================================
// SAMA - Solex AI Maintenance Assistant
// Advanced Chat Controller
// File: chat.js
// =====================================================


// =====================================================
// GLOBAL VARIABLES
// =====================================================

let conversationHistory = [];

let chatBox = null;

let samaBusy = false;


// =====================================================
// INITIALIZE SAMA
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function(){

        chatBox =
            document.getElementById(
                "chatBox"
            );

        initializeSAMA();

        initializeChatInput();

    }
);


// =====================================================
// INITIAL WELCOME
// =====================================================

function initializeSAMA(){

    if(!chatBox){
        return;
    }


    // Use multilingual welcome if language.js exists

    if(
        typeof getSAMAWelcomeMessage ===
        "function"
    ){

        addBotMessage(
            getSAMAWelcomeMessage(),
            false
        );

        return;
    }


    // Fallback welcome

    addBotMessage(`

        👋 Welcome to <b>SAMA</b>

        <br><br>

        <b>S</b>olex
        <b>A</b>I
        <b>M</b>aintenance
        <b>A</b>ssistant

        <br><br>

        Industrial Troubleshooting &
        Maintenance Support

        <br><br>

        ⚙ Machine Breakdown

        <br>

        🚨 Alarm Troubleshooting

        <br>

        🛠 Preventive Maintenance

        <br>

        📦 Spare Parts

        <br>

        📊 Machine Health

        <br>

        📚 Breakdown History

    `, false);

}


// =====================================================
// INITIALIZE INPUT
// =====================================================

function initializeChatInput(){

    const input =
        document.getElementById(
            "userInput"
        );


    if(!input){
        return;
    }


    input.addEventListener(
        "keydown",
        function(event){

            if(
                event.key ===
                "Enter"
            ){

                event.preventDefault();

                sendMessage();

            }

        }
    );


    input.focus();

}


// =====================================================
// SEND MESSAGE
// =====================================================

function sendMessage(){

    if(samaBusy){
        return;
    }


    const input =
        document.getElementById(
            "userInput"
        );


    if(!input){
        return;
    }


    const message =
        input.value.trim();


    if(message === ""){
        return;
    }


    // Display user message

    addUserMessage(
        message
    );


    // Save conversation

    conversationHistory.push({

        role:"user",

        message:message,

        timestamp:
            new Date()

    });


    // Clear input

    input.value = "";


    // Lock assistant while processing

    samaBusy = true;


    showTyping();


    // Small delay to make interaction natural

    setTimeout(
        function(){

            removeTyping();


            let response;


            try{

                response =
                    processSAMAQuery(
                        message
                    );

            }
            catch(error){

                console.error(
                    "SAMA processing error:",
                    error
                );


                response =
                    getErrorMessage();

            }


            addBotMessage(
                response
            );


            conversationHistory.push({

                role:"assistant",

                message:response,

                timestamp:
                    new Date()

            });


            samaBusy = false;


            input.focus();

        },
        500
    );

}


// =====================================================
// CONNECT CHAT TO AI ENGINE
// =====================================================

function processSAMAQuery(query){

    if(
        typeof generateAIResponse ===
        "function"
    ){

        return generateAIResponse(
            query
        );

    }


    return `

        ⚠️ <b>SAMA AI Engine is not connected.</b>

        <br><br>

        Please verify:

        <br>

        <b>js/aiEngine.js</b>

    `;

}


// =====================================================
// USER MESSAGE
// =====================================================

function addUserMessage(message){

    if(!chatBox){
        return;
    }


    const div =
        document.createElement(
            "div"
        );


    div.className =
        "user-message";


    const operatorName =
        typeof t === "function"
        ?
        t("operator")
        :
        "Operator";


    div.innerHTML = `

        <div class="message-header">

            👨‍🔧 ${operatorName}

            <span class="message-time">
                ${getCurrentTime()}
            </span>

        </div>

        <div class="message-content">
            ${escapeHTML(message)}
        </div>

    `;


    chatBox.appendChild(
        div
    );


    scrollChat();

}


// =====================================================
// BOT MESSAGE
// =====================================================

function addBotMessage(
    message,
    showTime = true
){

    if(!chatBox){
        return;
    }


    const div =
        document.createElement(
            "div"
        );


    div.className =
        "bot-message";


    div.innerHTML = `

        <div class="message-header">

            <span>
                🤖 SAMA
            </span>

            ${
                showTime
                ?
                `
                <span class="message-time">
                    ${getCurrentTime()}
                </span>
                `
                :
                ""
            }

        </div>

        <div class="message-content">

            ${message}

        </div>

    `;


    chatBox.appendChild(
        div
    );


    scrollChat();

}


// =====================================================
// TYPING INDICATOR
// =====================================================

function showTyping(){

    if(!chatBox){
        return;
    }


    removeTyping();


    const div =
        document.createElement(
            "div"
        );


    div.id =
        "typing";


    div.className =
        "bot-message typing-message";


    let text =
        "SAMA is analyzing";


    if(
        typeof t ===
        "function"
    ){

        text =
            t("analyzing")
            .replace(
                "...",
                ""
            );

    }


    div.innerHTML = `

        <div class="message-header">

            🤖 SAMA

        </div>


        <div class="typing-content">

            <span>
                ${text}
            </span>


            <div class="typing-dots">

                <span></span>

                <span></span>

                <span></span>

            </div>

        </div>

    `;


    chatBox.appendChild(
        div
    );


    scrollChat();

}


// =====================================================
// REMOVE TYPING
// =====================================================

function removeTyping(){

    const typing =
        document.getElementById(
            "typing"
        );


    if(typing){

        typing.remove();

    }

}


// =====================================================
// QUICK QUESTION
// =====================================================

function askQuickQuestion(question){

    const input =
        document.getElementById(
            "userInput"
        );


    if(!input){
        return;
    }


    input.value =
        question;


    sendMessage();

}


// =====================================================
// COMPATIBILITY WITH OLD BUTTONS
// =====================================================

function sendSuggestion(text){

    askQuickQuestion(
        text
    );

}


// =====================================================
// CLEAR CHAT
// =====================================================

function clearSAMAChat(){

    if(!chatBox){
        return;
    }


    conversationHistory = [];


    chatBox.innerHTML = "";


    initializeSAMA();

}


// =====================================================
// REFRESH WELCOME AFTER LANGUAGE CHANGE
// =====================================================

function refreshSAMAWelcome(){

    if(
        conversationHistory.length >
        0
    ){

        return;
    }


    if(!chatBox){
        return;
    }


    chatBox.innerHTML = "";


    initializeSAMA();

}


// =====================================================
// GET CONVERSATION HISTORY
// =====================================================

function getConversationHistory(){

    return conversationHistory;

}


// =====================================================
// GET CURRENT TIME
// =====================================================

function getCurrentTime(){

    const now =
        new Date();


    return now.toLocaleTimeString(
        [],
        {
            hour:"2-digit",
            minute:"2-digit"
        }
    );

}


// =====================================================
// ESCAPE USER INPUT
// Prevent HTML injection from chat input
// =====================================================

function escapeHTML(text){

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text;


    return div.innerHTML;

}


// =====================================================
// ERROR MESSAGE
// =====================================================

function getErrorMessage(){

    const language =
        typeof getSAMALanguage ===
        "function"
        ?
        getSAMALanguage()
        :
        "en";


    if(language === "hi"){

        return `

            ⚠️ <b>SAMA अनुरोध को प्रोसेस नहीं कर सका।</b>

            <br><br>

            कृपया दोबारा प्रयास करें।

        `;

    }


    if(language === "gu"){

        return `

            ⚠️ <b>SAMA વિનંતી પ્રોસેસ કરી શક્યું નથી.</b>

            <br><br>

            કૃપા કરીને ફરી પ્રયાસ કરો.

        `;

    }


    return `

        ⚠️ <b>SAMA could not process the request.</b>

        <br><br>

        Please try again.

    `;

}


// =====================================================
// SHOW SYSTEM MESSAGE
// =====================================================

function showSystemMessage(message){

    if(!chatBox){
        return;
    }


    const div =
        document.createElement(
            "div"
        );


    div.className =
        "system-message";


    div.innerHTML =
        message;


    chatBox.appendChild(
        div
    );


    scrollChat();

}


// =====================================================
// SCROLL CHAT
// =====================================================

function scrollChat(){

    if(!chatBox){
        return;
    }


    setTimeout(
        function(){

            chatBox.scrollTop =
                chatBox.scrollHeight;

        },
        50
    );

}


// =====================================================
// CHAT STATUS
// =====================================================

function getSAMAChatStatus(){

    return {

        status:
            samaBusy
            ?
            "Analyzing"
            :
            "Ready",

        messages:
            conversationHistory.length,

        language:
            typeof getSAMALanguage ===
            "function"
            ?
            getSAMALanguage()
            :
            "en"

    };

}


// =====================================================
// READY
// =====================================================

console.log(
    "✅ SAMA Chat Controller Loaded"
);
