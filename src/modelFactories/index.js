var xport = require('node-xport')(module),
    Language = require('./language'),
    LanguageStringSet = require('./languageStringSet'),
    Media = require('./media'),
    MediaInfo = require('./mediaInfo'),
    Person = require('./person'),
    RecordInfo = require('./recordInfo'),
    Service = require('./service'),
    ServiceRef = require('./serviceRef');

var ModelFactories = {
    "Language": Language,
    "LanguageStringSet": LanguageStringSet,
    "Media": Media,
    "MediaInfo": MediaInfo,
    "Person": Person,
    "RecordInfo": RecordInfo,
    "Service": Service,
    "ServiceRef": ServiceRef
};

xport(ModelFactories);
