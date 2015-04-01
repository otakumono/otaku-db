var xport = require('node-xport')(module);

function Database() {}

Database.ContentType = require('./contentType');
Database.Format = require('./format');
Database.Schemata = require('./schemata');
Database.OtakuDB = require('./otaku');

/* Export the module */
xport(Database);