Scope 的本质是基于 HTML 和 CSS 属性选择器，即分别给 HTML 标签和 CSS 选择器添加data-v-xxx；
具体来说，它是通过 vue-loader 实现的，实现过程大致分 3 步：

```
【1】首先 vue-loader 会解析 .vue 组件，提取出template、script、style对应的代码块；
【2】然后构造组件实例，在组件实例的选项上绑定 ScopedId；
【3】最后对style的 CSS 代码进行编译转化，应用 ScopedId 生成选择器的属性 
```