var xport = require('node-xport')(module),
	CommonDB = require('./common'),
	Datatype = require('./datatype'),
	mongoose = require('mongoose'),
	Content = require('./schemata/otaku').Content,
	ContentIndex = require('./schemata/otaku').ContentIndex;

var OtakuDB = (function () {
	function OtakuDB(options) {
		this.models['anime'] = null;
		this.models['manga'] = null;
		this.models['novel'] = null;
		this.models['drama'] = null;
		this.models['index'] = null;
	}

	OtakuDB.prototype.connect = function () {
		CommonDB.connect(this);

		var db = this.connection;

		this.models['anime'] = db.model('modelAnime', Content, 'anime');
		this.models['manga'] = db.model('modelManga', Content, 'manga');
		this.models['novel'] = db.model('modelNovel', Content, 'novel');
		this.models['drama'] = db.model('modelDrama', Content, 'drama');
		this.models['index'] = db.model('modelIndex', ContentIndex, 'index');
	};

	OtakuDB.prototype.disconnect = function (callback) {
		CommonDB.disconnect(this, callback);
	};

	return OtakuDB;
}());

xport(OtakuDB);