// 1、什么是函数柯里化？
// 函数柯里化是一种技术，一种将多入参函数变成单入参函数
// 2、柯里化解决了什么问题？
// 其实柯里化大多是情况下是为了减少重复传递的不变参数。
// 3、一个函数实现add(1,2,3)、add(1,2)(3)、add(1)(2,3)、add(1)(2)(3)的求和
function cal(fn){
    return function carry(...args1){
        // 注意fn.length方式可以获取函数参数的个数
        if (fn.length === args1.length) {
            return fn.apply(this, arguments)
        } else {
           return function (...args2){
               return carry(...args1, ...args2)
           }
        }
    }
}
function calFn(x,y,z){
    return x+y+z
}
add = cal(calFn)

console.log(add(1)(2)(3))