// Machine Health

new Chart(document.getElementById("healthChart"),{

type:"bar",

data:{

labels:["Stringer","Laminator","EL","Bussing","Flash"],

datasets:[{

label:"Health %",

data:[97,94,98,81,95]

}]

}

});

// Breakdown Trend

new Chart(document.getElementById("breakdownChart"),{

type:"line",

data:{

labels:["Mon","Tue","Wed","Thu","Fri","Sat"],

datasets:[{

label:"Breakdowns",

data:[3,2,5,2,1,4]

}]

}

});
