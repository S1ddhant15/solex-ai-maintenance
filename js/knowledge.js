const knowledgeBase = [

{
    machine:"Stringer 01",

    title:"String Stops Frequently",

    keywords:["stringer","stop","conveyor","cell jam"],

    causes:[
        "Dirty conveyor sensor",
        "Servo overload",
        "Cell jam",
        "Encoder cable loose"
    ],

    checks:[
        "Clean photo sensor",
        "Inspect conveyor",
        "Check encoder cable",
        "Reset servo drive"
    ],

    repair:"15-30 Minutes",

    safety:"Lockout power before maintenance.",

    tools:[
        "Allen Key Set",
        "Multimeter",
        "Air Gun"
    ],

    spareParts:[
        "Photo Sensor",
        "Encoder",
        "Servo Coupling"
    ],

    technician:"Mechanical + Electrical",

    priority:"High"
},

{
    machine:"Laminator 01",

    title:"Low Vacuum Alarm",

    keywords:["laminator","vacuum","low vacuum"],

    causes:[
        "Vacuum leakage",
        "Pump failure",
        "Door gasket damage"
    ],

    checks:[
        "Inspect pump",
        "Check vacuum pipe",
        "Replace gasket"
    ],

    repair:"30-45 Minutes",

    safety:"Release chamber pressure before opening.",

    tools:[
        "Vacuum Gauge",
        "Spanner Set"
    ],

    spareParts:[
        "Vacuum Pump",
        "Vacuum Valve",
        "Door Gasket"
    ],

    technician:"Mechanical",

    priority:"Critical"
},

{
    machine:"EL Tester",

    title:"Camera Communication Failure",

    keywords:["camera","el","image"],

    causes:[
        "LAN disconnected",
        "Camera offline",
        "Lens dirty"
    ],

    checks:[
        "Restart camera",
        "Clean lens",
        "Check Ethernet cable"
    ],

    repair:"20 Minutes",

    safety:"Switch OFF power.",

    tools:[
        "LAN Tester",
        "Cleaning Cloth"
    ],

    spareParts:[
        "Industrial Camera",
        "Ethernet Cable"
    ],

    technician:"Electrical",

    priority:"Medium"
},

{
    machine:"Bussing Machine",

    title:"Ribbon Feeding Error",

    keywords:["bussing","ribbon","jam"],

    causes:[
        "Ribbon misalignment",
        "Sensor dirty"
    ],

    checks:[
        "Realign ribbon",
        "Clean sensor"
    ],

    repair:"25 Minutes",

    safety:"Stop machine before servicing.",

    tools:[
        "Allen Key",
        "Brush"
    ],

    spareParts:[
        "Ribbon Roller",
        "Photo Sensor"
    ],

    technician:"Mechanical",

    priority:"High"
},

{
    machine:"Flash Tester",

    title:"Calibration Failure",

    keywords:["flash","calibration"],

    causes:[
        "Lamp ageing",
        "Calibration expired"
    ],

    checks:[
        "Run calibration",
        "Replace flash lamp"
    ],

    repair:"40 Minutes",

    safety:"High Voltage.",

    tools:[
        "Calibration Kit"
    ],

    spareParts:[
        "Flash Lamp",
        "Irradiance Sensor"
    ],

    technician:"Electrical",

    priority:"Medium"
}

];

function searchKnowledge(question){

    question=question.toLowerCase();

    for(let item of knowledgeBase){

        if(item.keywords.some(k=>question.includes(k.toLowerCase())))
            return item;

    }

    return null;

}
