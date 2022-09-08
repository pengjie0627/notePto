import History from './base'
export default class H5History extends History{
    constructor(router) { // router指的是new VueRouter()
        super(router) // 让父类也可以获取到router
    }
    getCurrentLocation(){
        return getPath()
    }

    /**
     * 设置响应监听
     */
    setupListener() {
        window.addEventListener('popstate', () => {
            this.transitionTo(getPath())
        })
    }
}

/**
 * 去掉#号
 * @returns {string}
 */
function getPath(){
    return window.location.path
}
