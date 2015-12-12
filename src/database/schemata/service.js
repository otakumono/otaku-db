var xport = require('node-xport')(module),
    mongoose = require('mongoose'),
    RecordInfo = require('./recordInfo'),
    ServiceRef = require('./serviceRef');

var Service = mongoose.Schema({
    name: { type: Object, required: true },
    address: { type: String, required: true },
    recordInfo: { type: RecordInfo, required: true }
});

xport(Service);
