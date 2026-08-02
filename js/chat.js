let answer = `

<b>🏭 Machine</b><br>${machine.machine}

<br><br>

<b>⚠ Issue</b><br>${machine.title}

<br><br>

<b>🔍 Possible Causes</b><br>

${machine.causes.map(c=>"• "+c).join("<br>")}

<br><br>

<b>✅ Recommended Checks</b><br>

${machine.checks.map(c=>"✓ "+c).join("<br>")}

<br><br>

<b>🧰 Required Tools</b><br>

${machine.tools.map(c=>"🔧 "+c).join("<br>")}

<br><br>

<b>📦 Spare Parts</b><br>

${machine.spareParts.map(c=>"📌 "+c).join("<br>")}

<br><br>

<b>👨‍🔧 Technician Required</b><br>

${machine.technician}

<br><br>

<b>⏱ Repair Time</b><br>

${machine.repair}

<br><br>

<b>🔥 Priority</b><br>

${machine.priority}

<br><br>

<b>🦺 Safety</b><br>

${machine.safety}

`;
