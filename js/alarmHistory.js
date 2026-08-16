// =====================================================
// SAMA - Solex AI Maintenance Assistant
// Alarm History Controller
// File: alarmHistory.js
// =====================================================


let samaAlarmData = [];


// =====================================================
// INITIALIZE
// =====================================================

document.addEventListener(
"DOMContentLoaded",
function(){


if(
typeof alarmDatabase === "undefined"
){

console.error(
"Alarm database not connected."
);

showAlarmDatabaseError();

return;

}


loadAlarmData();

renderAlarmSummary();

renderAlarmTable(
samaAlarmData
);

initializeAlarmFilters();


}
);


// =====================================================
// LOAD ALARM DATA
// =====================================================

function loadAlarmData(){


samaAlarmData =
Object.entries(
alarmDatabase
)
.map(
([code,data]) => ({

code:code,

...data

})
);

}


// =====================================================
// DATABASE ERROR
// =====================================================

function showAlarmDatabaseError(){


const body =
document.getElementById(
"alarmTableBody"
);


if(!body){
return;
}


body.innerHTML = `

<tr>

<td colspan="7">

<div class="no-machine-data">

⚠ Alarm database not connected.

<br><br>

Please verify:

<br>

../js/alarmDatabase.js

</div>

</td>

</tr>

`;

}


// =====================================================
// SUMMARY
// =====================================================

function renderAlarmSummary(){


const container =
document.getElementById(
"alarmSummary"
);


if(!container){
return;
}


const total =
samaAlarmData.length;


const critical =
samaAlarmData.filter(
alarm =>
alarm.severity === "Critical"
).length;


const high =
samaAlarmData.filter(
alarm =>
alarm.severity === "High"
).length;


const stringer =
samaAlarmData.filter(
alarm =>
String(
alarm.manufacturer || ""
)
.toUpperCase() === "ATW"
).length;


container.innerHTML = `


<div class="machine-kpi-card">

<div class="machine-kpi-icon">

<i class="fa-solid fa-bell"></i>

</div>

<div>

<span>
Total Alarm Codes
</span>

<strong>
${total}
</strong>

</div>

</div>



<div class="machine-kpi-card">

<div class="machine-kpi-icon">

<i class="fa-solid fa-circle-exclamation"></i>

</div>

<div>

<span>
Critical
</span>

<strong>
${critical}
</strong>

</div>

</div>



<div class="machine-kpi-card">

<div class="machine-kpi-icon">

<i class="fa-solid fa-triangle-exclamation"></i>

</div>

<div>

<span>
High Severity
</span>

<strong>
${high}
</strong>

</div>

</div>



<div class="machine-kpi-card">

<div class="machine-kpi-icon">

<i class="fa-solid fa-gears"></i>

</div>

<div>

<span>
ATW Alarm Codes
</span>

<strong>
${stringer}
</strong>

</div>

</div>


`;

}


// =====================================================
// TABLE
// =====================================================

function renderAlarmTable(alarms){


const body =
document.getElementById(
"alarmTableBody"
);


const resultCount =
document.getElementById(
"alarmResultCount"
);


if(!body){
return;
}


if(resultCount){

resultCount.textContent =
`${alarms.length} Alarm(s)`;

}


if(
!alarms ||
alarms.length === 0
){

body.innerHTML = `

<tr>

<td colspan="7">

<div class="no-machine-data">

No matching alarm found.

</div>

</td>

</tr>

`;

return;

}


body.innerHTML =
alarms
.map(
alarm => {


return `

<tr
class="alarm-row"
onclick="openAlarmDetails('${alarm.code}')">


<td>

<span class="alarm-code-badge">

${alarm.code}

</span>

</td>


<td>

${alarm.machine || "-"}

</td>


<td>

${alarm.manufacturer || "-"}

</td>


<td>

${alarm.category || "-"}

</td>


<td>

${getAlarmSeverityBadge(
alarm.severity
)}

</td>


<td>

${alarm.description || "-"}

</td>


<td>

<button
type="button"
class="alarm-view-btn"
onclick="event.stopPropagation(); openAlarmDetails('${alarm.code}')">

Diagnose

<i class="fa-solid fa-arrow-right"></i>

</button>

</td>


</tr>

`;

}
)
.join("");

}


// =====================================================
// SEVERITY BADGE
// =====================================================

function getAlarmSeverityBadge(severity){


const value =
String(
severity || ""
)
.toLowerCase();


let icon = "🟢";

let className =
"alarm-severity-low";


if(value === "critical"){

icon = "🔴";

className =
"alarm-severity-critical";

}


else if(value === "high"){

icon = "🟠";

className =
"alarm-severity-high";

}


else if(value === "medium"){

icon = "🟡";

className =
"alarm-severity-medium";

}


return `

<span class="alarm-severity ${className}">

${icon}

${severity || "Low"}

</span>

`;

}


// =====================================================
// FILTERS
// =====================================================

function initializeAlarmFilters(){


const search =
document.getElementById(
"alarmSearch"
);


const machine =
document.getElementById(
"alarmMachineFilter"
);


const severity =
document.getElementById(
"alarmSeverityFilter"
);


const category =
document.getElementById(
"alarmCategoryFilter"
);


if(search){

search.addEventListener(
"input",
applyAlarmFilters
);

}


if(machine){

machine.addEventListener(
"change",
applyAlarmFilters
);

}


if(severity){

severity.addEventListener(
"change",
applyAlarmFilters
);

}


if(category){

category.addEventListener(
"change",
applyAlarmFilters
);

}

}


