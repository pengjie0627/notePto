在入口文件index.js中需要把严格模式去掉，因为严格模式会影响useEffect的执行时机，会执行2次
```
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    改为
    root.render(
      <App />
    );
```
