// 防抖-闭包版本
// function debounce(fn, time){
//     let timer = null // 借助闭包保存timer
//     return function (){
//         if (timer) {
//             clearTimeout(timer)
//         }
//         timer = setTimeout(() => {
//             fn.apply(this, arguments)
//         }, time)
//     }
// }
// function test(){
//     console.log('执行了')
// }
// window.addEventListener("mousemove",debounce(test,2000));

// 节流-闭包版本
// function throttle(fn, time) {
//     let timer = null
//     return function (){
//         if (!timer) {
//             timer = setTimeout(() => {
//                 fn.apply(this, arguments)
//                 timer = null
//             }, time)
//         }
//     }
// }
// function test(){
//     console.log('执行了')
// }
// window.addEventListener("mousemove",throttle(test,2000));


// 节流-时间戳版本
// function throttle(fn, time) {
//     let begin = new Date().getTime() // 借助闭包保存begin
//     return function (){
//         let cur = new Date().getTime()
//         if (cur - begin > time) {
//             fn.apply(this, arguments)
//             begin = cur
//         }
//     }
// }
// function test(){
//     console.log('执行了')
// }
// window.addEventListener("mousemove",throttle(test,2000));

