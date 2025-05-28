1、在react16开始，渲染流程分为render阶段和commit阶段：

```
render阶段：从vdom转换成 fiber（这个过程叫做协调Reconciler，这个过程是可以打断的，由调度scheduler调度执行），并且对需要 dom 操作的节点打上 effectTag 的标记
commit阶段：对有 effectTag 标记的 fiber 节点进行 dom 操作，并执行所有的effect副作用函数
```

2、diff算法流程：
```
【1】第一次渲染的时候，不进行diff，而是直接将vdom转成Fiber，在内存中构workInProgressFiber 树，构建完成之后用它来替换currenFiber，再去通知渲染器进行渲染。
【2】后续更新渲染时，会将生成的VDOM和旧的Fiber进行对比（同层比较），决定生成怎样的新的Fiber（就是能复用的复用，多余的删除，新增的新增）。完成之后对新生成的Fiber再进行DOM操作
```