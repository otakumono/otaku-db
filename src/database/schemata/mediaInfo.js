var xport = require('node-xport')(module),
    mongoose = require('mongoose');

var MediaInfo = mongoose.Schema({
    author: [{ type: mongoose.Schema.ObjectId, ref: 'Person' }],
    editor: [{ type: mongoose.Schema.ObjectId, ref: 'Person' }],
    producer: [{ type: mongoose.Schema.ObjectId, ref: 'Person' }],
    publisher: [{ type: mongoose.Schema.ObjectId, ref: 'Person' }],
    animator: [{ type: mongoose.Schema.ObjectId, ref: 'Person' }],
    publisher: [{ type: mongoose.Schema.ObjectId, ref: 'Person' }]
});

xport(MediaInfo);
