// =====================================================
// SAMA - Solex AI Maintenance Assistant
// Multi-Language Controller
// File: language.js
// =====================================================
//
// Supported Languages:
// English  - en
// Hindi    - hi
// Gujarati - gu
//
// =====================================================



// =====================================================
// DEFAULT LANGUAGE
// =====================================================

let samaLanguage =
    localStorage.getItem(
        "samaLanguage"
    ) || "en";



// =====================================================
// SUPPORTED LANGUAGES
// =====================================================

const samaLanguages = {

    en:{
        code:"en",
        name:"English",
        nativeName:"English",
        icon:"🇬🇧"
    },

    hi:{
        code:"hi",
        name:"Hindi",
        nativeName:"हिन्दी",
        icon:"🇮🇳"
    },

    gu:{
        code:"gu",
        name:"Gujarati",
        nativeName:"ગુજરાતી",
        icon:"🇮🇳"
    }

};



// =====================================================
// UI TRANSLATIONS
// =====================================================

const samaTranslations = {


    // =================================================
    // ENGLISH
    // =================================================

    en:{

        appName:
        "Solex AI Maintenance Assistant",

        subtitle:
        "Industrial Troubleshooting & Maintenance Support",

        aiChat:
        "AI Chat",

        machineStatus:
        "Machine Status",

        alarmHistory:
        "Alarm History",

        preventiveMaintenance:
        "Preventive Maintenance",

        spareInventory:
        "Spare Inventory",

        breakdownHistory:
        "Breakdown History",

        whySAMA:
        "Why SAMA",

        online:
        "Online",

        samaOnline:
        "SAMA Online",

        placeholder:
        "Ask SAMA about machine, alarm, PM, spare...",

        send:
        "Send",

        operator:
        "Operator",

        analyzing:
        "SAMA is analyzing...",

        machine:
        "Machine",

        make:
        "Make",

        process:
        "Process",

        status:
        "Status",

        alarm:
        "Alarm",

        alarmCode:
        "Alarm Code",

        description:
        "Description",

        possibleCauses:
        "Possible Causes",

        recommendedChecks:
        "Recommended Checks",

        correctiveAction:
        "Corrective Action",

        rootCause:
        "Root Cause",

        recommendation:
        "SAMA Recommendation",

        confidence:
        "Confidence",

        health:
        "Machine Health",

        criticality:
        "Criticality",

        downtime:
        "Downtime",

        breakdown:
        "Breakdown",

        pm:
        "Preventive Maintenance",

        spare:
        "Spare Parts",

        welcome:
        "Welcome to SAMA",

        welcomeDescription:
        "Solex AI Maintenance Assistant",

        comingSoon:
        "module is currently under development."

    },



    // =================================================
    // HINDI
    // =================================================

    hi:{

        appName:
        "सोलेक्स AI मेंटेनेंस असिस्टेंट",

        subtitle:
        "इंडस्ट्रियल ट्रबलशूटिंग और मेंटेनेंस सपोर्ट",

        aiChat:
        "AI चैट",

        machineStatus:
        "मशीन स्थिति",

        alarmHistory:
        "अलार्म हिस्ट्री",

        preventiveMaintenance:
        "प्रिवेंटिव मेंटेनेंस",

        spareInventory:
        "स्पेयर इन्वेंटरी",

        breakdownHistory:
        "ब्रेकडाउन हिस्ट्री",

        whySAMA:
        "SAMA क्यों?",

        online:
        "ऑनलाइन",

        samaOnline:
        "SAMA ऑनलाइन",

        placeholder:
        "मशीन, अलार्म, PM या स्पेयर के बारे में SAMA से पूछें...",

        send:
        "भेजें",

        operator:
        "ऑपरेटर",

        analyzing:
        "SAMA विश्लेषण कर रहा है...",

        machine:
        "मशीन",

        make:
        "मेक",

        process:
        "प्रोसेस",

        status:
        "स्थिति",

        alarm:
        "अलार्म",

        alarmCode:
        "अलार्म कोड",

        description:
        "विवरण",

        possibleCauses:
        "संभावित कारण",

        recommendedChecks:
        "अनुशंसित जांच",

        correctiveAction:
        "सुधारात्मक कार्रवाई",

        rootCause:
        "मूल कारण",

        recommendation:
        "SAMA सुझाव",

        confidence:
        "विश्वसनीयता",

        health:
        "मशीन हेल्थ",

        criticality:
        "क्रिटिकलिटी",

        downtime:
        "डाउनटाइम",

        breakdown:
        "ब्रेकडाउन",

        pm:
        "प्रिवेंटिव मेंटेनेंस",

        spare:
        "स्पेयर पार्ट्स",

        welcome:
        "SAMA में आपका स्वागत है",

        welcomeDescription:
        "Solex AI Maintenance Assistant",

        comingSoon:
        "मॉड्यूल अभी विकसित किया जा रहा है।"

    },



    // =================================================
    // GUJARATI
    // =================================================

    gu:{

        appName:
        "સોલેક્સ AI મેન્ટેનન્સ આસિસ્ટન્ટ",

        subtitle:
        "ઇન્ડસ્ટ્રીયલ ટ્રબલશૂટિંગ અને મેન્ટેનન્સ સપોર્ટ",

        aiChat:
        "AI ચેટ",

        machineStatus:
        "મશીન સ્ટેટસ",

        alarmHistory:
        "અલાર્મ હિસ્ટ્રી",

        preventiveMaintenance:
        "પ્રિવેન્ટિવ મેન્ટેનન્સ",

        spareInventory:
        "સ્પેર ઇન્વેન્ટરી",

        breakdownHistory:
        "બ્રેકડાઉન હિસ્ટ્રી",

        whySAMA:
        "SAMA શા માટે?",

        online:
        "ઓનલાઇન",

        samaOnline:
        "SAMA ઓનલાઇન",

        placeholder:
        "મશીન, અલાર્મ, PM અથવા સ્પેર વિશે SAMA ને પૂછો...",

        send:
        "મોકલો",

        operator:
        "ઓપરેટર",

        analyzing:
        "SAMA વિશ્લેષણ કરી રહ્યું છે...",

        machine:
        "મશીન",

        make:
        "મેક",

        process:
        "પ્રોસેસ",

        status:
        "સ્ટેટસ",

        alarm:
        "અલાર્મ",

        alarmCode:
        "અલાર્મ કોડ",

        description:
        "વર્ણન",

        possibleCauses:
        "સંભવિત કારણો",

        recommendedChecks:
        "ભલામણ કરેલ તપાસ",

        correctiveAction:
        "સુધારાત્મક કાર્યવાહી",

        rootCause:
        "મૂળ કારણ",

        recommendation:
        "SAMA ભલામણ",

        confidence:
        "વિશ્વસનીયતા",

        health:
        "મશીન હેલ્થ",

        criticality:
        "ક્રિટિકલિટી",

        downtime:
        "ડાઉનટાઇમ",

        breakdown:
        "બ્રેકડાઉન",

        pm:
        "પ્રિવેન્ટિવ મેન્ટેનન્સ",

        spare:
        "સ્પેર પાર્ટ્સ",

        welcome:
        "SAMA માં આપનું સ્વાગત છે",

        welcomeDescription:
        "Solex AI Maintenance Assistant",

        comingSoon:
        "મોડ્યુલ હાલમાં વિકાસ હેઠળ છે."

    }

};



