1、什么是mobx？
```
    是一种状态集中管理工具，相当于vuex。同类的还有redux/dva/recoil
```
2、mobx安装
```
    npm install mobx mobx-react-lite --save
    或
    yarn add mobx mobx-react-lite
```
3、mobx使用
【1】创建一个store，比如CounterStore
```
    1、定义数据状态
    2、数据响应式处理
    3、定义action函数
    4、实例化并导出实例
    
    import {makeAutoObservable} from 'mobx'
    class CounterStore{
        // 1、定义数据
        count = 0
        constructor() {
            // 2、把数据定义为响应式
            makeAutoObservable(this)
        }
        //3、 定义action函数
        addCount = () => {
            this.count++
        }
    }
    // 4、导出
    const counterStore = new CounterStore()
    export { counterStore }
```
【2】使用刚才定义的CounterStore
```
    // 1、引入
    import { counterStore } from '../store/counter'
    // 2、导入中间件链接mobx react 完成响应式变化
    import { observer } from 'mobx-react-lite'
    function Login(){
        const doAdd = () => {
            counterStore.addCount()
        }
        return (
            <div>
                <div>CounterStore中定义的数据count={counterStore.count}</div>
                <button onClick={() => doAdd()}>自增</button>
            </div>
        )
    }
    // 3、包裹函数名称
    export default observer(Login)
```
4、mobx计算属性computed
```
    // 定义
    import {makeAutoObservable} from 'mobx'
    class CounterStore{
        list = [1,2,3,4,5,6]
        // 定义数据
        count = 0
        constructor() {
            // 把数据定义为响应式
            makeAutoObservable(this)
        }
        // 定义action函数
        addCount = () => {
            this.count++
        }
        // 定义action函数
        addList = () => {
            this.list.push(7,8,9)
        }
    
        // 定义计算属性
        get filterList() {
            return this.list.filter(item => item > 2)
        }
    }
    // 导出
    const counterStore = new CounterStore()
    export { counterStore }
    
    
    // 使用
    // 1、引入
    import { counterStore } from '../store/counter'
    // 2、导入中间件链接mobx react 完成响应式变化
    import { observer } from 'mobx-react-lite'
    function Login(){
        const doAdd = () => {
            counterStore.addList()
        }
        return (
            <div>
                <div>CounterStore中定义的数据list={counterStore.filterList}</div>
                <button onClick={() => doAdd()}>自增</button>
            </div>
        )
    }
    // 3、包裹函数名称
    export default observer(Login)
```
5、mobx模块化
比如现在我们有2个各自模块的store,分别为CounterStore和ListStore,另外需要新建一个index.js
CounterStore.js
```
    import {makeAutoObservable} from 'mobx'
    class CounterStore{
        list = [1,2,3,4,5,6]
        // 定义数据
        count = 0
        constructor() {
            // 把数据定义为响应式
            makeAutoObservable(this)
        }
        // 定义action函数
        addCount = () => {
            this.count++
        }
        // 定义action函数
        addList = () => {
            this.list.push(7,8,9)
        }
    
        // 定义计算属性
        get filterList() {
            return this.list.filter(item => item > 2)
        }
    }
    // 导出
    
    export { CounterStore }
```
ListStore.js
```
    import {makeAutoObservable} from 'mobx'
    class ListStore{
        list = [1,2,3,4,5,6]
        // 定义数据
        count = 0
        constructor() {
            // 把数据定义为响应式
            makeAutoObservable(this)
        }
        // 定义action函数
        addCount = () => {
            this.count++
        }
        // 定义action函数
        addList = () => {
            this.list.push(5,6,7)
        }
    
        // 定义计算属性
        get filterList() {
            return this.list.filter(item => item > 4)
        }
    }
    // 导出
    
    export { ListStore }
```
index.js
```
    import React from 'react'
    import { ListStore } from './list-store'
    import { CounterStore } from './counter-store'
    class RootStore{
        constructor() {
            this.listStore = new ListStore()
            this.counterStore = new CounterStore()
        }
    }
    
    // 样板代码
    const rootStore = new RootStore()
    const context = React.createContext(rootStore)
    const useStore = () => {
        return React.useContext(context)
    }
    export {useStore}
```

使用:
```
    // 1、引入
    import { useStore } from "../store";
    // 2、导入中间件链接mobx react 完成响应式变化
    import { observer } from 'mobx-react-lite'
    function Login(){
        const rootStore = useStore()
        const doAddCounterStore = () => {
            rootStore.counterStore.addList()
        }
        const doAddListStore = () => {
            rootStore.listStore.addList()
        }
        return (
            <div>
                <div>CounterStore中定义的数据list={rootStore.counterStore.filterList}</div>
                <div>ListStore中定义的数据list={rootStore.listStore.filterList}</div>
                <button onClick={() => doAddCounterStore()}>counterStore添加</button>
                <button onClick={() => doAddListStore()}>listStore添加</button>
            </div>
        )
    }
    // 3、包裹函数名称（为了数据变化后，自动更新组件渲染）
    export default observer(Login)
```