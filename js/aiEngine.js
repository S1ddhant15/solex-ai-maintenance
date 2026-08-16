// =====================================================
// SAMA - Solex AI Maintenance Assistant
// MULTI-LANGUAGE AI DECISION ENGINE
// File: aiEngine.js
// =====================================================


// =====================================================
// MAIN AI RESPONSE
// =====================================================

function generateAIResponse(query){

    const input =
        String(query || "").toLowerCase().trim();

    const machine =
        detectMachine(input);

    const alarm =
        detectAlarm(input);

    const intent =
        detectIntent(input);


    // ----------------------------------------------
    // ALARM
    // ----------------------------------------------

    if(
        intent === "alarm" ||
        alarm
    ){

        return analyzeAlarm(
            alarm,
            machine
        );

    }


    // ----------------------------------------------
    // BREAKDOWN HISTORY
    // ----------------------------------------------

    if(
        input.includes("history") ||
        input.includes("previous") ||
        input.includes("last breakdown") ||
        input.includes("breakdown history") ||
        input.includes("इतिहास") ||
        input.includes("पिछला") ||
        input.includes("હિસ્ટ્રી") ||
        input.includes("પાછલો")
    ){

        return generateHistory(machine);

    }


    // ----------------------------------------------
    // KNOWLEDGE SEARCH
    // ----------------------------------------------

    const knowledge =
        analyzeKnowledge(query);

    if(knowledge){

        return knowledge;

    }


    // ----------------------------------------------
    // BREAKDOWN
    // ----------------------------------------------

    if(intent === "breakdown"){

        return analyzeBreakdown(machine);

    }


    // ----------------------------------------------
    // PM
    // ----------------------------------------------

    if(intent === "pm"){

        if(
            typeof generatePMReport === "function"
        ){

            return generatePMReport(machine);

        }

        return generatePM(machine);

    }


    // ----------------------------------------------
    // SPARE
    // ----------------------------------------------

    if(intent === "spare"){

        if(
            typeof generateSpareReport === "function"
        ){

            return generateSpareReport(machine);

        }

        return generateSpare(machine);

    }


    // ----------------------------------------------
    // HEALTH
    // ----------------------------------------------

    if(intent === "health"){

        return generateHealth(machine);

    }


    // ----------------------------------------------
    // DEFAULT
    // ----------------------------------------------

    return generalResponse(machine);

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
        text.includes("त्रुटि") ||
        text.includes("फॉल्ट") ||
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
        text.includes("रुकी") ||
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
        text.includes("स्वास्थ्य") ||
        text.includes("હેલ્થ") ||
        text.includes("સ્ટેટસ")
    ){

        return "health";

    }


    return "general";

}


// =====================================================
// MACHINE DETECTION
// =====================================================

function detectMachine(text){

    if(
        text.includes("stringer")
    ){

        if(
            text.includes("02") ||
            text.includes("2")
        ){

            return "Stringer-02";

        }

        return "Stringer-01";

    }


    if(
        text.includes("laminator")
    ){

        return "Laminator-01";

    }


    if(
        text.includes("el tester") ||
        text.includes("el ")
    ){

        return "EL-Tester-01";

    }


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
        text.match(/[a-zA-Z]+\d+/);

    if(match){

        return match[0].toUpperCase();

    }

    return null;

}


// =====================================================
// CURRENT LANGUAGE
// =====================================================

