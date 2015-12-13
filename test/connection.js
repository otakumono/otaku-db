var assert = require('assert'),
    Database = require('..'),
    Connection = Database.Connection,
    Schemata = Database.Schemata;

var db = new Connection();
var onOpen = db.onOpen;
db.onOpen = function () {
    onOpen();
    var Media = db.getModel('Media');
    var Person = db.getModel('Person');
    var Service = db.getModel('Service');

    var completed = 0;
    var needed = 3;

    function onSave(err, data) {
        console.log(err || data);

        if (err) {
            process.exit(1);
        }
    }

    function chain(dataCallback, next) {
        return function (err, data) {
            if (err) {
                console.log(err);
                process.exit(1);
            }

            if (dataCallback) {
                dataCallback(data);
            }

            if (next) {
                next();
            }
        };
    }

    var oda = new Person({
        "type" : 1,
        "name" : [
            {
                "lang" : "en",
                "translation" : [
                    "Eiichirō Oda"
                ]
            },
            {
                "lang" : "ja",
                "translation" : [
                    "尾田栄一郎"
                ]
            }
        ],
        "works" : [],
        "occupations" : 1,
        "services" : [],
        "recordInfo" : {
            "created" : Date("2015-08-29T19:35:49.416Z")
        }
    });

    var mal = new Service({
        //"service" : {
            "name" : [
                {
                    "lang" : "en",
                    "translation" : [
                        "MyAnimeList"
                    ]
                }
            ],
            "address" : "http://myanimelist.net",
            "recordInfo" : {
                "created" : Date("2015-08-29T19:06:24.759Z")
            }
        //},
        //"id" : "13"
    });

    var ann = new Service({
        //"service" : {
            "name" : [
                {
                    "lang" : "en",
                    "translation" : [
                        "Anime News Network"
                    ]
                }
            ],
            "address" : "https://animenewsnetwork.com/",
            "recordInfo" : {
                "created" : Date("2015-08-30T05:52:19.808Z")
            }
        //},
        //"id" : "1223"
    });

    var onePieceAnime = new Media({
        "medium" : 0,
        "type" : 0,
        "status" : 1,
        "title" : [
            {
                "lang" : "ar",
                "translation" : [
                    "ون بيس"
                ]
            },
            {
                "lang" : "en",
                "translation" : [
                    "One Piece"
                ]
            },
            {
                "lang" : "it",
                "translation" : [
                    "One Piece",
                    "All'arrembaggio! - One Piece",
                    "One Piece - Tutti all'Arrembaggio",
                    "Tutti All'arrembaggio"
                ]
            },
            {
                "lang" : "ja",
                "translation" : [
                    "ワンピース"
                ]
            },
            {
                "lang" : "ko",
                "translation" : [
                    "원피스"
                ]
            },
            {
                "lang" : "ru",
                "translation" : [
                    "Ван Пис"
                ]
            },
            {
                "lang" : "zh",
                "translation" : [
                    "航海王"
                ]
            },
            {
                "lang" : "zh-sg",
                "translation" : [
                    "海贼王"
                ]
            },
            {
                "lang" : "zh-hk",
                "translation" : [
                    "ONE PIECE"
                ]
            }
        ],
        "info" : {
            "author" : [

            ],
            "editor" : [],
            "producer" : [],
            "publisher" : [],
            "animator" : [],
            "studio" : []
        },
        "genres" : [
            0,
            1,
            2,
            3
        ],
        "services" : [
        ],
        "recordInfo" : {
            "created" : Date("2015-08-29T19:35:49.416Z")
        }
    });

    var onePieceAnimeChain = chain(function (data) {
        console.log("Done.");
    }, function () {
        db.disconnect();
    });

    var annChain = chain(function (data) {
        console.log(data);
        onePieceAnime.services.push({
            "service" : data._id,
            "id" : "1223"
        });
        console.log(onePieceAnime);
    }, function () {
        onePieceAnime.save(onePieceAnimeChain);
    });

    var malChain = chain(function (data) {
        console.log(data);
        onePieceAnime.services.push({
            "service" : data._id,
            "id" : "13"
        });
        console.log(onePieceAnime);
    }, function () {
        ann.save(annChain);
    });

    var odaChain = chain(function (data) {
        console.log(data._id);
        onePieceAnime.info.author.push(data._id)
        console.log(onePieceAnime.info);
    }, function () {
        mal.save(malChain);
    });

    oda.save(odaChain);
    /*model.save(function (error, data) {
        console.log(error);
        console.log(data);

        db.disconnect();
    });*/
};
db.connect();
