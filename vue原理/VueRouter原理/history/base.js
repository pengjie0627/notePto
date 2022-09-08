export default class History{
    constructor(router) {
        this.router = router
        // 默认定义一个当前的路径 后续更改这个路径
        this.current = createRoute(null, {
            path: "/"
        })
    }

    /**
     * 跳转的核心逻辑
     * @param location 跳转到路径
     * @param onComplete 跳转成功后的执行方法
     */
    transitionTo(location, onComplete){
        // 用当前location找出对应的路由信息,结构如下
        // route 为当前路径/main/user，匹配到的与之相关的路由信息  结构如下
        // { path: '/main/user', matched: [{path: '/main', component: Main, parent: undefined}, {path: '/main/user', component: User, parent: {path: '/main', component: Main, parent: null}}]}
        let route = this.router.match(location)

        // 跳转相同的路径直接进行拦截
        if (this.current.path === location && this.current.matched.length === route.matched.length) {
            return
        }

        // 更新this.current
        this.updateRoute(route)

        // 设置监听
        onComplete && onComplete()
    }

    /**
     * 更新当前路径current
     * @param route
     */
    updateRoute(route) {
        this.current = route
        // current更新后，如果设置的有监听，则调用监听
        this.cb && this.cb(route)
    }

    listen(cb) {
        this.cb = cb
    }
}

export function createRoute(record, location){
    let res = []
    if (record) { // { path: '/main/user', component: User, parent: parent}
        while (record){
            res.unshift(record)
            record = record.parent
        }
    }
    return {
        ...location,
        matched: res
    }
}