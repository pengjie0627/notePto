1、什么是虚拟dom（也叫vdom，虚拟dom是统称，Vnode才是具体某一个虚拟节点）?
```
    虚拟dom顾名思义就是虚拟的dom对象，它本身谁就是一个js对象。只不过，它是通过
    不同的属性去描述一个dom结构.举例：
    
    <div id="wrap" class="wrap">
        <p class="title">hello world</p>
    </div>
    
    转换成虚拟DOM(伪代码:还有其他一些属性没列举出来)如下：
    var Vnode = {
        tag: 'div',
        data: {
            attrs: {
                id: 'wrap',
                class: 'wrap'
            },
        },
        children: [
            {
                tag: 'p',
                text: 'hello world',
                data: {
                    attrs: {
                        class: 'title'
                    }
                },
                key: '',
                parent: '',
                ...
            }
        ],
        key: '',
        parent: '',
        ...
    }
    
    
    
```
2、为什么要有虚拟dom?
```
    1、频繁的操作会引起重排和重绘，这样会影响性能。使用虚拟dom可以有效减少直接操作dom
的次数，从而减少重排和重绘
    2、方便跨平台。同一个VNode节点可以渲染成不同平台上对应的内容。比如：渲染在浏览器
    中是dom节点，渲染在APP中变为对应的控件。另外vue3中允许开发者基于VNode实现自定义
    渲染器（renderer）,以便于针对不同平台进行渲染
    3、方便diff算法的实现
```
3、虚拟dom如何使用？
```
    vue中的虚拟dom主要是用于diff算法
```
4、虚拟dom如何生成？如何成为dom?
虚拟dom的生成：
```
    1、首先，parse函数接受template模板，生成抽象语法树AST
    2、其次，optimize函数遍历AST的每一个节点，进行静态节点标记（增加一个static为true的属性），目的是页面更新时，减少对这部分的对比，提升性能
    3、然后，generate函数把AST组装成code字符串
    4、最后，通过new Function的方式把code字符串转为render函数
    ```
        let code = codegen(ast);
        code = `with(this){return ${code}}`; // 就是形成_c、_v、_s、_l等方法的字符串
        let render = new Function(code); // 根据代码生成render函数
    ```
    5、render方法执行后返回的结果就是虚拟dom
```
虚拟dom生成dom：
vue中通过patch(oldVnode,vnode)方法把虚拟dom转换成真实dom，对于有子节点的则
使用递归进行创建真实dom。在这里还需要注意几个细节问题：
```
    【1】对于首次patch，oldVnode是一个真实元素，也就是通过querySelector("#app")获取的在public目录
    下index.html下id为app的div。所以我们可以通过oldVnode.nodeType来判断是不是一个真实dom元素。虚拟
    dom上是没有这个属性的。
    【2】如果oldVnode是一个真实元素elm，则通过新的虚拟节点vnode创建出真实元素newElm，然后找到真实元素的父节点
    var parentElm = elm.parentNode;，
    通过 parentElm.insertBefore(newElm, elm.nextSibling);
    把新的dom插入到真实节点的下个兄弟节点之前
    
        var elm = oldVNode; // 获取真实元素
        var parentElm = elm.parentNode; // 拿到父元素
        var newElm = createElm(vnode);
        parentElm.insertBefore(newElm, elm.nextSibling);
        parentElm.removeChild(elm); // 删除老节点
        return newElm
        
    【3】如果oldVnode为空，则代表是组件挂载，这时候直接根据新的虚拟创建真实dom,
    然后返回出新的真实dom就行了
    【4】如果oldVnode不为空也不是真实dom，那就只能是先前有老的虚拟dom了。这时候，
    就需要进iff算法进行处理了。diff算法见diff算法的总结
```

5、在diff中的作用？

 diff算法中就是通过新旧虚拟dom的对比，来实现dom的差异化更新的。