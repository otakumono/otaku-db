var xport = require('node-xport')(module),
    Database = require('otaku-core').Database;

Database.ContentType = require('./contentType');
Database.Format = require('./format');
Database.Otaku = require('./otaku');

/* Export the module */
xport(Database);