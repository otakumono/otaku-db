var xport = require('node-xport')(module),
	mongoose = require('mongoose'),
	ServiceReference = require('./serviceReference'),
	Translation = require('./translation'),
	Release = require('./release'),
	Relation = require('./relation');

var Content = mongoose.Schema({
	id: Number,
	format: Number,
	genres: [Number],
	title: [Translation],
	external: [ServiceReference],
	releaseInfo: Release,
	relations: [Relation],
	record: Record
});

xport(Content);