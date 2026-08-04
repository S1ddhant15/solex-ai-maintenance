// =====================================================
// SAMA - AI Maintenance Assistant
// Spare Parts Database
// =====================================================


const spareDatabase = {


// =====================================================
// STRINGER SPARES
// =====================================================


"stringer":{


machine:"Stringer",


criticalSpares:[


{

part:"Servo Drive",

category:"Electrical",

criticality:"High",

application:"Axis movement control",

recommendedStock:"1 Nos"

},


{

part:"Encoder Cable",

category:"Electrical",

criticality:"High",

application:"Servo feedback",

recommendedStock:"2 Nos"

},


{

part:"Vacuum Sensor",

category:"Pneumatic",

criticality:"Medium",

application:"Cell pickup vacuum monitoring",

recommendedStock:"2 Nos"

},


{

part:"Proximity Sensor",

category:"Sensor",

criticality:"Medium",

application:"Cell detection",

recommendedStock:"5 Nos"

},


{

part:"Pneumatic Solenoid Valve",

category:"Pneumatic",

criticality:"Medium",

application:"Cylinder control",

recommendedStock:"2 Nos"

}


]


},







// =====================================================
// LAMINATOR SPARES
// =====================================================


"laminator":{


machine:"Laminator",


criticalSpares:[


{

part:"Thermocouple",

category:"Temperature",

criticality:"High",

application:"Temperature feedback",

recommendedStock:"5 Nos"

},


{

part:"SSR",

category:"Electrical",

criticality:"High",

application:"Heater control",

recommendedStock:"5 Nos"

},


{

part:"Vacuum Pump Seal Kit",

category:"Mechanical",

criticality:"High",

application:"Vacuum system",

recommendedStock:"1 Set"

},


{

part:"Pneumatic Valve",

category:"Pneumatic",

criticality:"Medium",

application:"Pressure control",

recommendedStock:"2 Nos"

}


]


},








// =====================================================
// EL TESTER SPARES
// =====================================================


"el":{


machine:"EL Tester",


criticalSpares:[


{

part:"Camera Module",

category:"Inspection",

criticality:"High",

application:"EL image acquisition",

recommendedStock:"1 Nos"

},


{

part:"Lighting Module",

category:"Inspection",

criticality:"Medium",

application:"Image illumination",

recommendedStock:"2 Nos"

},


{

part:"Communication Cable",

category:"Electrical",

criticality:"Medium",

application:"Data communication",

recommendedStock:"2 Nos"

}


]


},







// =====================================================
// AOI SPARES
// =====================================================


"aoi":{


machine:"AOI",


criticalSpares:[


{

part:"Industrial Camera",

category:"Inspection",

criticality:"High",

application:"Defect detection",

recommendedStock:"1 Nos"

},


{

part:"Camera Lens",

category:"Optical",

criticality:"Medium",

application:"Image clarity",

recommendedStock:"2 Nos"

},


{

part:"Lighting Controller",

category:"Electrical",

criticality:"Medium",

application:"Inspection lighting",

recommendedStock:"1 Nos"

}


]


}


};








// =====================================================
// Get Spare Details
// =====================================================


function getSpareDetails(machine){


machine =
machine.toLowerCase();



for(let key in spareDatabase){


if(machine.includes(key)){


return spareDatabase[key];


}


}



return null;


}








// =====================================================
// Generate Spare Report
// =====================================================


function generateSpareReport(machine){



let data =
getSpareDetails(machine);



if(!data)

return `


<b>📦 Spare Information Not Available</b>


<br><br>


Please provide machine name.


`;





let spareList = "";



data.criticalSpares.forEach((item)=>{


spareList += `


<br>

<b>${item.part}</b>

<br>

Category: ${item.category}

<br>

Criticality: ${item.criticality}

<br>

Application: ${item.application}

<br>

Recommended Stock: ${item.recommendedStock}

<br><br>

`;


});





return `


<b>📦 Critical Spare Recommendation</b>


<br><br>


Machine:

<b>${data.machine}</b>


<br><br>


${spareList}



SAMA Recommendation:

<br>

Maintain critical spares to minimize breakdown downtime.


`;

}
