var xport = require('node-xport')(module),
    mongoose = require('mongoose'),
    MediaInfo = require('./mediaInfo'),
    RecordInfo = require('./recordInfo'),
    ServiceRef = require('./serviceRef'),
    Translation = require('./translation');

var Media = mongoose.Schema({
    medium: { type: Number, required: true },
    type: { type: Number, required: true },
    status: { type: Number, required: true },
    title: [ Translation ],
    info: { type: MediaInfo, required: true },
    genres: [ Number ],
    services: [ ServiceRef ],
    recordInfo: { type: RecordInfo, required: true }
}, { collection: 'media'});

xport(Media);
