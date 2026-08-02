// =============================================
// SOLEX AI MAINTENANCE KNOWLEDGE BASE
// =============================================

const knowledgeBase = [

{
    machine:"Stringer 01",

    title:"String Stops Frequently",

    keywords:[
        "stringer",
        "stop",
        "conveyor",
        "string",
        "stoppage"
    ],

    causes:[
        "Conveyor sensor dirty",
        "Servo overload",
        "Low air pressure",
        "Cell jam",
        "Loose encoder cable"
    ],

    checks:[
        "Clean photo sensor",
        "Check servo drive alarm",
        "Verify air pressure above 6 bar",
        "Inspect conveyor",
        "Check encoder connection"
    ],

    repair:"15-30 Minutes",

    safety:"Lockout power before opening safety guard."
},

{
    machine:"Laminator 01",

    title:"Low Vacuum Alarm",

    keywords:[
        "laminator",
        "vacuum",
        "low vacuum",
        "lamination"
    ],

    causes:[
        "Vacuum pump failure",
        "Vacuum leakage",
        "Door seal damaged",
        "Vacuum valve faulty"
    ],

    checks:[
        "Inspect vacuum pump",
        "Check vacuum hose",
        "Replace door gasket",
        "Verify vacuum valve operation"
    ],

    repair:"30-45 Minutes",

    safety:"Wait until chamber pressure reaches atmospheric pressure."
},

{
    machine:"EL Tester",

    title:"Image Capture Failure",

    keywords:[
        "el",
        "camera",
        "image",
        "capture",
        "tester"
    ],

    causes:[
        "Camera offline",
        "Lens dirty",
        "Lighting issue",
        "Network disconnected"
    ],

    checks:[
        "Restart camera",
        "Clean camera lens",
        "Check LAN cable",
        "Verify lighting"
    ],

    repair:"20 Minutes",

    safety:"Switch off camera before maintenance."
},

{
    machine:"Bussing Machine",

    title:"Ribbon Feeding Error",

    keywords:[
        "bussing",
        "ribbon",
        "feeding",
        "jam"
    ],

    causes:[
        "Ribbon misalignment",
        "Roller worn",
        "Sensor blocked",
        "Motor overload"
    ],

    checks:[
        "Realign ribbon",
        "Inspect roller",
        "Clean sensor",
        "Reset motor drive"
    ],

    repair:"25 Minutes",

    safety:"Disconnect machine before replacing ribbon."
},

{
    machine:"Flash Tester",

    title:"Flash Test Failure",

    keywords:[
        "flash",
        "tester",
        "irradiance",
        "calibration"
    ],

    causes:[
        "Lamp aging",
        "Calibration expired",
        "Sensor failure"
    ],

    checks:[
        "Run calibration",
        "Check irradiance sensor",
        "Replace flash lamp if required"
    ],

    repair:"40 Minutes",

    safety:"High voltage present inside flash chamber."
}

];

// =============================================

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
