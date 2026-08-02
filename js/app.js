// ==========================================
// SOLEX AI MAINTENANCE ASSISTANT
// APP.JS
// ==========================================

// ---------- Check Login ----------

document.addEventListener("DOMContentLoaded", () => {

    checkLogin();

    updateDateTime();

    setInterval(updateDateTime, 1000);

});

// ---------- Login ----------

function login(){

    const username = document.getElementById("username")?.value.trim();

    const password = document.getElementById("password")?.value.trim();

    if(username===""){

        alert("Enter Username");

        return;

    }

    if(password===""){

        alert("Enter Password");

        return;

    }

    localStorage.setItem("loggedIn","true");

    localStorage.setItem("username",username);

    window.location.href="home.html";

}

// ---------- Logout ----------

function logout(){

    if(confirm("Do you want to Logout?")){

        localStorage.removeItem("loggedIn");

        localStorage.removeItem("username");

        window.location.href="../index.html";

    }

}

// ---------- Session ----------

function checkLogin(){

    let page=window.location.pathname.toLowerCase();

    if(page.includes("index")) return;

    if(page.endsWith("/")) return;

    let login=localStorage.getItem("loggedIn");

    if(login!=="true"){

        // Comment this line if testing without login

        // window.location.href="../index.html";

    }

}

// ---------- Welcome ----------

function getUsername(){

    return localStorage.getItem("username") || "Engineer";

}

// ---------- Live Time ----------

function updateDateTime(){

    let element=document.getElementById("currentTime");

    if(!element) return;

    let now=new Date();

    element.innerHTML=now.toLocaleString();

}

// ---------- Notification ----------

function showNotification(message){

    let box=document.createElement("div");

    box.innerHTML=message;

    box.style.position="fixed";

    box.style.top="20px";

    box.style.right="20px";

    box.style.background="#2563eb";

    box.style.color="white";

    box.style.padding="15px";

    box.style.borderRadius="10px";

    box.style.zIndex="9999";

    document.body.appendChild(box);

    setTimeout(()=>{

        box.remove();

    },3000);

}

// ---------- Machine Health ----------

function healthColor(value){

    if(value>=95) return "green";

    if(value>=85) return "orange";

    return "red";

}

// ---------- Random Demo Data ----------

function randomHealth(){

    return Math.floor(Math.random()*15)+85;

}

function randomTemperature(){

    return Math.floor(Math.random()*20)+35;

}

function randomPressure(){

    return (Math.random()*2+5).toFixed(1);

}

// ---------- AI Greeting ----------

function aiGreeting(){

    let hour=new Date().getHours();

    if(hour<12) return "Good Morning";

    if(hour<17) return "Good Afternoon";

    return "Good Evening";

}

// ---------- Search ----------

function searchTable(inputId,tableId){

    let input=document.getElementById(inputId);

    let filter=input.value.toUpperCase();

    let table=document.getElementById(tableId);

    let tr=table.getElementsByTagName("tr");

    for(let i=1;i<tr.length;i++){

        let txt=tr[i].innerText;

        if(txt.toUpperCase().indexOf(filter)>-1){

            tr[i].style.display="";

        }

        else{

            tr[i].style.display="none";

        }

    }

}

// ---------- Export CSV ----------

function exportTable(tableId){

    let table=document.getElementById(tableId);

    if(!table){

        alert("Table not found");

        return;

    }

    let rows=table.querySelectorAll("tr");

    let csv=[];

    rows.forEach(row=>{

        let cols=row.querySelectorAll("th,td");

        let data=[];

        cols.forEach(col=>{

            data.push(col.innerText);

        });

        csv.push(data.join(","));

    });

    let blob=new Blob([csv.join("\n")],{

        type:"text/csv"

    });

    let a=document.createElement("a");

    a.href=URL.createObjectURL(blob);

    a.download="report.csv";

    a.click();

}

// ---------- Dashboard Greeting ----------

console.log(aiGreeting()+" "+getUsername());

console.log("SAMA Loaded Successfully");
