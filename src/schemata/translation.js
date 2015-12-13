var xport = require('node-xport')(module),
    mongoose = require('mongoose');

var Translation = mongoose.Schema({
    lang: { type: String, required: true },
    translation: [ String ]
}, { _id: false });

xport(Translation);
