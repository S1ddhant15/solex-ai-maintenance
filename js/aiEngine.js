// =====================================================
// SAMA - Solex AI Maintenance Assistant
// Advanced AI Decision Engine
// File: aiEngine.js
// =====================================================
//
// SAMA combines:
//
// machines.js
// alarmDatabase.js
// knowledge.js
// pmDatabase.js
// spareDatabase.js
// breakdownHistory.js
// language.js
//
// =====================================================


// =====================================================
// MAIN AI RESPONSE GENERATOR
// =====================================================

function generateAIResponse(query){

    const originalQuery =
        String(query || "").trim();

    const input =
        originalQuery.toLowerCase();


    if(input === ""){

        return getGeneralHelpResponse();

    }


    // Login-aware operational intelligence takes priority for
    // production, quality, maintenance and management KPI queries.
    if(typeof generateRoleAwareOperationalResponse === "function"){

        const roleAwareResponse =
            generateRoleAwareOperationalResponse(originalQuery);

        if(roleAwareResponse){
            return roleAwareResponse;
        }

    }

    // Block legacy maintenance/knowledge responses when the logged-in
    // department does not have permission for the requested information.
    if(typeof getSAMAFallbackAccessResponse === "function"){

        const accessControlledResponse =
            getSAMAFallbackAccessResponse(originalQuery);

        if(accessControlledResponse){
            return accessControlledResponse;
        }

    }


    const machine =
        detectMachine(input);


    const alarm =
        detectAlarm(input);


    const intent =
        detectIntent(input);



    console.log(
        "SAMA Query:",
        {
            query:originalQuery,
            machine:machine,
            alarm:alarm,
            intent:intent
        }
    );



    // =================================================
    // ALARM DIAGNOSIS
    // =================================================

    if(
        alarm ||
        intent === "alarm"
    ){

        return analyzeAlarmRequest(
            originalQuery,
            machine,
            alarm
        );

    }



    // =================================================
    // BREAKDOWN HISTORY
    // =================================================

    if(
        intent === "history"
    ){

        return analyzeHistoryRequest(
            machine,
            input
        );

    }



    // =================================================
    // BREAKDOWN / TROUBLESHOOTING
    // =================================================

    if(
        intent === "breakdown"
        ||
        intent === "problem"
    ){

        return analyzeBreakdownRequest(
            originalQuery,
            machine
        );

    }



    // =================================================
    // PREVENTIVE MAINTENANCE
    // =================================================

    if(
        intent === "pm"
    ){

        return analyzePMRequest(
            machine
        );

    }



    // =================================================
    // SPARES
    // =================================================

    if(
        intent === "spare"
    ){

        return analyzeSpareRequest(
            machine,
            input
        );

    }



    // =================================================
    // MACHINE HEALTH
    // =================================================

    if(
        intent === "health"
    ){

        return analyzeMachineHealth(
            machine
        );

    }



    // =================================================
    // MTTR / DOWNTIME
    // =================================================

    if(
        intent === "analytics"
    ){

        return analyzeMaintenanceAnalytics(
            machine,
            input
        );

    }



    // =================================================
    // KNOWLEDGE SEARCH
    // =================================================

    const knowledgeResponse =
        analyzeKnowledgeRequest(
            originalQuery,
            machine
        );


    if(knowledgeResponse){

        return knowledgeResponse;

    }



    // =================================================
    // MACHINE INFORMATION
    // =================================================

    if(
        machine !== "unknown"
    ){

        return getMachineSummary(
            machine
        );

    }



    // =================================================
    // GENERAL RESPONSE
    // =================================================

    return getGeneralHelpResponse();

}



// =====================================================
// INTENT DETECTION
// =====================================================

