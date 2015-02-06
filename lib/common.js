var xport = require('node-xport')(module),
	Datatype = require('./datatype'),
	mongoose = require('mongoose');

function CommonDB() {}

CommonDB.sanitizeOptions = function (options) {
	options = (options || {});
	options.host = (options.host || "localhost");
	options.port = (options.port || 27017);
	options.pass = (options.user || undefined);
	options.user = (options.user || "");
	options.name = (options.name || "otaku-db");
};

CommonDB.connectionString = function (options) {
	CommonDB.sanitizeOptions(options);

	return ("mongo://" + CommonDB.userString(options) + CommonDB.hostString(options) + "/" + options.name);
};

CommonDB.hostString = function (options, sanitize) {
	if (sanitize === true) {
		CommonDB.sanitizeOptions(options);
	}

	return (options.host + ":" + options.port);
};

CommonDB.userString = function (options, sanitize) {
	if (sanitize === true) {
		CommonDB.sanitizeOptions(options);
	}

	return (options.user + (options.pass ? ":" + options.pass : "") + "@");
};

CommonDB.createInstance = function (ctor, options) {
	var instance = new ctor(options);

	instance.options = options;
	instance.connection = null;
	instance.models = {};

	instance.connectionString = function () {
		return CommonDB.connectionString(instance.options);
	};

	instance.onOpen = function () {
		console.log("Established connection to: \"%s\".", instance.connectionString());
	};

	instance.onError = function (error) {
		console.log("Failed to connect to: \"%s\".", instance.connectionString());
		console.log('This is a critical failure, application will exit. More information below.');
		console.log('Error: ' + error);
		process.exit(1);
	};

	instance.onClose = function () {
		console.log("Disconnected from: \"%s\".", instance.connectionString());
	};

	return instance;
};

CommonDB.connect = function (instance) {
	instance.connection = mongoose.createConnection(instance.connectionString());
	instance.connection.on('error', instance.onError);
	instance.connection.on('open', instance.onOpen);
	instance.connection.on('close', instance.onClose);
};

CommonDB.disconnect = function (instance, callback) {
	instance.connection.disconnect(callback || function () {});
};

xport(CommonDB);