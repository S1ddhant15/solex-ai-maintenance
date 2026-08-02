// =====================================================
// SAMA - AI Maintenance Assistant
// Machine Database
// File: machine.js
// =====================================================


// =====================================================
// Machine Master Database
// =====================================================


const machineDatabase = {


    "stringer":{

        id:"STR-001",

        name:"Stringer Machine",

        department:"Stringing",

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


        runtime:"12450 hrs",


        lastMaintenance:"28-Jul-2026",


        nextPM:"28-Aug-2026",



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





    "laminator":{


        id:"LAM-001",

        name:"Solar Module Laminator",

        department:"Lamination",

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


        runtime:"18500 hrs",


        lastMaintenance:"20-Jul-2026",


        nextPM:"20-Aug-2026",



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





    "el tester":{


        id:"EL-001",

        name:"EL Inspection System",

        department:"Quality",

        manufacturer:"VisiTech",

        status:"Running",

        health:94,


        parameters:{


            imageQuality:"Good",

            cameraStatus:"Normal",

            lighting:"Stable"


        },


        runtime:"8600 hrs",


        lastMaintenance:"22-Jul-2026",


        nextPM:"22-Aug-2026"


    },





    "aoi":{


        id:"AOI-001",

        name:"AOI Inspection",

        department:"Quality",

        manufacturer:"Omron",

        status:"Running",

        health:89,


        parameters:{


            camera:"OK",

            inspectionRate:"98.5%",


            falseReject:"1.2%"


        },


        runtime:"9200 hrs",


        lastMaintenance:"18-Jul-2026",


        nextPM:"18-Aug-2026"


    }



};




// =====================================================
// Get Machine Details
// =====================================================


function getMachineDetails(machineName){


    machineName =
    machineName.toLowerCase();


    return machineDatabase[machineName] || null;


}




// =====================================================
// Get All Machines
// =====================================================


function getAllMachines(){


    return Object.keys(machineDatabase);


}




// =====================================================
// Machine Health
// =====================================================


function getMachineHealth(machineName){


    let machine =
    getMachineDetails(machineName);



    if(!machine)

    return null;



    let score =
    machine.health;



    let status;



    if(score >= 90)

    {

        status="Healthy 🟢";

    }


    else if(score >=70)

    {

        status="Warning 🟡";

    }


    else

    {

        status="Critical 🔴";

    }



    return {


        score:score,

        status:status


    };


}




// =====================================================
// Breakdown History
// =====================================================


function getBreakdownHistory(machineName){



    let machine =
    getMachineDetails(machineName);



    if(machine && machine.breakdownHistory)

    {

        return machine.breakdownHistory;

    }


    return [];

}




// =====================================================
// Update Machine Status
// =====================================================


function updateMachineStatus(
machineName,
newStatus
){


    let machine =
    getMachineDetails(machineName);



    if(machine)

    {

        machine.status=newStatus;

    }


}






// =====================================================
// Generate Machine Report
// =====================================================


function generateMachineReport(machineName){



let machine =
getMachineDetails(machineName);



if(!machine)

{


return `

<b>Machine not found</b>

<br><br>

Available machines:

<br>

${getAllMachines().join(", ")}

`;



}



return `


<b>📊 Machine Health Report</b>


<br><br>


Machine:

<b>${machine.name}</b>


<br><br>


Department:

${machine.department}


<br><br>


Status:

${machine.status}


<br><br>


Health Score:

${machine.health}%


<br><br>


Parameters:

<br>

${JSON.stringify(machine.parameters)}


<br><br>


Last Maintenance:

${machine.lastMaintenance}


<br><br>


Next PM:

${machine.nextPM}


`;



}