function detectIntent(text){


    // =================================================
    // ALARM
    // =================================================

    if(
        text.includes("alarm") ||
        text.includes("error") ||
        text.includes("fault") ||
        text.includes("code") ||

        text.includes("अलार्म") ||
        text.includes("फॉल्ट") ||
        text.includes("एरर") ||

        text.includes("અલાર્મ") ||
        text.includes("ફોલ્ટ")
    ){

        return "alarm";

    }



    // =================================================
    // HISTORY
    // =================================================

    if(
        text.includes("history") ||
        text.includes("previous breakdown") ||
        text.includes("last breakdown") ||
        text.includes("repeated failure") ||
        text.includes("repeat failure") ||
        text.includes("past breakdown") ||

        text.includes("इतिहास") ||
        text.includes("पिछला ब्रेकडाउन") ||

        text.includes("હિસ્ટ્રી") ||
        text.includes("પાછલો બ્રેકડાઉન")
    ){

        return "history";

    }



    // =================================================
    // ANALYTICS
    // =================================================

    if(
        text.includes("mttr") ||
        text.includes("downtime") ||
        text.includes("breakdown count") ||
        text.includes("most frequent") ||
        text.includes("highest downtime") ||
        text.includes("repeated breakdown") ||

        text.includes("डाउनटाइम") ||

        text.includes("ડાઉનટાઇમ")
    ){

        return "analytics";

    }



    // =================================================
    // PM
    // =================================================

    if(
        text.includes("pm") ||
        text.includes("preventive") ||
        text.includes("maintenance checklist") ||
        text.includes("service checklist") ||
        text.includes("maintenance plan") ||

        text.includes("मेंटेनेंस") ||
        text.includes("रखरखाव") ||

        text.includes("મેન્ટેનન્સ")
    ){

        return "pm";

    }



    // =================================================
    // SPARE
    // =================================================

    if(
        text.includes("spare") ||
        text.includes("part required") ||
        text.includes("replacement part") ||
        text.includes("stock") ||
        text.includes("inventory") ||

        text.includes("स्पेयर") ||
        text.includes("पार्ट") ||

        text.includes("સ્પેર") ||
        text.includes("પાર્ટ")
    ){

        return "spare";

    }



    // =================================================
    // HEALTH
    // =================================================

    if(
        text.includes("health") ||
        text.includes("machine condition") ||
        text.includes("machine status") ||
        text.includes("condition report") ||

        text.includes("हेल्थ") ||
        text.includes("स्थिति") ||

        text.includes("હેલ્થ") ||
        text.includes("સ્ટેટસ")
    ){

        return "health";

    }



    // =================================================
    // BREAKDOWN
    // =================================================

    if(
        text.includes("breakdown") ||
        text.includes("machine stopped") ||
        text.includes("not running") ||
        text.includes("not working") ||
        text.includes("stopped") ||
        text.includes("failure") ||
        text.includes("problem") ||
        text.includes("issue") ||

        text.includes("ब्रेकडाउन") ||
        text.includes("बंद") ||
        text.includes("समस्या") ||

        text.includes("બ્રેકડાઉન") ||
        text.includes("બંધ") ||
        text.includes("સમસ્યા")
    ){

        return "breakdown";

    }



    return "general";

}



// =====================================================
// MACHINE DETECTION
// =====================================================

function detectMachine(text){


    const input =
        String(text || "")
        .toLowerCase();


    // =================================================
    // STRINGER 02
    // =================================================

    if(
        input.includes("stringer 02") ||
        input.includes("stringer-02") ||
        input.includes("stringer 2")
    ){

        return "Stringer-02";

    }



    // =================================================
    // STRINGER
    // =================================================

    if(
        input.includes("stringer") ||
        input.includes("atw")
    ){

        return "Stringer-01";

    }



    // =================================================
    // LAMINATOR
    // =================================================

    if(
        input.includes("laminator") ||
        input.includes("sc laminator")
    ){

        return "Laminator-01";

    }



    // =================================================
    // EL TESTER
    // =================================================

    if(
        input.includes("el tester") ||
        input.includes("el-tester")
    ){

        return "EL-Tester-01";

    }



    // =================================================
    // AOI
    // =================================================

    if(
        input.includes("aoi")
    ){

        return "AOI-01";

    }



    return "unknown";

}



// =====================================================
// ALARM CODE DETECTION
// =====================================================

function detectAlarm(text){


    const match =
        String(text || "")
        .match(
            /\b[A-Za-z]{1,5}\d{1,4}\b/
        );


    if(match){

        return match[0]
            .toUpperCase();

    }


    return null;

}



// =====================================================
// CURRENT LANGUAGE
// =====================================================

function getCurrentSAMALanguage(){


    if(
        typeof getSAMALanguage ===
        "function"
    ){

        return getSAMALanguage();

    }


    return "en";

}



// =====================================================
// MACHINE DISPLAY NAME
// =====================================================

