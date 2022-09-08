window.onload = function () {
    /**
     * 父类
     * @param id
     */
    function SuperClass(id) {
        this.books = ['js', 'html', 'css'];
        this.id = id;
    }
    SuperClass.prototype.showBooks = function () {
        console.log(this.books)
    };

    /**
     * 子类
     * @param id
     * @constructor
     */
    function SubClass(id) {
        // 借用父类构造函数
        SuperClass.call(this, id);
    }

    var instance1 = new SubClass(10);
    instance1.books.push('vue'); //
    console.log(instance1.books); // ["js", "html", "css", "vue"]
    console.log(instance1.id);// 10
    instance1.showBooks();// Uncaught TypeError:instance1.showBooks is not a function

    var instance2 = new SubClass(20);
    instance2.books.push('ts'); //
    console.log(instance2.books);// ["js", "html", "css", "ts"]
    console.log(instance2.id);// 20
    instance2.showBooks();// Uncaught TypeError:instance2.showBooks is not a function
};
// 构造函数继承是不能继承原型上的方法，所以调用