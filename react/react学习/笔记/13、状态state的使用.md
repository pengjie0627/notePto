1、state的使用
```
    class HelloComponent extends React.Component{
        state = {
            name: '张三'
        }
        render() {
            return <div>
                {/*state取值*/}
                <div>{this.state.name}</div>
                <button onClick={this.doModifyName}>修改名称</button>
            </div>
        }
        // 这里一定要是箭头函数，否则this指代有问题
        doModifyName = () => {
            // 改变state的值，并且更新视图，只能用this.setState
            this.setState({
                name: '李四'
            })
        }
    }
    
    function App() {
        return (
            <>
                <HelloComponent></HelloComponent>
            </>
        );
    }
```

2、对于老的react不使用箭头函数的方式，需要进行this的修正，有2种方式
第一种：
```
   class HelloComponent extends React.Component{
        // 在构造体中进行修正
        constructor(){
            super()  // 这个一定要，不要会报错
            this.doModifyName = this.doModifyName.bind(this)
        }
   
        state = {
            name: '张三'
        }
        render() {
            return <div>
                {/*state取值*/}
                <div>{this.state.name}</div>
                <button onClick={this.doModifyName}>修改名称</button>
            </div>
        }
       
        doModifyName(){
            // 改变state的值，并且更新视图，只能用this.setState
            this.setState({
                name: '李四'
            })
        }
    }
    
    function App() {
        return (
            <>
                <HelloComponent></HelloComponent>
            </>
        );
    } 
```
第二种：
```
   class HelloComponent extends React.Component{
     
        state = {
            name: '张三'
        }
        render() {
            return <div>
                {/*state取值*/}
                <div>{this.state.name}</div>
                {/*这里使用箭头函数调用进行修正*/}
                <button onClick={() => this.doModifyName()}>修改名称</button>
            </div>
        }
       
        doModifyName(){
            // 改变state的值，并且更新视图，只能用this.setState
            this.setState({
                name: '李四'
            })
        }
    }
    
    function App() {
        return (
            <>
                <HelloComponent></HelloComponent>
            </>
        );
    }  
```