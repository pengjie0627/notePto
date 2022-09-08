1、api层面
```
    1、Composition API(组合式API)
        【1】什么是组合式api？
            就是把通用的代码块提取出来形成一个可复用的函数
        【2】为什么要有组合式api?
             a:当组件变得越来越大时，可读性变得越来越困难
                举个例子：创建两个响应式的数据，通过两个按钮的点击来分别获取对象的姓名和年龄
                在vue2中，我们会把变量申明在data中，会把方法写在methods中，如下：
                export default{
                    data() {
                        return {
                            person: {
                                name: '张三',
                                age: 18
                            }
                            name: '',
                            age: 0
                        }
                    },
                    methods: {
                        getName(){
                            this.name = this.person.name
                        },
                        getAge(){
                            this.age = this.person.age
                        }
                    }
                }
                上面代码是典型的option api格式的代码。但是如果我们要是从业务划分的话，我们希望相关的
                业务逻辑代码放在一起，便于阅读。但是这种option api格式的代码反而是把相关业务代码给拆分了。
                在vue3中，我们的实现如下：
                export funtion defineComponent({
                    setup(){
                        const person = {
                            name: '张三',
                            age: 18
                        },
                        // name相关的业务逻辑
                        const name = ref('')
                        const getName = () => {
                            name.value = person.name
                        }
                        // age相关的业务逻辑
                        const age = ref('')
                        const getAge = () => {
                            age.value = person.age
                        }
                        return {
                            name,
                            age,
                            getName,
                            getAge
                        }
                    }
                })    
                这样我们就把相关的业务逻辑代码给放在一起，方便阅读。但是这样会造成setup很庞大，
                所以，我们可以通过功能分组的方式，对以上代码进行处理。如下：
                export funtion defineComponent({
                    setup(){
                        const person = {
                            name: '张三',
                            age: 18
                        },

                        return {
                            ...useName(person),
                            ...useAge(person)
                        }
                    }
                })    
                
                name相关的业务代码，我们放在name的抽取文件中：
                function useName(person){
                    // name相关的业务逻辑
                    const name = ref('')
                    const getName = () => {
                        name.value = person.name
                    }
                    return {
                        name,
                        getName
                    }
                }
                age相关的业务代码，我们放在age的抽取文件中：
                function useAge(person) {
                    // age相关的业务逻辑
                    const age = ref('')
                    const getAge = () => {
                        age.value = person.age
                    }
                    return { 
                        age,
                        getAge
                    }
                }
             b:相同的代码逻辑很难在多个组件中进行复用
             加入我们有了另外一个组件，也要获取age和name，那么我们是不是可以直接复用了就可以了
            
        【3】组合式api有哪些？
            setup
            ref:既可以接受一个值类型，又可以接受一个对象，使之变为响应式类型
            reactive：只能接受一个对象，使其变为响应式类型
            watch:既要指明监视的属性，又要指明监视的回调
            computed
            watchEffect:不用指明监视的哪个属性，监视的回调中用到哪个属性，就监视哪个属性
            toRef：要将响应式对象中的某个属性单独提供给外部使用 const name = toRef(person,"name")
            toRefs：：toRefs与toRef功能一致，但是可以批量创建多个ref对象
            shallowReactive：只处理对象最外层属性为响应式
            shallowRef：只处理基本数据类型的响应式，不进行对象的响应式处理
            readonly：让一个响应式数据变为只读数据(深只读)
            shallowReadonly：让一个响应式数据变为只读(浅只读)
            toRaw：将一个由reactive生成的响应式对象转为普通对象（用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面的更新）
            markRaw：标记一个对象，使其永远不会成为响应式对象
            customRef：创建一个自定义ref，并对其依赖项跟踪和更新触发进行显式控制
                const myRef = (value)=>{ 
                    return customRef((track,trigger)=>{ 
                      return{ 
                        get(){ 
                          console.log(`有人从myRef中读取了此数据${value}`); 
                          track(); 
                          return value; 
                        }, 
                        set(newValue){ 
                          console.log(`有人把myRef的数据改为了新数据${newValue}`); 
                          value = newValue; 
                          trigger();//通知vue去重新解析模板 
                        } 
                      } 
                    }); 
                } 
                或
                  const str = myRef("hello"); 
                  return{ 
                    str 
                  } 
            isRef：检查一个值是否为ref对象
            isReactive： 检查一个值是否为reactive创建的响应式代理
            isReadonly： 检查一个对象是否是由readonly创建的只读代理
            isProxy：检查一个对象是否是由reactive或readonly创建的代理
         
    2、Composition API语法糖，主要指的是setup
    3、Teleport传送门，主要是指将组件渲染到指定的元素下
    4、Fragment片段，主要用于支持多个根节点
    5、Emits选项，主要作用在子组件中，用于接收父组件绑定的方法
        // 父组件
        <template>
            <my-button v-on:click="handlerClick"></my-button>
        </template>
        // 子组件
         <template>
           <button v-on:click="$emit('click', $event)"></button>
        </template>
    6、可以用来跨平台的自定义渲染器
    7、Suspense组件。主要用于异步组件加载过程中增加交互体验，比如loading。要结合插槽#default和#fallback来用
        <template>
          <div id="app">
            <Suspense>
              <template #default>
                <Async></Async>
              </template>
              <template #fallback>
                <h1>Loading...</h1>
              </template>
            </Suspense>
          </div>
        </template>
```
2、框架层面
```
    1、更快，重写了虚拟DOM + 编译器优化 + 基于proxy的响应式系统，使得速度提升
    2、更小，更好的摇树策略，使得打包体积更小
    3、更容易维护，使用ts和模块化的方式
    4、更容易扩展，独立的响应式模块 + 自定义渲染器
```