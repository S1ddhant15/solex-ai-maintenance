function generateWO(){

let machine=document.getElementById("machine").value;

let problem=document.getElementById("problem").value;

let number="WO-"+Math.floor(Math.random()*100000);

let today=new Date().toLocaleString();

document.getElementById("result").innerHTML=`

<h3>${number}</h3>

<hr>

<p><b>Date</b><br>${today}</p>

<p><b>Machine</b><br>${machine}</p>

<p><b>Problem</b><br>${problem}</p>

<p><b>Priority</b><br>High</p>

<p><b>Status</b><br>Open</p>

<p><b>Assigned To</b><br>Maintenance Engineer</p>

<p><b>Estimated Time</b><br>30 Minutes</p>

<p><b>Required PPE</b><br>

Safety Shoes<br>
Hand Gloves<br>
Electrical Isolation

</p>

`;

}
