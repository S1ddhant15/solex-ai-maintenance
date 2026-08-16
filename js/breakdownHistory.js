// =====================================================
// SAMA - Solex AI Maintenance Assistant
// Breakdown History Database
// File: breakdownHistory.js
// =====================================================
//
// Prototype data for SAMA.
// Later this can be replaced by live MES / MySQL /
// Maintenance database records.
//
// =====================================================


const breakdownHistoryDatabase = [


    // =================================================
    // ATW STRINGER
    // =================================================

    {
        id:"BD-STR-001",

        date:"2026-07-18",

        machine:"Stringer-01",

        manufacturer:"ATW",

        category:"Vacuum",

        issue:"Cell pickup vacuum low",

        alarm:"V01",

        downtimeMinutes:28,

        rootCause:
        "Vacuum cup damaged causing unstable cell pickup vacuum.",

        correctiveAction:
        "Vacuum cup replaced and pickup vacuum verified.",

        preventiveAction:
        "Vacuum cups added to daily inspection checklist.",

        status:"Closed"
    },


    {
        id:"BD-STR-002",

        date:"2026-07-25",

        machine:"Stringer-01",

        manufacturer:"ATW",

        category:"Servo",

        issue:"Servo positioning fault",

        alarm:"E37",

        downtimeMinutes:42,

        rootCause:
        "Encoder connector found loose during inspection.",

        correctiveAction:
        "Encoder connector reseated and axis homing verified.",

        preventiveAction:
        "Encoder connectors included in monthly inspection.",

        status:"Closed"
    },


    {
        id:"BD-STR-003",

        date:"2026-08-02",

        machine:"Stringer-01",

        manufacturer:"ATW",

        category:"Ribbon",

        issue:"Ribbon feeding abnormal",

        alarm:"R01",

        downtimeMinutes:35,

        rootCause:
        "Ribbon feeding roller wear caused unstable ribbon movement.",

        correctiveAction:
        "Feeding roller replaced and ribbon alignment checked.",

        preventiveAction:
        "Ribbon roller condition added to weekly PM.",

        status:"Closed"
    },


    {
        id:"BD-STR-004",

        date:"2026-08-08",

        machine:"Stringer-01",

        manufacturer:"ATW",

        category:"Vacuum",

        issue:"Intermittent cell pickup failure",

        alarm:"V01",

        downtimeMinutes:22,

        rootCause:
        "Small leakage found in vacuum tube connection.",

        correctiveAction:
        "Vacuum tube connection replaced and leak test performed.",

        preventiveAction:
        "Vacuum line leakage inspection frequency increased.",

        status:"Closed"
    },


    {
        id:"BD-STR-005",

        date:"2026-08-12",

        machine:"Stringer-01",

        manufacturer:"ATW",

        category:"Vision",

        issue:"Cell alignment camera communication lost",

        alarm:"CAM01",

        downtimeMinutes:31,

        rootCause:
        "Camera communication connector found loose.",

        correctiveAction:
        "Connector secured and camera communication restored.",

        preventiveAction:
        "Camera connector inspection included in PM.",

        status:"Closed"
    },



    // =================================================
    // SC LAMINATOR
    // =================================================

    {
        id:"BD-LAM-001",

        date:"2026-07-20",

        machine:"Laminator-01",

        manufacturer:"SC",

        category:"Vacuum",

        issue:"Vacuum pressure low",

        alarm:"P01",

        downtimeMinutes:55,

        rootCause:
        "Vacuum hose leakage detected near chamber connection.",

        correctiveAction:
        "Damaged vacuum hose replaced and leak test completed.",

        preventiveAction:
        "Vacuum piping inspection added to weekly PM.",

        status:"Closed"
    },


    {
        id:"BD-LAM-002",

        date:"2026-07-29",

        machine:"Laminator-01",

        manufacturer:"SC",

        category:"Temperature",

        issue:"Heating zone temperature deviation",

        alarm:"T01",

        downtimeMinutes:68,

        rootCause:
        "SSR output unstable in one heating zone.",

        correctiveAction:
        "SSR replaced and heating-zone performance verified.",

        preventiveAction:
        "Heater current and SSR condition included in monthly PM.",

        status:"Closed"
    },


    {
        id:"BD-LAM-003",

        date:"2026-08-05",

        machine:"Laminator-01",

        manufacturer:"SC",

        category:"Temperature",

        issue:"Temperature feedback unstable",

        alarm:"TC01",

        downtimeMinutes:47,

        rootCause:
        "Thermocouple terminal connection found loose.",

        correctiveAction:
        "Thermocouple connection tightened and feedback verified.",

        preventiveAction:
        "Thermocouple terminal inspection added to monthly PM.",

        status:"Closed"
    },


    {
        id:"BD-LAM-004",

        date:"2026-08-10",

        machine:"Laminator-01",

        manufacturer:"SC",

        category:"Vacuum",

        issue:"Vacuum cycle taking excessive time",

        alarm:"P01",

        downtimeMinutes:38,

        rootCause:
        "Vacuum pump filter partially blocked.",

        correctiveAction:
        "Filter cleaned and vacuum performance restored.",

        preventiveAction:
        "Vacuum pump filter inspection frequency increased.",

        status:"Closed"
    },


    {
        id:"BD-LAM-005",

        date:"2026-08-13",

        machine:"Laminator-01",

        manufacturer:"SC",

        category:"Pneumatic",

        issue:"Pneumatic pressure low",

        alarm:"AIR01",

        downtimeMinutes:24,

        rootCause:
        "Air leakage detected at pneumatic fitting.",

        correctiveAction:
        "Fitting replaced and pressure stability confirmed.",

        preventiveAction:
        "Pneumatic leakage inspection added to weekly PM.",

        status:"Closed"
    }

];