// =====================================================
// GET CURRENT LANGUAGE
// =====================================================

function getSAMALanguage(){

    return samaLanguage;

}



// =====================================================
// SET LANGUAGE
// =====================================================

function setSAMALanguage(language){

    if(
        !samaLanguages[
            language
        ]
    ){

        console.warn(
            "Unsupported SAMA language:",
            language
        );

        return false;

    }


    samaLanguage =
        language;


    localStorage.setItem(
        "samaLanguage",
        language
    );


    updateLanguageUI();


    return true;

}



// =====================================================
// TRANSLATION FUNCTION
// =====================================================

function t(key){

    const language =
        samaTranslations[
            samaLanguage
        ]
        ||
        samaTranslations.en;


    if(
        language[key] !==
        undefined
    ){

        return language[key];

    }


    // English fallback

    if(
        samaTranslations.en[key] !==
        undefined
    ){

        return samaTranslations.en[key];

    }


    return key;

}



// =====================================================
// LANGUAGE SELECTOR
// =====================================================

function createLanguageSelector(){

    // Avoid duplicate selector

    if(
        document.getElementById(
            "samaLanguageSelector"
        )
    ){

        return;

    }


    const selector =
        document.createElement(
            "select"
        );


    selector.id =
        "samaLanguageSelector";


    selector.className =
        "language-selector";


    Object.values(
        samaLanguages
    )
    .forEach(
        language => {


            const option =
                document.createElement(
                    "option"
                );


            option.value =
                language.code;


            option.textContent =
                language.nativeName;


            if(
                language.code ===
                samaLanguage
            ){

                option.selected =
                    true;

            }


            selector.appendChild(
                option
            );

        }
    );


    selector.addEventListener(
        "change",
        function(){

            setSAMALanguage(
                this.value
            );

            refreshSAMAWelcome();

        }
    );



    // Add to topbar

    const topbar =
        document.querySelector(
            ".topbar"
        );


    if(topbar){

        const wrapper =
            document.createElement(
                "div"
            );


        wrapper.className =
            "language-control";


        const icon =
            document.createElement(
                "span"
            );


        icon.innerHTML =
            "🌐";


        wrapper.appendChild(
            icon
        );


        wrapper.appendChild(
            selector
        );


        topbar.appendChild(
            wrapper
        );

    }

}



