// let a = [1,[2,3,[4,5,6]],[7,8]]
// 1 Array.prototype.toString + split
// let b = Array.prototype.toString.call(a)
// let c = b.split(',')
// console.log('c=', c)

// 2 join + split 方式
// let c = a.join(',')
// let d = c.split(',')
// console.log('d=', d)

// 3 flat方式
// console.log(a.flat(3))

// 4 正则方式
// let d = JSON.stringify(a)
// let e = d.replace(/\[|\]/g, '')
// let f = '[' + e + ']'
// console.log(JSON.parse(f))

// 5 递归方式
// let m = []
// function getFlat(arr) {
//     if (arr && arr.length) {
//         arr.forEach(function (item){
//             if (Array.isArray(item)) {
//                 getFlat(item)
//             } else {
//                 m.push(item)
//             }
//         })
//     }
// }
// getFlat(a)
// console.log('m=',m)

// 6 while循环方式 + 扩展运算符 + concat

// function getFlatByWhile(arr) {
//     let record = JSON.parse(JSON.stringify(arr))
//     while (record.some(item => Array.isArray(item))){
//         console.log('...record=', ...record)
//         record = [].concat(...record) // concat是和每项做合并
//         console.log('record2=', record)
//     }
//     return record
// }
// getFlatByWhile(a)

