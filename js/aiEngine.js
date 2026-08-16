// =====================================================
// SAMA - Solex AI Maintenance Assistant
// MULTI-LANGUAGE AI DECISION ENGINE
// File: aiEngine.js
// =====================================================



// =====================================================
// MAIN RESPONSE
// =====================================================

function generateAIResponse(query){

    const input =
        String(query || "")
        .toLowerCase()
        .trim();


    const machine =
        detectMachine(input);


    const alarm =
        detectAlarm(input);


    const intent =
        detectIntent(input);



    // =================================================
    // ALARM
    // =================================================

    if(
        intent === "alarm" ||
        alarm
    ){

        return analyzeAlarm(
            alarm,
            machine
        );

    }



    // =================================================
    // HISTORY
    // =================================================

    if(
        isHistoryRequest(input)
    ){

        return generateHistory(
            machine
        );

    }



    // =================================================
    // KNOWLEDGE / TROUBLESHOOTING
    // =================================================

    const knowledge =
        analyzeKnowledge(query);


    if(knowledge){

        return knowledge;

    }



    // =================================================
    // BREAKDOWN
    // =================================================

    if(intent === "breakdown"){

        return analyzeBreakdown(
            machine
        );

    }



    // =================================================
    // PM
    // =================================================

    if(intent === "pm"){

        if(
            typeof generatePMReport ===
            "function"
        ){

            return generatePMReport(
                machine
            );

        }


        return generatePMFallback(
            machine
        );

    }



    // =================================================
    // SPARE
    // =================================================

    if(intent === "spare"){

        if(
            typeof generateSpareReport ===
            "function"
        ){

            const spareKeyword =
                detectSpareKeyword(
                    input
                );


            return generateSpareReport(
                machine,
                spareKeyword
            );

        }


        return generateSpareFallback(
            machine
        );

    }



    // =================================================
    // HEALTH
    // =================================================

    if(intent === "health"){

        return generateHealth(
            machine
        );

    }



    // =================================================
    // GENERAL
    // =================================================

    return generalResponse(
        machine
    );

}



// =====================================================
// INTENT DETECTION
// =====================================================

function detectIntent(text){


    // ALARM

    if(
        text.includes("alarm") ||
        text.includes("error") ||
        text.includes("fault") ||
        text.includes("code") ||

        text.includes("अलार्म") ||
        text.includes("फॉल्ट") ||
        text.includes("त्रुटि") ||

        text.includes("અલાર્મ") ||
        text.includes("ફોલ્ટ")
    ){

        return "alarm";

    }



    // BREAKDOWN

    if(
        text.includes("breakdown") ||
        text.includes("stopped") ||
        text.includes("stop") ||
        text.includes("not running") ||
        text.includes("failure") ||

        text.includes("ब्रेकडाउन") ||
        text.includes("बंद") ||

        text.includes("બ્રેકડાઉન") ||
        text.includes("બંધ")
    ){

        return "breakdown";

    }



    // PM

    if(
        text.includes("pm") ||
        text.includes("maintenance") ||
        text.includes("service") ||

        text.includes("मेंटेनेंस") ||
        text.includes("रखरखाव") ||

        text.includes("મેન્ટેનન્સ")
    ){

        return "pm";

    }



    // SPARE

    if(
        text.includes("spare") ||
        text.includes("part") ||
        text.includes("replace") ||

        text.includes("स्पेयर") ||
        text.includes("पार्ट") ||

        text.includes("સ્પેર") ||
        text.includes("પાર્ટ")
    ){

        return "spare";

    }



    // HEALTH

    if(
        text.includes("health") ||
        text.includes("status") ||
        text.includes("condition") ||

        text.includes("हेल्थ") ||
        text.includes("स्थिति") ||

        text.includes("હેલ્થ") ||
        text.includes("સ્ટેટસ")
    ){

        return "health";

    }



    return "general";

}



// =====================================================
// HISTORY REQUEST
// =====================================================

