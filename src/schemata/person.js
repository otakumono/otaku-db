var xport = require('node-xport')(module),
    mongoose = require('mongoose'),
    MediaInfo = require('./mediaInfo'),
    RecordInfo = require('./recordInfo'),
    ServiceRef = require('./serviceRef'),
    Translation = require('./translation');

var Media = mongoose.Schema({
    type: { type: Number, required: true },
    name: [ Translation ],
    works: [{ type: mongoose.Schema.ObjectId, ref: 'Media' }],
    occupations: [ Number ],
    services: [ ServiceRef ],
    recordInfo: { type: RecordInfo, required: true }
}, { collection: 'people'});

xport(Media);
