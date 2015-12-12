var xport = require('node-xport')(module),
    mongoose = require('mongoose'),
    ServiceReference = require('./serviceReference'),
    Translation = require('./translation'),
    Release = require('./release'),
    Relation = require('./relation');

var Content = mongoose.Schema({
    format: { type: Number, required: true },
    genres: [Number],
    title: [Translation],
    external: [ServiceReference],
    releaseInfo: { type: mongoose.Schema.ObjectId, ref: 'Release' },
    relations: [Relation],
    dateCreated: { type: Number, required: true },
    lastModified: { type: Number, required: true },
    lastAccessed: { type: Number, required: true },
    accessCount: { type: Number, required: true}
}, { versionKey: false });

xport(Content);