1、安装react-router-dom
```
    npm install react-router-dom --save
    或
    yarn add react-router-dom
```
2、使用
hash模式
```
    import {HashRouter, Route, Routes} from 'react-router-dom'
    <HashRouter>
        <Routes>
            {/*指定对应的path跳转到指定的组件path和element成对出现*/}
            <Route path='/user' element={<User></User>}></Route>
            <Route path='/role' element={<Role></Role>}></Route>
        </Routes>
    </HashRouter>
     
```
history模式
```
    import {HashRouter, Route, Routes} from 'react-router-dom'
    <BrowserRouter>
        <Routes>
            {/*指定对应的path跳转到指定的组件path和element成对出现*/}
            <Route path='/user' element={<User></User>}></Route>
            <Route path='/role' element={<Role></Role>}></Route>
        </Routes>
    </HashRouter>
     
```
3、跳转
```
    import React from 'react'
    import {useNavigate} from 'react-router-dom'
    export default function LeftNav() {
        // useNavigate只能用在函数组件中，在类组件中会报错
        // useNavigate() 不能放在方法中
        const navigator = useNavigate()
        const doGoUser = () => {
            navigator('/user') // 相当于vue中push的方式
        }
        const doGoRole = () => {
            navigator('/role', {replace: true}) // 相当于vue中replace方式
        }
        return (
            <div style={{width: '200px',background: 'green'}}>
                <div onClick={() => doGoUser()}>用户</div>
                <div onClick={() => doGoRole()}>角色</div>
            </div>
        )
    }
```

4、传参和取参
searchParams方式传参
```
    // 传参
    import {useNavigate} from 'react-router-dom'
    const navigator = useNavigate()
    navigator('/user?id=1')
    // 取参
    import {useSearchParams} from 'react-router-dom'
    let [params] = useSearchParams()
    let id = params.get('id')
```

params方式传参
```
    // 传参
    import {useNavigate} from 'react-router-dom'
    const navigator = useNavigate()
    navigator('/user/1')
    // 取参
    import {useParams} from 'react-router-dom'
    let params = useParams()
    let id = params.id
    // 注意，这种方式需要在下面这里进行配置:id
    <Route path='/user:id' element={<User></User>}></Route>
```
5、嵌套路由
配置
```
    import {HashRouter, Route, Routes, Navigate} from 'react-router-dom'
    import Role from "./pages/Role";
    import User from "./pages/User";
    import Login from "./pages/Login";
    import Main from "./pages/Main";
    import NotFind from "./pages/404";
    <HashRouter>
        <Routes>
            {/*输入/会重定向到login登录界面*/}
            <Route path='/' element={<Navigate to='/login'></Navigate>}></Route>
            {/*登录界面*/}
            <Route path='/login' element={<Login></Login>}></Route>
            {/*设置嵌套路由*/}
            <Route path='/main' element={<Main></Main>}>
                {/*二级路由，path不能加斜杠/*/}
                <Route path='user' element={<User></User>}></Route>
                <Route path='role' element={<Role></Role>}></Route>
                {/*去掉path换成index代表默认渲染的二级路由*/}
                {/*<Route index element={<Role></Role>}></Route>*/}
            </Route>
            {/*404界面*/}
            <Route path='*' element={<NotFind></NotFind>}></Route>
        </Routes>

    </HashRouter>
```
跳转使用
```
    import {useNavigate} from 'react-router-dom'
    export default function Login(){
        const navigate = useNavigate()
        const doLogin = () => {
            navigate('/main/user')
        }
        return (
            <div>
                <button onClick={() => doLogin()}>登录</button>
            </div>
        )
    }
```