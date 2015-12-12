var xport = require('node-xport'),
    FactoryBuilder = require('./factoryBuilder'),
    Schemata = require('../schemata');

var instances = [];
var instanceMap = {};

var LanguageModelFactory = FactoryBuilder.create(Schemata.Language, "Language", "strings");

xport(LanguageModelFactory);
