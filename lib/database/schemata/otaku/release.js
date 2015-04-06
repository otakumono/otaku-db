var xport = require('node-xport')(module),
    mongoose = require('mongoose');

var Release = mongoose.Schema({
    status: Number,
    dateRelease: Number,
    dateComplete: Number,
    countTotal: Number,
    countReleased: Number,
    releaseLength: Number,
    rating: Number
});

xport(Release);