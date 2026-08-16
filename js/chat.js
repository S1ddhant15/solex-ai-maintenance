// =====================================================
// SAMA - AI Maintenance Assistant
// Multi-Language Chat Controller
// File: chat.js
// =====================================================


// =====================================================
// GLOBAL VARIABLES
// =====================================================

let conversationHistory = [];

let chatBox;


// =====================================================
// INITIALIZE SAMA
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        chatBox =
            document.getElementById("chatBox");


        if(!chatBox){

            console.error(
                "SAMA Error: chatBox not found"
            );

            return;
        }


        initializeSAMA();

    }
);


// =====================================================
// INITIAL WELCOME MESSAGE
// =====================================================

function initializeSAMA(){

    addBotMessage(
        getWelcomeMessage()
    );

}


// =====================================================
// REFRESH WELCOME AFTER LANGUAGE CHANGE
// =====================================================

function refreshSAMAWelcome(){

    if(!chatBox){

        return;
    }


    chatBox.innerHTML = "";


    initializeSAMA();

}


// =====================================================
// GET WELCOME MESSAGE
// =====================================================

function getWelcomeMessage(){

    const language =
        typeof getSAMALanguage === "function"
            ? getSAMALanguage()
            : "en";


    // =================================================
    // HINDI
    // =================================================

    if(language === "hi"){

        return `

        👋 <b>SAMA में आपका स्वागत है</b>

        <br><br>

        मैं <b>Solex AI Maintenance Assistant</b> हूँ।

        <br><br>

        मैं आपकी सहायता कर सकता हूँ:

        <br><br>

        ⚙ मशीन ब्रेकडाउन विश्लेषण

        <br>

        🚨 अलार्म ट्रबलशूटिंग

        <br>

        🛠 प्रिवेंटिव मेंटेनेंस

        <br>

        📦 स्पेयर पार्ट सुझाव

        <br>

        📊 मशीन हेल्थ

        <br>

        📚 ब्रेकडाउन हिस्ट्री

        <br><br>

        <b>उदाहरण:</b>

        <br>

        "Servo alarm E37"

        <br>

        "Stringer cell breakage"

        <br>

        "Laminator bubble defect"

        <br>

        "Stringer health"

        `;

    }


    // =================================================
    // GUJARATI
    // =================================================

    if(language === "gu"){

        return `

        👋 <b>SAMA માં આપનું સ્વાગત છે</b>

        <br><br>

        હું <b>Solex AI Maintenance Assistant</b> છું.

        <br><br>

        હું નીચેના વિષયોમાં મદદ કરી શકું છું:

        <br><br>

        ⚙ મશીન બ્રેકડાઉન વિશ્લેષણ

        <br>

        🚨 અલાર્મ ટ્રબલશૂટિંગ

        <br>

        🛠 પ્રિવેન્ટિવ મેન્ટેનન્સ

        <br>

        📦 સ્પેર પાર્ટ ભલામણ

        <br>

        📊 મશીન હેલ્થ

        <br>

        📚 બ્રેકડાઉન હિસ્ટ્રી

        <br><br>

        <b>ઉદાહરણ:</b>

        <br>

        "Servo alarm E37"

        <br>

        "Stringer cell breakage"

        <br>

        "Laminator bubble defect"

        <br>

        "Stringer health"

        `;

    }


    // =================================================
    // ENGLISH
    // =================================================

    return `

    👋 Welcome to <b>SAMA</b>

    <br><br>

    <b>S</b>olex <b>A</b>I <b>M</b>aintenance Assistant

    <br><br>

    I can help with:

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

    <br>

    📚 Breakdown History

    <br><br>

    <b>Try:</b>

    <br>

    "Servo alarm E37"

    <br>

    "Stringer cell breakage"

    <br>

    "Laminator bubble defect"

    <br>

    "Stringer health"

    `;

}


// =====================================================
// SEND MESSAGE
// =====================================================

function sendMessage(){

    const input =
        document.getElementById("userInput");


    if(!input){

        return;
    }


    const message =
        input.value.trim();


    if(message === ""){

        return;
    }


    addUserMessage(message);


    input.value = "";


    conversationHistory.push({

        role: "user",

        message: message

    });


    showTyping();


    setTimeout(
        () => {

            removeTyping();


            const response =
                processSAMAQuery(message);


            addBotMessage(response);


            conversationHistory.push({

                role: "assistant",

                message: response

            });


            if(
                conversationHistory.length > 30
            ){

                conversationHistory.shift();

            }

        },
        800
    );

}


