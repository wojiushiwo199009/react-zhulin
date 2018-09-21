import axios from 'axios'
import Cookies from 'js-cookie'
import { message } from 'antd'
// export const axiosUrl = 'http://172.16.20.52:8080/casefile'
export const axiosUrl = '132.232.177.22/zhulin'
// export const axiosUrl = 'http://www.sso.hlvan.cn:21200'
// axios.defaults.baseURL = 'http://172.16.74.105:8080' // 蔡莉娟
// axios.defaults.baseURL = 'http://172.16.74.95:8080' //谷立庆
// axios.defaults.baseURL = 'http://172.16.61.23:8080' // 杨凯
// axios.defaults.baseURL = 'http://172.16.20.52:8080/casefile'

axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.withCredentials = true

// axios.defaults.baseURL = 'http://www.sso.hlvan.cn:21200'
axios.defaults.baseURL = 'http://132.232.177.22/zhulin'
axios.defaults.timeout = 50000
axios.defaults.headers['Content-Type'] = 'application/json'
// 使用下边的请求头，不能跨域
// axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['Accept'] = 'application/json,text/plain,*/*'
// axios.defaults.headers['Accept'] = 'application/x-www-form-urlencoded'
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
  console.log(response, 'response')
  console.log(Cookies.get('JSESSIONID'), 'cookie')

  // 如果是开发模式
  if (process.env.NODE_ENV === 'development') {
    return response
  } else {
    return responseFilter(response)
  }
}, function (error) {
  console.log('err:', error, error.response) // for debug
  if (error.response) {
    let errorMsg = error.message
    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
    /* console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers); */
    if (error.response.status === 401) {
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
      message.error(errorMsg || '登陆超时，请重新登陆')
      location.href = '/'
    } else {
      message.error(errorMsg)
    }
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message)
    if (error.message === 'CancelToken') {
    } else {
      message.error('连接超时，请稍后重试')
    }
  }
  /* console.log(error.config); */

  return Promise.reject(error)
})

export default axios
