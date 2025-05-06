1、什么是BFC？
BFC是块级格式化上下文，就是形成独立的区域，内部的元素不影响外部
2、BFC的特点
【1】在BFC中，块级元素从顶端开始垂直地一个接一个的排列
【2】如果两个块级元素属于同一个BFC，它们的上下margin会重叠（或者说折叠），以较大的为准。
    但是如果两个块级元素分别在不同的BFC中，它们的上下边距就不会重叠了，而是两者之和。
【3】BFC的区域不会与浮动的元素区域重叠，也就是说不会与浮动盒子产生交集，而是紧贴浮动边缘
【4】计算BFC的高度时，浮动元素也参与计算。BFC可以包含浮动元素
【5】BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素
3、形成BFC的方式？
【1】浮动元素，float: 不是none
【2】绝对定位元素，position:不是absolute不是fixed
【3】块级元素：overflow不是visible
【4】display:inline-block
    display:inline-flex
    display:table-cell
    display:flex
    