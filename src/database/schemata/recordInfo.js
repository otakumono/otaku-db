var xport = require('node-xport')(module),
    mongoose = require('mongoose');

var RecordInfo = mongoose.Schema({
    created: { type: mongoose.Schema.Date, default: mongoose.Schema.Date.now, required: true },
    modified: { type: mongoose.Schema.Date, default: mongoose.Schema.Date.now, required: true },
    accessed: { type: mongoose.Schema.Date, default: mongoose.Schema.Date.now, required: true },
    modifications: { type: Number, required: true },
    accesses: { type: Number, required: true }
});

xport(RecordInfo);
