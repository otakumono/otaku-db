var xport = require('node-xport')(module),
    path = require('path'),
    restify = require('restify'),
    OtakuCore = require('otaku-core');

var HTTPError = OtakuCore.HTTPError;
var CommonDB = OtakuCore.Database.CommonDB;

function OtakuDB() {}

OtakuDB.OtakuCore = OtakuCore;
OtakuDB.Database = require('./database');

var server = null;
var database = null;

OtakuDB.prepare = function () {
	database = CommonDB.createInstance(OtakuDB.Database.OtakuDB, { name: 'otaku' });
	database.connect();

	server = restify.createServer({
		name: 'OtakuDB',
		version: '0.0.1'
	});

	server.use(restify.gzipResponse());

	server.get({ path: '/count/:contentType' }, function (request, response, next) {
		database.countContent(request.params.contentType, function (error, result) {
        	response.contentType = 'json';

        	response.send({ count: result });
		});

		return next();
	});

	server.get({ path: '/get/:contentType/:id' }, function (request, response, next) {
		database.retrieveContent(request.params.contentType, request.params.id, function (error, result) {
			response.contentType = 'json';

			//console.log(request.connection.remoteAddress);

			response.send(result);
		});

		return next();
	});

	server.get({ path: '/remove/:contentType/:id' }, function (request, response, next) {

		return next();
	});

	server.get({ path: '/dbgadd/:contentType' }, function (request, response, next) {
		database.addContent(request.params.contentType, { genres: [1] }, function (error, result) {
			response.contentType = 'json';
			console.log("added: " + result);
			console.log("error: " + error);
			response.send(result);
		});

		return next();
	});

	server.post({ path: '/add' }, function (request, response, next) {
		return next();
	});

	server.post({ path: '/update' }, function (request, response, next) {
		return next();
	});
};

OtakuDB.shutdown = function () {

};

OtakuDB.run = function () {
	server.listen(9000, function () {
		console.log('Server "%s" listening on: "%s".', server.name, server.url);
	});
};

/* Export the module */
xport(OtakuDB);