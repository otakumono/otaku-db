var xport = require('node-xport')(module),
	mongoose = require('mongoose');

var ServiceReference = mongoose.Schema({
	serviceId: Number,
	externalId: Number
});

xport(ServiceReference);