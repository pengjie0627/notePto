axios的功能：
1、根据不同平台发送不同请求
【1】浏览器，则创建XmlHttpRequest的ajax请求
【2】node环境，则创建http请求
2、支持promise的API
【1】返回的可以是一个promise
3、支持设置拦截器，包含请求拦截和响应拦截
4、支持转换请求数据和响应数据
5、支持取消请求
6、支持将响应结果转化为json数据
7、支持防止XSRF攻击

总结：
1、axios/axios.create创建实例
2、合并默认配置和外部传入的配置
3、调用request方法，在该方法中处理拦截器配置
4、request方法调用dispatchRequest方法
5、dispatchRequest调用adapter
6、adapter根据类型判断是调用xhrAdapter还是httpAdapter
7、获取请求结果，进行响应拦截，以及进行json转换，然后返回给客户端


axios中cancelToken的原理：
```
【1】定义有参CancelToken(executor)构造函数接受executor参数,函数内部定义变量promise并创建Promise和记录Promise中resolve的resolvePromise变量,
接着调用接收的executor参数，传递一个function出去，function内执行resolve()
 function CancelToken(executor){
    //声明一个变量
    var resolvePromise;
    //为实例对象添加属性
    this.promise = new Promise((resolve) => {
        //将 resolve 赋值给 resolvePromise
        resolvePromise = resolve
    });
    //调用 executor 函数
    executor(function(){
        //执行 resolvePromise 函数
        resolvePromise();
    });
}
【2】外部调用首先实例化一个CancelToken，此时，【1】中的executor就是function(c){cancel = c;}，executor执行后cancel=c=function(){resolvePromise()}
let cancelToken = new CancelToken(function(c){
    cancel = c;
});
【3】axios请求时配置cancelToken,如下：
axios({
    method: 'GET',
    url: 'http://localhost:3000/posts',
    //1. 添加配置对象的属性
    cancelToken: cancelToken
}).then(response => {
    console.log(response);
    //将 cancel 的值初始化
    cancel = null;
})
【4】进行axios请求的时候，判断配置了cancelToken，则可以进行取消
function xhrAdapter(config){
    //发送 AJAX 请求
    return new Promise((resolve, reject) => {
        ...
        //关于取消请求的处理
        if(config.cancelToken){
            //对 cancelToken 对象身上的 promise 对象指定成功的回调
            config.cancelToken.promise.then(() => {
                xhr.abort();
                //将整体结果设置为失败
                reject(new Error('请求已经被取消'))
            });
        }
    })
}
【5】执行cancel()进行取消，就是执行了resolve()，相当于 config.cancelToken.promise.then有了返回结果，然后就可执行xhr.abort()和reject()了
```