// =====================================================
// UPDATE UI LANGUAGE
// =====================================================

function updateLanguageUI(){


    // -----------------------------------------------
    // Page title
    // -----------------------------------------------

    document.title =
        "SAMA - " +
        t("appName");



    // -----------------------------------------------
    // Sidebar
    // -----------------------------------------------

    updateText(
        "[data-i18n='aiChat']",
        t("aiChat")
    );


    updateText(
        "[data-i18n='machineStatus']",
        t("machineStatus")
    );


    updateText(
        "[data-i18n='alarmHistory']",
        t("alarmHistory")
    );


    updateText(
        "[data-i18n='preventiveMaintenance']",
        t("preventiveMaintenance")
    );


    updateText(
        "[data-i18n='spareInventory']",
        t("spareInventory")
    );


    updateText(
        "[data-i18n='breakdownHistory']",
        t("breakdownHistory")
    );


    updateText(
        "[data-i18n='whySAMA']",
        t("whySAMA")
    );



    // -----------------------------------------------
    // Topbar
    // -----------------------------------------------

    updateText(
        "[data-i18n='appName']",
        t("appName")
    );


    updateText(
        "[data-i18n='subtitle']",
        t("subtitle")
    );


    updateText(
        "[data-i18n='samaOnline']",
        t("samaOnline")
    );



    // -----------------------------------------------
    // Send button
    // -----------------------------------------------

    updateText(
        "[data-i18n='send']",
        t("send")
    );



    // -----------------------------------------------
    // Input placeholder
    // -----------------------------------------------

    const input =
        document.getElementById(
            "userInput"
        );


    if(input){

        input.placeholder =
            t("placeholder");

    }



    // -----------------------------------------------
    // Selector
    // -----------------------------------------------

    const selector =
        document.getElementById(
            "samaLanguageSelector"
        );


    if(selector){

        selector.value =
            samaLanguage;

    }

}



// =====================================================
// SAFE TEXT UPDATE
// =====================================================

function updateText(
    selector,
    value
){

    const elements =
        document.querySelectorAll(
            selector
        );


    elements.forEach(
        element => {

            element.textContent =
                value;

        }
    );

}



