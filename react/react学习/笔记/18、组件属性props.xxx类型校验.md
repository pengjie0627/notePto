当我们自定义组件时，有时候可能对外部出入的props.xx属性进行类型校验，
这时候我们就需要引入一个外部依赖库prop-types,安装：
yarn add prop-types 或 npm install prop-types
```
    import PropTypes from 'prop-types'
    function A(props){
        // 这里使用props.list和这里使用props.content
        return (
            <div>{props.list}{props.content}</div>
        )
    }
    A.propTypes = {
        list: PropTypes.array, // 数组类型
        content: PropsTypes.array.isRequired // 数组类型且必填
    }
```