// ==========================================
// SAMA - AI Maintenance Assistant
// Analytics Module
// ==========================================


// ===============================
// Load Analytics Data
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    loadMaintenanceKPIs();

    createBreakdownChart();

    createMachineHealthChart();

});



// ===============================
// Maintenance KPI Cards
// ===============================

function loadMaintenanceKPIs(){


    const data = {

        totalMachines: 48,

        runningMachines: 44,

        breakdowns: 12,

        downtime: "3.8%",

        mtbf: "186 Hours",

        mttr: "42 Minutes",

        pendingPM: 5,

        criticalAlerts: 3

    };


    if(document.getElementById("totalMachines"))
        document.getElementById("totalMachines").innerHTML =
        data.totalMachines;


    if(document.getElementById("runningMachines"))
        document.getElementById("runningMachines").innerHTML =
        data.runningMachines;


    if(document.getElementById("breakdowns"))
        document.getElementById("breakdowns").innerHTML =
        data.breakdowns;


    if(document.getElementById("downtime"))
        document.getElementById("downtime").innerHTML =
        data.downtime;


    if(document.getElementById("mtbf"))
        document.getElementById("mtbf").innerHTML =
        data.mtbf;


    if(document.getElementById("mttr"))
        document.getElementById("mttr").innerHTML =
        data.mttr;


    if(document.getElementById("pmPending"))
        document.getElementById("pmPending").innerHTML =
        data.pendingPM;


    if(document.getElementById("criticalAlerts"))
        document.getElementById("criticalAlerts").innerHTML =
        data.criticalAlerts;


}



// ===============================
// Breakdown Trend Chart
// ===============================


function createBreakdownChart(){


const chart = document.getElementById("breakdownChart");


if(!chart)
return;



new Chart(chart, {


type:"line",


data:{


labels:[

"Jan",
"Feb",
"Mar",
"Apr",
"May",
"Jun"

],


datasets:[{


label:"Machine Breakdown",


data:[

8,
14,
10,
18,
12,
9

],


borderWidth:2


}]


},


options:{


responsive:true,


maintainAspectRatio:false


}



});


}



// ===============================
// Machine Health Status
// ===============================


function createMachineHealthChart(){


const chart =
document.getElementById("machineHealthChart");



if(!chart)
return;



new Chart(chart, {


type:"doughnut",


data:{


labels:[

"Healthy",
"Warning",
"Critical"

],


datasets:[{


label:"Machine Status",


data:[

35,
10,
3

],


borderWidth:1


}]


},


options:{


responsive:true,


maintainAspectRatio:false


}



});



}



// ===============================
// AI Recommendation Generator
// ===============================


function generateMaintenanceSuggestion(){


let suggestions=[


"Check servo motor temperature trend",

"Inspect conveyor bearing lubrication",

"Review vibration sensor data",

"Schedule preventive maintenance",

"Check abnormal current variation"



];


let random =
suggestions[
Math.floor(Math.random()*suggestions.length)
];



let output =
document.getElementById("aiSuggestion");



if(output)

output.innerHTML = random;



}



// ===============================
// Machine Search
// ===============================


function searchMachine(){


let input =
document.getElementById("machineSearch")
.value
.toLowerCase();



let machines =
document.querySelectorAll(".machine-card");



machines.forEach(machine=>{


let name =
machine.innerText.toLowerCase();



if(name.includes(input))

machine.style.display="block";


else

machine.style.display="none";



});


}
