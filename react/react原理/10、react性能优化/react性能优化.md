react性能优化主要有以下三方面：
1、复用组件
```
【1】利用key来复用组件
```
2、避免不必要的组件更新
```
【1】使用memo:允许组件在 props 没有改变的情况下跳过重新渲染,基本使用示例：
const Greeting = memo((props: { name: string }) => {
  console.log("greeting render");
  return <div>{`hello  ${props.name}`}</div>;
});
【2】shouldComponentUpdate：生命周期方法，基本使用示例：
shouldComponentUpdate(nextProps, nextState) {
    // 比较当前的 state.count 和下一个 state.count 的值
    if (this.state.count === nextState.count) {
      // 如果相等，说明不需要重新渲染，返回 false
      return false;
    }
    // 如果不相等，说明需要重新渲染，返回 true
    return true;
  }
【3】pureComponnet，如果组件的props或state是简单类型（如string、number、boolean等），或者是浅层嵌套的对象数组，PureComponent的性能优化非常有效。它会对props和state进行浅比较，如果值没有变化，组件就不会重新渲染‌，基本使用示例：
import React, { PureComponent } from 'react';
class Foo extends PureComponent {
  render() {
    console.log("foo-render");
    const { num } = this.props;
    return <div>foo-{num}</div>;
  }
}

```
3、缓存策略/减少更新
```
【1】useMemo:会缓存计算结果，当依赖项没有改变时不会重新执行计算函数，基本使用示例(需要依赖项，依赖项为name)
const nameList = useMemo(() => {
    console.log("nameList render");
    let names = [];
    for (let i = 0; i < 10; i++) {
      names.push(`${i}`);
    }
    return names;
  }, [name]);
【2】useCallback:当依赖项没有发生改变时不会触发子组件渲染，基本使用示例(需要依赖项，依赖项为name)
const handle = useCallback(() => {
    console.log("handle");
  }, [name])
```