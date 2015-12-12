var xport = require('node-xport')(module),
    mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.ObjectId;

var Relation = mongoose.Schema({
    contentId: ObjectId,
    contentType: Number,
    relationType: Number
}, { _id: false });

xport(Relation);