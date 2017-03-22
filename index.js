/**
 * Created by moki on 2017/03/21.
 */
'use strict';

let {
    isArray,
    isObject,
    isArrayOrObject
} = require('./lib/utils');

/**
 * @param {*} obj 
 * @param {Number} maxDeep 
 */
let deepClone = function (obj, maxDeep = 100) {
    let rObj;
    if (!isArrayOrObject(obj)) {
        rObj = obj
    } else {
        let stack = new Map();
        rObj = clone(obj, maxDeep, stack);
        stack = null;
    }
    return rObj;
}

/**
 * @param {*} obj 
 * @param {Number} maxDeep
 * @param {Map} stack 
 * @param {Array} deepStack
 */
let clone = function clone(obj, maxDeep, stack = new Map(), deepStack = []) {
    let result = isArray(obj) ? [] : (isObject(obj) ? {} : obj);

    // checkObj circular
    let rStack = stack.get(obj)
    if (rStack) {
        return rStack;
    }
    stack.set(obj, result);

    deepStack.push(null);
    if (deepStack.length >= maxDeep) {
        return;
    }

    if (isArray(obj)) {
        for (let i of obj) {
            if (isArrayOrObject(i)) {
                i = clone(i, maxDeep, stack, deepStack);
            }
            result.push(i);
        }
    } else if (isObject(obj)) {
        let keys = Object.keys(obj);
        for (let i of keys) {
            let item = obj[i];
            if (isArrayOrObject(item)) {
                item = clone(item, maxDeep, stack, deepStack);
            }
            result[i] = item;
        }
    }

    deepStack.pop();
    return result;
}

module.exports = deepClone
