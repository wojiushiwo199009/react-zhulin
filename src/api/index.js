// import axios from './axios'

// const ajaxUrl = window.CONFIG.AJAX_URL

// export {
//   axios,
//   ajaxUrl
// }
import ajax from '../utils/ajax'

export default {
  getNews: (params, sucFn, errFn) => {
    ajax('get', '/getNews', {}, sucFn, errFn)
  },

  // 注册
  regist: (params, sucFn, errFn) => {
    ajax('post', '/user/register', params, sucFn, errFn)
  },
  // 登陆
  login: (params, sucFn, errFn) => {
    ajax('post', '/user/sign_in', params, sucFn, errFn)
  },
  // 获取验证码
  getCaptcha: (params, sucFn, errFn) => {
    ajax('post', '/user/send_code', params, sucFn, errFn)
  },
  // 忘记密码中的获取验证码
  forgetPassword: (params, sucFn, errFn) => {
    ajax('post', '/password/forget', params, sucFn, errFn)
  },
  // 忘记密码中的重置密码
  resetPassword: (params, sucFn, errFn) => {
    ajax('post', '/user/reset', params, sucFn, errFn)
  },
  // 登出
  logout: (params, sucFn, errFn) => {
    ajax('post', '/user/sign_out', {}, sucFn, errFn)
  },
  // 管理员添加
  addUser: (params, sucFn, errFn) => {
    ajax('post', '/user/add', {}, sucFn, errFn)
  },
  // 管理员查询
  getUserList: (params, sucFn, errFn) => {
    ajax('get', '/user/list', params, sucFn, errFn)
  },
  // 管理员删除
  deleteUser: (params, sucFn, errFn) => {
    ajax('post', '/user/delete', params, sucFn, errFn)
  },
  // 管理员更新
  updateUser: (params, sucFn, errFn) => {
    ajax('post', '/user/update', params, sucFn, errFn)
  },
  // 发布订单
  publicOrder: (params, sucFn, errFn) => {
    ajax('post', '/merchant/order/create', params, sucFn, errFn)
  },
  // 订单查询
  getOrder: (params, sucFn, errFn) => {
    ajax('get', '/merchant/order/list', params, sucFn, errFn)
  },
  // 订单详情
  detailOrder: (params, sucFn, errFn) => {
    ajax('get', '/merchant/order/detail', params, sucFn, errFn)
  },
  // z删除订单
  deleteOrder: (params, sucFn, errFn) => {
    ajax('post', '/merchant/order/delete', params, sucFn, errFn)
  },
  // 订单修改
  updateOrder: (params, sucFn, errFn) => {
    ajax('post', '/merchant/order/update', params, sucFn, errFn)
  }
}
