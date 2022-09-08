1、什么是hooks?（类似于VUE的composition api）
```
   一套能够使函数组件更强大，更灵活的"钩子"
   react体系中分为函数组件和类组件，由于函数组件不可以拥有自己的状态，
    为了能够让函数组件可以拥有自己的状态，所以react从v16.8开始，Hooks
    应用而生。
```
2、hooks解决了什么问题？
```
    【1】组件的逻辑复用
    【2】class类组件自身的问题
```
3、hooks有什么优点？
```
    【1】告别难以理解的类
    【2】解决业务逻辑含义拆分的问题
    【3】使状态逻辑复用变得简单
    【4】函数组件在设计上，更加切合React的理念
```

4、hooks有那些？
【1】useState
1、默认是固定值
```
    import { useState } from 'react'
    const Func = () => {
        // 1、useState()返回的是一个数组，count,setCount 名字可以自定义，但前后顺序不可以互换
        // 2、setCount函数作用用来修改count  是通过生成一个新值替换原值，而不是原值修改
        // 3、组件首次渲染useState会跟着执行，初始值在首次渲染才会生效。组件更新渲染，useState也会执行，
        // 这时候得到的新的count就不是0而是先前修改后的新值
        const [count, setCount] = useState(0)
        return (
            <div onClick={() => setCount(count + 1)}>{count}</div>
        )
    }
```
2、默认需要计算的值
```
    const Func = (props) => {
    const {num} = props
    const [num1, setNum1] = useState(0)
    const [count, setCount] = useState(() => {
        return num + num1 // num + num1的结果会作为count的初始值
    })
    return (
        <div onClick={() => setCount(count + 1)}>{count}</div>
    )
}

class App extends React.Component{
    render() {
        return (
            <div>
                <Func num={1}></Func>
            </div>

        )
    }
}
```
注意：useState只能出现在函数组件中。不能嵌套在if/for/函数中，只能放在函数组件最外层。因为react按照hooks的顺序识别每一个hook
【2】useEffect：叫做副作用，每次组件更新时都会执行
注意：
1、默认状态（无依赖项），组件初始化的时候先执行一次，等到每次数据修改组件更新时再次执行。
```
    import { useState, useEffect } from 'react'

    const Func = () => {
        const [count, setCount] = useState(0)
        useEffect(() => {
            console.log('副作用执行')
            document.title = count
        })
        return (
            <>
                <div>{count}</div>
                <button onClick={() => setCount(count + 1)}>add</button>
            </>
    
        )
    }
```
2、添加一个空数组依赖项，组件初始化的时候会执行一次，后续不会再执行
```
    import { useState, useEffect } from 'react'
    
    const Func = () => {
        const [count, setCount] = useState(0)
        useEffect(() => {
            console.log('副作用执行')
            document.title = count
        }, [])
    
        return (
            <>
                <div>{count}</div>
                <button onClick={() => setCount(count + 1)}>add</button>
            </>
    
        )
    }
```
3、依赖特定项，组件初始化时候会执行一次，依赖的特定项发生变化会再次执行
```
    import { useState, useEffect } from 'react'
    
    const Func = () => {
        const [count, setCount] = useState(0)
        useEffect(() => {
            console.log('副作用执行')
            document.title = count
        }, [count])
    
        return (
            <>
                <div>{count}</div>
                <button onClick={() => setCount(count + 1)}>add</button>
            </>
    
        )
    }
```
4、只要在useEffect回调函数中用到的数据状态就应该出现在依赖项数组中声明，否则可能会有bug

5、使用副作用清除副作用代码setInterval
```
    比如清除定时器，需要注意要有return一个方法
    useEffect(() => {
        let timer = setInterval(() => {
            console.log('定时器执行了')
        }, 1000)
        // 这里要返回一个方法
        return () => {
            clearInterval(timer)
        }
    }, [])
    
```
6、使用副作用发送网络请求
```
    useEffect(() => {
        function loadData() {
            fetch('http://abc.com/0/channels').then(res => {
                console.log(data)
            })
        }
        loadData()
    }, [])
```
    
【3】useRef:操作dom相关的
```
    const Func = () => {
        // divRef1和divRef2要和ref上指定的名称相同
        const divRef1 = useRef(null)
        const divRef2 = useRef(null)
        // useEffect是dom更新之后触发的
        useEffect(() => {
            console.log(divRef1.current)
            console.log(divRef2.current)
        }, [])
        return (
            <>
                <div ref={divRef1}>验证ref1</div>
                <div ref={divRef2}>验证ref2</div>
            </>
        )
    }
```
    
【4】useContext
1、传递一个值
```
    import { createContext, useContext } from 'react'

    const Context = createContext()
    
    const Func = () => {
        const value = useContext(Context)
        return (
            <>
               <div>this is Func-{value}</div>
            </>
        )
    }
    
    class App extends React.Component{
        state = {
            count: 10
        }
        render() {
            return (
                <div>
                    <Context.Provider value={this.state.count}>
                        <Func></Func>
                    </Context.Provider>
    
                </div>
    
            )
        }
    }
```
2、传递多个值
```
     // 传递多个值
    const Context = createContext()

    const Func = () => {
        const [value, key] = useContext(Context)
        console.log(useContext(Context))
        return (
            <>
               <div>this is Func-{value}-{key}</div>
            </>
        )
    }
    
    class App extends React.Component{
        state = {
            count: 10,
            key: 15
        }
        render() {
            return (
                <div>
                    <Context.Provider value={[this.state.count, this.state.key]}>
                        <Func></Func>
                    </Context.Provider>
    
                </div>
    
            )
        }
    }
```
