// ==========================================
// SOLEX AI MAINTENANCE ASSISTANT
// app.js
// ==========================================

// Check if user is already logged in
window.onload = function () {

    if (localStorage.getItem("samaLoggedIn") === "true") {

        if (
            window.location.pathname.includes("index.html") ||
            window.location.pathname === "/" ||
            window.location.pathname.endsWith("/")
        ) {
            window.location.href = "home.html";
        }
    }

};

// Login Function

function login() {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const department = document.getElementById("department").value;

    if (username === "") {

        alert("Please enter Employee ID");
        return;

    }

    if (password === "") {

        alert("Please enter Password");
        return;

    }

    if (department === "") {

        alert("Please select Department");
        return;

    }

    // Save Login

    localStorage.setItem("samaLoggedIn", "true");
    localStorage.setItem("employee", username);
    localStorage.setItem("department", department);

    window.location.href = "home.html";

}

// Logout

function logout() {

    localStorage.clear();

    window.location.href = "index.html";

}
