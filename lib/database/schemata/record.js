var xport = require('node-xport')(module),
	mongoose = require('mongoose');

var Record = mongoose.Schema({
	created: Number,
	modified: Number,
	accessed: Number,
	accessCount: Number
});

xport(Record);