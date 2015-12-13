var xport = require('node-xport')(module),
    FactoryBuilder = require('./factoryBuilder'),
    Schemata = require('../schemata');

var instances = [];
var instanceMap = {};

var MediaModelFactory = FactoryBuilder.create(Schemata.Media, "Media", "media");

xport(MediaModelFactory);
