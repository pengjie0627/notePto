new的实现做了以下几件事：
【1】创建一个空对象
【2】空对象的原型链指向构造函数的原型
【3】将空对象作为构造函数的上下文（改变this指向）
【4】对构造函数有返回值的判断

具体实现如下：
```
    function Fun(age, name) {
        this.age = age
        this.name = name;
    }
    // 具体实现
    function create(fn, ...args) {
        // 创建一个空对象
        var obj = {}
        // 空对象的原型指向构造函数的原型,通过下面可以验证
        Object.setPrototypeOf(obj, fn.prototype)
        // 改变了this的指向
        var result = fn.apply(obj, args)
        // 是对象，通过new Foo()会返回这个对象，如果是值类型，则无影响
        return result instanceof Object ? result : obj
    }
    console.log(create(Fun, 18, '张三')
```
