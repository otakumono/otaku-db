var xport = require('node-xport')(module),
    mongoose = require('mongoose');

var CountType = mongoose.Schema({
    total: Number,
    format: [Number],
    status: [Number]
});

var ContentIndex = mongoose.Schema({
    countType: [CountType],
    countGenre: [Number],
    status: [Number]
});

xport(ContentIndex);