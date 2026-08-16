// =====================================================
// SAMA - Machine Status Controller
// File: machineStatus.js
// =====================================================


let machineStatusData = [];



// =====================================================
// INITIALIZE
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function(){

        if(
            typeof getMachineList !==
            "function"
        ){

            console.error(
                "Machine database not connected."
            );

            return;
        }


        machineStatusData =
            getMachineList();


        renderMachineSummary();

        renderMachineCards(
            machineStatusData
        );

        initializeMachineFilters();

    }
);



// =====================================================
// SUMMARY
// =====================================================

function renderMachineSummary(){


    const container =
        document.getElementById(
            "machineSummary"
        );


    if(!container){

        return;

    }


    const summary =
        typeof getPlantHealthSummary ===
        "function"
        ?
        getPlantHealthSummary()
        :
        null;


    if(!summary){

        container.innerHTML =
            "";

        return;

    }


    container.innerHTML = `


        <div class="machine-kpi-card">

            <div class="machine-kpi-icon">
                <i class="fa-solid fa-industry"></i>
            </div>

            <div>
                <span>Total Machines</span>
                <strong>${summary.totalMachines}</strong>
            </div>

        </div>



        <div class="machine-kpi-card">

            <div class="machine-kpi-icon">
                <i class="fa-solid fa-circle-play"></i>
            </div>

            <div>
                <span>Running</span>
                <strong>${summary.runningMachines}</strong>
            </div>

        </div>



        <div class="machine-kpi-card">

            <div class="machine-kpi-icon">
                <i class="fa-solid fa-heart-pulse"></i>
            </div>

            <div>
                <span>Average Health</span>
                <strong>${summary.averageHealth}%</strong>
            </div>

        </div>



        <div class="machine-kpi-card">

            <div class="machine-kpi-icon">
                <i class="fa-solid fa-triangle-exclamation"></i>
            </div>

            <div>
                <span>Need Attention</span>
                <strong>${summary.machinesRequiringAttention}</strong>
            </div>

        </div>

    `;

}



// =====================================================
// MACHINE CARDS
// =====================================================

function renderMachineCards(machines){


    const container =
        document.getElementById(
            "machineCards"
        );


    if(!container){

        return;

    }


    if(
        !machines ||
        machines.length === 0
    ){

        container.innerHTML = `

            <div class="no-machine-data">

                No machine found.

            </div>

        `;

        return;

    }


    container.innerHTML =
        machines
        .map(
            machine => {


                const health =
                    typeof getHealthStatus ===
                    "function"
                    ?
                    getHealthStatus(
                        machine.healthScore
                    )
                    :
                    {
                        icon:"⚪",
                        status:"Unknown"
                    };


                return `


                    <article
                        class="machine-status-card"
                        onclick="openMachineDetails('${machine.name}')"
                    >


                        <div class="machine-status-top">


                            <div>


                                <span class="machine-type-label">

                                    ${machine.type}

                                </span>


                                <h3>

                                    ${machine.name}

                                </h3>


                            </div>



                            <span
                                class="machine-running-badge"
                            >

                                ${getStatusIcon(machine.status)}

                                ${machine.status}

                            </span>


                        </div>



                        <div class="machine-meta">


                            <div>

                                <span>Make</span>

                                <strong>
                                    ${machine.manufacturer}
                                </strong>

                            </div>


                            <div>

                                <span>Line</span>

                                <strong>
                                    ${machine.line}
                                </strong>

                            </div>


                            <div>

                                <span>Process</span>

                                <strong>
                                    ${machine.process}
                                </strong>

                            </div>


                        </div>



                        <div class="machine-health-section">


                            <div class="machine-health-title">


                                <span>
                                    Machine Health
                                </span>


                                <strong>

                                    ${health.icon}

                                    ${machine.healthScore}%

                                </strong>


                            </div>


                            <div class="machine-health-bar">


                                <div
                                    class="machine-health-fill"
                                    style="width:${Math.max(
                                        0,
                                        Math.min(
                                            100,
                                            machine.healthScore
                                        )
                                    )}%"
                                >
                                </div>


                            </div>


                            <small>

                                ${health.status}

                            </small>


                        </div>



                        <button
                            type="button"
                            class="view-machine-btn"
                        >

                            View Details

                            <i class="fa-solid fa-arrow-right"></i>

                        </button>


                    </article>

                `;

            }
        )
        .join("");

}



// =====================================================
// STATUS ICON
// =====================================================

function getStatusIcon(status){


    const value =
        String(status || "")
        .toLowerCase();


    if(value === "running"){

        return "🟢";

    }


    if(value === "maintenance"){

        return "🟡";

    }


    if(
        value === "stopped" ||
        value === "breakdown"
    ){

        return "🔴";

    }


    return "⚪";

}



// =====================================================
// FILTERS
// =====================================================

function initializeMachineFilters(){


    const search =
        document.getElementById(
            "machineSearch"
        );


    const status =
        document.getElementById(
            "machineStatusFilter"
        );


    const make =
        document.getElementById(
            "machineMakeFilter"
        );


    if(search){

        search.addEventListener(
            "input",
            applyMachineFilters
        );

    }


    if(status){

        status.addEventListener(
            "change",
            applyMachineFilters
        );

    }


    if(make){

        make.addEventListener(
            "change",
            applyMachineFilters
        );

    }

}