function isHistoryRequest(text){

    return (

        text.includes("history") ||
        text.includes("previous") ||
        text.includes("last breakdown") ||
        text.includes("breakdown history") ||

        text.includes("इतिहास") ||
        text.includes("पिछला") ||

        text.includes("હિસ્ટ્રી") ||
        text.includes("પાછલો")

    );

}



// =====================================================
// MACHINE DETECTION
// =====================================================

function detectMachine(text){


    // =================================================
    // ATW STRINGER
    // =================================================

    if(
        text.includes("stringer") ||
        text.includes("atw")
    ){


        if(
            text.includes("02") ||
            text.includes("stringer 2") ||
            text.includes("stringer-02")
        ){

            return "Stringer-02";

        }


        return "Stringer-01";

    }



    // =================================================
    // SC LAMINATOR
    // =================================================

    if(
        text.includes("laminator") ||
        text.includes("sc laminator")
    ){

        return "Laminator-01";

    }



    // =================================================
    // EL
    // =================================================

    if(
        text.includes("el tester") ||
        text.includes("el-") ||
        text.includes(" el ")
    ){

        return "EL-Tester-01";

    }



    // =================================================
    // AOI
    // =================================================

    if(
        text.includes("aoi")
    ){

        return "AOI-01";

    }



    return "unknown";

}



// =====================================================
// ALARM DETECTION
// =====================================================

function detectAlarm(text){

    const match =
        text.match(
            /[a-zA-Z]+\d+/
        );


    if(match){

        return match[0]
            .toUpperCase();

    }


    return null;

}



// =====================================================
// LANGUAGE
// =====================================================

function currentLanguage(){

    if(
        typeof getSAMALanguage ===
        "function"
    ){

        return getSAMALanguage();

    }


    return "en";

}



// =====================================================
// ALARM ANALYSIS
// =====================================================

function analyzeAlarm(
    alarm,
    machine
){


    if(
        typeof getAlarmDetails ===
        "function"
        &&
        alarm
    ){


        const data =
            getAlarmDetails(
                alarm
            );


        if(data){


            const resolvedMachine =
                machine !== "unknown"
                ?
                machine
                :
                data.machine;


            return buildAlarmResponse(
                alarm,
                resolvedMachine,
                data
            );

        }

    }



    return getUnknownAlarmResponse(
        alarm,
        machine
    );

}



// =====================================================
// BUILD ALARM RESPONSE
// =====================================================

function buildAlarmResponse(
    alarm,
    machine,
    data
){


    const lang =
        currentLanguage();



    // =================================================
    // HINDI
    // =================================================

    if(lang === "hi"){

        return `

        <b>🚨 अलार्म डायग्नोसिस</b>

        <br><br>

        <b>मशीन:</b>
        ${machine}

        <br>

        <b>अलार्म कोड:</b>
        ${alarm}

        <br><br>

        <b>विवरण:</b>

        <br>

        ${data.description}

        <br><br>

        <b>संभावित कारण:</b>

        <br>

        ${data.cause}

        <br><br>

        <b>अनुशंसित कार्रवाई:</b>

        <br>

        ${data.action}

        <br><br>

        <b>SAMA सुझाव:</b>

        <br>

        मशीन रीसेट करने से पहले मूल कारण की पुष्टि करें।

        <br><br>

        <b>विश्वसनीयता:</b>
        92%

        `;

    }



    // =================================================
    // GUJARATI
    // =================================================

    if(lang === "gu"){

        return `

        <b>🚨 અલાર્મ ડાયગ્નોસિસ</b>

        <br><br>

        <b>મશીન:</b>
        ${machine}

        <br>

        <b>અલાર્મ કોડ:</b>
        ${alarm}

        <br><br>

        <b>વર્ણન:</b>

        <br>

        ${data.description}

        <br><br>

        <b>સંભવિત કારણ:</b>

        <br>

        ${data.cause}

        <br><br>

        <b>ભલામણ કરેલ કાર્યવાહી:</b>

        <br>

        ${data.action}

        <br><br>

        <b>SAMA ભલામણ:</b>

        <br>

        મશીન રીસેટ કરતા પહેલા મૂળ કારણ ચકાસો.

        <br><br>

        <b>વિશ્વસનીયતા:</b>
        92%

        `;

    }



    // =================================================
    // ENGLISH
    // =================================================

    return `

    <b>🚨 Alarm Diagnosis</b>

    <br><br>

    <b>Machine:</b>
    ${machine}

    <br>

    <b>Alarm Code:</b>
    ${alarm}

    <br><br>

    <b>Description:</b>

    <br>

    ${data.description}

    <br><br>

    <b>Possible Cause:</b>

    <br>

    ${data.cause}

    <br><br>

    <b>Recommended Action:</b>

    <br>

    ${data.action}

    <br><br>

    <b>SAMA Recommendation:</b>

    <br>

    Verify root cause before machine reset.

    <br><br>

    <b>Confidence:</b>
    92%

    `;

}



