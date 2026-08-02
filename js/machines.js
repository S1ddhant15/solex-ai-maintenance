// =====================================================
// SAMA - AI Maintenance Assistant
// Machine Database
// File: machines.js
// =====================================================


// =====================================================
// MACHINE MASTER DATABASE
// =====================================================


const machineDatabase = {



    "Stringer-01":{


        id:"STR-001",

        name:"Stringer-01",

        department:"Stringing",

        type:"Stringer Machine",

        manufacturer:"Meyer Burger",

        status:"Running",

        health:96,


        parameters:{


            temperature:"42°C",

            vacuum:"-82 kPa",

            pressure:"5.8 Bar",

            speed:"18 CPM",

            vibration:"Normal"


        },


        runtime:12450,


        lastMaintenance:
        "28-Jul-2026",


        nextPM:
        "28-Aug-2026",



        breakdownHistory:[


            {

            date:"25-Jul-2026",

            issue:"Servo Alarm E37",

            downtime:"35 min"

            },


            {

            date:"15-Jul-2026",

            issue:"Vacuum Low",

            downtime:"20 min"

            }


        ]


    },








    "Laminator-01":{


        id:"LAM-001",

        name:"Laminator-01",

        department:"Lamination",

        type:"Solar Module Laminator",

        manufacturer:"Teamtechnik",


        status:"Running",

        health:91,



        parameters:{


            temperature:"145°C",

            vacuum:"-95 kPa",

            pressure:"8 Bar",

            cycleTime:"12 min",

            vibration:"Normal"


        },



        runtime:18500,


        lastMaintenance:
        "20-Jul-2026",


        nextPM:
        "20-Aug-2026",



        breakdownHistory:[


            {

            date:"30-Jul-2026",

            issue:"Temperature Deviation",

            downtime:"45 min"

            },


            {

            date:"12-Jul-2026",

            issue:"Vacuum Pump Alarm",

            downtime:"30 min"

            }


        ]


    },








    "EL-Tester-01":{


        id:"EL-001",

        name:"EL-Tester-01",

        department:"Quality",

        type:"EL Inspection System",

        manufacturer:"VisiTech",


        status:"Running",

        health:94,


        parameters:{


            imageQuality:"Good",

            cameraStatus:"Normal",

            lighting:"Stable"


        },


        runtime:8600,


        lastMaintenance:
        "22-Jul-2026",


        nextPM:
        "22-Aug-2026"


    },








    "AOI-01":{


        id:"AOI-001",

        name:"AOI-01",

        department:"Quality",

        type:"AOI Inspection",

        manufacturer:"Omron",


        status:"Running",

        health:89,


        parameters:{


            camera:"OK",

            inspectionRate:"98.5%",

            falseReject:"1.2%"


        },


        runtime:9200,


        lastMaintenance:
        "18-Jul-2026",


        nextPM:
        "18-Aug-2026"


    }



};









// =====================================================
// GET MACHINE DETAILS
// =====================================================


function getMachineDetails(machineName){



let search =
machineName.toLowerCase();



for(let key in machineDatabase)
{


if(
key.toLowerCase().includes(search)
)

{

return machineDatabase[key];

}


}



return null;


}









// =====================================================
// GET ALL MACHINES
// =====================================================


function getAllMachines(){


return Object.keys(machineDatabase);


}









// =====================================================
// MACHINE HEALTH
// =====================================================


function getMachineHealth(machineName){



let machine =
getMachineDetails(machineName);



if(!machine)

return null;




let score =
machine.health;



let status;



if(score>=90)

status="Healthy 🟢";


else if(score>=70)

status="Warning 🟡";


else

status="Critical 🔴";





return {


score:score,

status:status


};



}









// =====================================================
// GENERATE HEALTH REPORT
// =====================================================


function generateMachineReport(machineName){



let machine =
getMachineDetails(machineName);



if(!machine)

{


return `


<b>❌ Machine Not Found</b>


<br><br>


Available Machines:


<br>


${getAllMachines().join("<br>")}


`;



}





return `


<b>📊 Machine Health Report</b>


<br><br>


Machine:

<b>${machine.type}</b>


<br><br>


ID:

${machine.id}


<br><br>


Department:

${machine.department}


<br><br>


Manufacturer:

${machine.manufacturer}


<br><br>


Status:

🟢 ${machine.status}


<br><br>


Health Score:

<b>${machine.health}%</b>


<br><br>


<b>Live Parameters</b>


<br><br>


Temperature:

${machine.parameters.temperature || "-"}


<br>


Vacuum:

${machine.parameters.vacuum || "-"}


<br>


Pressure:

${machine.parameters.pressure || "-"}


<br>


Speed:

${machine.parameters.speed || "-"}


<br>


Vibration:

${machine.parameters.vibration || "-"}


<br><br>


Runtime:

${machine.runtime} Hours


<br><br>


Last Maintenance:

${machine.lastMaintenance}


<br>


Next PM:

${machine.nextPM}


`;



}









// =====================================================
// BREAKDOWN HISTORY
// =====================================================


function getBreakdownHistory(machineName){



let machine =
getMachineDetails(machineName);



if(
machine &&
machine.breakdownHistory
)

return machine.breakdownHistory;



return [];


}









// =====================================================
// UPDATE MACHINE STATUS
// =====================================================


function updateMachineStatus(
machineName,
newStatus
){



let machine =
getMachineDetails(machineName);



if(machine)

{


machine.status =
newStatus;


}


}
