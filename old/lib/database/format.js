var xport = require('node-xport')(module),
	Enum = require('otaku-core').Enum,
	ContentType = require('./contentType');

var Format = {};

Format[ContentType.ANIME] = new Enum("TV", "OVA", "MOVIE", "SPECIAL");
Format[ContentType.MANGA] = new Enum("MANGA", "MANHWA", "MANHUA");
Format[ContentType.NOVEL] = new Enum("LIGHT");
Format[ContentType.DRAMA] = new Enum("JAPAN", "KOREA", "TAIWAN", "CHINA");

xport(Format);