function getMachineDisplayName(machine){


    if(
        machine === "unknown"
    ){

        return getLocalizedText(
            "Unknown Machine",
            "मशीन पहचान नहीं हुई",
            "મશીન ઓળખાયું નથી"
        );

    }


    if(
        typeof getMachine ===
        "function"
    ){

        const data =
            getMachine(machine);


        if(data){

            return (
                data.manufacturer +
                " " +
                data.name
            );

        }

    }


    return machine;

}



// =====================================================
// ALARM REQUEST
// =====================================================

function analyzeAlarmRequest(
    query,
    machine,
    alarmCode
){


    if(
        !alarmCode
    ){

        return getLocalizedText(

            `

            <b>🚨 Alarm Code Required</b>

            <br><br>

            Please provide:

            <br>

            Machine + Alarm Code

            <br><br>

            Example:

            <br>

            <b>ATW Stringer alarm E37</b>

            `,

            `

            <b>🚨 अलार्म कोड आवश्यक है</b>

            <br><br>

            कृपया मशीन और अलार्म कोड दें।

            <br><br>

            उदाहरण:

            <br>

            <b>ATW Stringer alarm E37</b>

            `,

            `

            <b>🚨 અલાર્મ કોડ જરૂરી છે</b>

            <br><br>

            કૃપા કરીને મશીન અને અલાર્મ કોડ આપો.

            <br><br>

            ઉદાહરણ:

            <br>

            <b>ATW Stringer alarm E37</b>

            `

        );

    }



    if(
        typeof getAlarmDetails !==
        "function"
    ){

        return databaseConnectionError(
            "Alarm"
        );

    }



    const alarm =
        getAlarmDetails(
            alarmCode
        );



    if(!alarm){

        return unknownAlarmResponse(
            alarmCode,
            machine
        );

    }



    let resolvedMachine =
        machine;


    if(
        resolvedMachine ===
        "unknown"
        &&
        alarm.machine
    ){

        resolvedMachine =
            alarm.machine;

    }



    const causes =
        formatArray(
            alarm.possibleCauses,
            "•"
        );


    const checks =
        formatArray(
            alarm.checks,
            "✓"
        );


    const symptoms =
        formatArray(
            alarm.symptoms,
            "•"
        );


    const spares =
        formatArray(
            alarm.spareSuggestion,
            "📦"
        );



    let previousFailure = "";


    if(
        typeof getBreakdownByAlarm ===
        "function"
    ){

        const history =
            getBreakdownByAlarm(
                alarmCode
            );


        if(
            history &&
            history.length > 0
        ){

            const last =
                [...history]
                .sort(
                    (a,b) =>
                        new Date(b.date) -
                        new Date(a.date)
                )[0];


            previousFailure = `

                <br><br>

                <b>📚 Previous Similar Breakdown</b>

                <br><br>

                Date:
                ${last.date}

                <br>

                Root Cause:
                ${last.rootCause}

                <br>

                Corrective Action:
                ${last.correctiveAction}

            `;

        }

    }



    return getLocalizedText(


        // =================================================
        // ENGLISH
        // =================================================

        `

        <b>🚨 SAMA Alarm Diagnosis</b>

        <br><br>

        <b>Machine:</b>

        ${getMachineDisplayName(resolvedMachine)}

        <br>

        <b>Alarm Code:</b>

        ${alarmCode}

        <br>

        <b>Category:</b>

        ${alarm.category}

        <br>

        <b>Severity:</b>

        ${getSeverityIcon(alarm.severity)}
        ${alarm.severity}

        <br><br>

        <b>Description:</b>

        <br>

        ${alarm.description}

        <br><br>

        <b>Observed Symptoms:</b>

        <br>

        ${symptoms}

        <br><br>

        <b>Possible Causes:</b>

        <br>

        ${causes}

        <br><br>

        <b>Recommended Checks:</b>

        <br>

        ${checks}

        <br><br>

        <b>Corrective Guidance:</b>

        <br>

        ${alarm.action}

        ${previousFailure}

        <br><br>

        <b>Recommended Spares:</b>

        <br>

        ${spares}

        <br><br>

        <b>🤖 SAMA Recommendation:</b>

        <br>

        Confirm the root cause before resetting or replacing components.

        <br><br>

        <b>Confidence:</b>

        92%

        `,


        // =================================================
        // HINDI
        // =================================================

        `

        <b>🚨 SAMA अलार्म डायग्नोसिस</b>

        <br><br>

        <b>मशीन:</b>

        ${getMachineDisplayName(resolvedMachine)}

        <br>

        <b>अलार्म कोड:</b>

        ${alarmCode}

        <br>

        <b>कैटेगरी:</b>

        ${alarm.category}

        <br>

        <b>गंभीरता:</b>

        ${getSeverityIcon(alarm.severity)}
        ${alarm.severity}

        <br><br>

        <b>विवरण:</b>

        <br>

        ${alarm.description}

        <br><br>

        <b>संभावित कारण:</b>

        <br>

        ${causes}

        <br><br>

        <b>अनुशंसित जांच:</b>

        <br>

        ${checks}

        <br><br>

        <b>सुधारात्मक मार्गदर्शन:</b>

        <br>

        ${alarm.action}

        ${previousFailure}

        <br><br>

        <b>सुझाए गए स्पेयर:</b>

        <br>

        ${spares}

        <br><br>

        <b>🤖 SAMA सुझाव:</b>

        <br>

        मशीन रीसेट या पार्ट बदलने से पहले मूल कारण की पुष्टि करें।

        `,


        // =================================================
        // GUJARATI
        // =================================================

        `

        <b>🚨 SAMA અલાર્મ ડાયગ્નોસિસ</b>

        <br><br>

        <b>મશીન:</b>

        ${getMachineDisplayName(resolvedMachine)}

        <br>

        <b>અલાર્મ કોડ:</b>

        ${alarmCode}

        <br>

        <b>કેટેગરી:</b>

        ${alarm.category}

        <br>

        <b>ગંભીરતા:</b>

        ${getSeverityIcon(alarm.severity)}
        ${alarm.severity}

        <br><br>

        <b>વર્ણન:</b>

        <br>

        ${alarm.description}

        <br><br>

        <b>સંભવિત કારણો:</b>

        <br>

        ${causes}

        <br><br>

        <b>ભલામણ કરેલ તપાસ:</b>

        <br>

        ${checks}

        <br><br>

        <b>સુધારાત્મક માર્ગદર્શન:</b>

        <br>

        ${alarm.action}

        ${previousFailure}

        <br><br>

        <b>ભલામણ કરેલ સ્પેર:</b>

        <br>

        ${spares}

        <br><br>

        <b>🤖 SAMA ભલામણ:</b>

        <br>

        મશીન reset અથવા component replacement પહેલાં root cause verify કરો.

        `

    );

}



