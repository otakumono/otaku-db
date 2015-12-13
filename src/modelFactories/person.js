var xport = require('node-xport')(module),
    FactoryBuilder = require('./factoryBuilder'),
    Schemata = require('../schemata');

var instances = [];
var instanceMap = {};

var PersonModelFactory = FactoryBuilder.create(Schemata.Person, "Person", "people");

xport(PersonModelFactory);
