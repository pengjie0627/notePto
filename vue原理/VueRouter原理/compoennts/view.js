// 下面的定义叫函数式组件 没有this 没有状态
export default {
    name: 'RouterView',
    functional: true,
    // 这里需要注意一件事情，render函数中使用了原型上的this.$route，this.$route的值实际上是vue中的响应式对象_route，
    // 所以这里的render会进行依赖收集。下次vue中的响应式对象_route变化后，这里就会重新渲染
    render(h,  {parent, data}){
        let route = parent.$route // 由于函数式组件没有this,所以使用parent。parent.$route实际上就是this.$route
        let matched = route.matched
        data.routerView = true // 表示为一个router-view组件
        let depth = 0;
        // 下面这个循环，主要是找出多个router-view组件
        // 一直向parent中查找，直至找出所有的层级
        while (parent){
            if (parent.$vnode && parent.$vnode.data.routerView) {
                depth++
            }
            parent = parent.$parent
        }
        let record = matched[depth]
        if (!record) {
            return h()
        }
        let component = record.component
        return h(component, data)
    }
}