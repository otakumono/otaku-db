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

	server.get({ path: '/:contentType([0-9]+)/:id([0-9]+)' }, function (request, response, next) {
		return next();
	});
};

OtakuDB.shutdown = function () {

};

OtakuDB.run = function () {
	server.listen(9000);
};

/* Export the module */
xport(OtakuDB);