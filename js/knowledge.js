// ==========================================
// SOLEX AI MAINTENANCE ASSISTANT
// KNOWLEDGE BASE
// ==========================================

const knowledgeBase = [

{
machine:"Stringer",
title:"Servo Overload",
keywords:["servo","overload","stringer","e101"],
causes:[
"Servo motor overloaded",
"Mechanical obstruction",
"Guide rail jam",
"Wrong acceleration parameter"
],
checks:[
"Reset Servo Alarm",
"Inspect mechanical movement",
"Check guide rails",
"Verify servo parameter"
],
repair:"20-30 Minutes",
safety:"Switch OFF Main Power before maintenance."
},

{
machine:"Stringer",
title:"Ribbon Break",
keywords:["ribbon","break"],
causes:[
"Low ribbon tension",
"Damaged ribbon spool",
"Guide pulley worn"
],
checks:[
"Adjust ribbon tension",
"Replace ribbon spool",
"Inspect guide pulley"
],
repair:"15 Minutes",
safety:"Wear safety gloves."
},

{
machine:"Laminator",
title:"Vacuum Low",
keywords:["vacuum","pump","laminator","low vacuum"],
causes:[
"Vacuum leakage",
"Vacuum pump failure",
"Door gasket damaged",
"Vacuum filter clogged"
],
checks:[
"Inspect vacuum line",
"Replace filter",
"Check gasket",
"Verify pump"
],
repair:"30-45 Minutes",
safety:"Machine must be cooled before maintenance."
},

{
machine:"Laminator",
title:"High Heater Temperature",
keywords:["heater","temperature","high temperature"],
causes:[
"SSR failure",
"Thermocouple fault",
"PID parameter issue"
],
checks:[
"Measure heater resistance",
"Replace SSR",
"Check thermocouple"
],
repair:"40 Minutes",
safety:"Switch OFF heater supply."
},

{
machine:"EL Tester",
title:"Camera Offline",
keywords:["camera","offline","el"],
causes:[
"LAN disconnected",
"Power failure",
"Camera software stopped"
],
checks:[
"Restart camera",
"Reconnect LAN",
"Restart software"
],
repair:"15 Minutes",
safety:"Power OFF camera."
},

{
machine:"EL Tester",
title:"Image Not Captured",
keywords:["image","capture"],
causes:[
"Camera trigger failed",
"PLC communication issue",
"Poor lighting"
],
checks:[
"Check trigger sensor",
"Verify PLC",
"Inspect LED lighting"
],
repair:"20 Minutes",
safety:"Disconnect camera power."
},

{
machine:"Bussing Machine",
title:"Ribbon Misalignment",
keywords:["bussing","alignment"],
causes:[
"Guide worn",
"Improper calibration"
],
checks:[
"Calibrate guide",
"Replace worn guide"
],
repair:"20 Minutes",
safety:"Stop conveyor before repair."
},

{
machine:"Flash Tester",
title:"Light Intensity Low",
keywords:["flash","light"],
causes:[
"Lamp ageing",
"Power supply issue"
],
checks:[
"Check lamp hours",
"Inspect power supply"
],
repair:"25 Minutes",
safety:"Wait for lamp cooling."
},

{
machine:"Framing Machine",
title:"Frame Jam",
keywords:["frame","jam"],
causes:[
"Pneumatic pressure low",
"Improper frame alignment"
],
checks:[
"Check air pressure",
"Adjust frame guide"
],
repair:"15 Minutes",
safety:"Release air pressure before maintenance."
},

{
machine:"Junction Box",
title:"Glue Dispensing Failure",
keywords:["glue","dispensing","jb"],
causes:[
"Nozzle clogged",
"Glue level low",
"Pressure issue"
],
checks:[
"Clean nozzle",
"Refill glue",
"Check dispensing pressure"
],
repair:"20 Minutes",
safety:"Wear safety goggles."
},

{
machine:"Auto Tape",
title:"Tape Roll Empty",
keywords:["tape","roll"],
causes:[
"Tape finished",
"Improper loading"
],
checks:[
"Load new tape roll",
"Verify alignment"
],
repair:"10 Minutes",
safety:"Keep hands away from rollers."
},

{
machine:"Packing",
title:"Barcode Scanner Failure",
keywords:["barcode","scanner"],
causes:[
"Scanner dirty",
"Cable loose",
"Scanner faulty"
],
checks:[
"Clean scanner lens",
"Reconnect cable",
"Replace scanner"
],
repair:"15 Minutes",
safety:"Power OFF scanner."
}

];

// ==========================================
// SEARCH FUNCTION
// ==========================================

function searchKnowledge(question){

question = question.toLowerCase();

for(let item of knowledgeBase){

for(let keyword of item.keywords){

if(question.includes(keyword.toLowerCase())){

return item;

}

}

}

return null;

}