// =====================================================
// NORMALIZE MACHINE
// =====================================================

function normalizeBreakdownMachine(machine){


    const value =
        String(machine || "")
        .toLowerCase()
        .trim();


    if(
        value.includes("stringer") ||
        value.includes("atw")
    ){

        return "stringer";

    }


    if(
        value.includes("laminator") ||
        value.includes("sc")
    ){

        return "laminator";

    }


    return value;

}



// =====================================================
// GET BREAKDOWN HISTORY
// =====================================================

function getBreakdownHistory(machine){


    if(!machine){

        return [];

    }


    const machineType =
        normalizeBreakdownMachine(machine);


    return breakdownHistoryDatabase.filter(
        item => {


            const itemMachine =
                normalizeBreakdownMachine(
                    item.machine
                );


            return (
                itemMachine ===
                machineType
            );

        }
    );

}



// =====================================================
// GET HISTORY BY ALARM
// =====================================================

function getBreakdownByAlarm(alarmCode){


    const alarm =
        String(alarmCode || "")
        .toUpperCase()
        .trim();


    if(!alarm){

        return [];

    }


    return breakdownHistoryDatabase.filter(
        item =>

            String(
                item.alarm || ""
            )
            .toUpperCase()
            === alarm

    );

}



// =====================================================
// GET HISTORY BY CATEGORY
// =====================================================

function getBreakdownByCategory(
    machine,
    category
){


    const machineType =
        normalizeBreakdownMachine(
            machine
        );


    const searchCategory =
        String(category || "")
        .toLowerCase();


    return breakdownHistoryDatabase.filter(
        item => {


            return (

                normalizeBreakdownMachine(
                    item.machine
                )
                === machineType

                &&

                String(
                    item.category || ""
                )
                .toLowerCase()
                .includes(
                    searchCategory
                )

            );

        }
    );

}



// =====================================================
// TOTAL DOWNTIME
// =====================================================

function getTotalDowntime(machine){


    const history =
        getBreakdownHistory(
            machine
        );


    return history.reduce(
        (total,item) =>

            total +
            Number(
                item.downtimeMinutes || 0
            ),

        0
    );

}



