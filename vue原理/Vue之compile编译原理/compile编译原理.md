1、首先，parse函数接受template模板，生成抽象语法树AST
2、其次，optimize函数遍历AST的每一个节点，进行静态节点标记（增加一个static为true的属性），目的是页面更新时，减少对这部分的对比，提升性能
3、然后，generate函数把AST组装成render字符串
4、最后，通过new Function加with的方式把render字符串转为render函数
```
    let code = codegen(ast);
    code = `with(this){return ${code}}`;
    let render = new Function(code); // 根据代码生成render函数
```
在这里需要注意一个语法：
```
    let obj = { a: 1 }
    with(obj) {
        console.log(a)  // 会输出1
    }
    利用这个特性：
    with(this) {
        console.log(这里就可以去取this上的属性了) 
    }
```
5、render方法执行后返回的结果就是虚拟dom