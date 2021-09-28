export var isPlainObject = function (val) {
    return Object.prototype.toString.call(val) === "[object Object]";
};
export var isValidValue = function (val) {
    return val !== undefined && val !== null;
};
