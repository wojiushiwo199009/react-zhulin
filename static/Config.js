// cas单点登录主机
const CAS_HOST = 'http://172.16.36.112:11000'
// ajax服务主机
const AJAX_HOST = 'http://172.16.36.115:8280'

// 项目名称
const FONTEND_NAME = 'supervision-platfo-backend'
const BACKEND_NAME = 'supervision-platfo-backend'

window.CONFIG = {
  BASE_CONFIG: {
    LOGOUT_URL: CAS_HOST + '/cas/logout?service=' + CAS_HOST + ' /cas/login?service=' + CAS_HOST + '/' + FONTEND_NAME + '/',
    LOGOUT_AJAX_URL: CAS_HOST + '/' + BACKEND_NAME + '/api/logout',
    CONFIG_URL: CAS_HOST + '/portal/menuinfo.action?portal=',
    USER_ROOT_ROLE: ['root', 'ROOT', 'admin', 'ADMIN'],
    LOGIN_USER_INFO: CAS_HOST + '/' + BACKEND_NAME + '/api/loginUserInfo',
    LOGIN_USER_EXT_INFO: CAS_HOST + '/' + BACKEND_NAME + '/api/loginUserExtInfo',
    REGISTER_SERVER_2_CAS: CAS_HOST + '/' + BACKEND_NAME + '/api/registerServer2Cas'
  },
  AJAX_URL: {
    // 数据更新时间
    getDataTime: AJAX_HOST + '/IbDataTimeNew_bonc2362087s/v1.0/IbDataTimeNew_bonc2362087s'
  }
}
