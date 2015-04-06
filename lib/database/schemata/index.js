var xport = require('node-xport')(module),
    Schemata = require('otaku-core').Database.Schemata;

Schemata.Otaku = require('./otaku');

/* Export the module */
xport(Schemata);