function extendObject(o) {
    function F() {}
    F.prototype = o;
    return new F()
}
function createObject(obj) {
    var o = extendObject(obj);
    // 这里添加了新的方法，所以说是寄生
    o.getNewId = function () {
        console.log('new id');
    };
    return o
}
var obj = createObject({
    aa: 1
});
obj.getNewId();

// 使用寄生式继承方式来为对象添加函数，由于不能达到函数复用，导致效率变低，这与构造函数模式类似