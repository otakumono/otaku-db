var xport = require('node-xport')(module),
    mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.ObjectId;

var ServiceReference = mongoose.Schema({
    serviceId: ObjectId,
    externalId: Number
}, { _id: false });

xport(ServiceReference);