// =====================================================
// UNKNOWN ALARM
// =====================================================

function unknownAlarmResponse(
    alarmCode,
    machine
){


    return getLocalizedText(

        `

        <b>🚨 Alarm Not Found</b>

        <br><br>

        Alarm:

        <b>${alarmCode}</b>

        <br>

        Machine:

        <b>${getMachineDisplayName(machine)}</b>

        <br><br>

        The alarm is not currently available in the SAMA database.

        <br><br>

        Recommended checks:

        <br>

        ✓ Check HMI alarm description

        <br>

        ✓ Review PLC alarm history

        <br>

        ✓ Check sensor / servo / communication status

        <br>

        ✓ Refer OEM manual

        <br><br>

        Please add the confirmed alarm details to the SAMA knowledge base.

        `,

        `

        <b>🚨 अलार्म डेटाबेस में नहीं मिला</b>

        <br><br>

        Alarm:

        <b>${alarmCode}</b>

        <br><br>

        HMI और PLC alarm history जांचें तथा OEM manual से पुष्टि करें।

        `,

        `

        <b>🚨 અલાર્મ ડેટાબેઝમાં મળ્યો નથી</b>

        <br><br>

        Alarm:

        <b>${alarmCode}</b>

        <br><br>

        HMI અને PLC alarm history તપાસો અને OEM manual સાથે verify કરો.

        `

    );

}



// =====================================================
// BREAKDOWN REQUEST
// =====================================================