// =====================================================
// UNKNOWN ALARM
// =====================================================

function getUnknownAlarmResponse(
    alarm,
    machine
){

    const lang =
        currentLanguage();



    if(lang === "hi"){

        return `

        <b>🚨 अलार्म जांच</b>

        <br><br>

        <b>मशीन:</b>
        ${machine}

        <br>

        <b>अलार्म:</b>
        ${alarm || "-"}

        <br><br>

        अलार्म डेटाबेस में उपलब्ध नहीं है।

        <br><br>

        कृपया जांचें:

        <br>

        ✓ PLC alarm history

        <br>

        ✓ Servo drive status

        <br>

        ✓ Sensor feedback

        <br>

        ✓ Communication status

        `;

    }



    if(lang === "gu"){

        return `

        <b>🚨 અલાર્મ તપાસ</b>

        <br><br>

        <b>મશીન:</b>
        ${machine}

        <br>

        <b>અલાર્મ:</b>
        ${alarm || "-"}

        <br><br>

        અલાર્મ ડેટાબેઝમાં ઉપલબ્ધ નથી.

        <br><br>

        કૃપા કરીને તપાસો:

        <br>

        ✓ PLC alarm history

        <br>

        ✓ Servo drive status

        <br>

        ✓ Sensor feedback

        <br>

        ✓ Communication status

        `;

    }



    return `

    <b>🚨 Alarm Investigation</b>

    <br><br>

    <b>Machine:</b>
    ${machine}

    <br>

    <b>Alarm:</b>
    ${alarm || "-"}

    <br><br>

    Alarm not available in the database.

    <br><br>

    Please check:

    <br>

    ✓ PLC alarm history

    <br>

    ✓ Servo drive status

    <br>

    ✓ Sensor feedback

    <br>

    ✓ Communication status

    `;

}



// =====================================================
// BREAKDOWN ANALYSIS
// =====================================================

