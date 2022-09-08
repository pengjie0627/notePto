/**
 * 父类
 * @param id
 * @constructor
 */
function SuperClass(id) {
    this.books = ['js', 'html', 'css'];
    this.id = id;
}
SuperClass.prototype.showBooks = function () {
    console.log(this.books)
};

function extendObject(o) {
    function F() {}
    F.prototype = o;
    return new F();
}
function extendPrototype(subClass, superClass) {
    var p = extendObject(superClass.prototype);

    p.constructor = subClass;
    subClass.prototype = p;
    // 上面两句等价于下面两句,因为实例化对象的构造体constructor其实就是构造函数原型prototype下的constructor
    // subClass.prototype = p;
    // subClass.prototype.constructor = subClass
}

/**
 * 子类
 * @param id
 * @constructor
 */
function SubClass(id) {
    // 借用父类构造函数
    SuperClass.call(this, id);
    this.subId = id;
}
extendPrototype(SubClass, SuperClass);
SubClass.prototype.getSubId = function () {
  console.log(this.subId);
};

var instance1 = new SubClass(20);
console.dir(instance1);
console.dir(instance1.constructor === SubClass.prototype.constructor); // true