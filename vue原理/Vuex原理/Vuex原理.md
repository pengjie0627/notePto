1、vuex是什么？
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式
2、怎么使用？
【1】安装vuex依赖
【2】引入vuex
【3】Vue.use(vuex)
【4】创建一个Vuex实例new Vuex.store()
【5】定义state,mutation,action,getter
【6】在main.js中引入并传入到Vue的options中去
【7】通过this.$store.state.xxx获取变量
【8】通过this.$store.getter.xxx获取getter
【9】通过this.$store.dispatch('xxx')调用action
【10】通过this.$store.commit('xxx')调用mutation
3、哪种功能场景使用它？
多个组件共享数据或者是跨组件传递数据时
4、原理
```
注意：Vuex只是一个对象，Store才是核心类，例如 export default{install, Store}
【1】通过调用Vuex的install方法，在该方法内通过Vue.mixin(),
    在beforeCreate()中为每个Vue实例添加$store,$store的值
    来自于main.js中new Vue的时候传入的new Vuex.store()
    的实例对象
【2】在通过new Vuex.store()创建实例对象的时候，把传入的对象
    定义在state中的变量，通过new Vue({state: data})的形式，
    使这些变量变为响应式的，同时定义一个变量let vm = new Vue({data: data})
    记录下这个实例，记录的目的是为了获取到响应式变量
【3】Store内部定义this.getter，通过Object.keys遍历new Vuex.store(options)传进来的
    options.getters，使用Object.defineProperty给内部定义的this.getter添加属性，
    属性名称就是options.getters中的树形名称

    let getters = options.getter || {}
    this.getter = {}
    Object.keys(getters).forEach(getterName => {
        Object.defineProperty(this.getter, getterName, {
            get: () => {
            return getters[getterName](this.state)
            }
        })
    })
    
【4】Store内部定义this.actions，目的是给Store内部的dispatch方法使用。
通过Object.keys遍历new Vuex.store(options)传进来的options.actions，
然后给内部定义的this.actions上添加options.actions中的各个属性和方法。
    let actions = option.actions || {}
    this.actions = {}
    Object.keys(actions).forEach(actionName => {
        this.actions[actionName] = payload => {
            actions[actionName](this, payload)
        }
    })

【5】Store内部定义this.mutations，目的是给Store内部的commit方法使用。
通过Object.keys遍历new Vuex.store(options)传进来的options.mutations，
然后给内部定义的this.mutations上添加options.mutations中的各个属性和方法。
    let mutations = options.mutations || {}
    this.mutations = {}
    Object.keys(mutations).forEach(mutationName => {
        this.mutations[mutationName] = payload => {
            mutations[mutationName](this.state, payload)
        }
    })
【6】Store内部定义dispatch方法，接受两个参数，方法名和值，然后通过
调用内部定义的this.actions,来达到修改的目的

    dispatch(method, payload){
        this.actions[method](payload)
    }
    
【7】Store内部定义commit方法，接受两个参数，方法名和值，然后通过
调用内部定义的this.mutations,来达到修改的目的

    commit = (method, payload) => {
        this.mutations[method](payload)
    }
```