function analyzeBreakdownRequest(
    query,
    machine
){


    const knowledge =
        analyzeKnowledgeRequest(
            query,
            machine
        );


    if(knowledge){

        return knowledge;

    }



    let lastBreakdownHTML = "";


    if(
        machine !== "unknown"
        &&
        typeof getLastBreakdown ===
        "function"
    ){

        const last =
            getLastBreakdown(
                machine
            );


        if(last){

            lastBreakdownHTML = `

                <br><br>

                <b>📚 Last Breakdown</b>

                <br>

                Date:
                ${last.date}

                <br>

                Issue:
                ${last.issue}

                <br>

                Root Cause:
                ${last.rootCause}

                <br>

                Corrective Action:
                ${last.correctiveAction}

            `;

        }

    }



    return getLocalizedText(

        `

        <b>🔧 SAMA Breakdown Analysis</b>

        <br><br>

        <b>Machine:</b>

        ${getMachineDisplayName(machine)}

        <br><br>

        <b>Immediate Checks:</b>

        <br>

        1️⃣ Check active alarms

        <br>

        2️⃣ Verify power and air supply

        <br>

        3️⃣ Check machine interlocks

        <br>

        4️⃣ Check sensor feedback

        <br>

        5️⃣ Check servo / drive status

        <br>

        6️⃣ Check communication status

        <br>

        7️⃣ Inspect for mechanical obstruction

        ${lastBreakdownHTML}

        <br><br>

        <b>🤖 SAMA Recommendation:</b>

        <br>

        Do not repeatedly reset the equipment. Capture the alarm and symptom before intervention.

        `,

        `

        <b>🔧 SAMA ब्रेकडाउन विश्लेषण</b>

        <br><br>

        <b>मशीन:</b>

        ${getMachineDisplayName(machine)}

        <br><br>

        1️⃣ Active alarm जांचें

        <br>

        2️⃣ Power और air supply जांचें

        <br>

        3️⃣ Interlock जांचें

        <br>

        4️⃣ Sensor feedback जांचें

        <br>

        5️⃣ Servo / drive status जांचें

        <br>

        6️⃣ Communication status जांचें

        <br>

        7️⃣ Mechanical obstruction जांचें

        ${lastBreakdownHTML}

        `,

        `

        <b>🔧 SAMA બ્રેકડાઉન વિશ્લેષણ</b>

        <br><br>

        <b>મશીન:</b>

        ${getMachineDisplayName(machine)}

        <br><br>

        1️⃣ Active alarm તપાસો

        <br>

        2️⃣ Power અને air supply તપાસો

        <br>

        3️⃣ Interlock તપાસો

        <br>

        4️⃣ Sensor feedback તપાસો

        <br>

        5️⃣ Servo / drive status તપાસો

        <br>

        6️⃣ Communication status તપાસો

        <br>

        7️⃣ Mechanical obstruction તપાસો

        ${lastBreakdownHTML}

        `

    );

}



// =====================================================
// KNOWLEDGE REQUEST
// =====================================================

function analyzeKnowledgeRequest(
    query,
    machine
){


    if(
        typeof searchKnowledge !==
        "function"
    ){

        return null;

    }



    if(
        machine === "unknown"
    ){

        return null;

    }



    const result =
        searchKnowledge(
            machine,
            query
        );



    if(!result){

        return null;

    }



    const causes =
        formatArray(
            result.possibleCause,
            "•"
        );


    const checks =
        formatArray(
            result.checks,
            "✓"
        );


    const rca =
        formatArray(
            result.rcaFocus,
            "🔍"
        );



    let historyHTML = "";


    if(
        typeof getBreakdownHistory ===
        "function"
    ){

        const history =
            getBreakdownHistory(
                machine
            );


        const matches =
            history.filter(
                item => {


                    const text =
                        (

                            item.issue +
                            " " +
                            item.category +
                            " " +
                            item.rootCause

                        )
                        .toLowerCase();


                    const issue =
                        String(
                            result.key || ""
                        )
                        .toLowerCase();


                    return (
                        issue &&
                        text.includes(issue)
                    );

                }
            );


        if(
            matches.length > 0
        ){

            const last =
                matches[matches.length - 1];


            historyHTML = `

                <br><br>

                <b>📚 Similar Previous Breakdown</b>

                <br>

                Date:
                ${last.date}

                <br>

                Root Cause:
                ${last.rootCause}

                <br>

                Corrective Action:
                ${last.correctiveAction}

            `;

        }

    }



    return getLocalizedText(

        `

        <b>🔧 SAMA Troubleshooting & RCA</b>

        <br><br>

        <b>Machine:</b>

        ${result.manufacturer}
        ${result.machine}

        <br>

        <b>Process:</b>

        ${result.process}

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

        <b>RCA Focus Areas:</b>

        <br>

        ${rca}

        ${historyHTML}

        <br><br>

        <b>🤖 SAMA Action:</b>

        <br>

        ${result.action}

        <br><br>

        <b>Confidence:</b>

        88%

        `,

        `

        <b>🔧 SAMA ट्रबलशूटिंग और RCA</b>

        <br><br>

        <b>मशीन:</b>

        ${result.manufacturer}
        ${result.machine}

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

        <b>RCA Focus:</b>

        <br>

        ${rca}

        ${historyHTML}

        <br><br>

        <b>SAMA Action:</b>

        <br>

        ${result.action}

        `,

        `

        <b>🔧 SAMA ટ્રબલશૂટિંગ અને RCA</b>

        <br><br>

        <b>મશીન:</b>

        ${result.manufacturer}
        ${result.machine}

        <br><br>

        <b>સમસ્યા:</b>

        <br>

        ${result.symptom}

        <br><br>

        <b>સંભવિત કારણો:</b>

        <br>

        ${causes}

        <br><br>

        <b>ભલામણ કરેલ તપાસ:</b>

        <br>

        ${checks}

        <br><br>

        <b>RCA Focus:</b>

        <br>

        ${rca}

        ${historyHTML}

        <br><br>

        <b>SAMA Action:</b>

        <br>

        ${result.action}

        `

    );

}



