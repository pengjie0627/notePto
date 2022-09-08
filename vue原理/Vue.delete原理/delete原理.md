1、什么是$delete或者Vue.delete()?
```
    $delete是vue提供的一个方法，它向响应式对象中删除一个属性，
    并确保这个新 property 同样是响应式的，且触发视图更新
```
2、为什么要有$delete?
```
    这个方法主要用于避开 Vue 不能检测到 属性property 被删除的限制
```
3、$delete什么时候使用？
```
   【1】给对象删除一个属性
```

4、$delete的原理
this.$delete(target, property/index)
Vue.delete(target, property/index)
```
 【1】判断target是否为undefined、null、或原始类型（number/boolean/string等）
    是：抛出警告
    否：继续执行下面判断
 【2】如果不是原始类型，判断target是否为数组并且key是否是一个有效的索引
    是：使用target.splice(key, 1)删除索引key对应的值，然后在删除位置添加新的值 
    否：继续执行下面代码
 【3】获取target的__ob__属性
 【4】判断target是不是Vue实例并且是否为根对象实例(target.__ob__.vmCount判断是否为根实例)
    是：抛出警告，return value ,返回传入的value,终止代码的执行
    否：继续走下面的逻辑
 【5】不是数组就是对象，判断target中是否存在该属性，
    是：继续走下面逻辑
    否：终止代码执行
 【6】使用delete target[key]删除属性
 【5】判断刚才获取的target的__ob__是否存在
    是：说明target是一个响应式对象，然后手动调用__ob__.dep.notify()进行依赖更新。
    否：说明target不是一个响应式对象，直接return就结束了
    
    
```