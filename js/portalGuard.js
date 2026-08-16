(function initialisePortalAccess() {
    "use strict";

    const SESSION_KEY = "solexPortalSession";
    const PORTAL_LOGIN = "/solex-digital-portal/index.html?app=sama";
    const SAMA_HOME = "/solex-ai-maintenance/";
    const isLocal = ["localhost", "127.0.0.1", ""].includes(window.location.hostname);

    function localDevelopmentUser() {
        return {
            id: "LOCAL-ADMIN",
            name: "Local Developer",
            department: "Operations Excellence",
            role: "Administrator",
            apps: ["mes", "sama", "learning"],
            admin: true,
            permissions: [
                "sama.operations.view", "sama.production.view", "sama.maintenance.view",
                "sama.parameters.view", "sama.parameters.request", "sama.parameters.approve",
                "sama.audit.view"
            ]
        };
    }

    function loadSession() {
        try {
            const session = JSON.parse(sessionStorage.getItem(SESSION_KEY));
            if (!session || !session.user || Date.now() > session.expiresAt) return null;
            if (!Array.isArray(session.user.apps) || !session.user.apps.includes("sama")) return null;
            return session;
        } catch (error) {
            return null;
        }
    }

    const session = loadSession();
    const user = session ? session.user : (isLocal ? localDevelopmentUser() : null);

    if (!user) {
        document.documentElement.style.display = "none";
        window.top.location.replace(PORTAL_LOGIN);
        return;
    }

    const permissions = Array.isArray(user.permissions) ? user.permissions : [];
    window.SAMA_ACCESS = {
        user,
        permissions,
        can(permission) {
            return Boolean(user.admin || permissions.includes(permission));
        },
        require(permission) {
            if (this.can(permission)) return true;
            window.top.location.replace(PORTAL_LOGIN);
            return false;
        }
    };

    const path = window.location.pathname.toLowerCase();
    const isChat = path.endsWith("/solex-ai-maintenance/") || path.endsWith("/solex-ai-maintenance/index.html") || (isLocal && path.endsWith("/index.html"));
    const isMachineStatus = path.endsWith("/pages/machine-status.html");
    if (!isChat && !isMachineStatus) {
        document.documentElement.style.display = "none";
        const localHome = path.includes("/pages/") ? "../index.html" : "index.html";
        window.top.location.replace(isLocal ? localHome : SAMA_HOME);
    }
})();
