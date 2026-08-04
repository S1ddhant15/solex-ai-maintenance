// =====================================================
// SAMA - AI Maintenance Assistant
// Industrial Alarm Database
// =====================================================


// Alarm Database

const alarmDatabase = {


    // ==========================
    // Servo Alarms
    // ==========================


    "E37": {


        machine:"Stringer",

        category:"Servo",

        description:
        "Servo communication or positioning error",

        cause:

        `
        1. Encoder feedback loss
        <br>
        2. Servo cable loose
        <br>
        3. Servo drive communication failure
        <br>
        4. Mechanical axis obstruction
        `,


        action:

        `
        ✓ Check servo alarm history
        <br>
        ✓ Verify encoder connection
        <br>
        ✓ Check PLC communication
        <br>
        ✓ Reset only after root cause verification
        `

    },



    "E01": {


        machine:"General",

        category:"Servo Overload",

        description:
        "Servo motor overload detected",


        cause:

        `
        1. Mechanical jam
        <br>
        2. Excessive load
        <br>
        3. Incorrect servo parameters
        `,


        action:

        `
        ✓ Check mechanical movement
        <br>
        ✓ Check motor temperature
        <br>
        ✓ Verify servo parameters
        `

    },





    // ==========================
    // Pneumatic / Sensor
    // ==========================


    "S01": {


        machine:"Stringer",

        category:"Sensor",

        description:
        "Cell detection sensor failure",


        cause:

        `
        1. Sensor dirty
        <br>
        2. Sensor alignment issue
        <br>
        3. Cable damage
        `,


        action:

        `
        ✓ Clean sensor
        <br>
        ✓ Check sensor LED
        <br>
        ✓ Verify PLC input
        `

    },





    "P01": {


        machine:"Laminator",

        category:"Pneumatic",

        description:
        "Low air pressure alarm",


        cause:

        `
        1. Air leakage
        <br>
        2. Compressor pressure low
        <br>
        3. Solenoid valve issue
        `,


        action:

        `
        ✓ Check FRL unit
        <br>
        ✓ Check pressure gauge
        <br>
        ✓ Inspect pneumatic line
        `

    },






    // ==========================
    // Temperature Alarms
    // ==========================


    "T01": {


        machine:"Laminator",

        category:"Temperature",

        description:
        "Heating zone temperature deviation",


        cause:

        `
        1. Heater failure
        <br>
        2. SSR failure
        <br>
        3. Thermocouple issue
        `,


        action:

        `
        ✓ Check heater current
        <br>
        ✓ Check SSR output
        <br>
        ✓ Verify thermocouple signal
        `

    },






    // ==========================
    // Communication
    // ==========================


    "C01": {


        machine:"General",

        category:"Communication",

        description:
        "PLC communication error",


        cause:

        `
        1. Network cable issue
        <br>
        2. EtherCAT communication loss
        <br>
        3. Module power failure
        `,


        action:

        `
        ✓ Check network status
        <br>
        ✓ Check IO module LEDs
        <br>
        ✓ Restart communication module
        `

    }



};







// =====================================================
// Alarm Search Function
// =====================================================


function getAlarmDetails(alarmCode){



    alarmCode =
    alarmCode.toUpperCase();



    if(alarmDatabase[alarmCode])

    {

        return alarmDatabase[alarmCode];

    }



    return null;



}






// =====================================================
// Search Similar Alarm
// =====================================================


function searchAlarm(keyword){



let result=[];



for(let code in alarmDatabase){


let alarm =
alarmDatabase[code];



if(

alarm.description
.toLowerCase()
.includes(keyword.toLowerCase())

||

alarm.category
.toLowerCase()
.includes(keyword.toLowerCase())

)

{


result.push({

code:code,

machine:alarm.machine,

description:alarm.description


});


}



}



return result;


}
