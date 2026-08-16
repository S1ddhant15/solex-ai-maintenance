// =====================================================
// SAMA - Solex AI Maintenance Assistant
// Spare Parts Database
// File: spareDatabase.js
// =====================================================


// =====================================================
// SPARE DATABASE
// =====================================================

const spareDatabase = {


    // =================================================
    // STRINGER - ATW
    // =================================================

    "stringer":{


        machine:"Stringer",

        manufacturer:"ATW",

        process:"Cell Stringing",


        spares:[


            {
                name:"Servo Drive",
                category:"Servo",
                stock:2,
                minimumStock:2,
                criticality:"Critical",
                leadTime:"3-4 Weeks",
                location:"Electrical Spare Store"
            },


            {
                name:"Servo Motor",
                category:"Servo",
                stock:1,
                minimumStock:1,
                criticality:"Critical",
                leadTime:"4-6 Weeks",
                location:"Electrical Spare Store"
            },


            {
                name:"Encoder Cable",
                category:"Servo",
                stock:3,
                minimumStock:2,
                criticality:"High",
                leadTime:"2-3 Weeks",
                location:"Electrical Spare Store"
            },


            {
                name:"Proximity Sensor",
                category:"Sensor",
                stock:8,
                minimumStock:4,
                criticality:"High",
                leadTime:"1-2 Weeks",
                location:"Electrical Spare Store"
            },


            {
                name:"Photoelectric Sensor",
                category:"Sensor",
                stock:6,
                minimumStock:4,
                criticality:"High",
                leadTime:"1-2 Weeks",
                location:"Electrical Spare Store"
            },


            {
                name:"Vacuum Sensor",
                category:"Vacuum",
                stock:2,
                minimumStock:2,
                criticality:"High",
                leadTime:"2-3 Weeks",
                location:"Pneumatic Spare Store"
            },


            {
                name:"Vacuum Cup",
                category:"Vacuum",
                stock:20,
                minimumStock:10,
                criticality:"Medium",
                leadTime:"1 Week",
                location:"Pneumatic Spare Store"
            },


            {
                name:"Solenoid Valve",
                category:"Pneumatic",
                stock:4,
                minimumStock:3,
                criticality:"High",
                leadTime:"2 Weeks",
                location:"Pneumatic Spare Store"
            },


            {
                name:"Pneumatic Cylinder",
                category:"Pneumatic",
                stock:2,
                minimumStock:1,
                criticality:"High",
                leadTime:"2-3 Weeks",
                location:"Pneumatic Spare Store"
            },


            {
                name:"Ribbon Feeding Roller",
                category:"Mechanical",
                stock:2,
                minimumStock:2,
                criticality:"High",
                leadTime:"3 Weeks",
                location:"Mechanical Spare Store"
            },


            {
                name:"Timing Belt",
                category:"Mechanical",
                stock:3,
                minimumStock:2,
                criticality:"Medium",
                leadTime:"2 Weeks",
                location:"Mechanical Spare Store"
            },


            {
                name:"Linear Guide Block",
                category:"Mechanical",
                stock:2,
                minimumStock:1,
                criticality:"High",
                leadTime:"3 Weeks",
                location:"Mechanical Spare Store"
            },


            {
                name:"Industrial Camera",
                category:"Vision",
                stock:1,
                minimumStock:1,
                criticality:"Critical",
                leadTime:"4-6 Weeks",
                location:"Vision Spare Store"
            },


            {
                name:"Camera Communication Cable",
                category:"Vision",
                stock:2,
                minimumStock:1,
                criticality:"High",
                leadTime:"2 Weeks",
                location:"Vision Spare Store"
            },


            {
                name:"SMPS",
                category:"Electrical",
                stock:3,
                minimumStock:2,
                criticality:"High",
                leadTime:"2 Weeks",
                location:"Electrical Spare Store"
            },


            {
                name:"Relay",
                category:"Electrical",
                stock:10,
                minimumStock:5,
                criticality:"Medium",
                leadTime:"1 Week",
                location:"Electrical Spare Store"
            }

        ]


    },



    // =================================================
    // LAMINATOR - SC
    // =================================================

    "laminator":{


        machine:"Laminator",

        manufacturer:"SC",

        process:"Module Lamination",


        spares:[


            {
                name:"Vacuum Pump",
                category:"Vacuum",
                stock:1,
                minimumStock:1,
                criticality:"Critical",
                leadTime:"6-8 Weeks",
                location:"Mechanical Spare Store"
            },


            {
                name:"Vacuum Pump Seal Kit",
                category:"Vacuum",
                stock:2,
                minimumStock:2,
                criticality:"Critical",
                leadTime:"3-4 Weeks",
                location:"Mechanical Spare Store"
            },


            {
                name:"Vacuum Solenoid Valve",
                category:"Vacuum",
                stock:3,
                minimumStock:2,
                criticality:"High",
                leadTime:"2-3 Weeks",
                location:"Pneumatic Spare Store"
            },


            {
                name:"Vacuum Pressure Sensor",
                category:"Vacuum",
                stock:2,
                minimumStock:2,
                criticality:"High",
                leadTime:"2-3 Weeks",
                location:"Pneumatic Spare Store"
            },


            {
                name:"Thermocouple",
                category:"Temperature",
                stock:6,
                minimumStock:4,
                criticality:"Critical",
                leadTime:"2 Weeks",
                location:"Electrical Spare Store"
            },


            {
                name:"SSR",
                category:"Temperature",
                stock:4,
                minimumStock:3,
                criticality:"Critical",
                leadTime:"2 Weeks",
                location:"Electrical Spare Store"
            },


            {
                name:"Heater",
                category:"Temperature",
                stock:2,
                minimumStock:2,
                criticality:"Critical",
                leadTime:"4-5 Weeks",
                location:"Electrical Spare Store"
            },


            {
                name:"Temperature Controller",
                category:"Temperature",
                stock:1,
                minimumStock:1,
                criticality:"High",
                leadTime:"3-4 Weeks",
                location:"Electrical Spare Store"
            },


            {
                name:"Pneumatic Solenoid Valve",
                category:"Pneumatic",
                stock:4,
                minimumStock:3,
                criticality:"High",
                leadTime:"2 Weeks",
                location:"Pneumatic Spare Store"
            },


            {
                name:"Pneumatic Cylinder",
                category:"Pneumatic",
                stock:2,
                minimumStock:1,
                criticality:"High",
                leadTime:"3 Weeks",
                location:"Pneumatic Spare Store"
            },


            {
                name:"Contactor",
                category:"Electrical",
                stock:5,
                minimumStock:3,
                criticality:"High",
                leadTime:"1-2 Weeks",
                location:"Electrical Spare Store"
            },


            {
                name:"Relay",
                category:"Electrical",
                stock:10,
                minimumStock:5,
                criticality:"Medium",
                leadTime:"1 Week",
                location:"Electrical Spare Store"
            },


            {
                name:"SMPS",
                category:"Electrical",
                stock:3,
                minimumStock:2,
                criticality:"High",
                leadTime:"2 Weeks",
                location:"Electrical Spare Store"
            },


            {
                name:"Membrane",
                category:"Process",
                stock:1,
                minimumStock:1,
                criticality:"Critical",
                leadTime:"6-8 Weeks",
                location:"Mechanical Spare Store"
            }

        ]


    },



    // =================================================
    // EL TESTER
    // =================================================

    "el":{


        machine:"EL Tester",

        manufacturer:"To Be Updated",

        process:"EL Inspection",


        spares:[


            {
                name:"Industrial Camera",
                category:"Vision",
                stock:1,
                minimumStock:1,
                criticality:"Critical",
                leadTime:"4-6 Weeks",
                location:"Vision Spare Store"
            },


            {
                name:"Camera Lens",
                category:"Vision",
                stock:2,
                minimumStock:1,
                criticality:"High",
                leadTime:"3 Weeks",
                location:"Vision Spare Store"
            },


            {
                name:"Communication Cable",
                category:"Communication",
                stock:3,
                minimumStock:2,
                criticality:"High",
                leadTime:"2 Weeks",
                location:"Electrical Spare Store"
            },


            {
                name:"Power Supply",
                category:"Electrical",
                stock:2,
                minimumStock:1,
                criticality:"High",
                leadTime:"2 Weeks",
                location:"Electrical Spare Store"
            }

        ]


    },



    // =================================================
    // AOI
    // =================================================

    "aoi":{


        machine:"AOI",

        manufacturer:"To Be Updated",

        process:"Automatic Optical Inspection",


        spares:[


            {
                name:"Industrial Camera",
                category:"Vision",
                stock:1,
                minimumStock:1,
                criticality:"Critical",
                leadTime:"4-6 Weeks",
                location:"Vision Spare Store"
            },


            {
                name:"Camera Lens",
                category:"Vision",
                stock:2,
                minimumStock:1,
                criticality:"High",
                leadTime:"3 Weeks",
                location:"Vision Spare Store"
            },


            {
                name:"Lighting Controller",
                category:"Vision",
                stock:1,
                minimumStock:1,
                criticality:"High",
                leadTime:"3-4 Weeks",
                location:"Vision Spare Store"
            },


            {
                name:"Communication Cable",
                category:"Communication",
                stock:3,
                minimumStock:2,
                criticality:"High",
                leadTime:"2 Weeks",
                location:"Electrical Spare Store"
            },


            {
                name:"SMPS",
                category:"Electrical",
                stock:2,
                minimumStock:1,
                criticality:"High",
                leadTime:"2 Weeks",
                location:"Electrical Spare Store"
            }

        ]


    }


};



