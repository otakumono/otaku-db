var xport = require('node-xport')(module),
	Enum = require('otaku-core').Enum;

var ContentType = new Enum(
	"ANIME",
	"MANGA",
	"NOVEL",
	"DRAMA"
	);

xport(ContentType);