// =====================================================
// SAMA - AI Maintenance Assistant
// Preventive Maintenance Database
// =====================================================


const pmDatabase = {


// =====================================================
// STRINGER PM
// =====================================================


"stringer":{


machine:"Stringer",


daily:[

"Check machine cleaning condition",

"Check vacuum pressure",

"Check cell loading sensor",

"Check ribbon feeding system",

"Check abnormal noise"

],


weekly:[

"Inspect servo motor condition",

"Check conveyor alignment",

"Check pneumatic leakage",

"Clean sensors and cameras",

"Verify process parameters"

],


monthly:[

"Check servo drive parameters",

"Inspect encoder cable",

"Check mechanical lubrication",

"Inspect electrical panel",

"Backup PLC parameters"

],


criticalPoints:[

"Vacuum level",

"Cell breakage rate",

"Servo alarm history",

"Ribbon alignment"

]


},






// =====================================================
// LAMINATOR PM
// =====================================================


"laminator":{


machine:"Laminator",


daily:[

"Check temperature zones",

"Verify vacuum level",

"Check pressure system",

"Inspect heating profile",

"Check abnormal sound"

],


weekly:[

"Clean heating plates",

"Inspect thermocouple",

"Check vacuum pump performance",

"Inspect pneumatic valves",

"Check sealing condition"

],


monthly:[

"Check heater current",

"Inspect SSR output",

"Check vacuum pump oil",

"Inspect PLC backup",

"Check safety circuit"

],


criticalPoints:[

"Temperature stability",

"Vacuum pressure",

"Lamination recipe",

"Bubble defect trend"

]


},







// =====================================================
// EL TESTER PM
// =====================================================


"el":{


machine:"EL Tester",


daily:[

"Clean camera lens",

"Check image quality",

"Verify inspection result",

"Check lighting condition"

],


weekly:[

"Camera calibration check",

"Check communication",

"Clean inspection area",

"Verify defect detection"

],


monthly:[

"Backup inspection parameters",

"Check camera health",

"Inspect cables",

"Verify software settings"

],


criticalPoints:[

"Image quality",

"False rejection",

"Camera alignment"

]


},







// =====================================================
// AOI PM
// =====================================================


"aoi":{


machine:"AOI",


daily:[

"Clean camera system",

"Check inspection status",

"Verify NG detection"

],


weekly:[

"Camera calibration",

"Check lighting",

"Review false rejection"

],


monthly:[

"System backup",

"Inspect communication",

"Update inspection parameters"

],


criticalPoints:[

"False NG",

"Camera focus",

"Inspection accuracy"

]


}


};








// =====================================================
// Get PM Details
// =====================================================


function getPMDetails(machine){


machine =
machine.toLowerCase();



for(let key in pmDatabase){


if(machine.includes(key)){


return pmDatabase[key];


}


}



return null;


}








// =====================================================
// Generate PM Report
// =====================================================


function generatePMReport(machine){



let data =
getPMDetails(machine);



if(!data)

return `

<b>PM Data Not Available</b>

<br><br>

Please provide correct machine name.

`;





return `


<b>🛠 Preventive Maintenance Plan</b>


<br><br>


Machine:

<b>${data.machine}</b>


<br><br>



<b>Daily Checklist</b>

<br>

${data.daily.map(x=>"✓ "+x).join("<br>")}



<br><br>


<b>Weekly Checklist</b>

<br>

${data.weekly.map(x=>"✓ "+x).join("<br>")}



<br><br>


<b>Monthly Checklist</b>

<br>

${data.monthly.map(x=>"✓ "+x).join("<br>")}



<br><br>


<b>Critical Monitoring Points</b>

<br>

${data.criticalPoints.map(x=>"⚠ "+x).join("<br>")}



<br><br>


SAMA Recommendation:

<br>

Follow PM schedule and update maintenance history.


`;

}
