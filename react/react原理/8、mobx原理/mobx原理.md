1、mobx的工作流程包括以下几个步骤？

```
MobX 使用装饰器（如 @observable 和 @action）或API（如 makeObservable 和 makeAutoObservable）来定义可观察的状态和行为。

当这些状态改变时，MobX 会自动通知所有依赖这些状态的React组件重新渲染。
```

2、如何在React应用中使用mobx？
```
1、安装MobX和MobX React库：npm install mobx mobx-react

2、定义可观察状态：使用 @observable 或 makeObservable。

3、创建动作：使用 @action 来定义改变状态的方法。

4、在React组件中使用：通过 observer 高阶组件或 useObserver Hook来包装你的React组件，使其能够响应状态变化。
```

3、和redux对比优缺点？
```
MobX‌：
‌优点‌：上手容易，语法简洁，使用直观；适用于小型应用和快速开发；通过getter和setter自动收集组件的数据依赖关系，精确知道哪些组件需要重绘‌
‌缺点‌：生态系统不如Redux丰富；对于大型复杂应用可能不如Redux稳定和可预测‌。适合小型项目、快速开发和原型制作，或者需要灵活处理状态更新的场景

Redux‌：
‌优点‌：生态系统庞大，有丰富的中间件支持；适合大型复杂应用；状态变化可追溯、可预测，便于调试和测试‌，适合大型项目、需要严格状态管理和可预测性的场景。
‌缺点‌：学习曲线较陡峭，概念较多；数据流严格，开发效率相对较低；状态更新需要返回新的状态对象，可能导致性能问题‌
```