function analyzeBreakdown(machine){

    const lang =
        currentLanguage();



    if(lang === "hi"){

        return `

        <b>🔧 ब्रेकडाउन विश्लेषण</b>

        <br><br>

        <b>मशीन:</b>
        ${machine}

        <br><br>

        <b>तत्काल जांच:</b>

        <br>

        1️⃣ Active alarms जांचें

        <br>

        2️⃣ Power supply जांचें

        <br>

        3️⃣ Air pressure जांचें

        <br>

        4️⃣ Sensor feedback जांचें

        <br>

        5️⃣ Servo / drive status जांचें

        <br>

        6️⃣ Last breakdown history देखें

        <br><br>

        <b>SAMA सुझाव:</b>

        <br>

        Root cause verify किए बिना मशीन reset न करें।

        `;

    }



    if(lang === "gu"){

        return `

        <b>🔧 બ્રેકડાઉન વિશ્લેષણ</b>

        <br><br>

        <b>મશીન:</b>
        ${machine}

        <br><br>

        <b>તાત્કાલિક તપાસ:</b>

        <br>

        1️⃣ Active alarms તપાસો

        <br>

        2️⃣ Power supply તપાસો

        <br>

        3️⃣ Air pressure તપાસો

        <br>

        4️⃣ Sensor feedback તપાસો

        <br>

        5️⃣ Servo / drive status તપાસો

        <br>

        6️⃣ Last breakdown history જુઓ

        <br><br>

        <b>SAMA ભલામણ:</b>

        <br>

        Root cause verify કર્યા વગર મશીન reset ન કરો.

        `;

    }



    return `

    <b>🔧 Breakdown Analysis</b>

    <br><br>

    <b>Machine:</b>
    ${machine}

    <br><br>

    <b>Immediate Checks:</b>

    <br>

    1️⃣ Check active alarms

    <br>

    2️⃣ Verify power supply

    <br>

    3️⃣ Check air pressure

    <br>

    4️⃣ Check sensor feedback

    <br>

    5️⃣ Check servo / drive status

    <br>

    6️⃣ Review last breakdown history

    <br><br>

    <b>SAMA Recommendation:</b>

    <br>

    Do not reset the machine until the root cause has been verified.

    `;

}



// =====================================================
// PM FALLBACK
// =====================================================

function generatePMFallback(machine){

    const lang =
        currentLanguage();



    if(lang === "hi"){

        return `

        <b>🛠 प्रिवेंटिव मेंटेनेंस</b>

        <br><br>

        PM database उपलब्ध नहीं है।

        <br><br>

        मशीन:
        ${machine}

        `;

    }



    if(lang === "gu"){

        return `

        <b>🛠 પ્રિવેન્ટિવ મેન્ટેનન્સ</b>

        <br><br>

        PM database ઉપલબ્ધ નથી.

        <br><br>

        મશીન:
        ${machine}

        `;

    }



    return `

    <b>🛠 Preventive Maintenance</b>

    <br><br>

    PM database is not connected.

    <br><br>

    Machine:
    ${machine}

    `;

}



// =====================================================
// SPARE KEYWORD DETECTION
// =====================================================

function detectSpareKeyword(input){


    const keywords = [

        "servo drive",

        "servo motor",

        "encoder",

        "sensor",

        "vacuum",

        "thermocouple",

        "ssr",

        "heater",

        "pump",

        "valve",

        "cylinder",

        "relay",

        "contactor",

        "smps",

        "camera",

        "lens",

        "belt",

        "bearing",

        "motor",

        "cable",

        "membrane"

    ];



    for(
        const keyword of keywords
    ){

        if(
            input.includes(keyword)
        ){

            return keyword;

        }

    }



    return "";

}



// =====================================================
// SPARE FALLBACK
// =====================================================

function generateSpareFallback(machine){

    const lang =
        currentLanguage();



    if(lang === "hi"){

        return `

        <b>📦 स्पेयर रिपोर्ट</b>

        <br><br>

        Spare database उपलब्ध नहीं है।

        <br><br>

        मशीन:
        ${machine}

        `;

    }



    if(lang === "gu"){

        return `

        <b>📦 સ્પેર રિપોર્ટ</b>

        <br><br>

        Spare database ઉપલબ્ધ નથી.

        <br><br>

        મશીન:
        ${machine}

        `;

    }



    return `

    <b>📦 Spare Report</b>

    <br><br>

    Spare database is not connected.

    <br><br>

    Machine:
    ${machine}

    `;

}



// =====================================================
// MACHINE HEALTH
// =====================================================

function generateHealth(machine){

    if(
        typeof generateMachineReport ===
        "function"
    ){

        return generateMachineReport(
            machine
        );

    }



    const lang =
        currentLanguage();



    if(lang === "hi"){

        return "Machine database कनेक्ट नहीं है।";

    }



    if(lang === "gu"){

        return "Machine database કનેક્ટ થયેલ નથી.";

    }



    return "Machine database not connected.";

}



// =====================================================
// BREAKDOWN HISTORY
// =====================================================