// =====================================================
// GET SPARE DATA
// =====================================================

function getSpareDetails(machine){


    if(!machine){

        return null;

    }


    const value =
        String(machine)
            .toLowerCase();


    for(const key in spareDatabase){


        if(
            value.includes(key)
        ){

            return spareDatabase[key];

        }

    }


    return null;

}



// =====================================================
// GET STOCK STATUS
// =====================================================

function getSpareStockStatus(spare){


    if(spare.stock <= 0){

        return {

            status:"Out of Stock",

            icon:"🔴"

        };

    }


    if(
        spare.stock <
        spare.minimumStock
    ){

        return {

            status:"Low Stock",

            icon:"🟠"

        };

    }


    if(
        spare.stock ===
        spare.minimumStock
    ){

        return {

            status:"Minimum Stock",

            icon:"🟡"

        };

    }


    return {

        status:"Available",

        icon:"🟢"

    };

}



// =====================================================
// FIND SPARE
// =====================================================

function findSpare(
    machine,
    keyword
){


    const data =
        getSpareDetails(machine);


    if(!data){

        return [];

    }


    const search =
        String(keyword || "")
            .toLowerCase();


    if(!search){

        return data.spares;

    }


    return data.spares.filter(
        spare => {


            const text =
                (

                    spare.name +
                    " " +
                    spare.category

                ).toLowerCase();


            return text.includes(
                search
            );

        }
    );

}



