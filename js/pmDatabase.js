// =====================================================
// SAMA - Solex AI Maintenance Assistant
// Preventive Maintenance Database
// File: pmDatabase.js
// =====================================================


// =====================================================
// PM DATABASE
// =====================================================


const pmDatabase = {



    // =================================================
    // STRINGER PM
    // MAKE: ATW
    // =================================================

    "stringer":{


        machine:"Stringer",

        manufacturer:"ATW",

        process:"Cell Stringing",

        criticality:"High",


        daily:[

            "Clean machine working area and remove cell/ribbon debris",

            "Check cell pickup vacuum condition",

            "Verify vacuum pressure stability",

            "Check cell loading and presence sensors",

            "Check ribbon feeding condition",

            "Verify ribbon alignment",

            "Check abnormal machine noise",

            "Check servo alarm indication",

            "Verify camera / vision status",

            "Check pneumatic pressure"

        ],


        weekly:[

            "Inspect servo motor and coupling condition",

            "Check conveyor and guide alignment",

            "Inspect pneumatic leakage",

            "Clean sensors and vision cameras",

            "Inspect vacuum cups and vacuum tubing",

            "Check ribbon feeder movement",

            "Verify cell positioning accuracy",

            "Inspect cable routing and connector tightness",

            "Check lubrication points",

            "Verify interlock and safety sensor operation"

        ],


        monthly:[

            "Review servo drive alarm history",

            "Inspect encoder cable and connectors",

            "Check servo drive parameters",

            "Inspect mechanical guide wear",

            "Check linear guide and bearing condition",

            "Inspect electrical panel for loose terminals",

            "Check SMPS, relay and contactor condition",

            "Verify PLC and HMI communication",

            "Backup PLC / HMI parameters",

            "Inspect camera mounting and calibration"

        ],


        quarterly:[

            "Perform complete mechanical alignment inspection",

            "Check servo motor insulation and operating condition",

            "Inspect all pneumatic fittings and valves",

            "Check machine earthing condition",

            "Verify safety circuit performance",

            "Inspect conveyor belt / timing belt wear",

            "Review repeated breakdown trend",

            "Review cell breakage trend",

            "Validate critical spare availability"

        ],


        safetyChecks:[

            "Verify emergency stop function",

            "Check safety door interlock",

            "Check electrical panel earthing",

            "Inspect exposed cables and connectors",

            "Verify pneumatic isolation condition"

        ],


        criticalPoints:[

            "Vacuum pressure",

            "Cell pickup stability",

            "Cell breakage rate",

            "Ribbon alignment",

            "Soldering temperature",

            "Servo alarm history",

            "Camera alignment",

            "Pneumatic pressure"

        ],


        samaRecommendation:

        "Closely monitor vacuum stability, servo alarm history, ribbon alignment and cell breakage trend. Repeated deviations should be investigated before they create a major breakdown."


    },



    // =================================================
    // LAMINATOR PM
    // MAKE: SC
    // =================================================

    "laminator":{


        machine:"Laminator",

        manufacturer:"SC",

        process:"Module Lamination",

        criticality:"Critical",


        daily:[

            "Check heating plate temperature",

            "Verify all temperature zones",

            "Check vacuum pressure",

            "Check vacuum pump operating condition",

            "Verify pneumatic pressure",

            "Inspect lamination cycle time",

            "Check membrane visual condition",

            "Check abnormal sound / vibration",

            "Verify temperature feedback",

            "Check active alarm history"

        ],


        weekly:[

            "Clean laminator working area",

            "Inspect heating plate surface",

            "Check thermocouple condition",

            "Inspect vacuum pump performance",

            "Check vacuum hose and pipe leakage",

            "Inspect solenoid valves",

            "Check pneumatic cylinder condition",

            "Inspect membrane and sealing condition",

            "Verify safety interlocks",

            "Review lamination recipe parameters"

        ],


        monthly:[

            "Measure heater current",

            "Inspect SSR output",

            "Verify temperature controller response",

            "Check thermocouple calibration condition",

            "Inspect vacuum pump oil level / condition",

            "Inspect vacuum pump filter",

            "Check contactor and relay condition",

            "Inspect electrical panel terminal tightness",

            "Verify PLC / HMI communication",

            "Backup PLC and recipe parameters"

        ],


        quarterly:[

            "Verify temperature uniformity across heating plate",

            "Inspect heater health",

            "Perform vacuum system leakage test",

            "Inspect vacuum pump seal condition",

            "Check machine earthing",

            "Inspect pneumatic valves and cylinders",

            "Review repeated temperature alarms",

            "Review vacuum-related breakdown trend",

            "Inspect safety circuit",

            "Validate critical spare availability"

        ],


        safetyChecks:[

            "Verify emergency stop",

            "Check chamber safety interlock",

            "Inspect high-temperature safety protection",

            "Verify electrical earthing",

            "Check pneumatic isolation valve",

            "Verify safety circuit functionality"

        ],


        criticalPoints:[

            "Temperature stability",

            "Temperature uniformity",

            "Vacuum pressure",

            "Vacuum pump performance",

            "Thermocouple feedback",

            "SSR output",

            "Lamination recipe",

            "Membrane condition",

            "Bubble defect trend"

        ],


        samaRecommendation:

        "Vacuum pressure and temperature stability are critical. Any repeated vacuum deterioration, temperature deviation or bubble defect trend should trigger detailed root cause analysis."


    },



    // =================================================
    // EL TESTER PM
    // =================================================

    "el":{


        machine:"EL Tester",

        manufacturer:"To Be Updated",

        process:"EL Inspection",

        criticality:"High",


        daily:[

            "Clean camera lens",

            "Clean inspection area",

            "Check image quality",

            "Verify module contact condition",

            "Check illumination / imaging condition",

            "Check communication status",

            "Verify inspection result consistency"

        ],


        weekly:[

            "Check camera mounting",

            "Check camera calibration condition",

            "Inspect communication cables",

            "Check electrical contact points",

            "Clean imaging chamber",

            "Review abnormal EL image trend"

        ],


        monthly:[

            "Perform camera calibration check",

            "Inspect power supply",

            "Backup inspection parameters",

            "Inspect PC / controller health",

            "Check cable condition",

            "Verify software settings"

        ],


        quarterly:[

            "Perform complete EL calibration",

            "Inspect camera health",

            "Review image quality trend",

            "Check earthing",

            "Inspect critical spare availability"

        ],


        safetyChecks:[

            "Check electrical contact safety",

            "Verify enclosure condition",

            "Check emergency stop",

            "Inspect grounding"

        ],


        criticalPoints:[

            "Image quality",

            "Camera condition",

            "Contact stability",

            "False detection",

            "Calibration"

        ],


        samaRecommendation:

        "Maintain camera calibration and electrical contact stability to avoid false interpretation of EL defects."


    },



    // =================================================
    // AOI PM
    // =================================================

    "aoi":{


        machine:"AOI",

        manufacturer:"To Be Updated",

        process:"Automatic Optical Inspection",

        criticality:"Medium",


        daily:[

            "Clean camera system",

            "Check lighting condition",

            "Verify inspection status",

            "Check NG detection",

            "Check communication status",

            "Review false rejection trend"

        ],


        weekly:[

            "Clean lenses and lighting area",

            "Check camera focus",

            "Verify lighting intensity",

            "Inspect camera mounting",

            "Review false NG trend",

            "Check communication cables"

        ],


        monthly:[

            "Perform camera calibration",

            "Backup inspection parameters",

            "Check controller / PC health",

            "Inspect power supply",

            "Review threshold settings",

            "Inspect electrical connections"

        ],


        quarterly:[

            "Perform complete system calibration",

            "Review inspection accuracy trend",

            "Validate defect library",

            "Check machine earthing",

            "Review critical spare availability"

        ],


        safetyChecks:[

            "Check emergency stop",

            "Inspect electrical safety",

            "Verify machine guards",

            "Check earthing"

        ],


        criticalPoints:[

            "False NG",

            "Camera focus",

            "Lighting stability",

            "Inspection accuracy",

            "Calibration"

        ],


        samaRecommendation:

        "Monitor false rejection trend and camera calibration. Sudden increases in false NG should trigger camera, lighting and threshold verification."


    }


};