function generateHistory(machine){

    if(
        typeof getBreakdownHistory !==
        "function"
    ){

        return historyUnavailable();

    }



    const data =
        getBreakdownHistory(
            machine
        );



    if(
        !data ||
        data.length === 0
    ){

        return noHistoryResponse(
            machine
        );

    }



    let html = "";



    data.forEach(
        (item,index) => {


            html += `

            <br>

            <b>
                ${index + 1}.
                ${item.issue || "Breakdown"}
            </b>

            <br>

            📅
            ${item.date || "-"}

            <br>

            🚨
            ${item.alarm || "-"}

            <br>

            ⏱
            ${
                item.downtimeMinutes
                ||
                item.downtime
                ||
                "-"
            }

            ${
                item.downtimeMinutes
                ?
                " min"
                :
                ""
            }

            <br>

            🔍
            ${item.rootCause || "-"}

            <br>

            🛠
            ${
                item.correctiveAction
                ||
                item.action
                ||
                "-"
            }

            <br>

            `;

        }
    );



    const lang =
        currentLanguage();



    if(lang === "hi"){

        return `

        <b>📚 ब्रेकडाउन हिस्ट्री</b>

        <br><br>

        <b>मशीन:</b>
        ${machine}

        ${html}

        `;

    }



    if(lang === "gu"){

        return `

        <b>📚 બ્રેકડાઉન હિસ્ટ્રી</b>

        <br><br>

        <b>મશીન:</b>
        ${machine}

        ${html}

        `;

    }



    return `

    <b>📚 Breakdown History</b>

    <br><br>

    <b>Machine:</b>
    ${machine}

    ${html}

    `;

}



// =====================================================
// KNOWLEDGE BASE
// =====================================================

function analyzeKnowledge(query){

    if(
        typeof searchKnowledge !==
        "function"
    ){

        return null;

    }



    const input =
        String(query || "")
        .toLowerCase();



    const machine =
        detectMachine(input);



    const knowledgeMachine =
        normalizeKnowledgeMachine(
            machine
        );



    const result =
        searchKnowledge(
            knowledgeMachine,
            input
        );



    if(!result){

        return null;

    }



    const causes =
        Array.isArray(
            result.possibleCause
        )
        ?
        result.possibleCause
            .map(
                x => "• " + x
            )
            .join("<br>")
        :
        result.possibleCause;



    const checks =
        Array.isArray(
            result.checks
        )
        ?
        result.checks
            .map(
                x => "✓ " + x
            )
            .join("<br>")
        :
        result.checks;



    const lang =
        currentLanguage();



    if(lang === "hi"){

        return `

        <b>🔧 SAMA ट्रबलशूटिंग विश्लेषण</b>

        <br><br>

        <b>मशीन:</b>
        ${machine}

        <br><br>

        <b>समस्या:</b>

        <br>

        ${result.symptom}

        <br><br>

        <b>संभावित कारण:</b>

        <br>

        ${causes}

        <br><br>

        <b>अनुशंसित जांच:</b>

        <br>

        ${checks}

        <br><br>

        <b>SAMA कार्रवाई:</b>

        <br>

        ${result.action}

        <br><br>

        <b>विश्वसनीयता:</b>
        88%

        `;

    }



    if(lang === "gu"){

        return `

        <b>🔧 SAMA ટ્રબલશૂટિંગ વિશ્લેષણ</b>

        <br><br>

        <b>મશીન:</b>
        ${machine}

        <br><br>

        <b>સમस्या:</b>

        <br>

        ${result.symptom}

        <br><br>

        <b>સંભવિત કારણ:</b>

        <br>

        ${causes}

        <br><br>

        <b>ભલામણ કરેલ તપાસ:</b>

        <br>

        ${checks}

        <br><br>

        <b>SAMA કાર્યવાહી:</b>

        <br>

        ${result.action}

        <br><br>

        <b>વિશ્વસનીયતા:</b>
        88%

        `;

    }



    return `

    <b>🔧 SAMA Troubleshooting Analysis</b>

    <br><br>

    <b>Machine:</b>
    ${machine}

    <br><br>

    <b>Problem:</b>

    <br>

    ${result.symptom}

    <br><br>

    <b>Possible Causes:</b>

    <br>

    ${causes}

    <br><br>

    <b>Recommended Checks:</b>

    <br>

    ${checks}

    <br><br>

    <b>SAMA Action:</b>

    <br>

    ${result.action}

    <br><br>

    <b>Confidence:</b>
    88%

    `;

}



