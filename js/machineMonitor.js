// ==========================================
// SOLEX AI MAINTENANCE ASSISTANT
// MACHINE MONITOR
// ==========================================

let machineData = null;

// ==========================================
// Initialize
// ==========================================

document.addEventListener("DOMContentLoaded", loadMachine);

// ==========================================
// Load Selected Machine
// ==========================================

async function loadMachine() {

    try {

        const response = await fetch("../data/machines.json");

        const data = await response.json();

        const selectedId = parseInt(localStorage.getItem("selectedMachineId"));

        machineData = data.machines.find(m => m.id === selectedId);

        if (!machineData) {

            document.getElementById("machineName").innerHTML = "Machine Not Found";

            return;

        }

        updateScreen();

        // Simulate Live Data Every 5 Seconds

        setInterval(simulateLiveData, 5000);

    }

    catch (error) {

        console.error(error);

    }

}

// ==========================================
// Update Screen
// ==========================================

function updateScreen() {

    document.getElementById("machineName").innerHTML = machineData.name;

    document.getElementById("health").innerHTML = machineData.health + "%";

    document.getElementById("temperature").innerHTML =
        machineData.temperature + " °C";

    document.getElementById("pressure").innerHTML =
        machineData.pressure;

    document.getElementById("hours").innerHTML =
        machineData.runningHours;

    document.getElementById("department").innerHTML =
        machineData.department;

    document.getElementById("status").innerHTML =
        machineData.status;

    document.getElementById("pm").innerHTML =
        machineData.nextPM;

    document.getElementById("alarm").innerHTML =
        machineData.alarm;

    document.getElementById("score").innerHTML =
        machineData.aiScore;

    document.getElementById("recommendation").innerHTML =
        getRecommendation(machineData);

}

// ==========================================
// AI Recommendation
// ==========================================

function getRecommendation(machine){

    if(machine.health>=97){

        return `
        ✅ Machine operating normally.<br><br>
        Continue routine inspection only.
        `;

    }

    if(machine.health>=90){

        return `
        ⚠ Preventive maintenance recommended.<br><br>
        Check lubrication, sensors and cooling fan.
        `;

    }

    if(machine.health>=80){

        return `
        🔧 Machine condition degrading.<br><br>
        Schedule maintenance within 24 hours.
        `;

    }

    return `
    🚨 Critical Machine Health.<br><br>

    Immediate maintenance required.<br><br>

    Generate Work Order immediately.
    `;

}

// ==========================================
// Live Simulation
// ==========================================

function simulateLiveData(){

    machineData.temperature += random(-1,2);

    machineData.health += random(-1,1);

    machineData.pressure += randomFloat(-0.2,0.2);

    machineData.runningHours++;

    if(machineData.health>100)
        machineData.health=100;

    if(machineData.health<60)
        machineData.health=60;

    machineData.pressure =
        Number(machineData.pressure).toFixed(1);

    updateScreen();

}

// ==========================================
// Helpers
// ==========================================

function random(min,max){

    return Math.floor(Math.random()*(max-min+1))+min;

}

function randomFloat(min,max){

    return Math.random()*(max-min)+min;

}

// ==========================================
// Generate Work Order
// ==========================================

function generateWO(){

    alert(

        "Work Order Generated\n\n" +

        "Machine : "+machineData.name+

        "\nPriority : High"

    );

}
