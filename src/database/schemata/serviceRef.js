var xport = require('node-xport')(module),
    mongoose = require('mongoose');

var ServiceRef = mongoose.Schema({
    service: { type: mongoose.Schema.ObjectId, required: true},
    id: { type: String, required: false, default: null }
});

xport(ServiceRef);
