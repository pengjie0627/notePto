1、自定义useWindowScroll
```
    /**
     * 获取滚动条举例顶部的高度
     * @returns {{height: *}}
     * @constructor
     */
    export default function UseWindowScrollHook(){
        const [height, setHeight] = useState(0)
        useEffect(() => {
            window.addEventListener('scroll', () => {
                const scrollTop = document.documentElement.scrollTop
                setHeight(scrollTop)
            })
        })
        return {height}
    }
```
2、自定义缓存同步hook
```
    import {useState, useEffect} from 'react'
    export default function UseLocalStorageHook(key, valueDefault){
        const [value, setValue] = useState(valueDefault)
        useEffect(() => {
            window.localStorage.setItem(key, value)
        },[key, value])
        return [value, setValue]
    }
    const Func = () => {
       const [value, setValue] = UseLocalStorageHook('vuex', 'default')
        setTimeout(() => {
            setValue('vuex-value')
        }, 2000)
        return (
            <>
                <div >{value}</div>
            </>
    
        )
    }
    
  
```