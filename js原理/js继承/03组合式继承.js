function SuperClass(id) {
    this.books = ['js', 'html', 'css'];
    this.id = id
}
SuperClass.prototype.getId = function () {
  console.log(this.id)
};

function SubClass(id) {
    // 借用父类构造函数
    SuperClass.call(this, id);
    this.subId = id
}
SubClass.prototype = new SuperClass();

// 1、虽然不修复构造体一般没有什么大问题，但是可能会带来问题，所以还是要修复下
// 2、另外，还要记住只要原型对象prototype改变了，constructor就可能会被改变
SubClass.prototype.constructor = SubClass;

SubClass.prototype.getSubId = function () {
  console.log(this.subId)
};

var instance1 = new SubClass(10);
instance1.books.push('add1');// ["js", "html", "css", "add1"]
console.log(instance1.books);// 10
console.log(instance1.id);//10
console.log(instance1.subId);// 10
instance1.getSubId();// 10
instance1.getId();// 10

var instance2 = new SubClass(20);
instance2.books.push('add2');// ["js", "html", "css", "add2"]
console.log(instance2.books);// 20
console.log(instance2.id);// 20
console.log(instance2.subId);// 20
instance2.getSubId();// 20
instance2.getId();// 20

//缺点：
// 1、两次调用父类构造函数：（第一次是在创建子类原型的时候（SubClass.prototype = new SuperClass();），第二次是在子类构造函数内部（SuperClass.call(this, id);））。
// 2、子类继承父类的属性，一组在子类实例上，一组在子类原型上（在子类原型上创建不必要的多余的属性）（实例上的屏蔽原型上的同名属性），同时效率低