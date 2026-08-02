// ==========================================
// SOLEX AI MAINTENANCE ASSISTANT
// CHAT.JS
// ==========================================

const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");

// Welcome Message
window.onload = function () {

    addBotMessage(
        "👋 Hello! I am <b>SAMA</b> (Solex AI Maintenance Assistant).<br><br>" +
        "I can help you with:<br><br>" +
        "⚙️ Machine Breakdown<br>" +
        "🔧 Troubleshooting<br>" +
        "📅 Preventive Maintenance<br>" +
        "🚨 Alarm Codes<br>" +
        "📋 Work Orders<br><br>" +
        "Ask me anything."
    );

};

// Send by Enter Key
if (userInput) {

    userInput.addEventListener("keypress", function (e) {

        if (e.key === "Enter") {

            sendMessage();

        }

    });

}

// ==========================================

function sendMessage() {

    let question = userInput.value.trim();

    if (question === "") return;

    addUserMessage(question);

    userInput.value = "";

    showTyping();

    setTimeout(() => {

        removeTyping();

        generateReply(question);

    }, 1000);

}

// ==========================================

function generateReply(question) {

    question = question.toLowerCase();

    //------------------------------------------------
    // Knowledge Base Search
    //------------------------------------------------

    if (typeof searchKnowledge === "function") {

        const result = searchKnowledge(question);

        if (result) {

            let answer = `

<b>🏭 Machine</b><br>

${result.machine}

<br><br>

<b>⚠️ Problem</b><br>

${result.title}

<br><br>

<b>🔍 Possible Causes</b><br>

${result.causes.map(c => "• " + c).join("<br>")}

<br><br>

<b>✅ Recommended Checks</b><br>

${result.checks.map(c => "✔ " + c).join("<br>")}

<br><br>

<b>🛠 Estimated Repair</b><br>

${result.repair}

<br><br>

<b>🦺 Safety</b><br>

${result.safety}

`;

            addBotMessage(answer);

            return;

        }

    }

    //------------------------------------------------

    if (question.includes("hello") || question.includes("hi")) {

        addBotMessage("👋 Hello Engineer! How can I help you today?");

        return;

    }

    if (question.includes("pm")) {

        addBotMessage(

            "📅 Preventive Maintenance Tips<br><br>" +

            "✔ Check Lubrication<br>" +

            "✔ Clean Sensors<br>" +

            "✔ Tighten Bolts<br>" +

            "✔ Verify Air Pressure<br>" +

            "✔ Inspect Servo Motors"

        );

        return;

    }

    if (question.includes("work order")) {

        addBotMessage(

            "📋 Work Order Generated Successfully.<br><br>" +

            "Status : Open<br>" +

            "Priority : Medium<br>" +

            "Assigned : Maintenance Team"

        );

        return;

    }

    if (question.includes("alarm")) {

        addBotMessage(

            "🚨 Search the Alarm Lookup page or enter the alarm code like E101."

        );

        return;

    }

    if (question.includes("machine")) {

        addBotMessage(

            "🏭 Open the Machine Library to view machine details and health."

        );

        return;

    }

    //------------------------------------------------

    addBotMessage(

        "🤖 Sorry, I don't have an answer for that yet.<br><br>" +

        "Please try another maintenance-related question."

    );

}

// ==========================================

function addUserMessage(text) {

    const msg = document.createElement("div");

    msg.className = "message user";

    msg.innerHTML = text;

    chatBox.appendChild(msg);

    scrollBottom();

}

// ==========================================

function addBotMessage(text) {

    const msg = document.createElement("div");

    msg.className = "message bot";

    msg.innerHTML = text;

    chatBox.appendChild(msg);

    scrollBottom();

}

// ==========================================

function showTyping() {

    const typing = document.createElement("div");

    typing.className = "message bot";

    typing.id = "typing";

    typing.innerHTML = "🤖 Typing...";

    chatBox.appendChild(typing);

    scrollBottom();

}

// ==========================================

function removeTyping() {

    let typing = document.getElementById("typing");

    if (typing)

        typing.remove();

}

// ==========================================

function scrollBottom() {

    chatBox.scrollTop = chatBox.scrollHeight;

}