function currentLanguage(){

    if(
        typeof getSAMALanguage === "function"
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
        typeof getAlarmDetails === "function" &&
        alarm
    ){

        const data =
            getAlarmDetails(alarm);


        if(data){

            const resolvedMachine =
                machine !== "unknown"
                    ? machine
                    : data.machine;

            return buildAlarmResponse(
                alarm,
                resolvedMachine,
                data
            );

        }

    }


    const lang =
        currentLanguage();


    if(lang === "hi"){

        return `

        <b>🚨 अलार्म जांच</b>

        <br><br>

        अलार्म कोड डेटाबेस में उपलब्ध नहीं है।

        <br><br>

        कृपया जांचें:

        <br>

        ✓ PLC अलार्म हिस्ट्री

        <br>

        ✓ Servo drive

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

        અલાર્મ કોડ ડેટાબેઝમાં ઉપલબ્ધ નથી.

        <br><br>

        કૃપા કરીને તપાસો:

        <br>

        ✓ PLC અલાર્મ હિસ્ટ્રી

        <br>

        ✓ Servo drive

        <br>

        ✓ Sensor feedback

        <br>

        ✓ Communication status

        `;

    }


    return `

    <b>🚨 Alarm Investigation</b>

    <br><br>

    Alarm code not available in database.

    <br><br>

    Please check:

    <br>

    ✓ PLC alarm history

    <br>

    ✓ Servo drive

    <br>

    ✓ Sensor feedback

    <br>

    ✓ Communication status

    `;

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

        <b>तुरंत जांच:</b>

        <br>

        1️⃣ Active alarm जांचें

        <br>

        2️⃣ Power supply जांचें

        <br>

        3️⃣ Air pressure जांचें

        <br>

        4️⃣ Sensor feedback जांचें

        <br>

        5️⃣ Servo drive status जांचें

        <br><br>

        <b>SAMA सुझाव:</b>

        <br>

        Root cause identify करने से पहले मशीन reset न करें।

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

        1️⃣ Active alarm તપાસો

        <br>

        2️⃣ Power supply તપાસો

        <br>

        3️⃣ Air pressure તપાસો

        <br>

        4️⃣ Sensor feedback તપાસો

        <br>

        5️⃣ Servo drive status તપાસો

        <br><br>

        <b>SAMA ભલામણ:</b>

        <br>

        Root cause શોધ્યા વગર મશીન reset ન કરો.

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

    5️⃣ Check servo drive status

    <br><br>

    <b>SAMA Recommendation:</b>

    <br>

    Do not reset the machine before identifying the root cause.

    `;

}


// =====================================================
// PM FALLBACK
// =====================================================

function generatePM(machine){

    const lang =
        currentLanguage();


    if(lang === "hi"){

        return `

        <b>🛠 प्रिवेंटिव मेंटेनेंस</b>

        <br><br>

        <b>मशीन:</b>
        ${machine}

        <br><br>

        ✓ मशीन सफाई

        <br>

        ✓ Lubrication check

        <br>

        ✓ Sensor inspection

        <br>

        ✓ Cable tightening

        <br>

        ✓ Servo inspection

        <br>

        ✓ Pneumatic leakage check

        <br>

        ✓ Safety interlock verification

        `;

    }


    if(lang === "gu"){

        return `

        <b>🛠 પ્રિવેન્ટિવ મેન્ટેનન્સ</b>

        <br><br>

        <b>મશીન:</b>
        ${machine}

        <br><br>

        ✓ મશીન સફાઈ

        <br>

        ✓ Lubrication check

        <br>

        ✓ Sensor inspection

        <br>

        ✓ Cable tightening

        <br>

        ✓ Servo inspection

        <br>

        ✓ Pneumatic leakage check

        <br>

        ✓ Safety interlock verification

        `;

    }


    return `

    <b>🛠 Preventive Maintenance</b>

    <br><br>

    <b>Machine:</b>
    ${machine}

    <br><br>

    ✓ Machine cleaning

    <br>

    ✓ Lubrication check

    <br>

    ✓ Sensor inspection

    <br>

    ✓ Cable tightening

    <br>

    ✓ Servo inspection

    <br>

    ✓ Pneumatic leakage check

    <br>

    ✓ Safety interlock verification

    `;

}


// =====================================================
// SPARE FALLBACK
// =====================================================

function generateSpare(machine){

    const lang =
        currentLanguage();


    if(lang === "hi"){

        return `

        <b>📦 स्पेयर सुझाव</b>

        <br><br>

        <b>मशीन:</b>
        ${machine}

        <br><br>

        Critical spares:

        <br>

        • Servo drive

        <br>

        • Encoder cable

        <br>

        • Proximity sensor

        <br>

        • Solenoid valve

        <br>

        • Relay

        `;

    }


    if(lang === "gu"){

        return `

        <b>📦 સ્પેર ભલામણ</b>

        <br><br>

        <b>મશીન:</b>
        ${machine}

        <br><br>

        Critical spares:

        <br>

        • Servo drive

        <br>

        • Encoder cable

        <br>

        • Proximity sensor

        <br>

        • Solenoid valve

        <br>

        • Relay

        `;

    }


    return `

    <b>📦 Spare Recommendation</b>

    <br><br>

    <b>Machine:</b>
    ${machine}

    <br><br>

    Critical spares:

    <br>

    • Servo Drive

    <br>

    • Encoder Cable

    <br>

    • Proximity Sensor

    <br>

    • Solenoid Valve

    <br>

    • Relay

    `;

}


// =====================================================
// HEALTH
// =====================================================

function generateHealth(machine){

    if(
        typeof generateMachineReport === "function"
    ){

        return generateMachineReport(machine);

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
        typeof getBreakdownHistory !== "function"
    ){

        return historyUnavailable();

    }


    const data =
        getBreakdownHistory(machine);


    if(
        !data ||
        data.length === 0
    ){

        return noHistoryResponse(machine);

    }


    let html = "";


    data.forEach(
        (item,index) => {

            html += `

            <br>

            <b>${index + 1}. ${item.issue || "Breakdown"}</b>

            <br>

            📅 ${item.date || "-"}

            <br>

            🚨 ${item.alarm || "-"}

            <br>

            ⏱ ${item.downtimeMinutes || item.downtime || "-"} ${
                item.downtimeMinutes
                    ? "min"
                    : ""
            }

            <br>

            🔍 ${item.rootCause || "-"}

            <br>

            🛠 ${item.correctiveAction || item.action || "-"}

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
// KNOWLEDGE BASE CONNECTION
// =====================================================

function analyzeKnowledge(query){

    if(
        typeof searchKnowledge !== "function"
    ){

        return null;

    }


    const machine =
        detectMachine(
            String(query || "").toLowerCase()
        );


    const lookupMachine =
        normalizeKnowledgeMachine(machine);


    const result =
        searchKnowledge(
            lookupMachine,
            String(query || "").toLowerCase()
        );


    if(!result){

        return null;

    }


    const lang =
        currentLanguage();


    const causes =
        Array.isArray(result.possibleCause)
            ? result.possibleCause
                .map(item => "• " + item)
                .join("<br>")
            : result.possibleCause;


    const checks =
        Array.isArray(result.checks)
            ? result.checks
                .map(item => "✓ " + item)
                .join("<br>")
            : result.checks;


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
// KNOWLEDGE MACHINE NORMALIZER
// =====================================================

function normalizeKnowledgeMachine(machine){

    const value =
        String(machine || "").toLowerCase();


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
// DEFAULT RESPONSE
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

        उदाहरण:

        <br>

        "Stringer cell breakage"

        <br>

        "Servo alarm E37"

        <br>

        "Laminator PM"

        <br>

        "Stringer health"

        `;

    }


    if(lang === "gu"){

        return `

        🤖 <b>SAMA તૈયાર છે</b>

        <br><br>

        ઓળખાયેલ મશીન:

        <b>${machine}</b>

        <br><br>

        ઉદાહરણ:

        <br>

        "Stringer cell breakage"

        <br>

        "Servo alarm E37"

        <br>

        "Laminator PM"

        <br>

        "Stringer health"

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

    "Stringer cell breakage"

    <br>

    "Servo alarm E37"

    <br>

    "Laminator PM"

    <br>

    "Stringer health"

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
    "✅ SAMA Multi-Language AI Engine Loaded"
);
