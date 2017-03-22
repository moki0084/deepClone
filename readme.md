## deepClone

深拷贝 保留对应的内部引用关系。

> npm run build

> npm run dev

> npm run test

    utils
        √ isArray
        √ isObject
        √ isArrayOrObject
        
    clone
        √ simple clone
        √ simple deep clone
        √ Circular deep clone

### param

|名称 |类型 |备注 |
|---|---|---|
| obj|*| 被拷贝函数|
| maxDeep|Number| 最深拷贝层数,默认100|

### demo

```js
let o = {
    a: 10
};
let base = {
    a: 10,
    b: [1],
    c: {
        a: 1
    },
    d: o,
    e: o
}
base.s = base;
let clone = deepClone(base);
clone.b.push(2);
clone.c.a = 2
clone.d.a = 11
base 
/*
{
    a: 10,
    b: [1],
    c: {
        a: 1
    },
    d: {
        a: 10
    },
    e: {
        a: 10
    },
    s: [base Circular]
}
*/
clone
/*
{
    a: 10,
    b: [1,2],
    c: {
        a: 2
    },
    d: {
        a: 11
    },
    e: {
        a: 11
    },
    s: [clone Circular]
}
*/
```