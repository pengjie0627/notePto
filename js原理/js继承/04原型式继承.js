function SuperClass() {
    this.books = ['js', 'html', 'css'];
}
SuperClass.prototype.showBooks = function () {
    console.log(this.books)
};
// 原型式继承主要就是这一段
function create(o) {
    function F() {}
    F.prototype = o;
    return new F()
}

window.onload = function () {
    var obj = create(new SuperClass());
    console.log(obj.books);
    obj.showBooks();
}
//
// // 这种方式比较少，原因就是和原型链继承一样，共用同一个变量，变量的值要是变了，所有实例的值都会改变,引用数据类型容易改变。
// var Person={
//     name:'me',
//     hobbies:['riding','swimming']
// }
// var anotherPerson=create(Person);
// anotherPerson.name='her';
// anotherPerson.hobbies.push('dancing');
// console.log(anotherPerson.name)
// console.log(anotherPerson.hobbies)
