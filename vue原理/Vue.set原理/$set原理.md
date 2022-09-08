1、什么是$set或者Vue.set()?
```
    $set是vue提供的一个方法，它向响应式对象中添加一个属性，
    并确保这个新 property 同样是响应式的，且触发视图更新
```
2、为什么要有$set?
```
    Vue 无法探测普通对象属性的新增
```
3、$set什么时候使用？
```
   【1】通过数组的下标去修改数组的值,数据已经被修改了,但是不触发updated函数,视图不更新
   【2】给对象添加一个属性
```

4、$set的原理
this.$set(target, key, value)
Vue.set(target, key, value)
```
 【1】判断target是否为undefined、null、或原始类型（number/boolean/string等）
    是：抛出警告
    否：继续执行下面判断
 【2】如果不是原始类型，判断target是否为数组并且key是否是一个有效的索引
    是：使用target.splice(key, 1, val)删除索引key对应的值，然后在删除位置添加新的值，然后return终止代码的执行  
    否：继续执行下面代码
 【3】如果不是数组就是对象，先判断key是否存在于target中
    是：直接修改target中key属性的值，然后return终止代码的执行
    否：继续执行下面代码
 【4】获取target的__ob__属性
 【5】判断target是不是Vue实例并且是否为根对象实例(target.__ob__.vmCount判断是否为根实例)
    是：抛出警告，return value ,返回传入的value,终止代码的执行
    否：继续走下面的逻辑
 【6】判断刚才获取的target的__ob__是否存在
    是：说明target是一个响应式对象，直接通过defineReactive()方法在target上定义属性，
        然后手动调用__ob__.dep.notify()进行依赖更新。
    否：说明target不是一个响应式对象，直接修改他的值就可以了
    
    
```