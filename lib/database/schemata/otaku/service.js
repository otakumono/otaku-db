var xport = require('node-xport')(module),
	mongoose = require('mongoose'),
	Record = require('../common/record');

var Service = mongoose.Schema({
	id: { type: Number, required: true },
	name: { type: String, required: true },
	baseUrl: { type: String, required: false },
	created: { type: Number, required: true }
});

xport(Service);