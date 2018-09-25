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
    ajax('post', '/user/password/forget', params, sucFn, errFn)
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
    ajax('post', '/user/add', params, sucFn, errFn)
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
  // 商家和管理员订单详情
  detailOrder: (params, sucFn, errFn) => {
    ajax('get', '/merchant/order/detail', params, sucFn, errFn)
  },
  // 写手详情页
  getWriterDetail: (params, sucFn, errFn) => {
    ajax('get', '/writer/order/detail', params, sucFn, errFn)
  },
  // z删除订单
  deleteOrder: (params, sucFn, errFn) => {
    ajax('post', '/merchant/order/delete', params, sucFn, errFn)
  },
  // 订单修改
  updateOrder: (params, sucFn, errFn) => {
    ajax('post', '/merchant/order/update', params, sucFn, errFn)
  },

  // 查询用户接口
  getUserInfo: (params, sucFn, errFn) => {
    ajax('get', '/user/info', params, sucFn, errFn)
  },
  // 用户信息添加/更新
  getUserAdd: (params, sucFn, errFn) => {
    ajax('post', '/user/add_message', params, sucFn, errFn)
  },
  // 图片预览
  getUserFile: (params, sucFn, errFn) => {
    ajax('get', '/user/file', params, sucFn, errFn)
  },
  // 提交支付宝图片
  getUserFileUpload: (params, sucFn, errFn) => {
    ajax('post', '/user/file/upload', params, sucFn, errFn)
  },
  // 详情页表格----------看一下
  getMerchantDetail: (params, sucFn, errFn) => {
    ajax('get', '/merchant/order/detail', params, sucFn, errFn)
  },
  // 详情页表格----------看一下
  getAdminMerchantDetail: (params, sucFn, errFn) => {
    ajax('get', '/admin/merchant/order/detail', params, sucFn, errFn)
  },
  // 管理员审核订单
  getAdminMerchantOrder: (params, sucFn, errFn) => {
    ajax('post', '/admin/merchant/order/auditing', params, sucFn, errFn)
  },
  // 商家分配给写手，写手预约订单---未调
  getWriterMerchantOrder: (params, sucFn, errFn) => {
    ajax('post', '/writer/order/appoint', params, sucFn, errFn)
  },
  // 订单分配
  getAdminMerchantOrderDistribute: (params, sucFn, errFn) => {
    ajax('post', '/admin/merchant/order/distribute', params, sucFn, errFn)
  },
  // 获取用户列表
  getWriterList: (params, sucFn, errFn) => {
    ajax('get', '/admin/merchant/order/writer_list', params, sucFn, errFn)
  },
  // 写手预约订单
  getWriterOrder: (params, sucFn, errFn) => {
    ajax('post', '/writer/order/create', params, sucFn, errFn)
  },
  // 写手在我的列表中的搜索
  SearchWriterOrder: (params, sucFn, errFn) => {
    ajax('get', '/writer/order/appoint/list', params, sucFn, errFn)
  },
  // 写手取消预约
  WriterOrderDelete: (params, sucFn, errFn) => {
    ajax('post', '/writer/order/delete', params, sucFn, errFn)
  },
  // 写手确定预约
  WriterOrderAppoint: (params, sucFn, errFn) => {
    ajax('post', '/writer/order/appoint', params, sucFn, errFn)
  },
  // 写手订单详情
  getWriterEssayList: (params, sucFn, errFn) => {
    ajax('get', '/writer/essay/list', params, sucFn, errFn)
  },
  // 写手文章详情
  getWriterEssayDetail: (params, sucFn, errFn) => {
    ajax('get', '/writer/essay/detail', params, sucFn, errFn)
  },
  // 写手创建文章
  WriterCreateEssay: (params, sucFn, errFn) => {
    ajax('post', '/writer/essay/create', params, sucFn, errFn)
  },
  // 写手文章更新
  WriterUpdateEssay: (params, sucFn, errFn) => {
    ajax('post', '/writer/essay/update', params, sucFn, errFn)
  },
  // 写手文章删除
  WriterDeleteEssay: (params, sucFn, errFn) => {
    ajax('post', '/writer/essay/delete', params, sucFn, errFn)
  },

  // 商户与写手信息列表
  AdminUserList: (params, sucFn, errFn) => {
    ajax('get', '/admin/user/list', params, sucFn, errFn)
  },
  // 商户与写手信息详情
  AdminUserDetail: (params, sucFn, errFn) => {
    ajax('get', '/admin/user/detail', params, sucFn, errFn)
  },
  // 商户与写手信息审核
  AdminUserAuditing: (params, sucFn, errFn) => {
    ajax('post', '/admin/user/auditing', params, sucFn, errFn)
  },
  // 商户与写手信息禁用
  AdminUserDelete: (params, sucFn, errFn) => {
    ajax('post', '/admin/user/delete', params, sucFn, errFn)
  },
  // 商户与写手信息启用
  AdminUserEnable: (params, sucFn, errFn) => {
    ajax('post', '/admin/user/enable', params, sucFn, errFn)
  },
  // 下载
  OrderEssayDownload: (params, sucFn, errFn) => {
    ajax('get', '/order/essay/download', params, sucFn, errFn)
  },
  // 查看图片
  getOrderPicList: (params, sucFn, errFn) => {
    ajax('get', '/order/essay/picture/list', params, sucFn, errFn)
  },

  // 显示打款金额
  getMoneyList: (params, sucFn, errFn) => {
    ajax('get', '/merchant/finance/make_money/info', params, sucFn, errFn)
  },
  // 商家确定打款
  getMakeMoney: (params, sucFn, errFn) => {
    ajax('post', '/merchant/finance/make_money', params, sucFn, errFn)
  },
  // 管理员确认商家打款
  adminFinance: (params, sucFn, errFn) => {
    ajax('post', '/admin/finance/determine', params, sucFn, errFn)
  },
  // 余额与交易信息查询
  financeRecord: (params, sucFn, errFn) => {
    ajax('get', '/finance/record/list', params, sucFn, errFn)
  },
  // 申请提现列表
  WriterCashList: (params, sucFn, errFn) => {
    ajax('get', '/writer/finance/list', params, sucFn, errFn)
  },
  // 创建申请交易
  WriterFinaceCreate: (params, sucFn, errFn) => {
    ajax('post', '/writer/finance/create', params, sucFn, errFn)
  },
  // 余额与交易信息查询
  adminFinmceMakemoney: (params, sucFn, errFn) => {
    ajax('post', '/admin/finance/make_money/writer', params, sucFn, errFn)
  },
  // 订单详情中的审核功能
  merchantOrderAuditing: (params, sucFn, errFn) => {
    ajax('post', '/merchant/order/auditing/essay', params, sucFn, errFn)
  },
  // 查询管理员下的商家与写手
  getUserMerchantList: (params, sucFn, errFn) => {
    ajax('get', '/user/merchant_list', params, sucFn, errFn)
  },
  // 把商家或者写手分配至其他管理员
  getUserUpdateAdmin: (params, sucFn, errFn) => {
    ajax('post', '/user/update_admin', params, sucFn, errFn)
  },
  // 写手订单取消时间
  getAdminMerchantOrderLimitTime: (params, sucFn, errFn) => {
    ajax('get', '/admin/merchant/order/limit_time', params, sucFn, errFn)
  },
  // 更新写手订单取消时间
  getAdminMerchantOrderTime: (params, sucFn, errFn) => {
    ajax('post', '/admin/merchant/order/time', params, sucFn, errFn)
  },
  // 商家催稿
 MerchantOrderUrge: (params, sucFn, errFn) => {
    ajax('post', '/merchant/order/urge/email', params, sucFn, errFn)
  }
}
