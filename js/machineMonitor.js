// =====================================================
// SAMA - AI Maintenance Assistant
// Machine Health Monitoring Engine
// =====================================================


// =====================================================
// Start Monitoring
// =====================================================


document.addEventListener("DOMContentLoaded",()=>{


    monitorAllMachines();


});





// =====================================================
// Monitor All Machines
// =====================================================


function monitorAllMachines(){



    let machines =
    getAllMachines();



    machines.forEach(machine=>{


        analyzeMachine(machine);


    });



}







// =====================================================
// Machine Analysis
// =====================================================


function analyzeMachine(machineName){



    let machine =
    getMachineDetails(machineName);



    if(!machine)
    return;



    let alerts=[];



    // Temperature Check


    if(machine.parameters.temperature)

    {


        let temp =
        parseInt(
            machine.parameters.temperature
        );



        if(temp > 150)

        {


            alerts.push({

                type:"Temperature",

                severity:"High",

                message:
                "Temperature above normal limit"


            });


        }



    }






    // Health Score Check


    if(machine.health < 80)

    {


        alerts.push({

            type:"Health",

            severity:"Warning",

            message:
            "Machine health decreasing"


        });


    }








    // PM Due Check


    let pmDate =
    new Date(machine.nextPM);



    let today =
    new Date();



    let days =

    Math.ceil(

        (pmDate-today)

        /

        (1000*60*60*24)

    );



    if(days <=7)

    {


        alerts.push({

            type:"PM",

            severity:"Medium",

            message:
            "Preventive maintenance due soon"


        });


    }





    saveMachineAlerts(
        machineName,
        alerts
    );



}








// =====================================================
// Alert Storage
// =====================================================


let machineAlerts = {};



function saveMachineAlerts(
machine,
alerts
){


machineAlerts[machine]=alerts;


}








// =====================================================
// Get Machine Alerts
// =====================================================


function getMachineAlerts(machine){



return machineAlerts[machine] || [];


}








// =====================================================
// Predictive Health Score
// =====================================================


function calculateHealthScore(machineName){



let machine =
getMachineDetails(machineName);



if(!machine)

return 0;




let score =
100;



// Temperature Impact


if(machine.parameters.temperature)

{


let temp =
parseInt(
machine.parameters.temperature
);



if(temp >120)

score -=10;


}





// Breakdown History Impact


if(machine.breakdownHistory)

{


score -=

machine.breakdownHistory.length * 2;


}





// PM Impact


let pm =
new Date(machine.nextPM);



let today =
new Date();



if(pm < today)

score -=15;



if(score <0)

score=0;



return score;


}









// =====================================================
// AI Health Report
// =====================================================


function generateHealthReport(machineName){



let machine =
getMachineDetails(machineName);



if(!machine)

return "Machine not found";



let score =
calculateHealthScore(machineName);



let condition;



if(score>=90)

condition="Excellent 🟢";


else if(score>=75)

condition="Normal 🟡";


else

condition="Critical 🔴";





return `


<b>📊 SAMA Machine Health Report</b>


<br><br>


Machine:

${machineName}


<br><br>


Health Score:

<b>${score}%</b>


<br><br>


Condition:

${condition}


<br><br>


Runtime:

${machine.runtime} hrs


<br><br>


Next PM:

${machine.nextPM}


<br><br>


Recommendation:

${

score <75

?

"Schedule maintenance immediately"

:

"Continue monitoring"

}



`;



}
