// ==========================================
// SOLEX AI MAINTENANCE ASSISTANT
// CHAT ENGINE
// ==========================================

const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userInput");

function sendMessage() {

    const question = input.value.trim();

    if (question === "") return;

    addMessage(question, "user");

    input.value = "";

    setTimeout(() => {

        processQuestion(question);

    }, 600);

}

function addMessage(message, sender) {

    const div = document.createElement("div");

    div.className = sender === "user"
        ? "user-message"
        : "bot-message";

    div.innerHTML = message;

    chatBox.appendChild(div);

    chatBox.scrollTop = chatBox.scrollHeight;

}

function processQuestion(question) {

    let q = question.toLowerCase();

    // Machine Knowledge
    let machine = searchKnowledge(q);

    if (machine) {

        let answer = `

<b>🏭 Machine</b>

${machine.machine}

<br><br>

<b>⚠ Issue</b>

${machine.title}

<br><br>

<b>🔍 Possible Causes</b>

<br>

${machine.causes.map(c=>"• "+c).join("<br>")}

<br><br>

<b>✅ Recommended Checks</b>

<br>

${machine.checks.map(c=>"✓ "+c).join("<br>")}

<br><br>

<b>🛠 Estimated Repair</b>

${machine.repair}

<br><br>

<b>🦺 Safety</b>

${machine.safety}

`;

        addMessage(answer,"bot");

        return;

    }

    // Alarm Database

    let alarm = searchAlarm(question);

    if(alarm){

        let answer = `

<b>🚨 Alarm Code</b>

${alarm.code}

<br><br>

<b>Description</b>

${alarm.description}

<br><br>

<b>Possible Causes</b>

<br>

${alarm.causes.map(c=>"• "+c).join("<br>")}

<br><br>

<b>Corrective Action</b>

<br>

${alarm.solution.map(c=>"✓ "+c).join("<br>")}

`;

        addMessage(answer,"bot");

        return;

    }

    // Greetings

    if(q.includes("hello") || q.includes("hi")){

        addMessage("👋 Hello! How can I help you today?", "bot");

        return;

    }

    // Machine List

    if(q.includes("machine")){

        addMessage(`

<b>Available Machines</b>

<br><br>

⚙️ Stringer 01

<br>

🔥 Laminator 01

<br>

📷 EL Tester

<br>

🔧 Bussing Machine

`, "bot");

        return;

    }

    // Default

    addMessage(`

Sorry, I couldn't find that information.

Try asking:

• Servo Alarm E205

• Laminator Vacuum

• Stringer Conveyor

• PM Checklist

• EL Tester

`, "bot");

}

input.addEventListener("keypress", function(e){

    if(e.key==="Enter"){

        sendMessage();

    }

});
