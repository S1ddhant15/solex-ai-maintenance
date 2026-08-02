// ==========================================
// SOLEX AI MAINTENANCE ASSISTANT
// CHAT ENGINE v2.0
// Works with knowledge.js
// ==========================================

// Chat Container
const chatMessages = document.getElementById("chatMessages");

// Auto-open problem from other pages
window.onload = function () {

    const selectedProblem = localStorage.getItem("selectedProblem");

    if (selectedProblem) {

        document.getElementById("userInput").value = selectedProblem;

        localStorage.removeItem("selectedProblem");

        sendMessage();
    }

};


// =========================
// SEND MESSAGE
// =========================

function sendMessage() {

    const input = document.getElementById("userInput");

    const question = input.value.trim();

    if (question === "") return;

    addMessage(question, "user");

    input.value = "";

    showTyping();

    setTimeout(() => {

        removeTyping();

        generateAIResponse(question);

    }, 1200);

}



// =========================
// ENTER KEY
// =========================

function checkEnter(event) {

    if (event.key === "Enter") {

        sendMessage();

    }

}



// =========================
// SUGGESTION BUTTONS
// =========================

function sendSuggestion(text) {

    document.getElementById("userInput").value = text;

    sendMessage();

}



// =========================
// ADD MESSAGE
// =========================

function addMessage(message, sender) {

    const div = document.createElement("div");

    div.className = "message " + sender;

    div.innerHTML = message;

    chatMessages.appendChild(div);

    chatMessages.scrollTop = chatMessages.scrollHeight;

}



// =========================
// TYPING ANIMATION
// =========================

function showTyping() {

    const div = document.createElement("div");

    div.className = "message bot";

    div.id = "typing";

    div.innerHTML = "🤖 AI is analysing the problem...";

    chatMessages.appendChild(div);

    chatMessages.scrollTop = chatMessages.scrollHeight;

}



function removeTyping() {

    const typing = document.getElementById("typing");

    if (typing) {

        typing.remove();

    }

}



// =========================
// AI RESPONSE
// =========================

function generateAIResponse(question) {

    const result = searchKnowledge(question);

    if (result) {

        const answer = `

<b>🔧 Machine</b><br>
${result.machine}

<br><br>

<b>⚠ Issue</b><br>
${result.title}

<br><br>

<b>Possible Causes</b><br>
${result.causes.map(c => "• " + c).join("<br>")}

<br><br>

<b>Recommended Checks</b><br>
${result.checks.map(c => "✓ " + c).join("<br>")}

<br><br>

<b>Estimated Repair Time</b><br>
${result.repair}

<br><br>

<b>Safety Instruction</b><br>
${result.safety}

        `;

        addMessage(answer, "bot");

        return;

    }



    // Default Response

    const answer = `

<b>🤖 Solex AI Assistant</b>

<br><br>

I couldn't find an exact solution.

Please provide:

<br><br>

• Machine Name

<br>

• Alarm Code

<br>

• Error Message

<br>

• Machine Status

<br><br>

<b>Example Questions</b>

<br><br>

• Laminator Vacuum Error

<br>

• Servo Alarm

<br>

• Heater Temperature Low

<br>

• EL Camera Fault

<br>

• Conveyor Motor Not Running

`;

    addMessage(answer, "bot");

}
