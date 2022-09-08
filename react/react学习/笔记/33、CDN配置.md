使用CDN需要把对应的依赖给externals掉
```
    webpack: {
        alias: {
            '@': path.resolve('src'),
            'cmp': path.resolve('src/cmp'),
            'pages': path.resolve('src/pages'),
            'http': path.resolve('src/http'),
            'utils': path.resolve('src/utils'),
            'store': path.resolve('src/store'),
            'mgr': path.resolve('src/mgr'),
            'assets': path.resolve('src/assets')
        },
        configure: (webpackConfig, {env,paths}) => {
            // 修改打包输出变为dist
            paths.appBuild = 'dist'
            webpackConfig.output = {
                ...webpackConfig.output,
                path: path.resolve(__dirname, 'dist'),
                publicPath: '/'
            }
            return webpackConfig
        },
        externals:{
            echarts: "echarts",
        }
    },
```