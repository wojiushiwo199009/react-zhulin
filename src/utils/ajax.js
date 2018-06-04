import axios from '../api/axios'

/**
 * 封装请求
 * @param method     请求类型   POST、GET
 * @param url        请求url
 * @param params     请求参数
 * @param sucFn      请求响应成功回调函数
 * @param errFn      请求响应失败回调函数
 */

export default function (method, url, params, sucFn, errFn) {
  // GET和POST请求的参数格式不一致，需改装一下
  if (method === 'get') {
    params = {
      params
    }
  }
  if (method === 'delete') {
    axios({
      method: 'delete',
      url,
      data: params
    }).then(response => { // 请求返回成功
      if (response.status === 200) {
        sucFn(response.data)
      } else {
        if (response.status >= 500) {
          // throw '后端异常！'
        } else {
          // throw '请求失败！'
        }
      }
    })
  } else {
    axios[method](url, params)
      .then(response => { // 请求返回成功
        if (response.status === 200) {
          sucFn(response.data)
        } else {
          if (response.status >= 500) {
            // throw '后端异常！'
          } else {
            // throw '请求失败！'
          }
        }
      })
    // .catch(error => {//请求返回失败
    //     errFn && errFn(error)
    //     console.log('请求返回失败!')
    //     console.log(error)
    // });
  }
}
