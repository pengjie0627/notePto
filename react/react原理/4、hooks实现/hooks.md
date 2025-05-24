1、什么是react hooks?
```
Hooks 是 React 16.8 版本引入的一个新特性，旨在解决在函数组件中使用状态（state）和生命周期方法（lifecycles）等功能的限制
```
2、hooks原理?
```
React Hooks 的实现依赖于几个关键的技术点：

1、闭包和函数组件：函数组件每次渲染时都会创建一个新的执行环境，这使得Hooks能够保持状态的独立性。

2、链表结构：React内部使用一个链表来存储Hooks的状态和回调，每个Hooks调用都会在链表中增加一个节点。

3、调度和更新：当组件更新时，React会根据链表中的顺序来调用相应的Hooks，确保状态的正确更新。
```
3、常用有哪些hooks？
```
useState：用于在函数组件中添加状态。

useEffect：用于在函数组件中执行副作用操作，例如数据获取、订阅或手动更改React的DOM。

useContext：用于允许组件访问其最近的Context值。

useReducer：用于管理组件的复杂状态逻辑，类似于 Redux 的 reducer。

useCallback 和 useMemo：用于性能优化，分别用于缓存回调函数和缓存计算结果。

useRef：用于访问DOM元素或存储一个可变的引用值，不触发重新渲染。

useImperativeHandle 和 useLayoutEffect：提供更高级的用法，例如与第三方库的交互或执行同步副作用。
```