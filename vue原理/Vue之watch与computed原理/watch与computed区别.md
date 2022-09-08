watch原理：
```
1、通过options传递watch
2、new Watcher()
3、获取一下watch监听的属性会触发get方法，从而收集依赖，建立依赖关系
4、下一个属性更新时，直接更新依赖
```
computed原理：
```
1、通过options传递computed
2、new Watcher()
3、在Watcher实例上添加dirty=true的属性标记
4、重写computed的get方法
5、执行一下重写的get方法，并在当前Watcher实例中记录当前get执行的结果。这样会获取get方法中的属性值，从而收集依赖，建立依赖关系
6、下次获取计算属性的值时，如果dirty=true代表依赖的属性没有变化，直接返回实例上记录的值。
7、当依赖的属性变化时，会把dirty=false，当下次获取计算属性的值时，会重新计算，计算完后会把dirty=true
```
watch与computed区别：
1、watch默认不会执行（配置immediate:true才会默认执行），computed默认会执行
2、computed有缓存，而watch没有缓存
3、computed需要有返回值，而watch不需要
4、computed使用场景适合一个属性受多个属性影响的时候使用，而watch是监听某一个属性变化时使用
