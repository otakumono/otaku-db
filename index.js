var xport = require('node-xport')(module),
	OtakuDB = require('./lib/'),
	OtakuCore = OtakuDB.OtakuCore;

OtakuDB.prepare();
OtakuDB.run();

/* Export the module */
xport(OtakuDB);