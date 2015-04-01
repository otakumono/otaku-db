var xport = require('node-xport')(module);

function Schemata() {}

Schemata.Otaku = require('./otaku');

/* Export the module */
xport(Schemata);