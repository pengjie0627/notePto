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


// Object.setPrototypeOf 是一个JavaScript的方法，它用于设置一个对象的原型（即它的继承链）。这是一个ES6中新增的方法，用来替代旧的 __proto__ 属性。
// function Animal() {
//     this.species = 'domestic';
// }
// function Dog() {
//     this.name = 'Dog';
// }
// const dog = new Dog();
// Object.setPrototypeOf(dog, Animal.prototype);
// console.log(dog.__proto__ === Animal.prototype); // true


// Object.create()方法来创建一个新的对象，并将这个对象的原型设置为Animal。这样一来，dog就可以访问Animal对象中的属性和方法了。
// const Animal = {
//     species: 'domestic',
// };
//
// const dog = Object.create(Animal);
// dog.name = 'Dog';
// console.log(dog.__proto__ === Animal); // true

// 总结;
// [1]创建一个空的简单JavaScript对象（即{}）
// [2]设置该空对象的原型链指向构造函数的prototype
// [3]将构造函数内部的this指向新创建的对象
// [4]执行构造函数内的代码。
// [5]如果构造函数没有返回其它对象，则new表达式中的函数调用会自动返回新创建的对象，否则将返回构造函数返回的对象。