var xport = require('node-xport'),
    Language = require('./language'),
    LanguageStringSet = require('./languageStringSet'),
    Media = require('./media'),
    MediaInfo = require('./mediaInfo'),
    Person = require('./person'),
    RecordInfo = require('./recordInfo'),
    Service = require('./service'),
    ServiceRef = require('./serviceRef');

var Schemata = {
    "Language": Language,
    "LanguageStringSet": LanguageStringSet,
    "Media": Media,
    "MediaInfo": MediaInfo,
    "Person": Person,
    "RecordInfo": RecordInfo,
    "Service": Service,
    "ServiceRef": ServiceRef
};

xport(Schemata);
