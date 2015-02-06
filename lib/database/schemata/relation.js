var xport = require('node-xport')(module),
	mongoose = require('mongoose');

var Relation = mongoose.Schema({
	contentId: Number,
	contentType: Number,
	relationType: Number
});

xport(Relation);