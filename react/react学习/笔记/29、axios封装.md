```
    import Axios from 'axios'

    const http = axios.create({
        baseUrl: '/',
        timeout: 5000,
    })
    http.interceptors.request.use((config) => {
        return config
    }, (error) => {
        return Promise.reject(error)
    })
    http.interceptors.response.use((response) => {
        return response
    }, (error) => {
        return Promise.reject(error)
    })
    export {http}
```