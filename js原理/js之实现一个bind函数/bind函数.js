if (!Function.prototype.bind) {
    Function.prototype.bind = function(context) {
        var self = this; // 保存原函数greet
        console.log('self', self)
        return function() {
            // 返回一个新函数，当被调用时，这个新函数将执行原函数，并传递所有参数
            return self.apply(context, arguments);
        };
    };
}

// 使用示例
function greet(greeting) {
    return this.name + ' says ' + greeting;
}
var obj = {
    name: 'John'
};
var boundGreet = greet.bind(obj);
console.log(boundGreet('Hello')); // 输出: John says Hello