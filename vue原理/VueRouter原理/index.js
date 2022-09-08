import install from './install'
import createMatcher from './create-matcher'
import HashHistory from './history/hash'
import H5History from './history/h5'
export default class VueRouter{
    constructor(options) {

        // this.matcher 返回{match, addRoutes}
        // match 负责匹配路径
        // addRoutes 负责动态添加路由
        this.matcher = createMatcher(options.routes || [])

        // 创建路由系统,根据模式来创建不同的路有对象
        this.mode = options.mode || 'hash'

        if (this.mode === 'hash') {
            this.history = new HashHistory(this)
        } else if (this.mode === 'history') {
            this.history = new H5History(this)
        } else {
            // todo AbstractHistory
        }

    }

    /**
     * 初始化
     * @param app 根实例
     */
    init(app) {
        // 如何初始化 先根据当前路径 显示到指定的 组件
        const history = this.history
        const setupHashListener = () => {
            history.setupListener()
        }
        // hash跳转，设置hash改变的hashchange监听事件
        history.transitionTo(history.getCurrentLocation(), setupHashListener)
        // 设置监听，当路由实例中的current变化后，需要更新父实例上的响应式对象_route
        history.listen((route) => {
            app._route = route // 更新根实例上刚才定义的响应式_route
        })
    }

    match(location){
        return this.matcher.match(location)
    }
}
VueRouter.install = install