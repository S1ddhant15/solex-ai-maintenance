// =====================================================
// SAMA - AI Maintenance Assistant
// Breakdown History Database
// =====================================================


// =====================================================
// Breakdown History Master
// =====================================================


const breakdownHistoryDatabase = {



    "stringer-01":{


        machine:"Stringer-01",


        history:[


            {

                date:"25-Jul-2026",

                alarm:"E37",

                issue:"Servo Communication Error",

                downtime:"35 min",

                rootCause:
                "Encoder feedback loss / servo communication issue",

                action:
                "Encoder cable checked and servo communication restored"

            },


            {

                date:"15-Jul-2026",

                alarm:"S01",

                issue:"Cell Detection Sensor Failure",

                downtime:"20 min",

                rootCause:
                "Sensor alignment issue",

                action:
                "Sensor cleaned and alignment corrected"

            }


        ]

    },







    "laminator-01":{


        machine:"Laminator-01",


        history:[


            {

                date:"30-Jul-2026",

                alarm:"T01",

                issue:"Temperature Deviation",

                downtime:"45 min",

                rootCause:
                "SSR output fluctuation",

                action:
                "SSR replaced and heater circuit checked"

            },


            {

                date:"12-Jul-2026",

                alarm:"P01",

                issue:"Vacuum Pressure Low",

                downtime:"30 min",

                rootCause:
                "Vacuum leakage",

                action:
                "Vacuum line inspected and leakage removed"

            }


        ]

    },







    "el-tester-01":{


        machine:"EL-Tester-01",


        history:[


            {

                date:"22-Jul-2026",

                alarm:"CAM01",

                issue:"Image Quality Issue",

                downtime:"25 min",

                rootCause:
                "Camera lighting variation",

                action:
                "Lighting intensity calibrated"

            }


        ]

    },







    "aoi-01":{


        machine:"AOI-01",


        history:[


            {

                date:"18-Jul-2026",

                alarm:"AOI01",

                issue:"High False Rejection",

                downtime:"40 min",

                rootCause:
                "Inspection threshold incorrect",

                action:
                "AOI parameters optimized"

            }


        ]

    }



};









// =====================================================
// Search Breakdown History
// =====================================================


function getBreakdownHistory(machine){



    machine =
    machine.toLowerCase();



    for(let key in breakdownHistoryDatabase){


        if(machine.includes(key.replace("-01","")))

        {


            return breakdownHistoryDatabase[key];


        }


    }



    return null;


}









// =====================================================
// Generate Breakdown Report
// =====================================================


function generateBreakdownReport(machine){



let data =
getBreakdownHistory(machine);





if(!data)

{


return `


<b>📋 Breakdown History</b>


<br><br>


No breakdown record found for:

<b>${machine}</b>


<br><br>


Please check machine name.


`;


}






let report="";





data.history.forEach((item,index)=>{


report += `


<br>

<b>${index+1}. ${item.issue}</b>


<br><br>


📅 Date:

${item.date}


<br>


🚨 Alarm:

${item.alarm}


<br>


⏱ Downtime:

${item.downtime}


<br>


🔍 Root Cause:

${item.rootCause}


<br>


🛠 Action:

${item.action}


<br><br>


--------------------


`;



});








return `


<b>📋 SAMA Breakdown History</b>


<br><br>


Machine:

<b>${data.machine}</b>


<br><br>


${report}


<b>SAMA Recommendation:</b>


<br>

Analyze repeated failures and plan preventive action.


`;

}
