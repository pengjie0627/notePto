new的实现做了以下几件事：
【1】创建一个空对象
【2】空对象的原型链指向构造函数的原型
【3】将空对象作为构造函数的上下文（改变this指向）
【4】对构造函数有返回值的判断

```
    function Foo(){
        console.log(this)
    }
    // 创建一个空对象
    let obj = {}
    // 空对象的原型指向构造函数的原型,通过下面可以验证
    obj.prototype = new Foo().__proto__
    // 运行Foo()函数发现this指向的是window，但是当new Foo()后发现this指的是Foo构造函数
    所以说这里改变了this的指向
    // 当function Foo(){ console.log(this); return {}} 中有return时，如果return的
    // 是对象，通过new Foo()会返回这个对象，如果是值类型，则无影响
```

具体实现如下：
```
    function Fun(age, name) {
        this.age = age
        this.name = name;
    }
    // 具体实现
    function create(fn, ...args) {
        var obj = {}
        Object.setPrototypeOf(obj, fn.prototype)
        var result = fn.apply(obj, args)
        return result instanceof Object ? result : obj
    }

    console.log(create(Fun, 18, '张三')
```