// =====================================================
// CRITICAL SPARES
// =====================================================

function getCriticalSpares(machine){


    const data =
        getSpareDetails(machine);


    if(!data){

        return [];

    }


    return data.spares.filter(
        spare =>

            spare.criticality ===
            "Critical"

    );

}



// =====================================================
// LOW STOCK SPARES
// =====================================================

function getLowStockSpares(){


    const results = [];


    for(
        const machineKey
        in spareDatabase
    ){


        const machine =
            spareDatabase[machineKey];


        machine.spares.forEach(
            spare => {


                if(
                    spare.stock <=
                    spare.minimumStock
                ){


                    results.push({

                        machine:
                            machine.machine,

                        manufacturer:
                            machine.manufacturer,

                        ...spare

                    });

                }

            }
        );

    }


    return results;

}



// =====================================================
// CURRENT LANGUAGE
// =====================================================

function getSpareLanguage(){


    if(
        typeof getSAMALanguage ===
        "function"
    ){

        return getSAMALanguage();

    }


    return "en";

}



// =====================================================
// SPARE LABELS
// =====================================================

function getSpareLabels(){


    const lang =
        getSpareLanguage();


    if(lang === "hi"){

        return {

            title:
            "📦 स्पेयर पार्ट रिपोर्ट",

            machine:
            "मशीन",

            make:
            "मेक",

            process:
            "प्रोसेस",

            spare:
            "स्पेयर",

            category:
            "कैटेगरी",

            stock:
            "स्टॉक",

            minimum:
            "न्यूनतम स्टॉक",

            status:
            "स्थिति",

            criticality:
            "क्रिटिकलिटी",

            leadTime:
            "लीड टाइम",

            location:
            "स्टोरेज लोकेशन",

            critical:
            "क्रिटिकल स्पेयर",

            recommendation:
            "SAMA सुझाव",

            unavailable:
            "स्पेयर डेटा उपलब्ध नहीं है",

            correctMachine:
            "कृपया सही मशीन नाम दें।"

        };

    }


    if(lang === "gu"){

        return {

            title:
            "📦 સ્પેર પાર્ટ રિપોર્ટ",

            machine:
            "મશીન",

            make:
            "મેક",

            process:
            "પ્રોસેસ",

            spare:
            "સ્પેર",

            category:
            "કેટેગરી",

            stock:
            "સ્ટોક",

            minimum:
            "મિનિમમ સ્ટોક",

            status:
            "સ્ટેટસ",

            criticality:
            "ક્રિટિકલિટી",

            leadTime:
            "લીડ ટાઇમ",

            location:
            "સ્ટોરેજ લોકેશન",

            critical:
            "ક્રિટિકલ સ્પેર",

            recommendation:
            "SAMA ભલામણ",

            unavailable:
            "સ્પેર ડેટા ઉપલબ્ધ નથી",

            correctMachine:
            "કૃપા કરીને યોગ્ય મશીન નામ આપો."

        };

    }


    return {

        title:
        "📦 Spare Parts Report",

        machine:
        "Machine",

        make:
        "Make",

        process:
        "Process",

        spare:
        "Spare",

        category:
        "Category",

        stock:
        "Stock",

        minimum:
        "Minimum Stock",

        status:
        "Status",

        criticality:
        "Criticality",

        leadTime:
        "Lead Time",

        location:
        "Storage Location",

        critical:
        "Critical Spares",

        recommendation:
        "SAMA Recommendation",

        unavailable:
        "Spare data not available",

        correctMachine:
        "Please provide the correct machine name."

    };

}



