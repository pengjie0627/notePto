1、属性选择器
```
    E:nth-child(n) 选择器匹配其父元素的第n个子元素，不论元素类型，n可以使数字，关键字，或公式
    E:nth-of-type(n) 选择与之其匹配的父元素的第N个子元素
    E:frist-child 相对于父级做参考，“所有”子元素的第一个子元素，并且“位置”要对应
    E：frist-of-type 相对于父级做参考，“特定类型”（E）的第一个子元素
    E：empty 选择没有子元素的每个E元素
    E:target 选择当前活动的E元素
    ::selection 选择被用户选取的元素部分
```
2、文本样式属性
```
text-shadow:2px 2px 8px #000;参数1为向右的偏移量，参数2为向左的偏移量，参数3为渐变的像素，参数4为渐变的颜色
text-overflow:规定当文本溢出包含元素时发生的事情 text-overflow:ellipsis(省略)
text-wrap:规定文本换行的规则
word-break 规定非中日韩文本的换行规则
word-wrap 对长的不可分割的单词进行分割并换行到下一行
white-space: 规定如何处理元素中的空白 white-space:nowrap 规定段落中的文本不进行换行
```
3、边框样式属性
```
border-raduis:50%边框的圆角
border-image 边框图片
.border-image {
    border-image-source:url(images/border.png);
}
```
4、背景设置rgba
5、渐变色
```
linear-gradient:background-image:linear-gradient(90deg,yellow 20%,green 80%)
radial-gradient:background-iamge:radial-gradient(120px at center center,yellow,green)
```
6、多列布局
```
column-count
column-width
column-gap
column-rule
```
7、过度transition
8、动画animation 通常要和@keyframe配合使用
9、旋转transform
10、flex布局
11、@medeia媒体查询


总结：（方便记忆）
属背动弹多
边渐文过媒