// =====================================================
// BREAKDOWN COUNT
// =====================================================

function getBreakdownCount(machine){


    return getBreakdownHistory(
        machine
    ).length;

}



// =====================================================
// AVERAGE REPAIR TIME / MTTR
// =====================================================

function calculateBreakdownMTTR(machine){


    const history =
        getBreakdownHistory(
            machine
        );


    if(
        history.length === 0
    ){

        return 0;

    }


    const downtime =
        getTotalDowntime(
            machine
        );


    return Number(
        (
            downtime /
            history.length
        )
        .toFixed(1)
    );

}



// =====================================================
// FIND REPEATED FAILURES
// =====================================================

function getRepeatedBreakdowns(machine){


    const history =
        getBreakdownHistory(
            machine
        );


    const groups = {};


    history.forEach(
        item => {


            const key =
                String(
                    item.category ||
                    item.issue ||
                    "Unknown"
                )
                .toLowerCase();


            if(!groups[key]){


                groups[key] = {

                    category:
                        item.category,

                    count:0,

                    downtimeMinutes:0,

                    records:[]

                };

            }


            groups[key].count++;


            groups[key].downtimeMinutes +=
                Number(
                    item.downtimeMinutes || 0
                );


            groups[key].records.push(
                item
            );

        }
    );


    return Object.values(
        groups
    )
    .filter(
        item =>
            item.count > 1
    )
    .sort(
        (a,b) =>
            b.count - a.count
    );

}



// =====================================================
// MOST FREQUENT FAILURE
// =====================================================

function getMostFrequentFailure(machine){


    const history =
        getBreakdownHistory(
            machine
        );


    if(
        history.length === 0
    ){

        return null;

    }


    const groups = {};


    history.forEach(
        item => {


            const category =
                item.category ||
                "Unknown";


            if(!groups[category]){


                groups[category] = {

                    category:category,

                    count:0,

                    downtimeMinutes:0

                };

            }


            groups[category].count++;


            groups[category].downtimeMinutes +=
                Number(
                    item.downtimeMinutes || 0
                );

        }
    );


    return Object.values(
        groups
    )
    .sort(
        (a,b) => {


            if(
                b.count !==
                a.count
            ){

                return (
                    b.count -
                    a.count
                );

            }


            return (
                b.downtimeMinutes -
                a.downtimeMinutes
            );

        }
    )[0];

}



// =====================================================
// HIGHEST DOWNTIME FAILURE
// =====================================================

function getHighestDowntimeBreakdown(machine){


    const history =
        getBreakdownHistory(
            machine
        );


    if(
        history.length === 0
    ){

        return null;

    }


    return [...history]
        .sort(
            (a,b) =>

                Number(
                    b.downtimeMinutes
                )
                -
                Number(
                    a.downtimeMinutes
                )
        )[0];

}



// =====================================================
// LAST BREAKDOWN
// =====================================================

function getLastBreakdown(machine){


    const history =
        getBreakdownHistory(
            machine
        );


    if(
        history.length === 0
    ){

        return null;

    }


    return [...history]
        .sort(
            (a,b) =>

                new Date(b.date)
                -
                new Date(a.date)
        )[0];

}



// =====================================================
// MACHINE BREAKDOWN ANALYTICS
// =====================================================

function getBreakdownAnalytics(machine){


    const history =
        getBreakdownHistory(
            machine
        );


    if(
        history.length === 0
    ){

        return null;

    }


    return {

        machine:machine,

        totalBreakdowns:
            history.length,

        totalDowntimeMinutes:
            getTotalDowntime(
                machine
            ),

        mttrMinutes:
            calculateBreakdownMTTR(
                machine
            ),

        mostFrequentFailure:
            getMostFrequentFailure(
                machine
            ),

        highestDowntimeFailure:
            getHighestDowntimeBreakdown(
                machine
            ),

        repeatedFailures:
            getRepeatedBreakdowns(
                machine
            ),

        lastBreakdown:
            getLastBreakdown(
                machine
            )

    };

}



