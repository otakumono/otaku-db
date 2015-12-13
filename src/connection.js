var xport = require('node-xport')(module),
    mongoose = require('mongoose'),
    Schemata = require('./schemata');

function Connection(options) {
    var options = Connection.sanitizeOptions(options);
    var connection = null;
    var models = {};
    var that = this;

    this.getHost = function () {
        return options.host;
    };

    this.setHost = function(host) {
        options.host = Connection.sanitizeHost(host);
    };

    this.getPort = function () {
        return options.port;
    };

    this.setPort = function(port) {
        options.port = Connection.sanitizePort(port);
    };

    this.getUsername = function () {
        return options.username;
    };

    this.setUsername = function(username) {
        options.username = Connection.sanitizeUsername(username);
    };

    this.getPassword = function () {
        return options.password;
    };

    this.setPassword = function(password) {
        options.password = Connection.sanitizePassword(password);
    };

    this.getDatabase = function () {
        return options.database;
    };

    this.setDatabase = function(database) {
        options.database = Connection.sanitizeDatabase(database);
    };

    this.createConnection = function () {
        connection = mongoose.createConnection(this.getConnectionString());
    };

    this.getConnection = function () {
        return connection;
    };

    this.createModel = function (schema, modelName, collection) {
        models[modelName] = connection.model(modelName, schema);
    };

    this.createModels = function () {
        this.createModel(Schemata.Language, 'Language');
        this.createModel(Schemata.Media, 'Media');
        this.createModel(Schemata.Person, 'Person');
        this.createModel(Schemata.Service, 'Service');
    };

    this.getModel = function (schema) {
        return models[schema];
    };

    this.onOpen = function (callback) {
        console.log(callback);
        console.log("[CONNECTED] \"%s\"", that.getConnectionString());

        that.createModels();
    };

    this.onError = function (error) {
        console.log("[FAILURE] \"%s\"", that.getConnectionString());
        console.log('This is a critical failure, application will exit. More information below.');
        console.log('Error: ' + error);

        process.exit(1);
    };

    this.onClose = function () {
        console.log("[DISCONNECTED] \"%s\"", that.getConnectionString());
    };
}

Connection.prototype.getConnectionString = function () {
    return ("mongodb://" + this.getUserString() + this.getHostString() + "/" + this.getDatabase());
};

Connection.prototype.getHostString = function () {
    return (this.getHost() + (Connection.isValidPort(this.getPort()) ? ":" + this.getPort() : ""));
};

Connection.prototype.getUserString = function () {
    return (this.getUsername() ? (this.getUsername() + (this.getPassword() ? ":" + this.getPassword() : "") + "@") : "");
};

Connection.prototype.connect = function () {
    this.createConnection();

    this.getConnection().on('error', this.onError);
    this.getConnection().once('open', this.onOpen);
    this.getConnection().on('close', this.onClose);
};

Connection.prototype.disconnect = function (callback) {
    console.log("[DISCONNECTING] \"%s\"", this.getConnectionString());
    this.getConnection().close(function () {
        if (callback) {
            callback();
        }
    });
};

Connection.sanitizeOptions = function (options) {
    options = (options || {});
    options.host = Connection.sanitizeHost(options.host);
    options.port = Connection.sanitizePort(options.port);
    options.username = Connection.sanitizeUsername(options.username);
    options.password = Connection.sanitizePassword(options.password);
    options.database = Connection.sanitizeDatabase(options.database);

    return options;
};

Connection.sanitizeHost = function (host) {
    return (host || "localhost");
};

Connection.sanitizePort = function (port) {
    return (port || 27017);
};

Connection.sanitizeUsername = function (username) {
    return (username || undefined);
};

Connection.sanitizePassword = function (password) {
    return (password || undefined);
};

Connection.sanitizeDatabase = function (database) {
    return (database || "otaku-data");
};

Connection.isValidPort = function (port) {
    if (port) {
        return (port > 0 && port < 65536);
    }

    return false;
};

xport(Connection);
