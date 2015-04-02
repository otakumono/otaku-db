var xport = require('node-xport')(module),
	mongoose = require('mongoose'),
	Validation = require('otaku-core').Validation,
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
		this.models['service'] = null;
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
		this.models['service'] = db.model('modelService', Schemata.Otaku.Service, 'service');
		//this.models['index'] = db.model('modelIndex', Schemata.ContentIndex, 'index');
	};

	OtakuDB.prototype.disconnect = function (callback) {
		CommonDB.disconnect(this, callback);
	};

	OtakuDB.prototype.addContent = function (type, content, callback) {
		return CommonDB.insert(this.model(type), content, callback);
	};

	OtakuDB.prototype.updateContent = function (type, id, content, callback) {
		return CommonDB.updateOne(this.model(type), { '_id': id }, content, callback);
	};

	OtakuDB.prototype.lookupContent = function (type, name, callback) {
		return this.byName(type, name, callback);
	};

	OtakuDB.prototype.searchContent = function (type, name, callback) {
		return this.byName(type, name, { '_id': 1 }, callback);
	};

	OtakuDB.prototype.retrieveContent = function (type, idName, callback) {
		if (Validation.isMongoId(idName)) {
			return CommonDB.findOne(this.model(type), { '_id': idName }, callback);
		}

		return this.lookupContent(type, idName, callback);
	};

	OtakuDB.prototype.removeContent = function (type, id, callback) {
		return CommonDB.removeOne(this.model(type), { '_id': id }, callback);
	};

	OtakuDB.prototype.countContent = function (type, criteria, callback) {
		return CommonDB.count(this.model(type), criteria, callback);
	};

	OtakuDB.prototype.countService = function (callback) {
		return CommonDB.count(this.model['service'], { }, callback);
	};

	OtakuDB.prototype.getService = function (id, callback) {

	};

	OtakuDB.prototype.addService = function (service, callback) {

	};

	OtakuDB.prototype.removeService = function (id, callback) {

	};

	OtakuDB.prototype.updateService = function (id, service, callback) {

	};

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

		return null;
	};

	OtakuDB.prototype.byName = function (type, name, selector, callback) {
		if (!name) {
			return CommonDB.wrap(callback)('Attempted to search for null or undefined name.', null);
		}

		name = String(name);

		return CommonDB.findOne(this.model(type), { 'title.translations': { $in: [ CommonDB.stringQuery(name) ] } }, selector, callback);
	};

	OtakuDB.Schemata = Schemata;



/*CommonDB.retrieve = function (model, criteria, callback) {
	return CommonDB.findOne(model, criteria, callback);
};
CommonDB.update = function (model, id, document, callback) {
	document.id = id;
	return model.findOneAndUpdate({ 'id': id }, document, { new: true }, CommonDB.wrap(callback));
};*/
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

	OtakuDB.update = function (model, id, document, callback) {
		document.id = id;
		model.findOneAndUpdate({ 'id': id }, document, { new: true }, callback);
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