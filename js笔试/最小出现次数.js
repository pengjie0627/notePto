let a = [1,2,3,4,12,3,4,5,6,7,3,4,5,2,2]
let b = ['a','b','c','c','b','a','g','b','c','c']
// 数字排序
let c = a.sort(function (a,b){
    return a - b
})
// 字符排序
let d = b.sort()
console.log(c)
console.log(d)
let e = d.reduce(function (pre, cur){
    if (!pre.some(function (item){
        return item.name === cur
    })) {
        pre.push({name: cur, count: 1})
    } else {
        pre.map(function (item){
            if (item.name === cur) {
                item.count++
            }
        })
    }
    return pre
},[])
console.log(e)