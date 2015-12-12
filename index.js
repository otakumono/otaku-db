var xport = require('node-xport')(module),
    commander = require('commander'),
    Database = require('./lib/database');

commander
    .version('0.0.1')
    .option('-c, --config [type]', 'Use the specified configuration file [db.otaku.json]', 'db.otaku.json')
    .parse(process.argv);

var database = Database.load(commander.config);

database.connect();