// =====================================================
// CONNECT AI ENGINE
// =====================================================

function processSAMAQuery(query){

    try{

        if(
            typeof generateAIResponse === "function"
        ){

            return generateAIResponse(query);

        }


        return getEngineDisconnectedMessage();

    }
    catch(error){

        console.error(
            "SAMA Error:",
            error
        );


        return getSAMAErrorMessage(error);

    }

}


// =====================================================
// USER MESSAGE
// =====================================================

function addUserMessage(message){

    if(!chatBox){

        return;
    }


    const div =
        document.createElement("div");


    div.className =
        "user-message";


    div.innerHTML = `

        <div class="message-header">

            👨‍🔧 ${getOperatorLabel()}

        </div>

        ${escapeHTML(message)}

    `;


    chatBox.appendChild(div);


    scrollChat();

}


// =====================================================
// BOT MESSAGE
// =====================================================

function addBotMessage(message){

    if(!chatBox){

        return;
    }


    const div =
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
// TYPING MESSAGE
// =====================================================

function showTyping(){

    if(!chatBox){

        return;
    }


    removeTyping();


    const div =
        document.createElement("div");


    div.id =
        "typing";


    div.className =
        "bot-message";


    div.innerHTML = `

        <div class="message-header">

            🤖 SAMA

        </div>

        ${getTypingText()}

    `;


    chatBox.appendChild(div);


    scrollChat();

}


// =====================================================
// REMOVE TYPING
// =====================================================

function removeTyping(){

    const typing =
        document.getElementById("typing");


    if(typing){

        typing.remove();

    }

}


// =====================================================
// AUTO SCROLL
// =====================================================

function scrollChat(){

    if(chatBox){

        chatBox.scrollTop =
            chatBox.scrollHeight;

    }

}


// =====================================================
// QUICK BUTTON
// =====================================================

function sendSuggestion(text){

    const input =
        document.getElementById("userInput");


    if(!input){

        return;
    }


    input.value = text;


    sendMessage();

}


// =====================================================
// OPERATOR LABEL
// =====================================================

function getOperatorLabel(){

    const language =
        typeof getSAMALanguage === "function"
            ? getSAMALanguage()
            : "en";


    if(language === "hi"){

        return "ऑपरेटर";

    }


    if(language === "gu"){

        return "ઓપરેટર";

    }


    return "Operator";

}


// =====================================================
// TYPING TEXT
// =====================================================

function getTypingText(){

    const language =
        typeof getSAMALanguage === "function"
            ? getSAMALanguage()
            : "en";


    if(language === "hi"){

        return "SAMA विश्लेषण कर रहा है...";

    }


    if(language === "gu"){

        return "SAMA વિશ્લેષણ કરી રહ્યું છે...";

    }


    return "SAMA is analyzing...";

}


// =====================================================
// ENGINE DISCONNECTED MESSAGE
// =====================================================

function getEngineDisconnectedMessage(){

    const language =
        typeof getSAMALanguage === "function"
            ? getSAMALanguage()
            : "en";


    if(language === "hi"){

        return `

        ⚠️ AI Engine कनेक्ट नहीं है।

        <br><br>

        कृपया aiEngine.js जांचें।

        `;

    }


    if(language === "gu"){

        return `

        ⚠️ AI Engine કનેક્ટ થયેલ નથી.

        <br><br>

        કૃપા કરીને aiEngine.js તપાસો.

        `;

    }


    return `

    ⚠️ AI Engine not connected.

    <br><br>

    Please check aiEngine.js.

    `;

}


// =====================================================
// ERROR MESSAGE
// =====================================================

function getSAMAErrorMessage(error){

    const language =
        typeof getSAMALanguage === "function"
            ? getSAMALanguage()
            : "en";


    const safeError =
        escapeHTML(
            error && error.message
                ? error.message
                : String(error)
        );


    if(language === "hi"){

        return `

        ⚠️ SAMA में त्रुटि आई है।

        <br><br>

        ${safeError}

        `;

    }


    if(language === "gu"){

        return `

        ⚠️ SAMA માં ભૂલ આવી છે.

        <br><br>

        ${safeError}

        `;

    }


    return `

    ⚠️ SAMA Error

    <br><br>

    ${safeError}

    `;

}


// =====================================================
// HTML ESCAPE
// Prevent user input from becoming executable HTML
// =====================================================

function escapeHTML(value){

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// =====================================================
// READY
// =====================================================

console.log(
    "✅ SAMA Multi-Language Chat Controller Loaded"
);
