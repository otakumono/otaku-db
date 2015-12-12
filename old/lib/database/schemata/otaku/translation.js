var xport = require('node-xport')(module),
    mongoose = require('mongoose');

var Translation = mongoose.Schema({
    languageCode: { type: String, required: true },
    translations: [String]
}, { _id: false });

xport(Translation);