// =====================================================
// PM REQUEST
// =====================================================

function analyzePMRequest(machine){


    if(
        typeof generatePMReport !==
        "function"
    ){

        return databaseConnectionError(
            "PM"
        );

    }


    return generatePMReport(
        machine
    );

}



// =====================================================
// SPARE REQUEST
// =====================================================

function analyzeSpareRequest(
    machine,
    query
){


    if(
        typeof generateSpareReport !==
        "function"
    ){

        return databaseConnectionError(
            "Spare"
        );

    }



    const keyword =
        detectSpareKeyword(
            query
        );


    return generateSpareReport(
        machine,
        keyword
    );

}



// =====================================================
// SPARE KEYWORD
// =====================================================

function detectSpareKeyword(text){


    const keywords = [

        "servo drive",
        "servo motor",
        "encoder",
        "camera",
        "vacuum",
        "sensor",
        "valve",
        "cylinder",
        "thermocouple",
        "ssr",
        "heater",
        "pump",
        "relay",
        "contactor",
        "smps",
        "membrane",
        "belt",
        "bearing",
        "cable",
        "lens"

    ];


    for(
        const keyword of keywords
    ){

        if(
            text.includes(keyword)
        ){

            return keyword;

        }

    }


    return "";

}



// =====================================================
// HEALTH REQUEST
// =====================================================

function analyzeMachineHealth(machine){


    if(
        typeof generateMachineReport !==
        "function"
    ){

        return databaseConnectionError(
            "Machine"
        );

    }



    if(
        machine === "unknown"
    ){

        return getLocalizedText(

            `

            <b>📊 Machine Health</b>

            <br><br>

            Please provide the machine name.

            <br><br>

            Example:

            <br>

            <b>ATW Stringer health</b>

            `,

            `

            <b>📊 मशीन हेल्थ</b>

            <br><br>

            कृपया मशीन नाम दें।

            `,

            `

            <b>📊 મશીન હેલ્થ</b>

            <br><br>

            કૃપા કરીને મશીન નામ આપો.

            `

        );

    }


    return generateMachineReport(
        machine
    );

}



// =====================================================
// HISTORY REQUEST
// =====================================================

function analyzeHistoryRequest(
    machine,
    query
){


    if(
        machine === "unknown"
    ){

        return getLocalizedText(

            "Please provide a machine name for breakdown history.",

            "ब्रेकडाउन हिस्ट्री के लिए मशीन नाम दें।",

            "બ્રેકડાઉન હિસ્ટ્રી માટે મશીન નામ આપો."

        );

    }



    if(
        query.includes("repeated") ||
        query.includes("repeat")
    ){

        return generateRepeatedFailureReport(
            machine
        );

    }



    if(
        query.includes("last breakdown") ||
        query.includes("previous")
    ){

        return generateLastBreakdownReport(
            machine
        );

    }



    if(
        typeof generateBreakdownAnalyticsReport ===
        "function"
    ){

        return generateBreakdownAnalyticsReport(
            machine
        );

    }



    return generateBasicHistory(
        machine
    );

}



// =====================================================
// BASIC HISTORY
// =====================================================

