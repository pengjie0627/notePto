1、安装redux
```
    npm install redux redux-thunk --save 或 yarn add redux redux-thunk
```
2、创建redux目录，包含store.js和count_reducer.js(以这个举例)和count_action.js和count_constant.js
store.js
```
    import {createStore, applyMiddleware} from 'redux'
    import countReducer from "@/redex/count_reducer";
    // 引入redux-thunk，用于支持异步的action
    import thunk from 'redux-thunk'
    export default createStore(countReducer, applyMiddleware(thunk))
```
count_reducer.js(第一次调用是store自己触发的，preState为undefined，action
是一个对象{type: '@@REDUX/INIT_A.2.B.4的默认值，其中A.2.B.4是随机数})
```
    /**
     * reducer本质上是一个函数
     * @param preState 先前状态
     * @param action 动作对象
     */
    import {DECREMENT, INCREMENT} from "@/redex/count_constant";
    
    let initialSate = {
        count: 0 // 定义一个state
    }
    
    function countReducer(preState = initialSate, action){
        const {type, data} = action
        switch(type){
            case INCREMENT:
                return { count: preState + data }
            case DECREMENT:
                return { count: preState - data }
            default:
                return preState
        }
    }
    
    export default countReducer
```
count_action.js
``` 
    import {DECREMENT, INCREMENT} from "@/redex/count_constant";
    import store from "@/redex/store";
    
    // 同步action
    const createIncrementAction = data => {
        return {
            type: INCREMENT,
            data
        }
    }
    // 上面的写法等价于这个写法
    // const createIncrementAction = data => ({
    //     type: INCREMENT,
    //     data
    // })
    // 同步action
    const createDecrementAction = data=> {
        return {
            type: DECREMENT,
            data
        }
    }
    // 异步action
    const createIncrementAsyncAction = (data, time) => {
        return (dispatch) => {
            setTimeout(() => {
                // 异步action一般都会调用同步action
                dispatch(createIncrementAction(data))
            }, time)
        }
    }
    
    export {
        createIncrementAction,
        createDecrementAction,
        createIncrementAsyncAction
    }
```
count_constant.js
```
    const INCREMENT = 'increment'
    const DECREMENT = 'decrement'
    
    export {
        INCREMENT,
        DECREMENT
    }
```
3、使用
```
    // 获取状态
    store.getState().**   
    // 监听状态改变
    store.subscribe(() => {
        
    })
    // 移除监听
    store.unsubscribe(() => {
        
    })
    // 更新状态
    store.dispatch(createIncrementAction(1))
```

缺点：
```
    1.冗余代码太多, 每次使用都需要在构造函数中获取状态
    2.每次使用都需要监听和取消监听
    3.操作store的代码过于分散
```