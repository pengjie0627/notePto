1、什么是Vue.extend？
Vue.extend是Vue提供的一个方法，使用基础 Vue 构造器，创建一个“子类”

2、为什么要有Vue.extend?
为了让组件的设计更加灵活。通常我们使用一个组件要先使用import先引入，而
Vue.extend的实现方式可以不用引入，而是直接挂载

3、Vue.extend使用场景？
比如说，我们通常使用element-ui的一些组件，如$message,$msgbox,$confirm等

4、Vue.extend原理
```
【1】创建了一个Sub构造函数，函数内部通过this._init(options)调用Vue的init的初始化方法
【2】通过原型继承的方式Sub.prototype = Object.create(Super.prototype)
继承了Vue原型上的方法
【3】通过对象引用的方式，扩展了构造函数Sub上的
    extend、mixin、use、
    component,directive,filter
【4】通过合并Vue.extend(options)传递过来的options和父级的options，来做属性的初始化
和计算属性的初始化
【5】值得一提的是Vue.extend方法中还有一个缓存池，用来缓存创建的Sub对象。目的是
为了在同一个地方多次调用Vue.extend创建的时候能够直接用上次返回的Sub，从而来提高性能。
缓存池中以父类的sid作为key,以Sub作为value，当在一个地方调用多次时，由于父类一样，
所以Sub取缓存即可

```