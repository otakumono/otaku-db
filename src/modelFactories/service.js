var xport = require('node-xport')(module),
    FactoryBuilder = require('./factoryBuilder'),
    Schemata = require('../schemata');

var instances = [];
var instanceMap = {};

var ServiceModelFactory = FactoryBuilder.create(Schemata.Service, "Service", "services");

xport(ServiceModelFactory);
