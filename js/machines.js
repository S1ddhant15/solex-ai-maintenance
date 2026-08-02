// ==========================================
// SOLEX AI MAINTENANCE ASSISTANT
// MACHINES.JS
// ==========================================

let machineList = [];

// ==========================================
// Load Machines
// ==========================================

document.addEventListener("DOMContentLoaded", loadMachines);

async function loadMachines() {

    try {

        const response = await fetch("../data/machines.json");

        const data = await response.json();

        machineList = data.machines;

        displayMachines(machineList);

    }

    catch (error) {

        console.error("Machine data could not be loaded.", error);

        document.getElementById("machineContainer").innerHTML =
        "<h3>❌ Unable to load machine database.</h3>";

    }

}

// ==========================================
// Display Machine Cards
// ==========================================

function displayMachines(machines) {

    const container = document.getElementById("machineContainer");

    container.innerHTML = "";

    machines.forEach(machine => {

        let healthClass = getHealthClass(machine.health);

        let statusBadge = getStatusBadge(machine.status);

        container.innerHTML += `

        <div class="card machine-card"
        onclick="openMachine(${machine.id})">

            <h3>${getIcon(machine.name)} ${machine.name}</h3>

            <p><b>Department :</b> ${machine.department}</p>

            <p><b>Status :</b> ${statusBadge}</p>

            <p>
                <b>Health :</b>

                <span class="${healthClass}">

                ${machine.health}%

                </span>

            </p>

            <p><b>Running Hours :</b> ${machine.runningHours}</p>

            <p><b>Next PM :</b> ${machine.nextPM}</p>

            <p><b>Alarm :</b> ${machine.alarm}</p>

            <p><b>AI Score :</b> ⭐ ${machine.aiScore}</p>

            <button class="btn btn-primary">

                View Details

            </button>

        </div>

        `;

    });

}

// ==========================================
// Health Color
// ==========================================

function getHealthClass(value){

    if(value>=95)
        return "health-good";

    if(value>=85)
        return "health-warning";

    return "health-danger";

}

// ==========================================
// Status Badge
// ==========================================

function getStatusBadge(status){

    switch(status){

        case "Running":

            return '<span class="badge badge-running">🟢 Running</span>';

        case "Stopped":

            return '<span class="badge badge-stopped">🔴 Stopped</span>';

        default:

            return '<span class="badge badge-warning">🟡 Attention</span>';

    }

}

// ==========================================
// Icons
// ==========================================

function getIcon(name){

    let machine = name.toLowerCase();

    if(machine.includes("string"))
        return "⚙️";

    if(machine.includes("laminator"))
        return "🔥";

    if(machine.includes("el"))
        return "📷";

    if(machine.includes("bussing"))
        return "🔧";

    if(machine.includes("flash"))
        return "💡";

    if(machine.includes("frame"))
        return "🪟";

    if(machine.includes("junction"))
        return "📦";

    if(machine.includes("tape"))
        return "🏷️";

    if(machine.includes("packing"))
        return "📦";

    return "🏭";

}

// ==========================================
// Search
// ==========================================

function searchMachines(){

    let keyword = document
        .getElementById("machineSearch")
        .value
        .toLowerCase();

    let filtered = machineList.filter(machine =>

        machine.name.toLowerCase().includes(keyword) ||

        machine.department.toLowerCase().includes(keyword) ||

        machine.status.toLowerCase().includes(keyword)

    );

    displayMachines(filtered);

}

// ==========================================
// Open Machine
// ==========================================

function openMachine(id){

    localStorage.setItem("selectedMachineId", id);

    window.location.href = "machine.html";

}
