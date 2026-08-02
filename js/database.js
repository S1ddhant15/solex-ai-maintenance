// =============================================
// SOLEX AI MAINTENANCE ASSISTANT
// CENTRAL DATABASE MANAGER
// Version 1.0
// =============================================

const DB = {

    machines: [],
    knowledge: [],
    workOrders: [],
    alarms: [],
    pmRecords: [],

    async init() {

        await this.loadMachines();
        await this.loadKnowledge();

        this.loadAlarmDatabase();
        this.loadLocalWorkOrders();
        this.loadPM();

        console.log("Database Loaded Successfully");

    },



    // ===========================
    // MACHINES
    // ===========================

    async loadMachines() {

        try {

            const response = await fetch("data/machines.json");

            const data = await response.json();

            this.machines = data.machines;

        }

        catch (error) {

            console.error("Machine Database Error", error);

        }

    },



    // ===========================
    // KNOWLEDGE
    // ===========================

    async loadKnowledge() {

        try {

            const response = await fetch("data/knowledge.json");

            const data = await response.json();

            this.knowledge = data.machines;

        }

        catch (error) {

            console.error("Knowledge Database Error", error);

        }

    },



    // ===========================
    // ALARMS
    // ===========================

    loadAlarmDatabase() {

        if (typeof alarmDatabase !== "undefined") {

            this.alarms = alarmDatabase;

        }

    },



    // ===========================
    // WORK ORDERS
    // ===========================

    loadLocalWorkOrders() {

        const data = localStorage.getItem("workOrders");

        if (data) {

            this.workOrders = JSON.parse(data);

        }

    },



    saveWorkOrders() {

        localStorage.setItem(

            "workOrders",

            JSON.stringify(this.workOrders)

        );

    },



    addWorkOrder(workOrder) {

        this.workOrders.push(workOrder);

        this.saveWorkOrders();

    },



    // ===========================
    // PM
    // ===========================

    loadPM() {

        const data = localStorage.getItem("pmRecords");

        if (data) {

            this.pmRecords = JSON.parse(data);

        }

    },



    savePM() {

        localStorage.setItem(

            "pmRecords",

            JSON.stringify(this.pmRecords)

        );

    },



    addPM(record) {

        this.pmRecords.push(record);

        this.savePM();

    },



    // ===========================
    // SEARCH
    // ===========================

    findMachine(name) {

        return this.machines.find(machine =>

            machine.name.toLowerCase()

            .includes(name.toLowerCase())

        );

    },



    findAlarm(code) {

        return this.alarms.find(alarm =>

            alarm.code.toLowerCase()

            === code.toLowerCase()

        );

    }

};



// Initialize Database

window.addEventListener("load", async () => {

    await DB.init();

});