function generateBasicHistory(machine){


    if(
        typeof getBreakdownHistory !==
        "function"
    ){

        return databaseConnectionError(
            "Breakdown History"
        );

    }



    const history =
        getBreakdownHistory(
            machine
        );


    if(
        !history ||
        history.length === 0
    ){

        return `

        <b>📚 Breakdown History</b>

        <br><br>

        No breakdown history available.

        `;

    }



    let html = "";


    history.forEach(
        (item,index) => {


            html += `

            <br>

            <b>${index + 1}. ${item.issue}</b>

            <br>

            Date:
            ${item.date}

            <br>

            Alarm:
            ${item.alarm || "-"}

            <br>

            Downtime:
            ${item.downtimeMinutes} min

            <br>

            Root Cause:
            ${item.rootCause}

            <br>

            Corrective Action:
            ${item.correctiveAction}

            <br>

            `;

        }
    );


    return `

    <b>📚 Breakdown History</b>

    <br><br>

    <b>Machine:</b>

    ${getMachineDisplayName(machine)}

    <br>

    ${html}

    `;

}



// =====================================================
// LAST BREAKDOWN
// =====================================================

function generateLastBreakdownReport(machine){


    if(
        typeof getLastBreakdown !==
        "function"
    ){

        return databaseConnectionError(
            "Breakdown History"
        );

    }



    const item =
        getLastBreakdown(
            machine
        );


    if(!item){

        return "No previous breakdown available.";

    }



    return `

    <b>🕒 Last Breakdown</b>

    <br><br>

    <b>Machine:</b>

    ${getMachineDisplayName(machine)}

    <br><br>

    Date:
    ${item.date}

    <br>

    Issue:
    ${item.issue}

    <br>

    Alarm:
    ${item.alarm || "-"}

    <br>

    Downtime:
    ${item.downtimeMinutes} min

    <br><br>

    <b>Root Cause:</b>

    <br>

    ${item.rootCause}

    <br><br>

    <b>Corrective Action:</b>

    <br>

    ${item.correctiveAction}

    <br><br>

    <b>Preventive Action:</b>

    <br>

    ${item.preventiveAction}

    `;

}



// =====================================================
// REPEATED FAILURE REPORT
// =====================================================

function generateRepeatedFailureReport(machine){


    if(
        typeof getRepeatedBreakdowns !==
        "function"
    ){

        return databaseConnectionError(
            "Breakdown Analytics"
        );

    }



    const repeated =
        getRepeatedBreakdowns(
            machine
        );


    if(
        !repeated ||
        repeated.length === 0
    ){

        return `

        <b>🔁 Repeated Failure Analysis</b>

        <br><br>

        No repeated failure category detected.

        `;

    }



    let html = "";


    repeated.forEach(
        item => {


            html += `

            ⚠ <b>${item.category}</b>

            <br>

            Occurrences:
            ${item.count}

            <br>

            Total Downtime:
            ${item.downtimeMinutes} min

            <br><br>

            `;

        }
    );


    return `

    <b>🔁 SAMA Repeated Failure Analysis</b>

    <br><br>

    <b>Machine:</b>

    ${getMachineDisplayName(machine)}

    <br><br>

    ${html}

    <b>🤖 Recommendation:</b>

    <br>

    Repeated failures should be addressed through permanent corrective action and PM improvement instead of repeated reset or temporary repair.

    `;

}



// =====================================================
// MAINTENANCE ANALYTICS
// =====================================================

function analyzeMaintenanceAnalytics(
    machine,
    query
){


    if(
        machine === "unknown"
    ){

        return "Please provide the machine name.";

    }



    if(
        query.includes("mttr")
        &&
        typeof calculateBreakdownMTTR ===
        "function"
    ){

        const mttr =
            calculateBreakdownMTTR(
                machine
            );


        return `

        <b>⏱ MTTR Analysis</b>

        <br><br>

        Machine:

        <b>${getMachineDisplayName(machine)}</b>

        <br><br>

        MTTR:

        <b>${mttr} minutes</b>

        `;

    }



    if(
        query.includes("downtime")
        &&
        typeof getTotalDowntime ===
        "function"
    ){

        const downtime =
            getTotalDowntime(
                machine
            );


        return `

        <b>📉 Downtime Analysis</b>

        <br><br>

        Machine:

        <b>${getMachineDisplayName(machine)}</b>

        <br><br>

        Total recorded downtime:

        <b>${downtime} minutes</b>

        `;

    }



    if(
        typeof generateBreakdownAnalyticsReport ===
        "function"
    ){

        return generateBreakdownAnalyticsReport(
            machine
        );

    }



    return databaseConnectionError(
        "Breakdown Analytics"
    );

}