// =====================================================
// WELCOME MESSAGE
// =====================================================

function getSAMAWelcomeMessage(){


    if(
        samaLanguage ===
        "hi"
    ){

        return `

        👋 <b>SAMA में आपका स्वागत है</b>

        <br><br>

        <b>S</b>olex
        <b>A</b>I
        <b>M</b>aintenance
        <b>A</b>ssistant

        <br><br>

        मैं आपकी सहायता कर सकता हूँ:

        <br><br>

        ⚙ मशीन ब्रेकडाउन

        <br>

        🚨 अलार्म ट्रबलशूटिंग

        <br>

        🛠 प्रिवेंटिव मेंटेनेंस

        <br>

        📦 स्पेयर पार्ट्स

        <br>

        📊 मशीन हेल्थ

        <br>

        📚 ब्रेकडाउन हिस्ट्री

        <br><br>

        <b>उदाहरण:</b>

        <br>

        "ATW Stringer cell breakage"

        <br>

        "Servo alarm E37"

        <br>

        "SC Laminator PM"

        <br>

        "Laminator vacuum problem"

        `;

    }



    if(
        samaLanguage ===
        "gu"
    ){

        return `

        👋 <b>SAMA માં આપનું સ્વાગત છે</b>

        <br><br>

        <b>S</b>olex
        <b>A</b>I
        <b>M</b>aintenance
        <b>A</b>ssistant

        <br><br>

        હું તમને મદદ કરી શકું છું:

        <br><br>

        ⚙ મશીન બ્રેકડાઉન

        <br>

        🚨 અલાર્મ ટ્રબલશૂટિંગ

        <br>

        🛠 પ્રિવેન્ટિવ મેન્ટેનન્સ

        <br>

        📦 સ્પેર પાર્ટ્સ

        <br>

        📊 મશીન હેલ્થ

        <br>

        📚 બ્રેકડાઉન હિસ્ટ્રી

        <br><br>

        <b>ઉદાહરણ:</b>

        <br>

        "ATW Stringer cell breakage"

        <br>

        "Servo alarm E37"

        <br>

        "SC Laminator PM"

        <br>

        "Laminator vacuum problem"

        `;

    }



    // =================================================
    // ENGLISH
    // =================================================

    return `

    👋 Welcome to <b>SAMA</b>

    <br><br>

    <b>S</b>olex
    <b>A</b>I
    <b>M</b>aintenance
    <b>A</b>ssistant

    <br><br>

    I can help with:

    <br><br>

    ⚙ Machine Breakdown

    <br>

    🚨 Alarm Troubleshooting

    <br>

    🛠 Preventive Maintenance

    <br>

    📦 Spare Parts

    <br>

    📊 Machine Health

    <br>

    📚 Breakdown History

    <br><br>

    <b>Try:</b>

    <br>

    "ATW Stringer cell breakage"

    <br>

    "Servo alarm E37"

    <br>

    "SC Laminator PM"

    <br>

    "Laminator vacuum problem"

    `;

}



// =====================================================
// REFRESH WELCOME MESSAGE
// =====================================================

function refreshSAMAWelcome(){


    const chatBox =
        document.getElementById(
            "chatBox"
        );


    if(!chatBox){

        return;

    }


    // Only replace welcome if conversation
    // has not started yet.

    if(
        typeof conversationHistory !==
        "undefined"
        &&
        conversationHistory.length > 0
    ){

        return;

    }


    chatBox.innerHTML = "";


    if(
        typeof addBotMessage ===
        "function"
    ){

        addBotMessage(
            getSAMAWelcomeMessage()
        );

    }

}



// =====================================================
// INITIALIZE LANGUAGE
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function(){

        createLanguageSelector();

        updateLanguageUI();

    }
);



// =====================================================
// READY
// =====================================================

console.log(
    "✅ SAMA Language Engine Loaded"
);


console.log(
    "Current Language:",
    getSAMALanguage()
);
