// =====================================================
// SAMA - AI Maintenance Assistant
// Application Controller
// =====================================================



// =====================================================
// Check User Session
// =====================================================


document.addEventListener("DOMContentLoaded",()=>{


    checkSession();


    displayUser();


});







// =====================================================
// Session Validation
// =====================================================


function checkSession(){



let user =

localStorage.getItem("username");



let department =

localStorage.getItem("department");





// Allow login page


let page =

window.location.pathname;



if(

!user ||

!department

)

{


if(

!page.includes("index.html")

)

{


window.location.href="../index.html";


}



}



}








// =====================================================
// Display Current User
// =====================================================


function displayUser(){



let username =

localStorage.getItem("username");



let department =

localStorage.getItem("department");





let userElement =

document.getElementById(
"userName"
);



if(userElement)

{


userElement.innerHTML =

`

<i class="fa-solid fa-user"></i>

${username || "Operator"}

<br>

<small>

${department || ""}

</small>

`;



}



}








// =====================================================
// Logout Function
// =====================================================


function logout(){



localStorage.removeItem(
"username"
);



localStorage.removeItem(
"department"
);



localStorage.removeItem(
"role"
);




window.location.href="../index.html";


}








// =====================================================
// Page Access Control
// =====================================================


function checkDepartmentAccess(
allowedDepartments
){



let department =

localStorage.getItem(
"department"
);





if(

!allowedDepartments.includes(
department
)

)

{


alert(

"Access Restricted"

);



window.location.href=
"../dashboard.html";



}



}









// =====================================================
// Navigation Helper
// =====================================================


function openPage(page){



window.location.href =
page;



}









// =====================================================
// Notification Counter
// =====================================================


function updateNotificationCount(count){



let badge =

document.getElementById(
"notificationCount"
);



if(badge)

{


badge.innerHTML=count;



}



}







// =====================================================
// SAMA System Status
// =====================================================


function SAMAStatus(){



return {


system:"ONLINE",


AI:"ACTIVE",


database:"CONNECTED",


monitoring:"RUNNING"



};



}
