var xport = require('node-xport')(module),
	mongoose = require('mongoose'),
	Datatype = require('otaku-core').Datatype,
	CommonDB = require('otaku-core').Database.CommonDB,
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
console.log(CommonDB);
		this.models['logs'] = db.model('modelLog', CommonDB.Schemata.Log, 'logs');
		this.models['anime'] = db.model('modelAnime', Schemata.Content, 'anime');
		this.models['manga'] = db.model('modelManga', Schemata.Content, 'manga');
		this.models['novel'] = db.model('modelNovel', Schemata.Content, 'novel');
		this.models['drama'] = db.model('modelDrama', Schemata.Content, 'drama');
		//this.models['index'] = db.model('modelIndex', Schemata.ContentIndex, 'index');
	};

	OtakuDB.prototype.disconnect = function (callback) {
		CommonDB.disconnect(this, callback);
	};

	OtakuDB.prototype.addContent = function (type, content, callback) {
		try {
			return OtakuDB.add(OtakuDB.model(type), content, callback);
		} catch (e) {
			throw new Error("Attempted to add invalid content type '" + type + "'.");
		}
	};

	OtakuDB.prototype.updateContent = function (type, oid, content, callback) {
		try {
			return OtakuDB.update(OtakuDB.model(type), oid, content, callback);
		} catch (e) {
			throw new Error("Attempted to update invalid content type '" + type + "'.");
		}
	};

	OtakuDB.prototype.lookupContent = function (type, name, callback) {
		try {
			return OtakuDB.lookup(OtakuDB.model(type), name, callback);
		} catch (e) {
			throw new Error("Attempted to lookup invalid content type '" + type + "'.");
		}
	};

	OtakuDB.prototype.searchContent = function (type, name, callback) {
		try {
			return OtakuDB.search(OtakuDB.model(type), name, callback);
		} catch (e) {
			throw new Error("Attempted to search invalid content type '" + type + "'.");
		}
	};

	OtakuDB.prototype.retrieveContent = function (type, oid, callback) {
		try {
			return OtakuDB.retrieve(OtakuDB.model(type), oid, callback);
		} catch (e) {
			throw new Error("Attempted to retrieve invalid content type '" + type + "'.");
		}
	};

	OtakuDB.prototype.removeContent = function (type, oid, callback) {
		try {
			return OtakuDB.remove(OtakuDB.model(type), oid, callback);
		} catch (e) {
			throw new Error("Attempted to remove invalid content type '" + type + "'.");
		}
	};

	OtakuDB.prototype.countContent = function (type, criteria, callback) {
		try {
			return OtakuDB.count(OtakuDB.model(type), criteria, callback);
		} catch (e) {
			throw new Error("Attempted to count invalid content type '" + type + "'.");
		}
	}

	OtakuDB.Schemata = Schemata;

	OtakuDB.model = function (type) {
		switch (type) {
			case ContentType.Anime: return this.models['anime'];
			case ContentType.Manga: return this.models['manga'];
			case ContentType.Novel: return this.models['novel'];
			case ContentType.Drama: return this.models['drama'];
		}

		throw new Error("Invalid content type '" + type + "'.");
	};

	OtakuDB.retrieve = function (model, id, callback) {
	    model.findOne({ 'id': id }, createIntercept(callback));
	};

	OtakuDB.lookup = function (model, name, callback) {
	    if (!name) {
	        return doesNotExist(callback);
	    }

	    model.findOne(queryByName(name), createIntercept(callback));
	};

	OtakuDB.search = function (model, name, callback) {
	    if (!name) {
	        return doesNotExist(callback);
	    }

	    model.findOne(queryByName(name), { 'id': 1 }, createIntercept(callback));
	};

	OtakuDB.update = function (model, id, document, callback) {
		model.findOneAndUpdate({ 'id': id }, document, callback);
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
		model.count(critera, callback);
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
	            return doesNotExist(callback);
	        }

	        return callback(error, result);
	    };
	};

	return OtakuDB;
}());

xport(OtakuDB);