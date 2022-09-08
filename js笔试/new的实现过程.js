function Fun(age, name) {
    this.age = age
    this.name = name;
}
function create(fn, ...args) {
    let obj = {}
    Object.setPrototypeOf(obj, fn.prototype)
    let result = fn.apply(obj, args)
    return result instanceof Object ? result : obj
}

// console.log(create(Fun, 18, '张三'))
// console.log(new Fun(18, '张三'))