// =====================================================
// GET PM DETAILS
// =====================================================


function getPMDetails(machine){


    if(!machine){

        return null;

    }


    machine =
        String(machine).toLowerCase();


    for(let key in pmDatabase){


        if(
            machine.includes(key)
        ){

            return pmDatabase[key];

        }


    }


    return null;


}



// =====================================================
// CURRENT LANGUAGE
// =====================================================


function getPMLanguage(){


    if(
        typeof getSAMALanguage === "function"
    ){

        return getSAMALanguage();

    }


    return "en";


}



// =====================================================
// LABELS
// =====================================================


function getPMLabels(){


    const lang =
        getPMLanguage();


    if(lang === "hi"){

        return {


            title:
            "🛠 प्रिवेंटिव मेंटेनेंस प्लान",


            machine:
            "मशीन",


            make:
            "मेक",


            process:
            "प्रोसेस",


            criticality:
            "क्रिटिकलिटी",


            daily:
            "दैनिक चेकलिस्ट",


            weekly:
            "साप्ताहिक चेकलिस्ट",


            monthly:
            "मासिक चेकलिस्ट",


            quarterly:
            "त्रैमासिक चेकलिस्ट",


            safety:
            "सेफ्टी चेक",


            critical:
            "क्रिटिकल मॉनिटरिंग पॉइंट्स",


            recommendation:
            "SAMA सुझाव",


            unavailable:
            "PM डेटा उपलब्ध नहीं है",


            correctMachine:
            "कृपया सही मशीन नाम दें।"


        };

    }


    if(lang === "gu"){

        return {


            title:
            "🛠 પ્રિવેન્ટિવ મેન્ટેનન્સ પ્લાન",


            machine:
            "મશીન",


            make:
            "મેક",


            process:
            "પ્રોસેસ",


            criticality:
            "ક્રિટિકલિટી",


            daily:
            "દૈનિક ચેકલિસ્ટ",


            weekly:
            "સાપ્તાહિક ચેકલિસ્ટ",


            monthly:
            "માસિક ચેકલિસ્ટ",


            quarterly:
            "ત્રિમાસિક ચેકલિસ્ટ",


            safety:
            "સેફ્ટી ચેક",


            critical:
            "ક્રિટિકલ મોનિટરિંગ પોઇન્ટ્સ",


            recommendation:
            "SAMA ભલામણ",


            unavailable:
            "PM ડેટા ઉપલબ્ધ નથી",


            correctMachine:
            "કૃપા કરીને યોગ્ય મશીન નામ આપો."


        };

    }


    return {


        title:
        "🛠 Preventive Maintenance Plan",


        machine:
        "Machine",


        make:
        "Make",


        process:
        "Process",


        criticality:
        "Criticality",


        daily:
        "Daily Checklist",


        weekly:
        "Weekly Checklist",


        monthly:
        "Monthly Checklist",


        quarterly:
        "Quarterly Checklist",


        safety:
        "Safety Checks",


        critical:
        "Critical Monitoring Points",


        recommendation:
        "SAMA Recommendation",


        unavailable:
        "PM Data Not Available",


        correctMachine:
        "Please provide the correct machine name."


    };


}



