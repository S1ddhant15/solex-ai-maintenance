(function initialiseSAMAShell() {
    "use strict";

    const access = window.SAMA_ACCESS;
    const sidebar = document.querySelector(".sidebar");
    const topbar = document.querySelector(".topbar");
    if (!access || !sidebar || !topbar) return;

    const path = window.location.pathname.toLowerCase();
    const inPages = path.includes("/pages/");
    const onMachinePage = path.endsWith("/pages/machine-status.html");
    const onWhyPage = path.endsWith("/pages/whysama.html");
    const chatUrl = inPages ? "../index.html" : "index.html";
    const machineUrl = inPages ? "machine-status.html" : "pages/machine-status.html";
    const whyUrl = inPages ? "whySAMA.html" : "pages/whySAMA.html";
    const navigation = sidebar.querySelector("ul");

    navigation.innerHTML = `
        <li class="${!onMachinePage && !onWhyPage ? "active" : ""}" data-sama-route="chat">
            <i class="fa-solid fa-robot"></i><span>AI Chat</span>
        </li>
        <li class="${onMachinePage ? "active" : ""}" data-sama-route="machines">
            <i class="fa-solid fa-gears"></i><span>Machine Status</span>
        </li>
        <li class="${onWhyPage ? "active" : ""}" data-sama-route="why">
            <i class="fa-solid fa-lightbulb"></i><span>Why SAMA</span>
        </li>`;

    navigation.querySelector('[data-sama-route="chat"]').addEventListener("click", () => window.location.href = chatUrl);
    navigation.querySelector('[data-sama-route="machines"]').addEventListener("click", () => window.location.href = machineUrl);
    navigation.querySelector('[data-sama-route="why"]').addEventListener("click", () => window.location.href = whyUrl);

    const footer = sidebar.querySelector(".sidebar-footer");
    if (footer) {
        footer.innerHTML = `<p>${access.user.name}</p><small>${access.user.department} · ${access.user.role}</small><button id="samaLogoutButton" type="button">Logout</button>`;
        document.getElementById("samaLogoutButton").addEventListener("click", () => {
            sessionStorage.removeItem("solexPortalSession");
            window.top.location.replace("/solex-digital-portal/index.html");
        });
    }

    const menuButton = document.createElement("button");
    menuButton.id = "samaMenuButton";
    menuButton.className = "sama-menu-button";
    menuButton.type = "button";
    menuButton.textContent = "☰";
    menuButton.setAttribute("aria-controls", "samaSidebar");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open SAMA navigation");
    sidebar.id = "samaSidebar";
    topbar.insertBefore(menuButton, topbar.firstChild);

    function setSidebar(open) {
        document.body.classList.toggle("sama-sidebar-open", open);
        menuButton.setAttribute("aria-expanded", String(open));
        menuButton.setAttribute("aria-label", open ? "Close SAMA navigation" : "Open SAMA navigation");
    }

    menuButton.addEventListener("click", event => {
        event.stopPropagation();
        setSidebar(!document.body.classList.contains("sama-sidebar-open"));
    });

    document.addEventListener("click", event => {
        if (!document.body.classList.contains("sama-sidebar-open")) return;
        if (!sidebar.contains(event.target) && !menuButton.contains(event.target)) setSidebar(false);
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") setSidebar(false);
    });

    document.body.classList.add("sama-shell-ready");
})();