// =====================================================
// APPLY FILTERS
// =====================================================

function applyAlarmFilters(){


const search =
String(
document.getElementById(
"alarmSearch"
)?.value || ""
)
.toLowerCase()
.trim();


const machine =
document.getElementById(
"alarmMachineFilter"
)?.value || "all";


const severity =
document.getElementById(
"alarmSeverityFilter"
)?.value || "all";


const category =
document.getElementById(
"alarmCategoryFilter"
)?.value || "all";


const filtered =
samaAlarmData.filter(
alarm => {


const searchable =
[

alarm.code,

alarm.machine,

alarm.manufacturer,

alarm.category,

alarm.severity,

alarm.description,

...(alarm.symptoms || []),

...(alarm.possibleCauses || [])

]
.join(" ")
.toLowerCase();


const searchMatch =
search === ""
||
searchable.includes(
search
);


const machineMatch =
machine === "all"
||
String(
alarm.machine || ""
)
.toLowerCase()
.includes(
machine.toLowerCase()
);


const severityMatch =
severity === "all"
||
alarm.severity ===
severity;


const categoryMatch =
category === "all"
||
String(
alarm.category || ""
)
.toLowerCase()
.includes(
category.toLowerCase()
);


return (
searchMatch &&
machineMatch &&
severityMatch &&
categoryMatch
);

}
);


renderAlarmTable(
filtered
);

}


// =====================================================
// OPEN ALARM DETAILS
// =====================================================

function openAlarmDetails(code){


if(
typeof getAlarmDetails !== "function"
){

return;

}


const alarm =
getAlarmDetails(
code
);


if(!alarm){
return;
}


const modal =
document.getElementById(
"alarmModal"
);


const content =
document.getElementById(
"alarmModalContent"
);


if(
!modal ||
!content
){

return;

}


const symptoms =
formatAlarmItems(
alarm.symptoms,
"•"
);


const causes =
formatAlarmItems(
alarm.possibleCauses,
"•"
);


const checks =
formatAlarmItems(
alarm.checks,
"✓"
);


const spares =
formatAlarmItems(
alarm.spareSuggestion,
"📦"
);


let historyHTML = `

<div class="alarm-no-history">

No previous occurrence available.

</div>

`;


if(
typeof getBreakdownByAlarm === "function"
){


const history =
getBreakdownByAlarm(
code
);


if(
history &&
history.length > 0
){


historyHTML =
history
.map(
item => `

<div class="alarm-history-event">

<div class="alarm-history-event-top">

<strong>
${item.issue}
</strong>

<span>
${item.date}
</span>

</div>

<p>

<b>Downtime:</b>
${item.downtimeMinutes} min

</p>

<p>

<b>Root Cause:</b>
${item.rootCause}

</p>

<p>

<b>Corrective Action:</b>
${item.correctiveAction}

</p>

</div>

`
)
.join("");

}

}


content.innerHTML = `


<div class="alarm-modal-header">


<div>

<span class="machine-type-label">

${alarm.category || "Alarm"}

</span>

<h2>

🚨 ${code}

</h2>

<p>

${alarm.manufacturer || ""}

•

${alarm.machine || ""}

</p>

</div>


<div>

${getAlarmSeverityBadge(
alarm.severity
)}

</div>


</div>



<div class="alarm-description-box">

<h3>
Description
</h3>

<p>

${alarm.description}

</p>

</div>



<div class="alarm-detail-columns">


<div class="alarm-detail-panel">

<h3>
🔍 Symptoms
</h3>

<div>

${symptoms}

</div>

</div>



<div class="alarm-detail-panel">

<h3>
⚠ Possible Causes
</h3>

<div>

${causes}

</div>

</div>



<div class="alarm-detail-panel">

<h3>
🛠 Recommended Checks
</h3>

<div>

${checks}

</div>

</div>


</div>



<div class="alarm-action-box">

<h3>

🤖 SAMA Corrective Guidance

</h3>

<p>

${alarm.action}

</p>

</div>



<h3 class="machine-modal-section-title">

📦 Recommended Spares

</h3>


<div class="alarm-spare-box">

${spares}

</div>



<h3 class="machine-modal-section-title">

📚 Previous Occurrence

</h3>


${historyHTML}



<div class="machine-modal-note">

⚠ Alarm codes currently include SAMA prototype/internal mappings.

<br>

Use confirmed OEM / PLC alarm descriptions before deploying them as official machine alarm references.

</div>


`;


modal.classList.add(
"open"
);

}


// =====================================================
// FORMAT ITEMS
// =====================================================

function formatAlarmItems(
items,
icon
){


if(
!Array.isArray(items) ||
items.length === 0
){

return "-";

}


return items
.map(
item => `

<div class="alarm-list-item">

<span>
${icon}
</span>

<p>
${item}
</p>

</div>

`
)
.join("");

}


// =====================================================
// CLOSE MODAL
// =====================================================

function closeAlarmModal(){


const modal =
document.getElementById(
"alarmModal"
);


if(modal){

modal.classList.remove(
"open"
);

}

}


// =====================================================
// ESC
// =====================================================

document.addEventListener(
"keydown",
function(event){


if(
event.key === "Escape"
){

closeAlarmModal();

}

}
);


// =====================================================
// READY
// =====================================================

console.log(
"✅ SAMA Alarm History Controller Loaded"
);
