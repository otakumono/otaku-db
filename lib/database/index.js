var xport = require('node-xport')(module);

function Database() {}

Database.ContentTypes = require('./contentTypes');
Database.Formats = require('./formats');
Database.Schemata = require('./schemata');
Database.OtakuDB = require('./otaku');

/* Export the module */
xport(Database);