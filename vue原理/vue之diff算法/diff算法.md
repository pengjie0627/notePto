diff算法的核心原理是递归+双指针，具体如下：
1、判断是不是同一个虚拟节点（标签名相同，key相同），不是同一个虚拟节点，则通过新的虚拟节点创建新的dom元素，
然后替换掉老的虚拟节点中el中的dom元素.
```
    oldVNode.el.parentNode.replaceChild(el, oldVNode.el)
    上面这个代码就相当于把老的虚拟dom中的el属性（对应的是真实dom）给替换掉了
```
2、是同一个虚拟节点（标签名相同，key相同）
```
    【1】判断新旧虚拟节点是否完全一样，使用if (oldVnode === newVnode)
        完全一样：则直接return
        不完全一样：对比属性，属性该添加添加，该删除删除（也是在el上操作吗？？？）
                  自身对比完成后，接着就该对比子节点，如3介绍

```
3、自身对比完成后，需要对比子节点，分为4种情况
```
    【1】、老的虚拟节点有子节点，新的虚拟节点没子节点，则直接把老的虚拟节点的子节点的el的innerHtml给删除，
          即oldVnode.el.innerHtml = ''
    【2】、老的虚拟节点无子节点，新的虚拟节点有子节点，则通过新的虚拟节点的children创建出真实的dom元素，
          然后，把他加入到老的虚拟节点的el中：
          for (let i=0; i<newVnode.children.length;i++) {
            let dom = createElement(newVnode.children[i])
            oldVnode.el.appendChild(dom)
          }
    【3】、老的虚拟节点有子节点，新的虚拟节点也有子节点，则又分为2种情况：
         (1)、子节点都是文本节点，则用新的虚拟节点的text属性替换掉老的虚拟节点上的el.innerText,
              即oldVnode.el.innerText = newVnode.text
         (2)、子节点都不都是文本内容，则进行递归+双指针的方式去对比，对比如下：
             1):新头和旧头对比
                a:如果新头和旧头相同（标签名相同，key相同），则复用老节点，然后去对比属性，
                在老的虚拟结点对应的el上进行属性的添加与删除
                b:然后，新头和旧头指针后移+1，这时候就不再走下面几种情况，而是继续新头和旧头对比
             2):新尾和旧尾对比
                a:当新头和旧头没有命中的时候，才会走新尾与旧尾的对比
                b:如果新尾与旧尾相同（标签名相同，key相同），则复用老节点，然后去对比属性，
                在老的虚拟结点对应的el上进行属性的添加与删除
                c:然后，新尾与老尾指针前移-1,这之后就不再走下面的几种情况，而是继续重新开始新头和旧头对比
             3):新尾和旧头对比
                a:当新头和旧头对比，新尾和旧尾对比都没有命中，则进行新尾和旧头对比对比
                b:如果相同（标签名相同，key相同），
                    b-0: 复用老的虚拟结点
                    b-1: 对比属性，然后再老的虚拟结点的oldVnode.el上进行属性的添和删除
                    b-2: 旧头指向的虚拟结点的el移动到旧尾指向的虚拟结点的el之后(也就是在旧尾结点的下个兄弟结点之前插入，操作的也是el)
                    parentVnode.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibilng())
                c:新尾指针前移-1，旧头指针后移+1
                d:继续重新从第1)步新头和旧头开始
             4):旧尾和新头对比
                a:当上面3种都没有命中，则进行旧尾和新头的对比
                b:如果相同（标签名相同，key相同），
                    b-0: 复用老的虚拟结点
                    b-1: 对比属性，然后再老的虚拟结点的oldVnode.el上进行属性的添和删除
                    b-2: 旧尾指向的虚拟结点对应的el移动到旧头指向的虚拟结点的el的前面
                    parentVnode.insertBefore(oldEndVnode.el, oldStartVnode.el)
                c:旧尾指针前移-1，新头指针后移+1
                d:继续重新从第1)步新头和旧头开始
             5):上面4种（用来做优化的）如果都没命中，则在双指针当前指向的地方开始进行循环遍历对比     
             
             注意：上面双指针停止的条件，就是新头指针大于新尾指针，或者旧头指针大于旧尾指针。
             (1)当旧头指针大于旧尾指针，而新头指针还没有大于新尾指针，说明新头指针（含）和新尾指针（含）之间的
             是需要添加的。
             (2)当新头指针大于新尾指针，而旧头指针还没有大于旧尾指针，说明含旧头指针（含）和旧尾指针（含）之间的
             是需要删除的。
             
    【4】老的和新的都没有子节点，则不需要操作
```

在VUE3中，没有再采用双指针的方式了，而是采用最长递增子序列的方式。最长递增子序列是指在一个给定的序列中，找到一个尽可能长的其元素按严格递增顺序排列的子序列。需要注意的是，这里的“子序列”并不一定是连续的，即在原序列中，这些元素可能不是紧挨着的


Vue 3 和 Vue 2 在 diff 算法方面有以下主要区别：

```
【1】核心算法差异：
Vue 2 使用的是双端比较算法，通过四个指针（旧头、旧尾、新头、新尾）来遍历和比较节点。这种方法在处理列表头部或尾部的变动时效率较高，但对中间元素的插入或删除不够高效。
Vue 3 则采用了基于最长递增子序列（LIS）的优化策略，在对比子节点时找出不需要移动的元素，从而减少操作次数，特别是在处理动态列表时性能更优。
【2】静态标记与动态追踪：
Vue 3 引入了编译时优化，通过 PatchFlag 标记动态节点（例如 class、style、props等），使得在更新时可以直接跳过静态节点，只对比标记为动态变化的部分，提升了性能。
Vue 2 对于整个虚拟 DOM 树进行全量对比，即使静态内容没有改变，也会遍历所有节点。
【3】Fragment 支持：
Vue 3 支持多根节点模板（即 Fragment），在 Diff 时直接对比兄弟节点，减少了因单根节点限制而带来的额外层级嵌套开销。
Vue 2 要求每个组件模板必须有一个根节点，如果存在多个兄弟节点，则需要额外的父节点包裹，增加了不必要的 DOM 层级。
【4】事件缓存优化：
Vue 3 实现了事件缓存机制，对于静态事件监听器（如 @click="handleClick"）进行缓存，避免每次更新都重新生成事件函数，减少了不必要的 diff 对比。
Vue 2 每次更新都会重新生成事件函数，导致更多的 diff 计算。
【5】Block Tree 和 Patch Flag：
Vue 3 引入了 Block Tree 的概念，将动态节点划分为“块”，在 diff 过程中以块为单位进行更新，同时使用 PatchFlag 来标记动态节点的类型，以便快速定位和更新变化点。
Vue 2 没有这样的优化措施。
```