// =====================================================
// FORMAT CHECKLIST
// =====================================================


function formatPMList(list, icon="✓"){


    if(
        !Array.isArray(list) ||
        list.length === 0
    ){

        return "-";

    }


    return list

        .map(
            item =>
            `${icon} ${item}`
        )

        .join("<br>");


}



// =====================================================
// GENERATE PM REPORT
// =====================================================


function generatePMReport(machine){


    const data =
        getPMDetails(machine);


    const label =
        getPMLabels();


    if(!data){

        return `

        <b>${label.unavailable}</b>

        <br><br>

        ${label.correctMachine}

        `;

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


    <br>


    <b>${label.criticality}:</b>

    ${data.criticality}


    <br><br>


    <b>📅 ${label.daily}</b>

    <br>

    ${formatPMList(
        data.daily
    )}


    <br><br>


    <b>📆 ${label.weekly}</b>

    <br>

    ${formatPMList(
        data.weekly
    )}


    <br><br>


    <b>🗓 ${label.monthly}</b>

    <br>

    ${formatPMList(
        data.monthly
    )}


    <br><br>


    <b>📋 ${label.quarterly}</b>

    <br>

    ${formatPMList(
        data.quarterly
    )}


    <br><br>


    <b>🦺 ${label.safety}</b>

    <br>

    ${formatPMList(
        data.safetyChecks,
        "⚠"
    )}


    <br><br>


    <b>⚠ ${label.critical}</b>

    <br>

    ${formatPMList(
        data.criticalPoints,
        "•"
    )}


    <br><br>


    <b>🤖 ${label.recommendation}:</b>

    <br>

    ${data.samaRecommendation}


    `;


}



// =====================================================
// PM DATABASE READY
// =====================================================


console.log(
    "✅ SAMA PM Database Loaded"
);
