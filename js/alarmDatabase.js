// ==============================================
// SOLEX AI MAINTENANCE ASSISTANT
// INDUSTRIAL ALARM DATABASE
// Version 1.0
// ==============================================

const alarmDatabase = [

{
    code:"E101",
    machine:"Laminator",
    alarm:"Vacuum Low Pressure",
    cause:"Vacuum leakage or pump failure",
    action:[
        "Check vacuum pump",
        "Inspect vacuum pipe",
        "Check vacuum sensor",
        "Reset alarm"
    ]
},

{
    code:"E102",
    machine:"Laminator",
    alarm:"Vacuum Timeout",
    cause:"Required vacuum not achieved",
    action:[
        "Inspect air leakage",
        "Check pump capacity",
        "Verify pressure sensor"
    ]
},

{
    code:"E205",
    machine:"Stringer",
    alarm:"Servo Overload",
    cause:"Motor overloaded",
    action:[
        "Check motor movement",
        "Inspect coupling",
        "Reset servo"
    ]
},

{
    code:"E206",
    machine:"Stringer",
    alarm:"Encoder Error",
    cause:"Encoder cable loose",
    action:[
        "Reconnect encoder",
        "Replace encoder cable",
        "Restart drive"
    ]
},

{
    code:"A045",
    machine:"EL Tester",
    alarm:"Camera Communication Error",
    cause:"Ethernet communication lost",
    action:[
        "Check Ethernet cable",
        "Restart software",
        "Check camera power"
    ]
},

{
    code:"A051",
    machine:"EL Tester",
    alarm:"Image Capture Failed",
    cause:"Camera trigger missing",
    action:[
        "Verify trigger sensor",
        "Restart camera",
        "Inspect PLC signal"
    ]
},

{
    code:"S101",
    machine:"Bussing Machine",
    alarm:"Solder Temperature Low",
    cause:"Heater failure",
    action:[
        "Measure heater resistance",
        "Check SSR",
        "Check thermocouple"
    ]
},

{
    code:"S102",
    machine:"Bussing Machine",
    alarm:"Ribbon Jam",
    cause:"Ribbon misalignment",
    action:[
        "Remove ribbon",
        "Clean guide",
        "Reset machine"
    ]
},

{
    code:"P301",
    machine:"Framing Machine",
    alarm:"Cylinder Home Sensor Fault",
    cause:"Sensor not detected",
    action:[
        "Check sensor",
        "Inspect cylinder",
        "Verify PLC input"
    ]
},

{
    code:"P401",
    machine:"Flash Tester",
    alarm:"Safety Door Open",
    cause:"Door switch active",
    action:[
        "Close door",
        "Check limit switch",
        "Reset alarm"
    ]
}

];



// ==============================================
// SEARCH ALARM
// ==============================================

function searchAlarm(query){

    query = query.toLowerCase();

    for(const alarm of alarmDatabase){

        if(
            alarm.code.toLowerCase().includes(query) ||
            alarm.machine.toLowerCase().includes(query) ||
            alarm.alarm.toLowerCase().includes(query)
        ){

            return alarm;

        }

    }

    return null;

}
