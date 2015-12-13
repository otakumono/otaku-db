var xport = require('node-xport')(module),
    mongoose = require('mongoose');

var RecordInfo = mongoose.Schema({
    created: { type: Date, default: Date.now, required: true },
    modified: { type: Date, default: null, required: false },
    accessed: { type: Date, default: null, required: false },
    modifications: { type: Number, default: 0, required: false },
    accesses: { type: Number, default: 0, required: false }
}, { _id: false });

xport(RecordInfo);
