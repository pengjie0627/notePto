在react中自定义配置有3种方式：
1、通过运行npm run eject来进行配置的释放
```
    【1】、该操作不可逆
    【2】、运行命令后会生成一个config目录，里面有webpack的所有配置
```
2、通过安装react-app-rewired和customize-cra这个插件进行相关的配置
```
    【1】npm install react-app-rewired customize-cra --save-dev
    【2】修改package.json的配置为
        "scripts": {
           "start": "react-app-rewired start",
           "build": "react-app-rewired build",
           "test": "react-app-rewired test --env=jsdom",
           "eject": "react-scripts eject"
        }
    【3】然后进行相关配置(试了下我觉得比较麻烦)  
```
3、使用crao库进行配置
【1】安装
```
    yarn add @craco/craco
```
【2】修改package.json配置
```
    "scripts": {
       "start": "craco start",
       "build": "craco build",
       "test": "craco test",
       "eject": "react-scripts eject"
    }
```
【3】在根目录下创建craco.config.js
```
    const path = require('path')

    module.exports = {
        webpack: {
            alias: {
                '@': path.resolve('src'),
                'cmp': path.resolve('src/cmp'),
                'pages': path.resolve('src/pages')
            },
            configure: (webpackConfig, {env,paths}) => {
                paths.appBuild = 'dist'
                webpackConfig.output = {
                    ...webpackConfig.output,
                    path: path.resolve(__dirname, 'dist'),
                    publicPath: '/'
                }
                return webpackConfig
            }
        },
        devServer: {
            port: 9000,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            proxy: {
                '/sys': {
                    target: 'http://test.ucien.com',
                    secure: false,
                    changOrigin: true,
                    logLevel: 'debug'
    
                }
            }
        }
    }
```