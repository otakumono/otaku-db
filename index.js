var xport = require('node-xport')(module),
    Database = require('./src');

/* Export the module */
xport(Database);
