var xport = require('node-xport')(module),
    mongoose = require('mongoose'),
    RecordInfo = require('./recordInfo'),
    ServiceRef = require('./serviceRef');

var LanguageStringSet = mongoose.Schema({
    type: { type: String, required: true },
    entries: { type: Object, required: true }
}, { _id: false });

xport(LanguageStringSet);
