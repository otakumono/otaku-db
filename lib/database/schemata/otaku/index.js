var xport = require('node-xport')(module);

var Otaku = {};

Otaku.Content = require('./content');
Otaku.ContentIndex = require('./contentIndex');
Otaku.Service = require('./service');
Otaku.ServiceReference = require('./serviceReference');
Otaku.Translation = require('./translation');
Otaku.Release = require('./release');
Otaku.Relation = require('./relation');

xport(Otaku);