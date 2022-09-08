1、使用一个大括号来绑定变量和方法
```
    const name = '小杰'
    const getName = () => {
      return 18
    }
    const flag = true
    function App() {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            {name}
            {getName()}
            {flag ? '可以' : '不可以'}
          </header>
        </div>
      );
    }
```

2、jsx列表渲染
```
    const songs = [
        {id:1, name: '小猪佩奇'},
        {id:1, name: '奥特曼'},
        {id:1, name: '小羊苏溪'}
    ]

    function App() {
      return (
        <div className="App">
            <ul>
                {/*注释写法：注意下面这里外层一定要加个大括号绑定*/}
                {flag ? '可以' : '不可以'}
                {songs.map(song => <li key={song.id}>{song.name}</li>)}
            </ul>
        </div>
      );
    }
```
3、条件渲染
```
    const flag = true
    
    function App() {
      return (
        <div className="App">
            {/*如果是标签不需要加引号*/}
            {flag ? <div>成立</div> : <div>不成立</div>}
        </div>
    );
}
```