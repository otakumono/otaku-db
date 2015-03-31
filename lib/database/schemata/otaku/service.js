var xport = require('node-xport')(module),
	mongoose = require('mongoose'),
	Record = require('../common/record');

var Service = mongoose.Schema({
	id: Number,
	name: String,
	baseUrl: String,
	record: Record
});

xport(Service);