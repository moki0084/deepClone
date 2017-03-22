export let isArray = Array.isArray;

export let isObject = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}
export let isArrayOrObject = function (obj) {
    return isArray(obj) || isObject(obj);
}
