import RouterView from './compoennts/view'
import RouterLink from './compoennts/link'
let _Vue
export default function install(Vue){
    _Vue = Vue
    Vue.mixin({
        beforeCreate() {
            // 为每一个Vue实例添加_routerRoot，以后每个vue实例都可以通过this._routerRoot._router访问到Router实例
            if (this.$options.router) { // 如果存在说明是根实例
                this._routerRoot = this // 在this上添加一个变量，记录一下根实例
                this._router = this.$options.router // 在this上添加一个变量记录下router实例
                this._router.init(this) // 初始化,这里的this是根实例，也就是main.js中的那个
                // 在根实例上定一个响应式对象_route,值为路由实例对象的current的值
                Vue.util.defineReactive(this, '_route', this._router.history.current)
            } else {
                // 不存在就去找父实例上的，如果父实例中有的话
                this._routerRoot = this.$parent && this.$parent._routerRoot
            }
        }
    })
    // 14行在根实例上加了一个响应式的_route,为了能够让所有子vue实例对象也能够使用，这里把14行定义的那个_route放在原型上，但是取名叫做$route
    Object.defineProperties(Vue.prototype, '$route', {
        get(){
            return this._routerRoot._route
        }
    })
    // 为了能够让所有vue实例能够拿到路由实例对象，就把路由实例对象放在了原型上叫做$router
    Object.defineProperties(Vue.prototype, '$router', {
        get() {
            return this._routerRoot._router
        }
    })

    // 注册router-view为全局组件
    Vue.component('RouterView', RouterView)

    // 注册router-link为全局组件
    Vue.component('RouterLink', RouterLink)

}