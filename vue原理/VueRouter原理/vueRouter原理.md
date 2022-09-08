1、浏览器地址栏url的改变触发相应的监听
2、对于hash模式，会触发hashchange的监听
3、对于history模式，会触发popstate的监听
4、无论是hash模式还是history模式，最终的目的就是改变Router实例上的current
5、current变化后，则会重新匹配与hash或者path对应的组件
5、vue中通过监听current值得变化，获取到对应的组件，然后通过router-view组件进行渲染
```
【1】在install方法中，获取到Vue的根实例后使用
    Vue.util.defineReactive(this, '_route', this._router.history.current)
    来在根实例上定义一个响应式对象_route
【2】为了能够让每一个Vue实例能够访问到该响应式对象，则在Vue的原型上通过
    Object.defineProperties(Vue.prototype, '$route', {
        get(){
            return this._routerRoot._route
        }
    })
    创建一个$route对象。当访问this.$route时，返回this._routerRoot._route，
    其实就是访问刚才通过Vue.util.defineReactive定义的响应式对象_route。
【3】在router-view组件中，通过parent.$route（实际上就是this.$route，
    也就是Router实例对象中的current）获取到当前路径对应的组件来渲染。
    由于render中使用到了响应式数据_route，所以这里的render函数会被作为_route
    的依赖被收集。当下次的current变化时，依赖会被调用执行，从而重新渲染
```