// =====================================================
// NORMALIZE MACHINE FOR KNOWLEDGE.JS
// =====================================================

function normalizeKnowledgeMachine(machine){


    const value =
        String(machine || "")
        .toLowerCase();



    if(
        value.includes("stringer")
    ){

        return "stringer";

    }



    if(
        value.includes("laminator")
    ){

        return "laminator";

    }



    if(
        value.includes("el")
    ){

        return "el tester";

    }



    if(
        value.includes("aoi")
    ){

        return "aoi";

    }



    return value;

}



// =====================================================
// GENERAL RESPONSE
// =====================================================

function generalResponse(machine){

    const lang =
        currentLanguage();



    if(lang === "hi"){

        return `

        🤖 <b>SAMA तैयार है</b>

        <br><br>

        पहचानी गई मशीन:

        <b>${machine}</b>

        <br><br>

        आप पूछ सकते हैं:

        <br>

        "ATW Stringer cell breakage"

        <br>

        "Servo alarm E37"

        <br>

        "SC Laminator PM"

        <br>

        "Stringer health"

        <br>

        "Laminator vacuum spare"

        `;

    }



    if(lang === "gu"){

        return `

        🤖 <b>SAMA તૈયાર છે</b>

        <br><br>

        ઓળખાયેલ મશીન:

        <b>${machine}</b>

        <br><br>

        તમે પૂછી શકો છો:

        <br>

        "ATW Stringer cell breakage"

        <br>

        "Servo alarm E37"

        <br>

        "SC Laminator PM"

        <br>

        "Stringer health"

        <br>

        "Laminator vacuum spare"

        `;

    }



    return `

    🤖 <b>SAMA Ready</b>

    <br><br>

    Detected Machine:

    <b>${machine}</b>

    <br><br>

    Try:

    <br>

    "ATW Stringer cell breakage"

    <br>

    "Servo alarm E37"

    <br>

    "SC Laminator PM"

    <br>

    "Stringer health"

    <br>

    "Laminator vacuum spare"

    `;

}



// =====================================================
// HISTORY HELPERS
// =====================================================

function historyUnavailable(){

    const lang =
        currentLanguage();



    if(lang === "hi"){

        return "ब्रेकडाउन हिस्ट्री डेटाबेस उपलब्ध नहीं है।";

    }



    if(lang === "gu"){

        return "બ્રેકડાઉન હિસ્ટ્રી ડેટાબેઝ ઉપલબ્ધ નથી.";

    }



    return "Breakdown history database unavailable.";

}



function noHistoryResponse(machine){

    const lang =
        currentLanguage();



    if(lang === "hi"){

        return `

        <b>📚 ब्रेकडाउन हिस्ट्री</b>

        <br><br>

        ${machine} के लिए कोई ब्रेकडाउन रिकॉर्ड उपलब्ध नहीं है।

        `;

    }



    if(lang === "gu"){

        return `

        <b>📚 બ્રેકડાઉન હિસ્ટ્રી</b>

        <br><br>

        ${machine} માટે કોઈ બ્રેકડાઉન રેકોર્ડ ઉપલબ્ધ નથી.

        `;

    }



    return `

    <b>📚 Breakdown History</b>

    <br><br>

    No breakdown record available for ${machine}.

    `;

}



// =====================================================
// READY
// =====================================================

console.log(
    "✅ SAMA Advanced AI Engine Loaded"
);
