1、安装antd
```
    yarn add antd 或者 npm install antd
```
2、在app.js中引用组件库
```
    import {Button, Input} from 'antd'
```
3、在app.css中顶部引用样式库
```
    @import '~antd/dist/antd.css';
```
4、使用
```
    class ComA extends React.Component{
        render() {
            return (
                <div>
                    <Button type="primary">测试</Button>
                    <Input></Input>
                </div>
            )
        }
    }

```