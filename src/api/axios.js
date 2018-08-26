import axios from 'axios'

// export const axiosUrl = 'http://172.16.20.52:8080/casefile'
export const axiosUrl = 'http://localhost:21201/'
// axios.defaults.baseURL = 'http://172.16.74.105:8080' // 蔡莉娟
// axios.defaults.baseURL = 'http://172.16.74.95:8080' //谷立庆
// axios.defaults.baseURL = 'http://172.16.61.23:8080' // 杨凯
// axios.defaults.baseURL = 'http://172.16.20.52:8080/casefile'

axios.defaults.baseURL = 'http://localhost:21201/'
axios.defaults.timeout = 50000
axios.defaults.headers['Content-Type'] = 'application/json'
// 使用下边的请求头，不能跨域
// axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['Accept'] = 'application/json'
// 是否携带cookie
// axios.defaults.withCredentials = true // 貌似加上不能访问mock

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  console.log('interceptors request error')
  return Promise.reject(error)
})

// 请求响应拦截
function responseFilter (response) {
  return response
}

// 添加响应拦截器
axios.interceptors.response.use((response) => {
  // 如果是开发模式
  if (process.env.NODE_ENV === 'development') {
    return response
  } else {
    return responseFilter(response)
  }
}, function (error) {
  console.log('request response failure!')
  return Promise.reject(error)
})

export default axios
