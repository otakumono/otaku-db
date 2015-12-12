var xport = require('node-xport')(module),
    mongoose = require('mongoose'),
    MediaInfo = require('./mediaInfo'),
    RecordInfo = require('./recordInfo'),
    ServiceRef = require('./serviceRef');

var Media = mongoose.Schema({
    medium: { type: Number, required: true },
    type: { type: Number, required: true },
    status: { type: Number, required: true },
    title: { type: Object, required: true },
    info: { type: MediaInfo, required: true },
    genres: [{ type: Number }],
    services: [{ type: ServiceRef }],
    recordInfo: { type: RecordInfo, required: true }
});

xport(Media);
