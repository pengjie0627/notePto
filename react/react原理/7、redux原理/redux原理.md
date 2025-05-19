1、mobx的工作流程包括以下几个步骤？

```
Action: 一个描述发生事件的普通对象，它有一个type字段和一些可选的payload数据。

Dispatch: 在应用中分发（发送）action的过程。通常通过store.dispatch(action)实现。

Reducer: 一个纯函数，接收先前的状态和一个action作为参数，返回新的状态。

Store: 维护应用状态的容器。它可以提供getState()方法来获取当前状态，dispatch(action)方法来分发action，以及subscribe(listener)方法来注册监听器。
```

2、如何在React应用中使用Redux？
```
1、在React应用中使用Redux，通常我们会使用react-redux库，它提供了Provider和connect函数。

2、Provider 是一个容器组件，它允许我们将Redux的store传递给React组件树中的任何组件。通过在根组件上使用<Provider store={store}>，任何嵌套的组件都可以通过connect函数连接到Redux store。

3、connect 函数是一个高阶组件，它接收一个React组件，并返回一个新的组件，这个新组件将React的props和Redux的state连接起来。connect函数接受两个参数：mapStateToProps（将state映射到props）和mapDispatchToProps（将dispatch动作映射到props）。
```
3、如何在React应用中使用React Redux Hooks（如useSelector和useDispatch）？
```
1、useSelector 和 useDispatch 是React Redux提供的新Hooks，用于在函数组件中更方便地访问Redux store。

2、useSelector 允许你从store中提取特定数据片段作为组件的props。例如：const someData = useSelector(state => state.someReducer.data)。

3、useDispatch 返回一个引用dispatch方法的对象，你可以用它来分发actions。例如：const dispatch = useDispatch()，然后你可以使用dispatch(action)来分发action。
```