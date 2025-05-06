1、什么是nextTick？
nextTick是一个获取dom更新后的一个vue方法

2、为什么要有nextTick?
由于vue采用的是异步组件更新的策略，数据的变化并不会立即更新dom，
而是开启一个队列，把组件更新函数保存在队列中，在同一事件循环中发生的
所有数据变更会异步的批量更新。这一策略导致我们对数据的修改不会立刻体现
在dom上，此时如果想要获取更新后的dom状态，则需要使用nextTick

2、nextTick在什么时候使用？
【1】在created中想要获取dom时
【2】响应时数据变化后获取dom更新后的状态，比如希望获取到列表更新后的高度

3、nextTick原理是什么?
【1】nextTick方法内部创建一个数组callbacks
【2】把通过nextTick传进来的回调函数cb包装成一个新的函数，新函数内部通过call调用.
如果没有回调函数也会包装一个新的函数，新函数内部判断是否支持Promise，如果支持Promise,直接返回成功的Promise
```
callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
```
【3】nextTick方法外部定义一个pending变量，默认为false，当nextTick方法第一次调用时
会把pending变为true,这样做的目的就是对于有多个nextTick，只使用callbacks收集回调函数即可。
然后执行timeFunc
```
    if (!pending) {
        pending = true
        timerFunc()
    }
```
这里的timeFunc是在next-tick.js加载执行后就定义好的，规则如下：
```
    (1)首先，判断浏览器是否支持Promise，如果支持Promise，则把timeFunc包装成
    一个函数，函数内部通过promise.then(flushCallbacks)来调用刷新回调的方法
    flushCallbacks，代码如下：
    if (typeof Promise !== 'undefined' && isNative(Promise)) {
      const p = Promise.resolve()
      timerFunc = () => {
        p.then(flushCallbacks)
        // ios有bug 兼容ios
        if (isIOS) setTimeout(noop)
      }
      isUsingMicroTask = true
    }
    (2)其次，如果浏览器不支持Promise，判断浏览器是否支持MutationObserver，
    如果支持，则把timeFunc包装成一个函数，函数内部通过监听一个变量counter的变化，
    来触发MutationObserver的flushCallbacks，代码如下：
      let counter = 1
      const observer = new MutationObserver(flushCallbacks)
      const textNode = document.createTextNode(String(counter))
      observer.observe(textNode, {
        characterData: true
      })
      timerFunc = () => {
        counter = (counter + 1) % 2
        textNode.data = String(counter)
      }
      isUsingMicroTask = true
      
    (3)然后，如果浏览器不支持MutationObserver，判断是否支持setImmediate，如果支持，
    就把timeFunc包装成一个函数，函数内部通过setImmediate(flushCallbacks)调用flushCallbacks，
    代码如下：
         timerFunc = () => {
            setImmediate(flushCallbacks)
         }
         
    (4)最后，如果浏览器不支持setImmediate，则使用setTimeout,则把timeFunc封装成一个函数，
    函数内部通过setTimeout(flushCallbacks)调用flushCallbacks，代码如下：
      timerFunc = () => {
        setTimeout(flushCallbacks, 0)
      }
    
```
上面的flushCallbacks其实就是对之前callbacks收集的回调函数进行遍历调用，代码如下：
```
    function flushCallbacks () {
        pending = false
        const copies = callbacks.slice(0)
        callbacks.length = 0
        for (let i = 0; i < copies.length; i++) {
        copies[i]()
    }
```

4、由于浏览器的运行机制，Promise和MutationObserver会被加入到微任务队列，
setImmediate和setTimeout会被加入到宏任务队列。无论是微任务还是宏任务，
都会在代码最后执行。只不过微任务比宏任务有着更高的优先级。这样，就保证了dom
的更新。

