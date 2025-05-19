1、原理
```
1、监听 URL 变化：路由器组件（如 <BrowserRouter>）通过浏览器的 History API 或 hashchange 事件监听 URL 的变化。

2、路径匹配：当 URL 变化时，路由器会遍历所有 <Route> 组件，查找与当前 URL 匹配的路径。

3、渲染组件：一旦找到匹配的路径，React Router 会渲染与该路径相关联的组件。
```
