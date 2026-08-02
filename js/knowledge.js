// ===========================================
// SOLEX AI MAINTENANCE ASSISTANT
// KNOWLEDGE ENGINE
// Version 1.0
// ===========================================

const machineKnowledge = [

{
    keywords:[
        "vacuum",
        "vacuum error",
        "low vacuum",
        "laminator"
    ],

    machine:"Laminator",

    title:"Vacuum Error",

    causes:[
        "Vacuum pump OFF",
        "Vacuum leakage",
        "Vacuum sensor failure",
        "Solenoid valve failure",
        "Filter blockage"
    ],

    checks:[
        "Check vacuum pump",
        "Inspect vacuum hose",
        "Check PLC input",
        "Verify vacuum sensor",
        "Clean filter"
    ],

    repair:"20-30 Minutes",

    safety:"Switch OFF machine before opening vacuum line."
},

{
    keywords:[
        "servo",
        "servo alarm",
        "motor",
        "encoder"
    ],

    machine:"Stringer",

    title:"Servo Alarm",

    causes:[
        "Servo overload",
        "Encoder cable loose",
        "Drive fault",
        "Mechanical obstruction"
    ],

    checks:[
        "Check encoder",
        "Reset drive",
        "Inspect motor",
        "Check coupling"
    ],

    repair:"15 Minutes",

    safety:"Lock machine before checking motor."
},

{
    keywords:[
        "heater",
        "temperature",
        "ssr",
        "thermocouple"
    ],

    machine:"Laminator",

    title:"Temperature Issue",

    causes:[
        "Heater failure",
        "SSR damaged",
        "Thermocouple faulty",
        "PID setting incorrect"
    ],

    checks:[
        "Measure heater current",
        "Check SSR LED",
        "Verify thermocouple",
        "Review PID settings"
    ],

    repair:"30 Minutes",

    safety:"Allow heater to cool before maintenance."
},

{
    keywords:[
        "camera",
        "vision",
        "el"
    ],

    machine:"EL Tester",

    title:"Camera Communication Fault",

    causes:[
        "Ethernet cable disconnected",
        "Camera software stopped",
        "Lighting failure",
        "Trigger signal missing"
    ],

    checks:[
        "Restart camera",
        "Inspect Ethernet cable",
        "Verify trigger signal",
        "Check lighting"
    ],

    repair:"15 Minutes",

    safety:"Power OFF camera before reconnecting cables."
}

];



// Search Function

function searchKnowledge(question){

    question = question.toLowerCase();

    for(const item of machineKnowledge){

        for(const keyword of item.keywords){

            if(question.includes(keyword)){

                return item;

            }

        }

    }

    return null;

}
