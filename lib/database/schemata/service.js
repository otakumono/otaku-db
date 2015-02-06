var xport = require('node-xport')(module),
	mongoose = require('mongoose');

var Service = mongoose.Schema({
	id: Number,
	name: String,
	baseUrl: String
});

xport(Service);