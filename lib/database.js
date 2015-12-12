var xport = require('node-xport')(module),
    mongoose = require('mongoose');

var Database = (function() {
    function Database(config) {
        var that = this;
        var self = {};

        self.connection = null;

        self.config = (config || {});
        self.config.db = (self.config.db || {});
        self.config.db.host = (self.config.db.host || "localhost");
        self.config.db.port = (self.config.db.port || "27017");
        self.config.db.name = (self.config.db.name || "otaku-database-name");
        self.config.db.user = (self.config.db.user || "");
        self.config.db.pass = (self.config.db.pass || "");

        this.getSelf = function () {
            return self;
        };

        this.getAuthenticationString = function () {
            return (self.config.db.user ? self.config.db.user + (self.config.db.pass ? ':' + self.config.db.pass : '') + '@' : '');
        }

        this.getConnectionString = function () {
            return 'mongodb://' + this.getAuthenticationString() + this.getHostString() + '/' + self.config.db.name;
        }

        this.getHostString = function () {
            return self.config.db.host + ':' + self.config.db.port;
        }

        this.connect = function (callback) {
            mongoose.connect(this.getConnectionString());

            mongoose.connection.on('error', function (error) {
                console.log('Failed to connect to database: "' + error + '"');
                callback(false, error);
            });

            mongoose.connection.once('open', function () {
                console.log('Connected to "' + that.getConnectionString() + '"');
                self.connection = mongoose.connection;
                callback(true, null);
            });
        };

        this.die = function () {
            if (connection !== null) {
                connection.disconnect();
            }

            process.exit(1);
        };
    }

    Database.load = function (file) {
        return new Database(require(file));
    };

    return Database;
})();

xport(Database);
