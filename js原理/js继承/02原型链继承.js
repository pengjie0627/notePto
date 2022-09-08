/**
 * 父类
 * @param
 * @constructor
 */
function SuperClass() {
    this.books = ['js', 'html', 'css'];
    this.id = 5
}
SuperClass.prototype.getId = function () {
  console.log('父级id=' + this.id)
};

function SubClass(id) {
    this.subId = id
}
SubClass.prototype = new SuperClass();
// 虽然不修复构造体一般没有什么大问题，但是可能会带来问题，所以还是要修复下
SubClass.constructor = SubClass;

var instance1 = new SubClass(10);

console.log(instance1.subId);// 10
console.log(instance1.books);// ["js", "html", "css"]
console.log(instance1.id);// 5
instance1.getId();// 父级id=5

// 1、缺点显而易见，原型链方式继承，就是实例化子类时不能将参数传给父类，
// 也就是为什么这个例子中function SuperClass()没有参数，
// 而是直接写成了this.books和this.id都被赋值了的原因。
// 2、如果父类包含引用类型的属性，那么子类所有实例都会共享该属性