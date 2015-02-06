var xport = require('node-xport')(module),
	mongoose = require('mongoose');

var Translation = mongoose.Schema({
	languageCode: String,
	translations: [String]
});

xport(Translation);