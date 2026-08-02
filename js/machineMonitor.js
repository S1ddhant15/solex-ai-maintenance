const machine = localStorage.getItem("selectedMachine") || "Stringer 01";

document.getElementById("machineTitle").innerHTML = machine;

if(machine==="Stringer 01"){

document.getElementById("status").innerHTML="Running";
document.getElementById("health").innerHTML="97%";
document.getElementById("temperature").innerHTML="42°C";
document.getElementById("pressure").innerHTML="6.1 Bar";
document.getElementById("hours").innerHTML="1458";
document.getElementById("pm").innerHTML="12 Aug";

document.getElementById("aiRecommendation").innerHTML=`
✔ Machine running normally.<br><br>
✔ Clean conveyor sensor during next PM.<br><br>
✔ Servo temperature stable.
`;

}

if(machine==="Laminator 01"){

document.getElementById("status").innerHTML="Running";
document.getElementById("health").innerHTML="94%";
document.getElementById("temperature").innerHTML="158°C";
document.getElementById("pressure").innerHTML="-91 kPa";
document.getElementById("hours").innerHTML="3289";
document.getElementById("pm").innerHTML="09 Aug";

document.getElementById("aiRecommendation").innerHTML=`
⚠ Vacuum pump runtime exceeds 800 hours.<br><br>
✔ Replace vacuum filter.<br><br>
✔ Check vacuum leakage.
`;

}