// =====================================================
// GENERATE BREAKDOWN ANALYTICS REPORT
// =====================================================

function generateBreakdownAnalyticsReport(machine){


    const data =
        getBreakdownAnalytics(
            machine
        );


    if(!data){

        return `

        <b>📊 Breakdown Analysis</b>

        <br><br>

        No breakdown history available for:

        <b>${machine}</b>

        `;

    }


    const frequent =
        data.mostFrequentFailure;


    const highest =
        data.highestDowntimeFailure;


    const last =
        data.lastBreakdown;


    let repeatedHTML = "";


    if(
        data.repeatedFailures.length > 0
    ){


        repeatedHTML =
            data.repeatedFailures
            .map(
                item =>

                `⚠ ${item.category}:
                ${item.count} occurrences /
                ${item.downtimeMinutes} min downtime`

            )
            .join("<br>");

    }
    else{

        repeatedHTML =
            "No repeated failure category detected.";

    }


    return `

    <b>📊 SAMA Breakdown Analytics</b>

    <br><br>

    <b>Machine:</b>
    ${machine}

    <br><br>


    <b>Total Breakdowns:</b>

    ${data.totalBreakdowns}


    <br>


    <b>Total Downtime:</b>

    ${data.totalDowntimeMinutes} min


    <br>


    <b>MTTR:</b>

    ${data.mttrMinutes} min


    <br><br>


    <b>🔁 Most Frequent Failure:</b>

    <br>

    ${
        frequent
        ?
        frequent.category +
        " (" +
        frequent.count +
        " occurrences)"
        :
        "-"
    }


    <br><br>


    <b>⏱ Highest Downtime Event:</b>

    <br>

    ${
        highest
        ?
        highest.issue +
        " — " +
        highest.downtimeMinutes +
        " min"
        :
        "-"
    }


    <br><br>


    <b>🔄 Repeated Failure Analysis:</b>

    <br>

    ${repeatedHTML}


    <br><br>


    <b>🕒 Last Breakdown:</b>

    <br>

    ${
        last
        ?
        last.date +
        " — " +
        last.issue
        :
        "-"
    }


    <br><br>


    <b>🤖 SAMA Recommendation:</b>

    <br>

    Repeated failures should be prioritized for permanent corrective action rather than repeated component reset or replacement.

    `;

}



// =====================================================
// SEARCH BREAKDOWN HISTORY
// =====================================================

function searchBreakdownHistory(keyword){


    const search =
        String(keyword || "")
        .toLowerCase()
        .trim();


    if(!search){

        return [];

    }


    return breakdownHistoryDatabase.filter(
        item => {


            const searchableText =
                [

                    item.id,

                    item.date,

                    item.machine,

                    item.manufacturer,

                    item.category,

                    item.issue,

                    item.alarm,

                    item.rootCause,

                    item.correctiveAction,

                    item.preventiveAction,

                    item.status

                ]
                .join(" ")
                .toLowerCase();


            return searchableText.includes(
                search
            );

        }
    );

}



// =====================================================
// DATABASE SUMMARY
// =====================================================

function getBreakdownDatabaseSummary(){


    const machines = {};


    breakdownHistoryDatabase.forEach(
        item => {


            if(
                !machines[
                    item.machine
                ]
            ){

                machines[
                    item.machine
                ] = {

                    breakdowns:0,

                    downtimeMinutes:0

                };

            }


            machines[
                item.machine
            ].breakdowns++;


            machines[
                item.machine
            ].downtimeMinutes +=
                Number(
                    item.downtimeMinutes || 0
                );

        }
    );


    return machines;

}



// =====================================================
// READY
// =====================================================

console.log(
    "✅ SAMA Breakdown History Database Loaded"
);


console.log(
    "Breakdown Records:",
    breakdownHistoryDatabase.length
);
