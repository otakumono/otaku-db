var xport = require('node-xport')(module),
    mongoose = require('mongoose'),
    RecordInfo = require('./recordInfo'),
    ServiceRef = require('./serviceRef');

var Media = mongoose.Schema({
    type: { type: Number, required: true },
    name: { type: Object, required: true },
    info: { type: MediaInfo, required: true },
    works: [{ type: mongoose.Schema.ObjectId, ref: 'Media' }],
    occupations: [{ type: Number }],
    services: [{ type: ServiceRef }],
    recordInfo: { type: RecordInfo, required: true }
});

xport(Media);