// =====================================================
// MACHINE SUMMARY
// =====================================================

function getMachineSummary(machine){


    if(
        typeof getMachine !==
        "function"
    ){

        return databaseConnectionError(
            "Machine"
        );

    }



    const data =
        getMachine(
            machine
        );


    if(!data){

        return "Machine information not available.";

    }



    return `

    <b>⚙ Machine Information</b>

    <br><br>

    <b>Machine:</b>

    ${data.name}

    <br>

    <b>Make:</b>

    ${data.manufacturer}

    <br>

    <b>Process:</b>

    ${data.process}

    <br>

    <b>Line:</b>

    ${data.line}

    <br>

    <b>Status:</b>

    ${data.status}

    <br>

    <b>Health:</b>

    ${data.healthScore}%

    <br><br>

    Try:

    <br>

    "${data.machineType} health"

    <br>

    "${data.machineType} PM"

    <br>

    "${data.machineType} breakdown history"

    `;

}



// =====================================================
// GENERAL HELP
// =====================================================

function getGeneralHelpResponse(){


    return getLocalizedText(

        `

        🤖 <b>SAMA Ready</b>

        <br><br>

        I can assist with:

        <br><br>

        ⚙ Breakdown troubleshooting

        <br>

        🚨 Alarm diagnosis

        <br>

        🧠 Root cause analysis

        <br>

        🛠 Preventive maintenance

        <br>

        📦 Spare recommendations

        <br>

        📊 Machine health

        <br>

        📚 Breakdown history

        <br>

        📉 MTTR & downtime analysis

        <br><br>

        <b>Try:</b>

        <br>

        "ATW Stringer cell breakage"

        <br>

        "ATW Stringer alarm E37"

        <br>

        "SC Laminator bubble defect"

        <br>

        "SC Laminator PM"

        <br>

        "Stringer repeated failures"

        <br>

        "Laminator MTTR"

        `,

        `

        🤖 <b>SAMA तैयार है</b>

        <br><br>

        आप ब्रेकडाउन, अलार्म, RCA, PM, स्पेयर और मशीन हेल्थ के बारे में पूछ सकते हैं।

        `,

        `

        🤖 <b>SAMA તૈયાર છે</b>

        <br><br>

        તમે breakdown, alarm, RCA, PM, spare અને machine health વિશે પૂછી શકો છો.

        `

    );

}



// =====================================================
// LOCALIZED TEXT
// =====================================================

function getLocalizedText(
    english,
    hindi,
    gujarati
){


    const language =
        getCurrentSAMALanguage();


    if(
        language === "hi"
    ){

        return hindi;

    }


    if(
        language === "gu"
    ){

        return gujarati;

    }


    return english;

}



// =====================================================
// FORMAT ARRAY
// =====================================================

function formatArray(
    list,
    icon="•"
){


    if(
        !Array.isArray(list)
        ||
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
// SEVERITY ICON
// =====================================================

function getSeverityIcon(severity){


    const value =
        String(severity || "")
        .toLowerCase();


    if(
        value === "critical"
    ){

        return "🔴";

    }


    if(
        value === "high"
    ){

        return "🟠";

    }


    if(
        value === "medium"
    ){

        return "🟡";

    }


    return "🟢";

}



// =====================================================
// DATABASE CONNECTION ERROR
// =====================================================

function databaseConnectionError(database){


    return getLocalizedText(

        `

        ⚠️ <b>${database} Database Not Connected</b>

        <br><br>

        Please verify the required JavaScript file is loaded before aiEngine.js.

        `,

        `

        ⚠️ <b>${database} डेटाबेस कनेक्ट नहीं है</b>

        <br><br>

        JavaScript load order जांचें।

        `,

        `

        ⚠️ <b>${database} ડેટાબેઝ કનેક્ટ થયેલ નથી</b>

        <br><br>

        JavaScript load order તપાસો.

        `

    );

}



// =====================================================
// READY
// =====================================================

console.log(
    "✅ SAMA Advanced AI Decision Engine Loaded"
);
