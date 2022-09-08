export default function createRouteMap(routes, oldPathList, oldPathMap){
    let pathList = oldPathList || []
    let pathMap = oldPathMap || Object.create(null)
    routes.forEach((route) => {
        addRouteRecord(route, pathList, pathMap)
    })

    return {
        pathList,
        pathMap
    }
}

/**
 * 递归构建pathList 和 pathMap
 * @param route
 * @param pathList
 * @param pathMap
 * @param parent
 */
function addRouteRecord(route, pathList, pathMap, parent){
    let path = parent ? `${parent.path}/${route.path}` : route.path
    // 这里的对象只是一个建议对象，里面可能还会有其他的一些字段，这里就不关心了
    let record = {
        path,
        component: route.component,
        parent
    }
    if (!pathMap[path]) {
        pathList.push(path)
        pathMap[path] = record
    }
    if (route.children) {
        route.children.forEach(child => {
            addRouteRecord(child, pathList, pathMap, route)
        })
    }
}