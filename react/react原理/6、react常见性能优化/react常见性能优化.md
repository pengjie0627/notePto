react常见性能优化：
```
1、使用React.memo和React.PureComponent
React.memo：这是一个高阶组件，它只会在组件的props改变时才会重新渲染。示例：
const Greeting = memo((props: { name: string }) => {
  console.log("greeting render");
  return <div>{`hello  ${props.name}`}</div>;
});
React.PureComponent：这个类组件类似于React.memo，它会对props和state进行浅比较，只有当这些值发生变化时才会重新渲染。示例：
import React, { PureComponent } from 'react';
class Foo extends PureComponent {
  render() {
    console.log("foo-render");
    const { num } = this.props;
    return <div>foo-{num}</div>;
  }
}

2、使用useCallback和useMemo
在函数组件中，使用useCallback和useMemo可以避免在每次渲染时都创建新的函数或计算结果。
useCallback(fn, deps)：返回一个记忆化的回调版本，只有当依赖项改变时才会更新。示例：
const handle = useCallback(() => {
    console.log("handle");
  }, [name])
useMemo(() => computation, deps)：对计算进行记忆化，只在依赖项改变时重新计算。示例：
const nameList = useMemo(() => {
    console.log("nameList render");
    let names = [];
    for (let i = 0; i < 10; i++) {
      names.push(`${i}`);
    }
    return names;
  }, [name]);

3、避免在渲染方法中创建对象或进行复杂计算。在组件的渲染方法（如render方法或函数组件的返回部分）中进行复杂的计算或创建对象会导致每次
渲染都执行这些操作，从而影响性能。最好将这些计算移到useEffect或生命周期方法中，或者在组件外部进行计算。

4、使用shouldComponentUpdate或React 16.3+的React.memo
对于类组件，可以通过实现shouldComponentUpdate(nextProps, nextState)方法来阻止不必要的更新。对于函数组件，可以使用React.memo。示例：
shouldComponentUpdate(nextProps, nextState) {
    // 比较当前的 state.count 和下一个 state.count 的值
    if (this.state.count === nextState.count) {
      // 如果相等，说明不需要重新渲染，返回 false
      return false;
    }
    // 如果不相等，说明需要重新渲染，返回 true
    return true;
}

5、列表渲染优化使用key属性为列表中的每个元素提供一个唯一的标识符。
避免在渲染方法中直接修改状态数组（如通过索引直接修改），这可能导致不必要的渲染

6、懒加载和代码分割。使用React的React.lazy和Suspense来实现代码分割，可以按需加载组件，提高应用的初始加载速度。

7、避免使用内联样式和内联函数。尽量避免在JSX中直接使用内联样式和内联函数，因为这会导致每次渲染时都重新创建对象和函数。

8、使用Fragment来减少不必要的DOM元素。使用Fragment来避免不必要的DOM元素包裹，这样可以减少DOM操作。
<React.Fragment>...</React.Fragment> // 或者使用 <></> 简写形式

9、避免不必要的Context重新渲染
Context的更新会触发所有使用该Context的组件重新渲染。可以通过使用useContext的精确值和使用React.memo来优化Context的使用。

10、使用Profiler进行性能分析。使用React的Profiler组件来测量和追踪组件的渲染性能，找出性能瓶颈。
<Profiler id="MyComponent" onRender={onRenderCallback}>
  <MyComponent />
</Profiler>
```