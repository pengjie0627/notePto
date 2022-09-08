在一个自定义组件中嵌套其它内容，其它内容将会作为属性中的children传递给该自定义组件
```
    function ComA(props){
        // 1、props.children有点类似于vue中插槽
        // 2、props.children可能是一个字符串、可能是一个对象、也可能是一个数组等
        console.log(props.children) 
        return (
            <div>我是ComA组件</div>
        )
    }
    
    class App extends React.Component{
        state = {
            message: '我是父组件的数据'
        }
        render() {
            return (
                <div>
                    <ComA>
                        {/*可以使一个文本*/}
                        我是ComA组件的children1
                        {/*可以是一个元素*/}
                        <div>我是ComA组件的children2</div>
                        {/*可以使一个函数*/}
                        {() => {console.log('我是ComA组件的children3')}}
                        {/*可以是一个JSX语法*/}
                        {<div>{'我是ComA组件的children4'}</div>}
                    </ComA>
                </div>
    
            )
        }
    }
```