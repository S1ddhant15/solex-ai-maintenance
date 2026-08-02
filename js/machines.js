// ==========================================
// SOLEX AI MAINTENANCE ASSISTANT
// MACHINE LIBRARY
// ==========================================

document.addEventListener("DOMContentLoaded", loadMachines);

async function loadMachines() {

    try {

        const response = await fetch("../data/machines.json");

        const data = await response.json();

        displayMachines(data.machines);

    }

 catch (error) {

    console.error("Unable to load machines:", error);

    document.getElementById("machineContainer").innerHTML = `
        <div class="card">
            <h3>⚠ Error</h3>
            <p>Unable to load machine database.</p>
            <p>Please check data/machines.json</p>
        </div>
    `;

}

}

function displayMachines(machines) {

    const container = document.getElementById("machineContainer");

    container.innerHTML = "";

    machines.forEach(machine => {

        container.innerHTML += `

        <div class="card machine-card"
        onclick="openMachine('${machine.name}')">

            <h3>${getIcon(machine.name)} ${machine.name}</h3>

            <p><b>Status :</b> ${machine.status}</p>

            <p><b>Health :</b> ${machine.health}%</p>

            <p><b>Department :</b> ${machine.department}</p>

            <button class="btn btn-primary">

            View Details

            </button>

        </div>

        `;

    });

}

function getIcon(name){

    if(name.toLowerCase().includes("string"))
        return "⚙️";

    if(name.toLowerCase().includes("laminator"))
        return "🔥";

    if(name.toLowerCase().includes("el"))
        return "📷";

    if(name.toLowerCase().includes("bussing"))
        return "🔧";

    return "🏭";
}

function openMachine(machine){

    localStorage.setItem("selectedMachine",machine);

    window.location.href="./machine.html";

}

function searchMachines(){

    let input=document.getElementById("machineSearch").value.toLowerCase();

    let cards=document.querySelectorAll(".machine-card");

    cards.forEach(card=>{

        if(card.innerText.toLowerCase().includes(input)){

            card.style.display="block";

        }

        else{

            card.style.display="none";

        }

    });

}
