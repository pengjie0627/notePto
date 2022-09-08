注意：react-redux需要配合redux一起使用

1、安装react-redux
```
    npm install react-redux --save 或 yarn add react-redux
```
2、使用
react-redux主要提供了Provider组件和connect函数

Provider组件一般用于包裹在组件的最外层，通常在顶层：
```
    import store from '@/redux/store' // 通过redux创建的store
    import {Provider} from 'react-redux'
    <Provider store={store}>
        {/*<App />*/}
        <ComA></ComA>
        <ComB></ComB>
    </Provider>
);
```

connect函数主要用来连接ui组件和store：
connect(要接受数组的函数,要发送action的函数)(放入要加强的组件)
下面我们举个例子：ComA组件点击+，则ComB组件进行结果展示：
ComA组件：
```
    import React from "react";
    import {connect} from 'react-redux'
    import {INCREMENT} from "@/redux/count_constant";
    
    class ComA extends React.Component{
        doIncrement = () => {
            console.log('ComA', this.props)
            // 通过this.props拿到刚才定义的sendAction
            this.props.sendAction()
        }
        render() {
            return (
                <button onClick={this.doIncrement}>+</button>
            )
        }
    }
    
    // 这个函数要有个返回值，必须是个对象
    const mapDispatchToProps = (dispatch) => {
        return {
            sendAction: () => {
                dispatch({
                    type: INCREMENT
                })
            }
        }
    }
    // 发送方 要实现四2个参数
    export default connect(null, mapDispatchToProps)(ComA)
```
ComB组件：
```
    import React from "react";
    import {connect} from 'react-redux'
    
    class ComB extends React.Component{
        render() {
            return (
                // 直接从props中取值
                <div>{this.props.count}</div>
            )
        }
    
    }
    // 接收参数，一定要return
    const mapStateToProps = (state) => {
        return state
    }
    // 接受方，需要实现第一个参数
    export default connect(mapStateToProps, null)(ComB)
```