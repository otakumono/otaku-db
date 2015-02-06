var xport = require('node-xport')(module);


function Datatype() {}

Datatype.isNumber = function(value) {
    return (value !== undefined) && ((typeof value === 'number' || value instanceof Number) && !isNaN(value))
};

Datatype.isNumerical = function(value) {
    if (!value) {
        return false;
    }

    if (Datatype.isNumber(value)) {
        return true;
    }

    return Datatype.isNumber(new Number(value));
};

Datatype.asNumber = function(value) {
    if (Datatype.isNumber(value)) {
        return value;
    }

    if (Datatype.isNumerical(value)) {
        return new Number(value);
    }

    return undefined;
};

/* Export the module */
xport(Datatype);