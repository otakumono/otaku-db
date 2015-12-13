var xport = require('node-xport')(module),
    Schemata = require('./schemata'),
    Connection = require('./connection');

var Database = {
    "Schemata": Schemata,
    "Connection": Connection
};

xport(Database);
