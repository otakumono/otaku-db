var xport = require('node-xport')(module);

var FactoryBuilder = {
    create: function (schema, defaultName, defaultCollection) {
        return {
            instances: [],
            instanceMap: {},
            create: function (connection, name, collection) {
                name = (name || defaultName);
                collection = (collection || defaultCollection);

                var model = connection.model(name, schema, collection);
                instances.push(model);
                instanceMap[connection] = model;

                return model;
            },
            get: function (connection, createIfNotExists) {
                return (instanceMap[connection] || ((createIfNotExists || true) ? this.create(connection) : null));
            },
            getInstances = function () {
                return instances;
            }
        };
    }
};

xport(FactoryBuilder);
