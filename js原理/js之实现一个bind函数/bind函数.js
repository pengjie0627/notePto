function myBind(context) {
    // 把参数伪数组转换为数组
    let augumentsArr = Array.prototype.slice.call(arguments)
    // 获取参数部分
    let args = augumentsArr.slice(1)
    // 记录this
    let self = this
    // 返回函数
    return function (){
        // 获取参数
        let newArgs = Array.prototype.slice.call(arguments)
        // 合并参数调用
        self.apply(context, args.concat(newArgs))
    }
}
