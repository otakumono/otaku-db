var xport = require('node-xport')(module),
    mongoose = require('mongoose'),
    RecordInfo = require('./recordInfo'),
    Translation = require('./translation');

var Service = mongoose.Schema({
    name: [ Translation ],
    address: { type: String, required: true },
    recordInfo: { type: RecordInfo, required: true }
}, { collection: 'services' });

xport(Service);
