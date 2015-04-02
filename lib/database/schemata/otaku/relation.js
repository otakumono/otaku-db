var xport = require('node-xport')(module),
	mongoose = require('mongoose');

var Relation = mongoose.Schema({
	contentId: Number,
	contentType: Number,
	relationType: Number
}, { _id: false });

xport(Relation);