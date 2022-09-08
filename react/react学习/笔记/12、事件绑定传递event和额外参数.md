1、函数组件
```
    function Hello(){
        const clickHandler = (e,param) => {
            console.log(e)
            console.log(param)
        }
        return <div onClick={(e) => clickHandler('param')}>hello</div>
    }
    function App() {
        return (
            <>
                {/*三种使用方式*/}
                <Hello/>
                <Hello></Hello>
                {Hello()}
            </>
        );
    }
```
2、类组件
```
    class HelloComponent extends React.Component{
        clickHandler = (e,param) => {
            console.log(e)
            console.log(param)
        }
    
        render() {
            // 注意这里需要使用箭头函数
            return <div onClick={(e) => this.clickHandler('msg')}>这是一个类组件</div>
        }
    }
```

注意：其实无论函数组件还是类组件，都需要改造成箭头函数的方式