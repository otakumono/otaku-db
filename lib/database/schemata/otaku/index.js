var xport = require('node-xport')(module);

var OtakuSchemata = {};

OtakuSchemata.Content = require('./content');
OtakuSchemata.ContentIndex = require('./contentIndex');
OtakuSchemata.ServiceReference = require('./serviceReference');
OtakuSchemata.Translation = require('./translation');
OtakuSchemata.Release = require('./release');
OtakuSchemata.Relation = require('./relation');

xport(OtakuSchemata);