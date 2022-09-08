import createRouteMap from './create-route-map'
import {createRoute} from './history/base'
export default function createMatcher(routes){

    // 把用户传入的options.routes的树形结构转换为一个路径和组件的映射表结构
    // pathList 代表所有路径列表  ['/', '/main', '/main/user', '/main/role']
    // pathMap 代表路径和组件的映射 {'/': Login组件, '/main': Main组件, '/main/user': User组件, '/main/role': Role组件}
    let { pathList, pathMap } = createRouteMap(routes) // 初始化配置

    /**
     * 动态路由的添加方法
     */
    function addRouters() {
        createRouteMap(routes, pathList, pathMap)
    }

    /**
     * 用来匹配的方法
     * location /main/user
     */
    function match(location){
        let record = pathMap[location]
        let locale = {
            path: location
        }
        if (record) {
            // 如果匹配到了则把匹配的对象给出去
            return createRoute(record, locale)
        }
        // 如果没有匹配到，匹配的record就是null, 然后把传进来的location给出去
        return createRoute(null, locale)
    }
    return {
        match,
        addRouters
    }
}