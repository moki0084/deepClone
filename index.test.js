var deepClone = require('./index');
var assert = require('assert');
var utils = require('./lib/utils');



describe('utils', function () {
    it('isArray', function () {
        assert.equal(false, utils.isArray(1));
        assert.equal(false, utils.isArray(undefined));
        assert.equal(false, utils.isArray(null));
        assert.equal(false, utils.isArray({}));
        assert.equal(false, utils.isArray(new Object()));
        assert.equal(true, utils.isArray([]));
        assert.equal(true, utils.isArray(new Array()));
    })
    it('isObject', function () {
        assert.equal(false, utils.isObject(1));
        assert.equal(false, utils.isObject(undefined));
        assert.equal(false, utils.isObject(null));
        assert.equal(true, utils.isObject({}));
        assert.equal(true, utils.isObject(new Object()));
        assert.equal(false, utils.isObject([]));
        assert.equal(false, utils.isObject(new Array()));
    })
    it('isArrayOrObject', function () {
        assert.equal(false, utils.isArrayOrObject(1));
        assert.equal(false, utils.isArrayOrObject(undefined));
        assert.equal(false, utils.isArrayOrObject(null));
        assert.equal(true, utils.isArrayOrObject({}));
        assert.equal(true, utils.isArrayOrObject(new Object()));
        assert.equal(true, utils.isArrayOrObject([]));
        assert.equal(true, utils.isArrayOrObject(new Array()));
    })
});

describe('clone', function () {
    it('simple clone', function () {
        let arr = [1, 2, 3];
        let obj = {
            a: 2,
            b: 3
        };
        assert.equal(1, deepClone(1));
        assert.equal(false, deepClone(false));
        assert.equal(undefined, deepClone(undefined));
        assert.equal(null, deepClone(null));
        let cArr = deepClone(arr)
        assert.deepEqual(arr, cArr);
        cArr.push(1);
        assert.notDeepEqual(arr, cArr);
        let cObj = deepClone(obj)
        assert.deepEqual(obj, cObj);
        cObj.a = 3;
        assert.notDeepEqual(obj, cObj);
    });

    it('simple deep clone', function () {
        let baseArr = [1, 2, 3];
        let baseObj = {
            a: 2,
            b: 3
        }

        // Arr1
        let tArr1 = [1, baseArr, baseArr];
        let cTArr1 = deepClone(tArr1);
        assert.deepEqual(tArr1, cTArr1);
        cTArr1[2][2] = 4
        assert.notDeepEqual(tArr1, cTArr1);
        assert.deepEqual([1, [1, 2, 4],
            [1, 2, 4]
        ], cTArr1);

        // Arr2
        let tArr2 = [1, baseObj, baseObj];
        let cTArr2 = deepClone(tArr2);
        assert.deepEqual(tArr2, cTArr2);
        cTArr2[2].a = 4
        assert.notDeepEqual(tArr2, cTArr2);
        assert.deepEqual([1, {
            a: 4,
            b: 3
        }, {
            a: 4,
            b: 3
        }], cTArr2);

        // obj1
        let tobj1 = {
            a: 2,
            b: baseArr,
            c: baseArr
        };
        let cTObj1 = deepClone(tobj1);
        assert.deepEqual(tobj1, cTObj1);
        cTObj1.b.push(4);
        assert.notDeepEqual(tobj1, cTObj1);
        assert.deepEqual({
            a: 2,
            b: [1, 2, 3, 4],
            c: [1, 2, 3, 4]
        }, cTObj1);

        // obj2
        let tobj2 = {
            a: 2,
            b: baseObj,
            c: baseObj
        };
        let cTObj2 = deepClone(tobj2);
        assert.deepEqual(tobj2, cTObj2);
        cTObj2.b.a = 4;
        assert.notDeepEqual(tobj2, cTObj2);
        assert.deepEqual({
            a: 2,
            b: {
                a: 4,
                b: 3
            },
            c: {
                a: 4,
                b: 3
            }
        }, cTObj2);
    });

    // it('quote deep clone',function(){
    //     let quoteA= {a:0}
    //     quoteA.s = quoteA;
    //     var quoteB = deepClone(quoteA);
    //     assert.equal(quoteA, quoteB);
    // })
});