// =====================================================
// APPLY FILTERS
// =====================================================

function applyMachineFilters(){


    const searchValue =
        String(
            document.getElementById(
                "machineSearch"
            )?.value || ""
        )
        .toLowerCase();


    const statusValue =
        document.getElementById(
            "machineStatusFilter"
        )?.value || "all";


    const makeValue =
        document.getElementById(
            "machineMakeFilter"
        )?.value || "all";


    const filtered =
        machineStatusData.filter(
            machine => {


                const searchable =
                    [

                        machine.name,

                        machine.type,

                        machine.manufacturer,

                        machine.process,

                        machine.line

                    ]
                    .join(" ")
                    .toLowerCase();


                const searchMatch =
                    !searchValue
                    ||
                    searchable.includes(
                        searchValue
                    );


                const statusMatch =
                    statusValue === "all"
                    ||
                    machine.status ===
                    statusValue;


                const makeMatch =
                    makeValue === "all"
                    ||
                    machine.manufacturer ===
                    makeValue;


                return (
                    searchMatch
                    &&
                    statusMatch
                    &&
                    makeMatch
                );

            }
        );


    renderMachineCards(
        filtered
    );

}



// =====================================================
// OPEN MACHINE DETAILS
// =====================================================

function openMachineDetails(machineName){


    if(
        typeof getMachine !==
        "function"
    ){

        return;

    }


    const machine =
        getMachine(
            machineName
        );


    if(!machine){

        return;

    }


    const modal =
        document.getElementById(
            "machineModal"
        );


    const content =
        document.getElementById(
            "machineModalContent"
        );


    if(
        !modal ||
        !content
    ){

        return;

    }


    const health =
        getHealthStatus(
            machine.healthScore
        );


    let parameterHTML = "";


    for(
        const key
        in machine.parameters
    ){


        const parameter =
            machine.parameters[key];


        const condition =
            getParameterStatus(
                parameter
            );


        parameterHTML += `


            <div class="machine-detail-parameter">


                <span>

                    ${formatParameterName(key)}

                </span>


                <strong>

                    ${condition.icon}

                    ${parameter.value}

                    ${parameter.unit || ""}

                </strong>


                <small>

                    ${condition.status}

                </small>


            </div>

        `;

    }



    let breakdownHTML = `

        <p>
            No breakdown history available.
        </p>

    `;


    if(
        typeof getLastBreakdown ===
        "function"
    ){


        const last =
            getLastBreakdown(
                machine.name
            );


        if(last){


            breakdownHTML = `


                <div class="machine-last-breakdown">


                    <strong>

                        ${last.issue}

                    </strong>


                    <span>

                        ${last.date}

                    </span>


                    <p>

                        Root Cause:
                        ${last.rootCause}

                    </p>


                    <p>

                        Corrective Action:
                        ${last.correctiveAction}

                    </p>


                </div>

            `;

        }

    }



    content.innerHTML = `


        <div class="machine-modal-header">


            <div>


                <span class="machine-type-label">

                    ${machine.machineType}

                </span>


                <h2>

                    ${machine.name}

                </h2>


                <p>

                    ${machine.manufacturer}
                    •
                    ${machine.process}
                    •
                    ${machine.line}

                </p>


            </div>



            <div class="machine-modal-health">


                <strong>

                    ${health.icon}

                    ${machine.healthScore}%

                </strong>


                <span>

                    ${health.status}

                </span>


            </div>


        </div>



        <div class="machine-detail-grid">


            <div class="machine-detail-card">


                <span>Status</span>

                <strong>

                    ${getStatusIcon(
                        machine.status
                    )}

                    ${machine.status}

                </strong>


            </div>



            <div class="machine-detail-card">


                <span>Criticality</span>

                <strong>

                    ${machine.criticality}

                </strong>


            </div>



            <div class="machine-detail-card">


                <span>Last PM</span>

                <strong>

                    ${machine.lastPM}

                </strong>


            </div>



            <div class="machine-detail-card">


                <span>Next PM</span>

                <strong>

                    ${machine.nextPM}

                </strong>


            </div>


        </div>



        <h3 class="machine-modal-section-title">

            📡 Machine Parameters

        </h3>


        <div class="machine-parameter-grid">

            ${parameterHTML}

        </div>



        <h3 class="machine-modal-section-title">

            📚 Last Breakdown

        </h3>


        ${breakdownHTML}



        <div class="machine-modal-note">

            ⚠ Current parameter values are simulated prototype data.
            Later these can be connected to PLC / MES / MySQL.

        </div>


    `;


    modal.classList.add(
        "open"
    );

}



// =====================================================
// CLOSE MODAL
// =====================================================

function closeMachineModal(){


    const modal =
        document.getElementById(
            "machineModal"
        );


    if(modal){

        modal.classList.remove(
            "open"
        );

    }

}



// =====================================================
// ESC KEY
// =====================================================

document.addEventListener(
    "keydown",
    function(event){

        if(
            event.key ===
            "Escape"
        ){

            closeMachineModal();

        }

    }
);



// =====================================================
// READY
// =====================================================

console.log(
    "✅ SAMA Machine Status Controller Loaded"
);
