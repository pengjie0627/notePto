import History from './base'
export default class HashHistory extends History{
    constructor(router) { // router指的是new VueRouter()
        super(router) // 让父类也可以获取到router
        ensureSlash() // 确保首次有hash值
    }
    getCurrentLocation(){
        return getHash()
    }

    /**
     * 设置响应监听
     */
    setupListener() {
        window.addEventListener('hashchange', () => {
            this.transitionTo(getHash())
        })
    }
}

/**
 * 去掉#号
 * @returns {string}
 */
function getHash(){
    return window.location.hash.slice(1)
}

/**
 * 确保地址栏有/，因为有时候http://localhost:8080或者http://localhost:8080/这种window.location.hash是空的。
 * 必须要http://localhost:8080/#/,对于http://localhost:8080或者http://localhost:8080/设置window.location.hash='/'后，
 * 就变成了http://localhost:8080/#/
 */
function ensureSlash(){
    if (window.location.hash) {
        return
    }
    window.location.hash = '/'
}