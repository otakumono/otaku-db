var xport = require('node-xport')(module),
	mongoose = require('mongoose');

var Service = mongoose.Schema({
	name: { type: String, required: true },
	baseUrl: { type: String, required: false },
	created: { type: Number, required: true }
});

xport(Service);