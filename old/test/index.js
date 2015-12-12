var xport = require('node-xport')(module),
	OtakuCore = require('otaku-core'),
	OtakuDB = require('../');

function DBTest() {}

DBTest.print = function () {
};

console.log("Testing otaku-db");
console.log("==================");

DBTest.print();

/* Export the module */
xport(DBTest);