// =====================================================
// GENERATE SPARE REPORT
// =====================================================

function generateSpareReport(
    machine,
    keyword=""
){


    const data =
        getSpareDetails(machine);


    const label =
        getSpareLabels();


    if(!data){

        return `

        <b>${label.unavailable}</b>

        <br><br>

        ${label.correctMachine}

        `;

    }


    let spares =
        keyword
        ?
        findSpare(
            machine,
            keyword
        )
        :
        data.spares;


    if(
        !spares ||
        spares.length === 0
    ){

        spares =
            getCriticalSpares(
                machine
            );

    }


    let html = "";


    spares.forEach(
        (spare,index) => {


            const stockStatus =
                getSpareStockStatus(
                    spare
                );


            html += `

            <br>

            <b>
                ${index + 1}.
                ${spare.name}
            </b>

            <br>

            ${label.category}:
            ${spare.category}

            <br>

            ${label.stock}:
            ${spare.stock}

            <br>

            ${label.minimum}:
            ${spare.minimumStock}

            <br>

            ${label.status}:
            ${stockStatus.icon}
            ${stockStatus.status}

            <br>

            ${label.criticality}:
            ${spare.criticality}

            <br>

            ${label.leadTime}:
            ${spare.leadTime}

            <br>

            ${label.location}:
            ${spare.location}

            <br>

            `;

        }
    );


    const lowStock =
        spares.filter(
            spare =>

                spare.stock <=
                spare.minimumStock

        );


    let recommendation;


    if(lowStock.length > 0){

        recommendation =

        `⚠ ${lowStock.length} spare(s) are at or below minimum stock. Replenishment should be planned based on criticality and lead time.`;

    }
    else{

        recommendation =

        "Current spare stock is above the defined minimum level. Continue periodic inventory review.";

    }


    return `

    <b>${label.title}</b>

    <br><br>

    <b>${label.machine}:</b>
    ${data.machine}

    <br>

    <b>${label.make}:</b>
    ${data.manufacturer}

    <br>

    <b>${label.process}:</b>
    ${data.process}

    <br><br>

    ${html}

    <br>

    <b>🤖 ${label.recommendation}:</b>

    <br>

    ${recommendation}

    `;

}



// =====================================================
// READY
// =====================================================

console.log(
    "✅ SAMA Spare Database Loaded"
);


console.log(
    "Low Stock Spares:",
    getLowStockSpares()
);
