var xport = require('node-xport')(module),
	mongoose = require('mongoose'),
	Datatype = require('otaku-core').Datatype,
	CommonDB = require('otaku-core').Database.Common,
	ContentType = require('./contentType'),
	Schemata = require('./schemata');

var OtakuDB = (function () {
	function OtakuDB(options) {
		this.models = {};
		this.models['logs'] = null;
		this.models['anime'] = null;
		this.models['manga'] = null;
		this.models['novel'] = null;
		this.models['drama'] = null;
		//this.models['index'] = null;
	}

	OtakuDB.prototype.connect = function () {
		CommonDB.connect(this);

		var db = this.connection;

		this.models['logs'] = db.model('modelLog', CommonDB.Schemata.Common.Log, 'logs');
		this.models['anime'] = db.model('modelAnime', Schemata.Otaku.Content, 'anime');
		this.models['manga'] = db.model('modelManga', Schemata.Otaku.Content, 'manga');
		this.models['novel'] = db.model('modelNovel', Schemata.Otaku.Content, 'novel');
		this.models['drama'] = db.model('modelDrama', Schemata.Otaku.Content, 'drama');
		//this.models['index'] = db.model('modelIndex', Schemata.ContentIndex, 'index');
	};

	OtakuDB.prototype.disconnect = function (callback) {
		CommonDB.disconnect(this, callback);
	};

	OtakuDB.prototype.addContent = function (type, content, callback) {
		try {
			return OtakuDB.add(this.model(type), content, callback);
		} catch (e) {
			throw new Error("Attempted to add invalid content type '" + type + "'.");
		}
	};

	OtakuDB.prototype.updateContent = function (type, oid, content, callback) {
		oid = Number(oid);

		try {
			return OtakuDB.update(this.model(type), oid, content, callback);
		} catch (e) {
			throw new Error("Attempted to update invalid content type '" + type + "'.");
		}
	};

	OtakuDB.prototype.lookupContent = function (type, name, callback) {
		name = String(name);
		
		try {
			return OtakuDB.lookup(this.model(type), name, callback);
		} catch (e) {
			throw new Error("Attempted to lookup invalid content type '" + type + "'.");
		}
	};

	OtakuDB.prototype.searchContent = function (type, name, callback) {
		name = String(name);

		try {
			return OtakuDB.search(this.model(type), name, callback);
		} catch (e) {
			throw new Error("Attempted to search invalid content type '" + type + "'.");
		}
	};

	OtakuDB.prototype.retrieveContent = function (type, oid, callback) {
		oid = Number(oid);

		try {
			return OtakuDB.retrieve(this.model(type), oid, callback);
		} catch (e) {
			console.log(e);
			throw new Error("Attempted to retrieve invalid content type '" + type + "'.");
		}
	};

	OtakuDB.prototype.removeContent = function (type, oid, callback) {
		oid = Number(oid);

		try {
			return OtakuDB.remove(this.model(type), oid, callback);
		} catch (e) {
			throw new Error("Attempted to remove invalid content type '" + type + "'.");
		}
	};

	OtakuDB.prototype.countContent = function (type, criteria, callback) {
		try {
			return OtakuDB.count(this.model(type), criteria, callback);
		} catch (e) {
			throw new Error("Attempted to count invalid content type '" + type + "'.");
		}
	}

	OtakuDB.prototype.model = function (type) {
		if (Datatype.isNumerical(type)) {
			type = Datatype.asNumber(type);
		} else {
			type = ContentType[String(type).toUpperCase()];
		}

		switch (type) {
			case ContentType.ANIME: return this.models['anime'];
			case ContentType.MANGA: return this.models['manga'];
			case ContentType.NOVEL: return this.models['novel'];
			case ContentType.DRAMA: return this.models['drama'];
		}

		throw new Error("Invalid content type '" + type + "'.");
	};

	OtakuDB.Schemata = Schemata;

	OtakuDB.retrieve = function (model, id, callback) {
	    model.findOne({ 'id': id }, OtakuDB.createIntercept(callback));
	};

	OtakuDB.lookup = function (model, name, callback) {
	    if (!name) {
	        return OtakuDB.doesNotExist(callback);
	    }

	    model.findOne(OtakuDB.queryByName(name), OtakuDB.createIntercept(callback));
	};

	OtakuDB.search = function (model, name, callback) {
	    if (!name) {
	        return OtakuDB.doesNotExist(callback);
	    }

	    model.findOne(OtakuDB.queryByName(name), { 'id': 1 }, OtakuDB.createIntercept(callback));
	};

	OtakuDB.update = function (model, id, document, callback) {try{
		document.id = id;
		model.findOneAndUpdate({ 'id': id }, document, { new: true }, callback);} catch (e) { console.log("ERR?: " + e); }
	};

	OtakuDB.add = function (model, document, callback) {
		OtakuDB.count(model, { }, function (error, count) {
			document.id = count;
			model.create(document, callback);
		});
	};

	OtakuDB.remove = function (model, id, callback) {
		model.findOneAndRemove({ 'id': id }, callback);
	};

	OtakuDB.count = function (model, criteria, callback) {
		if (typeof criteria === 'function') {
			callback = criteria;
			criteria = {};
		}

		model.count(criteria, callback);
	};

	OtakuDB.queryByName = function (name) {
	    name = name.replace(/\+/g, ' ');

	    return { 'titles.translations': { $in: [ new RegExp(name, 'i') ] } };
	};

	OtakuDB.doesNotExist = function (callback) {
		return callback(null, { 'id': -1 });
	};

	OtakuDB.createIntercept = function (callback) {
		return function(error, result) {
	        if (!result) {
	            return OtakuDB.doesNotExist(callback);
	        }

	        return callback(error, result);
	    };
	};

	return OtakuDB;
}());

xport(OtakuDB);