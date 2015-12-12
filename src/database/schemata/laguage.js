var xport = require('node-xport')(module),
    mongoose = require('mongoose'),
    LanguageStringSet = require('./languageStringSet');

var Language = mongoose.Schema({
    name: { type: String, required: true },
    stringSets: [{ type: LanguageStringSet }]
});

xport(Language);
