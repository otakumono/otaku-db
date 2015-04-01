var xport = require('node-xport')(module),
	Enum = require('otaku-core').Enum,
	ContentTypes = require('./contentTypes');

var Formats = {};

Formats[ContentTypes.ANIME] = new Enum("TV", "OVA", "MOVIE", "SPECIAL");
Formats[ContentTypes.MANGA] = new Enum("MANGA", "MANHWA", "MANHUA");
Formats[ContentTypes.NOVEL] = new Enum("LIGHT");
Formats[ContentTypes.DRAMA] = new Enum("JAPAN", "KOREA", "TAIWAN", "CHINA");

xport(Formats);