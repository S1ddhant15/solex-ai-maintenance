// =====================================================
// SAMA - AI Maintenance Assistant
// Machine Database
// =====================================================


// =====================================================
// Machine Master Database
// =====================================================


const machineDatabase = {


    "Stringer-01":{


        id:"STR-001",

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
// Get Machine Details
// =====================================================


function getMachineDetails(machineName){



return machineDatabase[machineName] || null;


}








// =====================================================
// Get All Machines
// =====================================================


function getAllMachines(){


return Object.keys(machineDatabase);


}








// =====================================================
// Machine Health Analysis
// =====================================================


function getMachineHealth(machineName){



let machine =
machineDatabase[machineName];



if(!machine)

return null;



let score =
machine.health;



let status;



if(score >= 90)

status="Healthy 🟢";


else if(score >=70)

status="Warning 🟡";


else

status="Critical 🔴";





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
machineDatabase[machineName];



if(machine &&
machine.breakdownHistory)

return machine.breakdownHistory;



return [];



}








// =====================================================
// Update Machine Status
// =====================================================


function updateMachineStatus(
machineName,
newStatus
){



if(machineDatabase[machineName])

{


machineDatabase[machineName].status =
newStatus;


}


}
