var xport = require('node-xport')(module),
	Enum = require('otaku-core').Enum;

var ContentTypes = new Enum(
	"ANIME",
	"MANGA",
	"NOVEL",
	"DRAMA"
	);

xport(ContentTypes);