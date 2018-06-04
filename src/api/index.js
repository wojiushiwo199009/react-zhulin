// import axios from './axios'

// const ajaxUrl = window.CONFIG.AJAX_URL

// export {
//   axios,
//   ajaxUrl
// }
import ajax from '../utils/ajax'

export default {

  // 例子
  getNews: (params, sucFn, errFn) => {
    ajax('get', '/getNews', {}, sucFn, errFn)
  },
  //  派出所查缉打击接口
  searchHonorList: (params, sucFn, errFn) => {
    ajax('get', '/searchHonorList', {}, sucFn, errFn)
  },
  searchCaseCount: (params, sucFn, errFn) => {
    ajax('get', '/searchCaseCount', {}, sucFn, errFn)
  },
  searchCaseInfo: (params, sucFn, errFn) => {
    ajax('get', '/searchCaseInfo', {}, sucFn, errFn)
  },
  searchCaseList: (params, sucFn, errFn) => {
    ajax('get', '/searchCaseList', params, sucFn, errFn)
  },
  // 派出所待提交档案接口
  // 案件详情
  getsearchPendingCaseFiles: (params, sucFn, errFn) => {
    ajax('post', '/searchPendingCaseFiles', params, sucFn, errFn)
  },
  // 填写一案一档一键生成文件接口
  searchCaseFile: (params, sucFn, errFn) => {
    ajax('get', '/searchCaseFile', params, sucFn, errFn)
  },
  // 填写一案一档暂存接口
  tempSaveCaseFile: (params, sucFn, errFn) => {
    ajax('post', '/tempSaveCaseFile', params, sucFn, errFn)
  },
  // 待提交档案的编辑提交
  modifyPendingCaseFile: (params, sucFn, errFn) => {
    ajax('post', '/modifyPendingCaseFile', params, sucFn, errFn)
  },
  // 待提交页面照片删除接口
  deleteCaseImg: (params, sucFn, errFn) => {
    ajax('get', '/deleteCaseImg', params, sucFn, errFn)
  },
  // 派出所嫌疑人接口
  // 嫌疑人省接口
  searchAddressById: (params, sucFn, errFn) => {
    ajax('get', '/searchAddressById', params, sucFn, errFn)
  },
  // 查询嫌疑人列表接口
  searchSuspectList: (params, sucFn, errFn) => {
    ajax('get', '/searchSuspectList', params, sucFn, errFn)
  },
  // 查询已抓获嫌疑人详情/查询嫌疑人图片
  searchArrestSuspectInfo: (params, sucFn, errFn) => {
    ajax('get', '/searchArrestSuspectInfo', params, sucFn, errFn)
  },
  // 查询未抓获嫌疑人详情
  searchUnarrestSuspectInfo: (params, sucFn, errFn) => {
    ajax('get', '/searchUnarrestSuspectInfo', params, sucFn, errFn)
  },
  // 统计嫌疑人数量
  statisticsSuspectCount: (params, sucFn, errFn) => {
    ajax('get', '/statisticsSuspectCount', params, sucFn, errFn)
  },
  // 统计嫌疑人户籍
  statisticsSuspectAddress: (params, sucFn, errFn) => {
    ajax('get', '/statisticsSuspectAddress', {}, sucFn, errFn)
  },
  // 统计嫌疑人作案工具
  statisticsSuspectTools: (params, sucFn, errFn) => {
    ajax('get', '/statisticsSuspectTools', {}, sucFn, errFn)
  },
  // 统计嫌疑人年龄分布
  statisticsSuspectAge: (params, sucFn, errFn) => {
    ajax('get', '/statisticsSuspectAge', {}, sucFn, errFn)
  },
  // 根据嫌疑人查询案件
  searchCaseForSuspect: (params, sucFn, errFn) => {
    ajax('get', '/searchCaseForSuspect', params, sucFn, errFn)
  },
  //  // 根据嫌疑人关系图谱
  searchSuspectRelationImg: (params, sucFn, errFn) => {
    ajax('get', '/searchSuspectRelationImg', params, sucFn, errFn)
  },
  /**
   * 派出所警情速递页面接口
   */
  // 统计派出所(分局)警情
  getStatisticsPoliceStationAlarm: (params, sucFn, errFn) => {
    ajax('get', '/statisticsPoliceStationAlarm', params, sucFn, errFn)
  },
  // 查询退回整改档案
  getSearchReturnFiles: (params, sucFn, errFn) => {
    ajax('get', '/searchReturnFiles', {}, sucFn, errFn)
  },
  // 查询待提交档案
  getSearchFilesToBeSubmitted: (params, sucFn, errFn) => {
    ajax('get', '/searchFilesToBeSubmitted', {}, sucFn, errFn)
  },
  // 查询派出所所有案件及分布
  getSearchPoliceStationCases: (params, sucFn, errFn) => {
    ajax('get', '/searchPoliceStationCases', params, sucFn, errFn)
  },
  // 派出所边界
  getSearchPoliceDistribution: (params, sucFn, errFn) => {
    ajax('get', '/searchPoliceDistribution', {}, sucFn, errFn)
  },

  /**
   * 一案一档查看
  */
  // 一案一档查看
  searchCasePdf: (params, sucFn, errFn) => {
    ajax('get', '/searchCasePdf', params, sucFn, errFn)
  },
  // 一案一档退回
  searchOwnerInfo: (params, sucFn, errFn) => {
    ajax('get', '/searchOwnerInfo', params, sucFn, errFn)
  },
  // 查看车辆轨迹
  searchTrajectory: (params, sucFn, errFn) => {
    ajax('get', '/searchTrajectory', params, sucFn, errFn)
  },
  // 查看车辆失踪点及逃窜轨迹
  searchDisappearPoint: (params, sucFn, errFn) => {
    ajax('get', '/searchDisappearPoint', params, sucFn, errFn)
  },
  // 查看本案的嫌疑人信息
  searchVictim: (params, sucFn, errFn) => {
    ajax('get', '/searchVictim', params, sucFn, errFn)
  },
  /**
  *分局查缉打击页面接口
  */
  // 查询关荣榜列表
  // searchHonorList: (params, sucFn, errFn) => {
  //   ajax('get', '/searchHonorList', {}, sucFn, errFn)
  // },
  // // 统计案件数量
  // searchCaseCount: (params, sucFn, errFn) => {
  //   ajax('get', '/searchCaseCount', {}, sucFn, errFn)
  // },
  // 查询分局下属派出所查缉情况
  searchFJCaseInfo: (params, sucFn, errFn) => {
    ajax('get', '/searchFJCaseInfo', {}, sucFn, errFn)
  },
  // 查询各分局查缉情况
  searchEveryFJCaseInfo: (params, sucFn, errFn) => {
    ajax('get', '/searchEveryFJCaseInfo', params, sucFn, errFn)
  },
  // 查缉打击页面的下载请求
  exportInvestigationExcel: (params, sucFn, errFn) => {
    ajax('get', '/exportInvestigationExcel', {}, sucFn, errFn)
  },
  // 查缉打击页面的上传文档请求
  upload: (params, sucFn, errFn) => {
    ajax('post', '/uploadExcelDoc', params, sucFn, errFn)
  },
  /**
   * 分局消息页面接口
   */
  searchFJMessageList: (params, sucFn, errFn) => {
    ajax('get', '/searchFJMessageList', params, sucFn, errFn)
  },
  /**
   * 派出所消息页面接口
   */
  searchMessageList: (params, sucFn, errFn) => {
    ajax('get', '/searchMessageList', params, sucFn, errFn)
  },
  // 消息的数字
  searchMessageCount: (params, sucFn, errFn) => {
    ajax('get', '/searchMessageCount', {}, sucFn, errFn)
  },
  /**
   * 分局警情速递页面接口
   */
  // 统计各分局发案总数
  getStatisticsBranchOfficeCase: (params, sucFn, errFn) => {
    ajax('get', '/statisticsBranchOfficeCase', {}, sucFn, errFn)
  },
  // 统计分局下所有派出所的案件数量
  getStatisticsPoliceStationCase: (params, sucFn, errFn) => {
    ajax('get', '/statisticsPoliceStationCase', {}, sucFn, errFn)
  },
  // 统计分局下属派出所发案数量及分布(地图)
  getStatisticsSubbureauCaseDistribution: (params, sucFn, errFn) => {
    ajax('get', '/statisticsSubbureauCaseDistribution', {}, sucFn, errFn)
  },

  /**
   * 派出所标签安装页面接口
   */

  // 查询安装数据截止日期
  getSearchCloseTime: (params, sucFn, errFn) => {
    ajax('get', '/searchCloseTime', {}, sucFn, errFn)
  },
  // 统计派出所安装数据
  getStatisticsInstallData: (params, sucFn, errFn) => {
    ajax('get', '/statisticsInstallData', params, sucFn, errFn)
  },
  // 统计派出所硬件数据
  getStatisticsHardwareData: (params, sucFn, errFn) => {
    ajax('get', '/statisticsHardwareData', {}, sucFn, errFn)
  },
  /**
   * 分局标签安装页面接口
   */
  // 统计物联网案件数量
  getStatisticsInternetCase: (params, sucFn, errFn) => {
    ajax('get', '/statisticsInternetCase', {}, sucFn, errFn)
  },

  // 统计各个分局的安装数据
  getStatisticsBranchOfficeInstallData: (params, sucFn, errFn) => {
    ajax('get', '/statisticsBranchOfficeInstallData', params, sucFn, errFn)
  },
  // 统计各分局下各个派出所的安装数据
  getStatisticsPoliceStationInstallData: (params, sucFn, errFn) => {
    ajax('get', '/statisticsPoliceStationInstallData', params, sucFn, errFn)
  },
  // 统计同一时间段不同分局的硬件安装数据
  getStatisticsSubbureauHardwareData: (params, sucFn, errFn) => {
    ajax('get', '/statisticsSubbureauHardwareData', params, sucFn, errFn)
  },
  // 查询短信模板
  getSearchSMSTemplateList: (params, sucFn, errFn) => {
    ajax('get', '/searchSMSTemplateList', {}, sucFn, errFn)
  },
  // 添加短信模板
  getAddSMSTemplate: (params, sucFn, errFn) => {
    ajax('get', '/addSMSTemplate', params, sucFn, errFn)
  },
  // 发送验证码
  getSendVerificationCode: (params, sucFn, errFn) => {
    ajax('get', '/sendVerificationCode', params, sucFn, errFn)
  },
  sendSMS: (params, sucFn, errFn) => {
    ajax('get', '/sendSMS', params, sucFn, errFn)
  },
  // 查看短信发送记录
  getSearchSMSLogList: (params, sucFn, errFn) => {
    ajax('get', '/searchSMSLogList', params, sucFn, errFn)
  },
  /**
   * 短信再次发送
   */
  // 再次发送按钮
  sendSecondVerificationCode: (params, sucFn, errFn) => {
    ajax('get', '/sendSecondVerificationCode', params, sucFn, errFn)
  },
  // 再次发送短信中的确定按钮
  sendSecondSMS: (params, sucFn, errFn) => {
    ajax('get', '/sendSecondSMS', params, sucFn, errFn)
  },
  /**
 * 分局一案一档管理接口
 */
  // 上报派出所列表
  getSearchPoliceInfoByPid: (params, sucFn, errFn) => {
    ajax('get', '/searchPoliceInfoByPid', {}, sucFn, errFn)
  },
  // 查询案件的派出所数量分布 得到右下角饼图的数据
  getSearchCasePoliceDistributionData: (params, sucFn, errFn) => {
    ajax('post', '/searchCasePoliceDistributionData', params, sucFn, errFn)
  },
  // 得到列表数据
  getSearchCaseFileList: (params, sucFn, errFn) => {
    ajax('post', '/searchCaseFileList', params, sucFn, errFn)
  },
  // 查询案件详细信息数据
  getSearchCaseDetailData: (params, sucFn, errFn) => {
    ajax('post', '/searchCaseDetailData', params, sucFn, errFn)
  },
  // 研判条件
  startJudge: (params, sucFn, errFn) => {
    ajax('get', '/startJudge', params, sucFn, errFn)
  },
  // 下载材料
  downloadFiles: (params, sucFn, errFn) => {
    ajax('get', '/downloadFiles', params, sucFn, errFn)
  },
  // 查询案件时间数量 布控派出所折线图
  searchCaseTimeDistributionData: (params, sucFn, errFn) => {
    ajax('post', '/searchCaseTimeDistributionData', params, sucFn, errFn)
  }

  // 查询一案一档列表信息
  // getSearchBranchOfficeCaseFiles: (params, sucFn, errFn) => {
  //   ajax('post', '/searchBranchOfficeCaseFiles', {}, sucFn, errFn)
  // },

}
