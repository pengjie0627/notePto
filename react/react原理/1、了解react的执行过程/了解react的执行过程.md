### 1、看下代码
```
import React from "react";
import ReactDOM from "react-dom";

const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
);
const container = document.getElementById("root");
ReactDOM.render(element, container);

```
上述代码需要知道的几个问题：
【1】React显示的引用了，为什么没有使用？
```
在react16.x版本，ReactDOM.render会调用babel把jsx语法转换为React.createElement(),这里会使用显示引用的React
```
【2】jsx语法是如何倍解析的？
```
在react16.x版本，JSX语法会被babel库解析为React.createElement()方式，React.createElement() 方法其实就是返回了一个虚拟 DOM 对象。
```
【3】ReactDOM.render具体做了什么？
```
首先，把jsx使用babel解析为虚拟dom
然后，使用render渲染函数通过虚拟dom形成真实dom
最后，把真实dom挂在在根节点
```
【4】如何告诉 Babel 使用自己定义的 createElement 方法来编译呢？
JSX 支持使用以下注释的方式来告诉 Babel，使用指定的方法来进行编译：
```
const MyReact = {
  createElement,
  render,
};
/** @jsx MyReact.createElement */   这里是自己制定自己的方法来编译jsx
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
);
function createElement() {
  //...
}


```
### 2、react中有了React.createElement为什么还要有react/jsx-runtime？
react16.x后babel转移jsx结果：
```
import React from 'react';
const elememt = /*#__PURE__*/React.createDom("div", {
    title: "foo"
}, "hello")
```
react17.x后babel转移jsx结果：
```
import { jsx as _jsx } from "react/jsx-runtime";
const element = /*#__PURE__*/_jsx("div", {
  title: "foo",
  children: "hello"
});
```
```
【1】在React16版本及之前，应用程序通过 @babel/preset-react 将 jsx 语法转换为 React.createElement 的 js 代码，因此需要显式将 React 引入，
才能正常调用 createElement。我们可以在 Babel REPL 中看到 jsx 被 @babel/preset-react 编译后的结果
【2】React17版本之后，官方与 bbel 进行了合作，直接通过将 react/jsx-runtime 对 jsx 语法进行了新的转换而不依赖 React.createElement，
转换的结果便是可直接供 ReactDOM.render 使用的 ReactElement 对象。因此如果在React17版本后只是用 jsx 语法不使用其他的 react 提供的api，可以不引入 React，应用程序依然能够正常运行。
```
