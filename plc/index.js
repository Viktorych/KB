var nodes7 = require('nodes7');  // This is the package name, if the repository is cloned you may need to require 'nodeS7' with uppercase S
var conn = new nodes7;
var doneReading = false;
var doneWriting = false;
var error=false;
//var options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
var variables = {
    //TEST1: 'MR4', 		// Memory real at MD4
    //TEST2: 'M32.2', 		// Bit at M32.2
    //TEST3: 'M20.0', 		// Bit at M20.0
    //TEST4: 'DB1,REAL0.20',	// Array of 20 values in DB1
    //TEST5: 'DB1,REAL4',		// Single real value
    //TEST6: 'DB1,REAL8',		// Another single real value
    //TEST1: 'DB1,INT12.2'		// Two integer value array
    TEST1: 'DB215,X62.0.8',
    OIL_PERSURE:'DB220,INT272',
    OIL_TANK_TEMPERATURE:'DB220,INT262',
    HEAT_ID:'DB220,C60.10',
    HEAT_STEEL:'DB220,C70.10',
    HEAT_TIME:'DB220,I96',
};
var plc = {test:10};

conn.initiateConnection({port: 102, host: '10.0.1.51', rack: 0, slot: 3}, connected); // slot 2 for 300/400, slot 1 for 1200/1500
//conn.initiateConnection({port: 102, host: '192.168.0.2', localTSAP: 0x0100, remoteTSAP: 0x0200}, connected); // local and remote TSAP can also be directly specified instead
function forEach(data, callback){
    for(var key in data){
        if(data.hasOwnProperty(key)){
            callback(key, data[key]);
        }
    }
}


function connected(err) {
    if (typeof(err) !== "undefined") {
        // We have an error.  Maybe the PLC is not reachable.
        //console.log(err);
        process.exit();
    }
    conn.setTranslationCB(function (tag) {
        return variables[tag];
    }); 	// This sets the "translation" to allow us to work with object names
    var list_variables=[];

    forEach(variables, function(key, value){

        list_variables.push(key);
    });
    console.log(list_variables);
    conn.addItems(list_variables);
    //   conn.addItems('TEST6');
//	conn.removeItems(['TEST2', 'TEST3']);  // We could do this.
//	conn.writeItems(['TEST5', 'TEST6'], [ 867.5309, 9 ], valuesWritten);  // You can write an array of items as well.
//    conn.writeItems('TEST7', [ 666, 777 ], valuesWritten);  // You can write a single array item too.



};



var timerId = setInterval(function () {
    conn.readAllItems(valuesReady);
}, 1000);

function valuesReady(anythingBad, values) {
    if (anythingBad) {
        var status=0;
    }
        plc = values;
        plc.status=status;
        //setvaluesReady(values);
        //console.log(new Date(), plc);

        doneReading = true;
        if (doneWriting) {
            process.exit();
        }

}

var read=function getvaluesReady() {
    return plc;
};
module.exports.plc = read;
