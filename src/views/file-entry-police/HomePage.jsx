// 填写档案
import React, { Component } from 'react'
import {Col, Select, Button, Input, DatePicker, Radio, message, Modal} from 'antd'
import moment from 'moment'
import './HomePage.scss'
import ajax from '../../api'
import PDFObject from 'pdfobject'
import LocationMap from './locationMap/LocationMap'
import LocationMapL from './locationMapLook/LocationMapLook'
import ImageUpload from '../../components/common/imageUpload/ImageUpload'
import ImageUploadMore from '../../components/common/imageUploadMore/ImageUploadMore'
// import ImageUploader from './ImageUploader'

const RadioGroup = Radio.Group

// let arr = location.hash.split('=').slice(1)
// let caseId = parseInt(arr[0].replace(/&plateCode/, ''))
// let plateCode = arr[1]
// console.log(plateCode)
const Option = Select.Option
// function onChange (date, dateString) {
//   console.log(date, dateString)
// }
export default class HomePage extends Component {
  constructor () {
    super()
    this.state = {
      locationMap: false,
      locationMapLook: false,
      // CaseInfoBean: {
      caseId: 0, // 案件id
      caseName: '', // 案件标题
      mainLabel: '', // 防盗主标签编号
      assistantLabel: '', // 防盗副标签编号
      plateCode: '', // 车牌号
      leader: '', // 责任领导
      hostPoliceman: '', // 主办民警
      coPoliceman: '', // 协办民警
      receivingTime: '', // 接警时间
      handlingTime: '2015-06-06', // 办案时间
      receivingRegisterImgPath: '', // 接处警登记表的图片路径
      questionTranscriptImgPath: '', // 询问笔录的图片路径
      caseLocationImgPath: '', // 案发位置截图的图片路径
      caseLocationLng: 0, // 案发位置的经度
      caseLocationLat: 0, // 案发位置的纬度
      instructionSignTime: '', // 物联网中心指令签收时间
      checkTime: '', // 开展稽查工作时间
      inchargePolicemanNameAndTel: '', // 专管民警姓名及电话
      searchPolicemanNameAndTel: '', // 专缉民警姓名及电话
      searchAreaImgPath: '', // 查缉区域截图的图片路径
      isSeizeElectricbicycle: '', // 是否缴获电动车
      isSeizeLabel: 0, // 是否缴获标签
      seizeReason: '', // 未缴获原因
      peopleType: 0, // 人员类别
      fencePeopleName: '', // 收销赃人姓名
      fencePeopleIdcard: '', // 收销赃人身份证
      caseTool: '', // 作案工具
      isCell: 0, // 是否采集到脱落细胞
      isCellInspect: 0, // 采集到的脱落细胞是否送检
      isDna: 0, // 是否收集到受害人DNA
      isDnaInspect: 0, // 受害人DNA是否被送检
      trajectoryMapImg1: '', // 电动车活动轨迹图1的路径
      trajectoryMapDesc1: '', // 电动车活动轨迹图1的文本描述
      trajectoryMapImg2: '', // 电动车活动轨迹图2的路径
      trajectoryMapDesc2: '', // 电动车活动轨迹图2的文本描述
      trajectoryMapImg3: '', // 电动车活动轨迹图2的路径
      trajectoryMapDesc3: '', // 电动车活动轨迹图3的文本描述
      trajectoryVideoImg1: '', // 电动车轨迹视频截图1的路径
      trajectoryVideoDesc1: '', // 电动车轨迹视频截图1的文本描述
      trajectoryVideoImg2: '', // 电动车轨迹视频截图2的路径
      trajectoryVideoDesc2: '', // 电动车轨迹视频截图2的文本描述
      trajectoryVideoImg3: '', // 电动车轨迹视频截图3的路径
      trajectoryVideoDesc3: '', // 电动车轨迹视频截图3的文本描述
      suspiciousTargetImg1: '', // 可疑目标视频截图1的路径
      suspiciousTargetDesc1: '', // 可疑目标视频截图1的文本描述
      suspiciousTargetImg2: '', // 可疑目标视频截图2的路径
      suspiciousTargetDesc2: '', // 可疑目标视频截图2的文本描述
      suspiciousTargetImg3: '', // 可疑目标视频截图3的路径
      suspiciousTargetDesc3: '', // 可疑目标视频截图3的文本描述
      investigationActivity: '', // 其他侦查活动
      // caseStatus: '', // 一案一档的状态
      judgeStatus: '', // 一案一档的研判状态
      createUser: '', // 创建人
      createTime: '', // 创建时间
      updateUser: '', // 修改人
      updateTime: '', // 修改时间
      trajectoryMapDescL1: true,
      trajectoryMapDescL2: false,
      trajectoryMapDescL3: false,
      trajectoryVideoDescL1: true,
      trajectoryVideoDescL2: false,
      trajectoryVideoDescL3: false,
      suspiciousTargetDescL1: true,
      suspiciousTargetDescL2: false,
      suspiciousTargetDescL3: false,
      trajectory: true,
      video: true,
      suspicious: true,
      showReportButton: true,
      reportVisible: false,
      // }
      imgtypeData1: [],
      imgtypeData2: [],
      imgtypeData3: [],
      imgtypeData4: [],
      imgtypeData5: [],
      imgtypeData6: [],
      imgtypeData7: [],
      imgType1: {
        id: null,
        caseFileId: 0,
        imgType: 1,
        url: ' ',
        imgDesc: ''
      },
      imgType2: {
        id: null,
        caseFileId: 0,
        imgType: 2,
        url: ' ',
        imgDesc: ''
      },
      imgType3: {
        id: null,
        caseFileId: 0,
        imgType: 3,
        url: '',
        imgDesc: ''
      },
      imgType4: {
        id: null,
        caseFileId: 0,
        imgType: 4,
        url: '',
        imgDesc: ''
      },
      imgType5: {
        id: null,
        caseFileId: 0,
        imgType: 5,
        url: '',
        imgDesc: ''
      },
      imgType6: {
        id: null,
        caseFileId: 0,
        imgType: 6,
        url: '',
        imgDesc: ''
      },
      imgType7: {
        id: null,
        caseFileId: 0,
        imgType: 7,
        url: '',
        imgDesc: ''
      }
    }
  }
  // 从后台拿回的图片路径
  caseImgsAll=(imgs) => {
    // this.setState({
    //   caseImgs: imgs
    // })
    this.state.caseImgs.push(imgs)
    // console.log(this.state.caseImgs, 'imgs1')
  }
  // 删除图片时的操作
  removeImg=(file) => {
    // console.log(file, 'file44444')
    for (let i = 0; i < this.state.caseImgs.length; i++) {
      if (this.state.caseImgs[i].url === file.url) {
        this.state.caseImgs.splice(i, 1)
        // console.log(this.state.caseImgs, 'imgs2')
      }
    }
  }
   // 点击进行定位
   location=() => {
     this.setState({
       locationMap: true
     })
   }
  // 地图点击确定按钮
  sureMap=() => {
    this.setState({
      locationMap: false
    })
  }
  // 点击进行地图绘制
  locationLook=() => {
    this.setState({
      locationMapLook: true
    })
  }
 // 进行地图绘制确定按钮
 sureMapLook=() => {
   this.setState({
     locationMapLook: false
   })
 }
 selectChange= (value) => {
   // console.log('value', value)
   // let Value = parseInt(value)
   // this.caseState = `${value}`
   // this.setState({
   //   caseState: Value + ''
   // })
   console.log(`selected ${value}`)
 }
  // 案件标题
  onChangeCaseName = (e) => {
    this.setState({ caseName: e.target.value })
  }
   // 防盗主标签编号
   onChangeMainLabel = (e) => {
     this.setState({ mainLabel: e.target.value })
   }
     // 防盗副标签编号
     onChangeAssistantLabel = (e) => {
       this.setState({ assistantLabel: e.target.value })
     }
       // 车牌号
       onChangePlateCode = (e) => {
         this.setState({ plateCode: e.target.value })
       }
 // 办案时间
 onChangeHandlingTime = (e) => {
   this.setState({ handlingTime: e })
 }
  // 责任领导
  onChangeLeader = (e) => {
    this.setState({ leader: e.target.value })
  }
  // 主办民警
  onChangeHostPoliceman = (e) => {
    this.setState({ hostPoliceman: e.target.value })
  }
 // 协办民警
 onChangeCoPoliceman = (e) => {
   this.setState({ coPoliceman: e.target.value })
 }
 // 物联网中心指令签收时间
 onChangeInstructionSignTime = (e) => {
   this.setState({ instructionSignTime: e })
 }
  // 开展稽查工作时间
  onChangeCheckTime = (e) => {
    this.setState({ checkTime: e })
    console.log(this.state.checkTime)
  }
  // 专管民警姓名及电话
 onChangeInchargePolicemanNameAndTel = (e) => {
   this.setState({ inchargePolicemanNameAndTel: e.target.value })
 }
   // 查缉民警姓名及电话
   onChangeSearchPolicemanNameAndTel = (e) => {
     this.setState({ searchPolicemanNameAndTel: e.target.value })
   }
  // 是否缴获电动车
  onChangeIsSeizeElectricbicycle = (e) => {
    this.setState({ isSeizeElectricbicycle: parseInt(e) })
  }
   // 是否缴获标签
   onChangeIsSeizeLabel = (e) => {
     this.setState({ isSeizeLabel: parseInt(e) })
   }
  // 未缴获原因
 onChangeSeizeReason = (e) => {
   this.setState({ seizeReason: e.target.value })
 }
   // 作案工具
   onChangeCaseTool = (e) => {
     this.setState({ caseTool: e.target.value })
   }
     // 是否采集到脱落细胞
     onChangeIsCell = (e) => {
       this.setState({ isCell: parseInt(e) })
     }
      // 采集到的脱落细胞是否送检
      onChangeIsCellInspect = (e) => {
        this.setState({ isCellInspect: parseInt(e) })
      }
       // 是否收集到受害人DNA
       onChangeIsDna = (e) => {
         this.setState({ isDna: parseInt(e) })
       }
         // 受害人DNA是否被送检
         onChangeIsDnaInspect = (e) => {
           this.setState({ isDnaInspect: parseInt(e) })
         }

  // 电动车活动轨迹图1的文本描述
  onChangeTrajectoryMapDesc1 = (e) => {
    this.setState({ trajectoryMapDesc1: e.target.value,
      imgType5: {
        id: null,
        caseFileId: 0,
        imgType: 5,
        url: '',
        imgDesc: e.target.value
      }
      // (imgType5.imgDesc):e.target.value
    })
  }
     // 电动车活动轨迹图2的文本描述
     onChangeTrajectoryMapDesc2 = (e) => {
       this.setState({ trajectoryMapDesc2: e.target.value })
     }
       // 电动车活动轨迹图3的文本描述
       onChangeTrajectoryMapDesc3 = (e) => {
         this.setState({ trajectoryMapDesc3: e.target.value })
       }
  // 物联网被盗电动自行车轨迹视频截图文本描述1
  onChangeTrajectoryVideoDesc1 = (e) => {
    this.setState({ trajectoryVideoDesc1: e.target.value })
  }
  // 物联网被盗电动自行车轨迹视频截图文本描述2
  onChangeTrajectoryVideoDesc2 = (e) => {
    this.setState({ trajectoryVideoDesc2: e.target.value })
  }
   // 物联网被盗电动自行车轨迹视频截图文本描述3
   onChangeTrajectoryVideoDesc3 = (e) => {
     this.setState({ trajectoryVideoDesc3: e.target.value })
   }
        // 可疑目标视频截图1的文本描述1
        onChangeSuspiciousTargetDesc1 = (e) => {
          this.setState({ suspiciousTargetDesc1: e.target.value })
        }
         // 可疑目标视频截图2的文本描述2
         onChangeSuspiciousTargetDesc2 = (e) => {
           this.setState({ suspiciousTargetDesc2: e.target.value })
         }
         // 可疑目标视频截图2的文本描述3
         onChangeSuspiciousTargetDesc3 = (e) => {
           this.setState({ suspiciousTargetDesc3: e.target.value })
         }
        // 其他侦查活动
        onChangeInvestigationActivity = (e) => {
          this.setState({ investigationActivity: e.target.value })
        }
        // 人员类别
        onChange = (e) => {
          console.log('radio checked', e.target.value)
          this.setState({
            peopleType: e.target.value
          })
        }
        // deleteArrayIndex = (this.state.caseImgs , index) => {
        //   return this.state.caseImgs.slice(0,index).concat(arr.slice(index+1))
        // }
  // 暂存事件
  tempSaveCaseFile = () => {
    // // 电动车轨迹地图截图
    // let trajectoryimgDesc = this.trajectoryImgs.state.imgDesc ? this.trajectoryImgs.state.imgDesc : ['1']
    // let trajectoryimgs = this.trajectoryImgs.state.imgs

    // for (let i = 0; i < trajectoryimgDesc.length; i++) {
    //   // let imgDesc
    //   trajectoryimgs[i].imgDesc = trajectoryimgDesc[i]
    // }
    // this.state.caseImgs.concat(trajectoryimgs)
    // // 电动车视频截图
    // let videoImgsDesc = this.videoImgs.state.imgDesc ? this.videoImgs.state.imgDesc : ['1']
    // let videoImgs = this.videoImgs.state.imgs

    // for (let i = 0; i < videoImgsDesc.length; i++) {
    //   // let imgDesc
    //   videoImgs[i].imgDesc = videoImgsDesc[i]
    // }
    // this.state.caseImgs.concat(videoImgs)
    // console.log(this.suspiciousImgs, 'suspiciousImgs')
    // // 可疑目标重要图像截图
    // let suspiciousImgsDesc = this.suspiciousImgs.state.imgDesc ? this.suspiciousImgs.state.imgDesc : ['1']
    // let suspiciousImgs = this.suspiciousImgs.state.imgs

    // for (let i = 0; i < suspiciousImgsDesc.length; i++) {
    //   // let imgDesc
    //   suspiciousImgs[i].imgDesc = suspiciousImgsDesc[i]
    // }
    // this.state.caseImgs.concat(suspiciousImgs)
    // delete this.state.caseImgs.uid

    // this.setState({
    //   caseImgs:
    // })
    let CaseInfoBean = {
      id: this.state.caseId, // 案件id
      caseName: this.state.caseName, // 案件标题
      mainLabel: this.state.mainLabel, // 防盗主标签编号
      assistantLabel: this.state.assistantLabel, // 防盗副标签编号
      plateCode: this.state.plateCode, // 车牌号
      leader: this.state.leader, // 责任领导
      hostPoliceman: this.state.hostPoliceman, // 主办民警
      coPoliceman: this.state.coPoliceman, // 协办民警
      receivingTime: this.state.receivingTime, // 接警时间
      handlingTime: this.state.handlingTime, // 办案时间
      // receivingRegisterImgPath: {}, // 接处警登记表的图片路径
      // questionTranscriptImgPath: {}, // 询问笔录的图片路径
      // caseLocationImgPath: {}, // 案发位置截图的图片路径
      caseLocationLng: this.state.caseLocationLng, // 案发位置的经度
      caseLocationLat: this.state.caseLocationLat, // 案发位置的纬度
      instructionSignTime: this.state.instructionSignTime, // 物联网中心指令签收时间
      checkTime: this.state.checkTime, // 开展稽查工作时间
      inchargePolicemanNameAndTel: this.state.inchargePolicemanNameAndTel, // 专管民警姓名及电话
      searchPolicemanNameAndTel: this.state.searchPolicemanNameAndTel, // 查缉民警姓名及电话
      // searchAreaImgPath: '', // 查缉区域截图的图片路径
      isSeizeElectricbicycle: this.state.isSeizeElectricbicycle || 2, // 是否缴获电动车
      isSeizeLabel: this.state.isSeizeLabel || 2, // 是否缴获标签
      seizeReason: this.state.seizeReason, // 未缴获原因
      peopleType: this.state.peopleType || 0, // 人员类别
      fencePeopleName: this.state.fencePeopleName, // 收销赃人姓名
      fencePeopleIdcard: this.state.fencePeopleIdcard, // 收销赃人身份证
      caseTool: this.state.caseTool, // 作案工具
      isCell: this.state.isCell || 2, // 是否采集到脱落细胞
      isCellInspect: this.state.isCellInspect || 2, // 采集到的脱落细胞是否送检
      isDna: this.state.isDna || 2, // 是否收集到受害人DNA
      isDnaInspect: this.state.isDnaInspect || 2, // 受害人DNA是否被送检
      caseImgs: this.state.caseImgs, // 图像路径和文本描述
      investigationActivity: this.state.investigationActivity // 其他侦查活动
    }
    ajax.tempSaveCaseFile(CaseInfoBean, response => {
      console.log(response, 'pppp')
      console.log('this.urlParmas', CaseInfoBean)
      if (response.code === 101) {
        message.info('保存成功')
      }
    }, error => {
      console.log(error)
    })
  }
    // 一键生成档案
    modifyPendingCaseFile = () => {
      // // 电动车轨迹地图截图
      // let trajectoryimgDesc = this.trajectoryImgs.state.imgDesc ? this.trajectoryImgs.state.imgDesc : ['1']
      // let trajectoryimgs = this.trajectoryImgs.state.imgs

      // for (let i = 0; i < trajectoryimgDesc.length; i++) {
      //   // let imgDesc
      //   trajectoryimgs[i].imgDesc = trajectoryimgDesc[i]
      // }
      // this.state.caseImgs.concat(trajectoryimgs)
      // // 电动车视频截图
      // let videoImgsDesc = this.videoImgs.state.imgDesc ? this.videoImgs.state.imgDesc : ['1']
      // let videoImgs = this.videoImgs.state.imgs

      // for (let i = 0; i < videoImgsDesc.length; i++) {
      //   // let imgDesc
      //   videoImgs[i].imgDesc = videoImgsDesc[i]
      // }
      // this.state.caseImgs.concat(videoImgs)
      // console.log(this.suspiciousImgs, 'suspiciousImgs')
      // // 可疑目标重要图像截图
      // let suspiciousImgsDesc = this.suspiciousImgs.state.imgDesc ? this.suspiciousImgs.state.imgDesc : ['1']
      // let suspiciousImgs = this.suspiciousImgs.state.imgs

      // for (let i = 0; i < suspiciousImgsDesc.length; i++) {
      //   // let imgDesc
      //   suspiciousImgs[i].imgDesc = suspiciousImgsDesc[i]
      // }
      // this.state.caseImgs.concat(suspiciousImgs)

      let CaseInfoBean = {
        id: this.state.caseId, // 案件id
        caseName: this.state.caseName, // 案件标题
        mainLabel: this.state.mainLabel, // 防盗主标签编号
        assistantLabel: this.state.assistantLabel, // 防盗副标签编号
        plateCode: this.state.plateCode, // 车牌号
        leader: this.state.leader, // 责任领导
        hostPoliceman: this.state.hostPoliceman, // 主办民警
        coPoliceman: this.state.coPoliceman, // 协办民警
        receivingTime: this.state.receivingTime, // 接警时间
        handlingTime: this.state.handlingTime, // 办案时间
        // receivingRegisterImgPath: {}, // 接处警登记表的图片路径
        // questionTranscriptImgPath: {}, // 询问笔录的图片路径
        // caseLocationImgPath: {}, // 案发位置截图的图片路径
        caseLocationLng: this.state.caseLocationLng, // 案发位置的经度
        caseLocationLat: this.state.caseLocationLat, // 案发位置的纬度
        instructionSignTime: this.state.instructionSignTime, // 物联网中心指令签收时间
        checkTime: this.state.checkTime, // 开展稽查工作时间
        inchargePolicemanNameAndTel: this.state.inchargePolicemanNameAndTel, // 专管民警姓名及电话
        searchPolicemanNameAndTel: this.state.searchPolicemanNameAndTel, // 查缉民警姓名及电话
        // searchAreaImgPath: '', // 查缉区域截图的图片路径
        isSeizeElectricbicycle: this.state.isSeizeElectricbicycle || 2, // 是否缴获电动车
        isSeizeLabel: this.state.isSeizeLabel || 2, // 是否缴获标签
        seizeReason: this.state.seizeReason, // 未缴获原因
        peopleType: this.state.peopleType || 0, // 人员类别
        fencePeopleName: this.state.fencePeopleName, // 收销赃人姓名
        fencePeopleIdcard: this.state.fencePeopleIdcard, // 收销赃人身份证
        caseTool: this.state.caseTool, // 作案工具
        isCell: this.state.isCell || 2, // 是否采集到脱落细胞
        isCellInspect: this.state.isCellInspect || 2, // 采集到的脱落细胞是否送检
        isDna: this.state.isDna || 2, // 是否收集到受害人DNA
        isDnaInspect: this.state.isDnaInspect || 2, // 受害人DNA是否被送检
        caseImgs: this.state.caseImgs, // 图像路径和文本描述
        investigationActivity: this.state.investigationActivity // 其他侦查活动
      }
      ajax.modifyPendingCaseFile(CaseInfoBean, response => {
        console.log(response, 'pppp')
        console.log('this.urlParmas', CaseInfoBean)
        if (response.code === 101) {
          this.setState({
            showReportButton: false
          })
          message.info('生成成功')
        }
      }, error => {
        console.log(error)
      })
    }
    showReport = () => {
      // this.getSearchCasePdf(this.state.caseId)
      this.getSearchCasePdf('1')
      this.setState({
        reportVisible: true
      })
    }
    getSearchCasePdf (caseId) {
      ajax.searchCasePdf({ caseId: caseId }, response => {
        console.log(response, 'statisticsSuspectCount')
        if (response.code === 101) {
          this.setState({
            hasData: true,
            fileSrc: response.data.pdfUrl
          }, () => {
            let pdfContainer = this.refs.pdf
            PDFObject.embed(this.state.fileSrc, pdfContainer)
          })
        }
      }, error => {
        console.log(error)
      })
    }
  handleOk = () => {
    window.open(this.state.fileSrc)
    this.setState({ reportVisible: false })
  }
  handleCancel = () => {
    this.setState({ reportVisible: false })
  }
  searchCaseFile =(urlParmas) => {
    ajax.searchCaseFile(urlParmas, response => {
      console.log(response, 'pppp')
      console.log('this.urlParmas', urlParmas)
      if (response.code === 101) {
        // debugger
        this.setState({
          caseName: response.data.caseName, // 案件标题
          mainLabel: response.data.mainLabel, // 防盗主标签编号
          assistantLabel: response.data.assistantLabel, // 防盗副标签编号
          plateCode: response.data.plateCode, // 车牌号
          leader: response.data.leader, // 责任领导
          hostPoliceman: response.data.hostPoliceman, // 主办民警
          coPoliceman: response.data.coPoliceman, // 协办民警
          receivingTime: response.data.receivingTime ? moment(response.data.receivingTime).format('YYYY-MM-DD') : '', // 接警时间
          // handlingTime: response.data.handlingTime,
          handlingTime: response.data.handlingTime ? moment(response.data.handlingTime).format('YYYY-MM-DD') : '', // 办案时间
          receivingRegisterImgPath: response.data.receivingRegisterImgPath, // 接处警登记表的图片路径
          questionTranscriptImgPath: response.data.questionTranscriptImgPath, // 询问笔录的图片路径
          caseLocationImgPath: response.data.caseLocationImgPath, // 案发位置截图的图片路径
          caseLocationLng: response.data.caseLocationLng, // 案发位置的经度
          caseLocationLat: response.data.caseLocationLat, // 案发位置的纬度
          instructionSignTime: response.data.instructionSignTime ? moment(response.data.instructionSignTime).format('YYYY-MM-DD') : '', // 物联网中心指令签收时间
          // checkTime: response.data.checkTime,
          checkTime: response.data.checkTime ? moment(response.data.checkTime).format('YYYY-MM-DD') : '', // 开展稽查工作时间
          inchargePolicemanNameAndTel: response.data.inchargePolicemanNameAndTel, // 专管民警姓名及电话
          searchPolicemanNameAndTel: response.data.searchPolicemanNameAndTel, // 专缉民警姓名及电话
          searchAreaImgPath: response.data.searchAreaImgPath, // 查缉区域截图的图片路径
          isSeizeElectricbicycle: response.data.isSeizeElectricbicycle, // 是否缴获电动车
          isSeizeLabel: response.data.isSeizeLabel, // 是否缴获标签
          seizeReason: response.data.seizeReason, // 未缴获原因
          peopleType: response.data.peopleType, // 人员类别
          fencePeopleName: response.data.fencePeopleName, // 收销赃人姓名
          fencePeopleIdcard: response.data.fencePeopleIdcard, // 收销赃人身份证
          caseTool: response.data.caseTool, // 作案工具
          isCell: response.data.isCell, // 是否采集到脱落细胞
          isCellInspect: response.data.isCellInspect, // 采集到的脱落细胞是否送检
          isDna: response.data.isDna, // 是否收集到受害人DNA
          isDnaInspect: response.data.isDnaInspect, // 受害人DNA是否被送检
          investigationActivity: response.data.investigationActivity, // 其他侦查活动
          caseImgs: response.data.caseImgs
        })
        console.log('handlingTim', moment(this.state.handlingTime).format('YYYY-MM'))
        console.log('caseImgs', this.state.caseImgs)
        let caseImgsBox = this.state.caseImgs
        console.log(caseImgsBox, 'hhhh')
        caseImgsBox.map((item) => {
          item.uid = item.id
        })
        let imgtypeData1 = caseImgsBox.filter((t) => {
          console.log(t)
          return t.imgType === 1
        })

        console.log('imgtypeData1', this.state.imgtypeData1)
        let imgtypeData2 = caseImgsBox.filter(t => t.imgType === 2)
        let imgtypeData3 = caseImgsBox.filter(t => t.imgType === 3)
        let imgtypeData4 = caseImgsBox.filter(t => t.imgType === 4)
        let imgtypeData5 = caseImgsBox.filter(t => t.imgType === 5)
        let imgtypeData6 = caseImgsBox.filter(t => t.imgType === 6)
        let imgtypeData7 = caseImgsBox.filter(t => t.imgType === 7)
        this.setState({
          imgtypeData1,
          imgtypeData2,
          imgtypeData3,
          imgtypeData4,
          imgtypeData5,
          imgtypeData6,
          imgtypeData7
        })
        console.log(this.state.imgtypeData3, '  this.state.imgtypeData3 ')
      }
    }, error => {
      console.log(error)
    })
  }
  // 向地图传经纬度函数
  lngLats = (e) => {
    this.setState({
      caseLocationLng: e.lng,
      caseLocationLat: e.lat
    })
    console.log('caseLocationLng', this.state.caseLocationLng)
    console.log('caseLocationLat', this.state.caseLocationLat)
  }
  trajectoryCallBack=() => {
    this.setState({
      trajectory: false
    })
  }
  trajectoryImg=() => {
    this.setState({
      trajectory: true
    })
  }
  videoCallBack=() => {
    this.setState({
      video: false
    })
  }
  videoImg=() => {
    this.setState({
      video: true
    })
  }
  suspicious
  suspiciousCallBack=() => {
    this.setState({
      suspicious: false
    })
  }
  suspiciousImg=() => {
    this.setState({
      suspicious: true
    })
  }

  componentDidMount () {
    let arr = location.hash.split('=').slice(1)
    console.log(arr, 'arr')
    let caseId = parseInt(arr[0].replace(/&caseId/, ''))
    console.log(caseId, 'caseId')

    let CaseInfoBean = {
      caseId: caseId // 案件id
    }
    this.setState({
      caseId: caseId
    })
    this.searchCaseFile(CaseInfoBean)
  }
  render () {
    this.state.imgType1.caseFileId = this.state.caseId
    this.state.imgType2.caseFileId = this.state.caseId
    this.state.imgType3.caseFileId = this.state.caseId
    this.state.imgType4.caseFileId = this.state.caseId
    this.state.imgType5.caseFileId = this.state.caseId
    this.state.imgType6.caseFileId = this.state.caseId
    this.state.imgType7.caseFileId = this.state.caseId
    console.log(this.state.imgtypeData1, this.state.imgtypeData2, 'imgtypeData2')
    console.log(this.refs.trajectoryImgs, 'trajectoryImgs')

    console.log(moment(this.state.handlingTime).format('YYYY-MM-DD'), this.state.handlingTime, 'this.state.handlingTime')
    return (
      <div>
        <div className='temporaryStorage'> <Button type='primary' className='serachCrimeButton' onClick={this.tempSaveCaseFile}>暂存</Button></div>
        <div className='fileEntryHeader'>
          <a href='./#/police/un-submit' >待提交档案／详细档案</a>
        </div>
        {/* 请填写按键档案信息begin */}
        <div className='archivalInformationBox'>
          <div className='archivalInformation'>
            <span className='archivalInformationText'> 请填写案件档案信息</span>
            <span> 此次被盗车辆为物联网电动车，您可以 <a href='./#/police/check-vehicle'>查看车辆资料</a></span>
          </div>
          <div className='archivalInformationInput'>
            <Col span={5}> <span className='caseName'>案件名称</span>
              <Input placeholder='时间+期数+受害人姓名+类型' style={{width: '70%'}} value={this.state.caseName} onChange={this.onChangeCaseName} /> </Col>
            <Col span={4}> <span className='caseName'>防盗主标签编号</span>
              <Input placeholder='请输入' style={{width: '50%'}} value={this.state.mainLabel} onChange={this.onChangeMainLabel} /> </Col>
            <Col span={4}> <span className='caseName'>防盗副标签编号</span>
              <Input placeholder='请输入' style={{width: '50%'}} value={this.state.assistantLabel} onChange={this.onChangeAssistantLabel} /> </Col>
            <Col span={4}> <span className='caseName'>车牌号</span>
              <Input placeholder='请输入' style={{width: '50%'}} value={this.state.plateCode} onChange={this.onChangePlateCode} /> </Col>
            <Col span={4}> <span className='caseName'>办案时间</span>
              <DatePicker onChange={this.onChangeHandlingTime} value={moment(this.state.handlingTime, 'YYYY-MM-DD')} />
            </Col>
            <Col span={3}> <span className='caseName'>责任领导</span>
              <Input placeholder='请输入' style={{width: '50%'}} value={this.state.leader} onChange={this.onChangeLeader} /> </Col>
          </div>
          <div className='archivalInformationInput'>
            <Col span={4}> <span className='caseName'>主办民警</span>
              <Input placeholder='请输入' style={{width: '50%'}} value={this.state.hostPoliceman} onChange={this.onChangeHostPoliceman} /> </Col>
            <Col span={4}> <span className='caseName'>协办民警</span>
              <Input placeholder='请输入' style={{width: '50%'}} value={this.state.coPoliceman} onChange={this.onChangeCoPoliceman} /> </Col>
          </div>
          {/* <div style={{textAlign: 'right', marginRight: '2%'}}> <Button type='primary' className='serachCrimeButton' onClick={this.searckClick}>暂存</Button></div> */}
        </div>
        {/* 请填写按键档案信息end */}
        {/* 请上传案件基本信息begin */}
        <div className='uploadCaseBox'>
          <div className='uploadCaselInformation'>
            <span className='uploadCaseText'> 请上传案件基本信息</span>
          </div>
          <div className='uploadCaseImg'style={{width: '100%'}}>
            <div className='uploadCaseImgBox'>
              <div className='registrationForm'> 接处警登记表</div>
              <div className='uploadCasePicture'>   <ImageUploadMore data={this.state.imgType1}
                removeImg={this.removeImg}
                caseImgsAll={this.caseImgsAll} listFile={this.state.imgtypeData1} />
              </div>
            </div>
          </div>
          <div className='uploadCaseImg'style={{width: '100%'}}>
            <div className='uploadCaseImgBox'>
              <div className='registrationForm'> 受害人询问笔录</div>
              <div className='uploadCasePicture'>   <ImageUploadMore data={this.state.imgType2}
                removeImg={this.removeImg}
                caseImgsAll={this.caseImgsAll} listFile={this.state.imgtypeData2} /></div>
            </div>
          </div>
          <div className='uploadCaseImg'style={{width: '100%'}}>
            <div className='uploadCaseImgBox'style={{position: 'relative'}}>
              <div className='registrationForm' style={{position: 'absolute'}}> 案发位置</div>
              {this.state.locationMapLook === true
                ? <div className='locationMap' style={{width: '80vw', height: '80vh', position: 'absolute', zIndex: '12', top: '222px', left: '0'}} >

                  <LocationMapL lngLats={this.lngLats}
                    Lng={this.state.caseLocationLng}
                    Lat={this.state.caseLocationLat} />
                  <div style={{position: 'absolute', zIndex: '18', top: '50px', right: '4%'}}>
                    <Button type='primary' onClick={this.sureMapLook}>确定</Button></div>
                </div> : ''
              }

              <div className='uploadCasePicture'>
                <div className='wirteMap' onClick={this.locationLook}>
                    点击绘制地图
                </div>
                <ImageUpload data={this.state.imgType3}
                  removeImg={this.removeImg}
                  caseImgsAll={this.caseImgsAll} listFile={this.state.imgtypeData3} /></div>
            </div>
          </div>
        </div>
        {/* 请上传案件基本信息end */}
        {/* 请填写查辑情况begin */}
        <div className='writeAttackBox'>
          <div className='writeAttackInformation'>
            <span className='writeAttackText'> 请填写查辑情况</span>
          </div>
          <div className='writeAttackInput'>
            <Col span={6}> <span className='caseName'>物联网中心指令牵手时间</span>
              <DatePicker oonChange={this.onChangeInstructionSignTime} value={moment(this.state.instructionSignTime, 'YYYY-MM-DD')} /> </Col>
            <Col span={6}> <span className='caseName' value={moment(this.state.checkTime, 'YYYY-MM-DD')}>开展稽查工作时间</span>
              <DatePicker onChange={this.onChangeCheckTime} /> </Col>
            <Col span={6}> <span className='caseName'>专管民警姓名以及电话</span>
              <Input placeholder='请输入' style={{width: '50%'}} value={this.state.inchargePolicemanNameAndTel} onChange={this.onChangeInchargePolicemanNameAndTel} /> </Col>
            <Col span={6}> <span className='caseName'>查辑民警姓名以及电话</span>
              <Input placeholder='请输入' style={{width: '50%'}} value={this.state.searchPolicemanNameAndTel} onChange={this.onChangeSearchPolicemanNameAndTel} /> </Col>
          </div>
          <div className='specificArea'>
            <Col span={3}> <div className='specificAreaText'> 查缉具体区域</div> </Col>
            <Col span={3} className='locationMapBox' onClick={this.location}>
              <div className='locationMapB'> 点击进行定位</div>
            </Col>
            <ImageUpload data={this.state.imgType4}
              removeImg={this.removeImg}
              caseImgsAll={this.caseImgsAll} listFile={this.state.imgtypeData4} />
            {this.state.locationMap === true ? <div className='locationMap' >  <LocationMap />
              <div style={{position: 'absolute', zIndex: '11', top: '255px', right: '15%'}}>
                <Button type='primary' onClick={this.sureMap}>确定</Button>
              </div>
            </div> : ''

            }
            {/* <div> <LocationMap /></div> */}
          </div>
        </div>
        {/* 请填写查辑情况end */}
        {/* 查辑结果begin */}
        <div className='attackResultBox'>
          <div className='attackResulInformation'>
            <span className='writeAttackText'> 查辑结果（未查获的要说明原因）</span>
          </div>
          <div className='attackResultInput'>
            <Col span={6}> <span className='caseName'>是否缴获电动车</span>
              <Select value={this.state.isSeizeElectricbicycle === '' ? '请选择' : this.state.isSeizeElectricbicycle === 1 ? '是' : '否'} onChange={this.selectChange} style={{ width: 120 }} >
                <Option value='1'>是</Option>
                <Option value='0'>否</Option>
              </Select> </Col>
            <Col span={6}> <span className='caseName'>是否缴获标签</span>
              <Select value={this.state.isSeizeLabel === '' ? '请选择' : this.state.isSeizeLabel === 1 ? '是' : '否'} onChange={this.onChangeIsSeizeLabel}
                style={{ width: 120 }} >
                <Option value='1'>是</Option>
                <Option value='0'>否</Option>
              </Select> </Col>
          </div>
          <div className='ResultWhyBox'>
            <span className='ResultWhy'> 原因 </span>
            <Input className='ResultWhyInput' placeholder='请输入' style={{width: '50%'}} type='textarea' value={this.state.seizeReason} onChange={this.onChangeSeizeReason} />
          </div>
        </div>
        {/* 查辑结果end */}
        {/* 如有收销赃人，请记录信息begin */}
        <div className='collectPinBox'>
          <div className='attackResulInformation'>
            <span className='writeAttackText'> 如有收销赃人，请记录信息</span>
          </div>
          {/* 先放着begin */}
          <div className='attackResultInput'>
            <Col span={6}> <span className='caseName'>收销赃人姓名</span>
              <Input placeholder='姓名' style={{width: '50%'}} value={this.state.fencePeopleName} onChange={this.onChangeCaseName} /> </Col>
            <Col span={6}> <span className='caseName'>收销赃人身份证</span>
              <Input placeholder='电话' style={{width: '50%'}} value={this.state.fencePeopleIdcard} onChange={this.onChangeCaseName} /> </Col>
            {/* 已记录过姓名的，自动关联显示 */}
            <Col span={3}> <span className='collectPinNum'>
              {this.state.peopleType === 1 ? <span>收赃次数：1次 </span > : this.state.peopleType === 2 ? <span> 销赃次数：2次 </span > : '' }
            </span> </Col>
            <Col span={6}>
              <RadioGroup onChange={this.onChange} value={this.state.peopleType} name='radiogroup'>
                <Radio value={1} >收赃人</Radio>
                <Radio value={2}>销赃人</Radio>
              </RadioGroup></Col>
          </div>
        </div>
        {/* 先放着end */}
        {/* 如有作案工具，请准确记录begin */}
        <div className='caseToolsBox'>
          <div className='attackResulInformation'>
            <span className='writeAttackText'> 如有作案工具，请准确记录</span>
          </div>
          <div className='caseToolsWhyBox'>
            <span className='caseTools'> 作案工具</span>
            <Input className='caseToolsInput' placeholder='请输入' style={{width: '50%'}} type='textarea' value={this.state.caseTool} onChange={this.onChangeCaseTool} />
          </div>
        </div>
        {/* 如有作案工具，请准确记录end */}
        {/* 如有收销赃人，请记录信息end */}
        {/* 生物采集情况begin */}
        <div className='biologicalCollectionBox'>
          <div className='attackResulInformation'>
            <span className='writeAttackText'>生物采集情况</span>
          </div>
          <div className='attackResultInput'>
            <Col span={6}> <span className='caseName'>是否采集到嫌疑人脱落细胞</span>
              <Select value={this.state.isCell === '' ? '请选择' : this.state.isCell === 1 ? '是' : '否'}
                onChange={this.onChangeIsCell} style={{ width: 120 }}>
                <Option value='1'>是</Option>
                <Option value='0'>否</Option>
              </Select></Col>
            <Col span={6}> <span className='caseName'>是否送检</span>
              <Select value={this.state.isCellInspect === '' ? '请选择' : this.state.isCellInspect === 1 ? '是' : '否'} onChange={this.onChangeIsCellInspect} style={{ width: 120 }}>
                <Option value='1'>是</Option>
                <Option value='0'>否</Option>
              </Select> </Col>
            <Col span={6}> <span className='caseName'>是否收集到受害人DNA</span>
              <Select value={this.state.isDna === '' ? '请选择' : this.state.isDna === 1 ? '是' : '否'} onChange={this.onChangeIsDna} style={{ width: 120 }}>
                <Option value='1'>是</Option>
                <Option value='0'>否</Option>
              </Select> </Col>
            <Col span={6}> <span className='caseName'>是否送检</span>
              <Select value={this.state.isDnaInspect === '' ? '请选择' : this.state.isDnaInspect === 1 ? '是' : '否'} onChange={this.onChangeIsDnaInspect} style={{ width: 120 }}>
                <Option value='1'>是</Option>
                <Option value='0'>否</Option>
              </Select> </Col>
          </div>

        </div>
        {/* 生物采集情况end */}
        <div className='carryOutVideo'> 开展视频侦查的工作情况</div>

        {/* 物联网被盗电动自行车活动轨迹地图（起点至终点截图）begin */}
        <div className='trackMapBox'>
          <div className='attackResulInformation'>
            <span className='writeAttackText' onClick={this.trajectoryImg} style={{cursor: 'pointer'}}>物联网被盗电动自行车活动轨迹地图（起点至终点截图）</span>
            <span className='nonePicture' onClick={this.trajectoryCallBack} style={{cursor: 'pointer'}}> 无图片说明</span>
          </div>
          <div className='attackResultInput'>
            <Col span={18}>
              {this.state.trajectory === true ? <ImageUploadMore data={this.state.imgType5} caseImgsAll={this.caseImgsAll}
                removeImg={this.removeImg}
                listFile={this.state.imgtypeData5} />
                : <div>
                  请输入无图片说明
                  <Input style={{height: '100px'}}
                    onChange={this.onChangeTrajectoryMapDesc1}
                    value={this.state.trajectoryMapDesc1}
                  />
                </div>

              }
              {/* <ImageUploader ref={trajectoryImgs => { this.trajectoryImgs = trajectoryImgs }} data={this.state.imgType5} /> */}
            </Col>
          </div>
          {/* <div>
            <div>
              <Input placeholder='请输入简单截图说明' style={{width: '50%', height: '100px'}} type='textarea' onChange={this.onChangeTrajectoryMapDesc1} value={this.state.trajectoryMapDesc1} />
            </div>
          </div> */}
        </div>
        {/* 物联网被盗电动自行车活动轨迹地图（起点至终点截图）end */}
        {/* 物联网被盗电动自行车轨迹视频地图（必填）begin */}
        <div className='trackMapBox'>
          <div className='attackResulInformation'>
            <span className='writeAttackText' onClick={this.videoImg} style={{cursor: 'pointer'}}>物联网被盗电动自行车轨迹视频截图（必填）</span>
            <span className='nonePicture' onClick={this.videoCallBack} style={{cursor: 'pointer'}}>无图片说明</span>
          </div>
          <div className='attackResultInput'>
            <Col span={18}>
              {this.state.video === true ? <ImageUploadMore data={this.state.imgType5}
                removeImg={this.removeImg}
                caseImgsAll={this.caseImgsAll} listFile={this.state.imgtypeData6} />
                : <div>
                  请输入无图片说明
                  <Input style={{height: '100px'}}
                    onChange={this.onChangeTrajectoryVideoDesc1}
                    value={this.state.trajectoryVideoDesc1}
                  />
                </div>

              }
              {/* <ImageUploader ref={videoImgs => { this.videoImgs = videoImgs }} data={this.state.imgType6} /> */}
            </Col>
          </div>
          {/* <div>
              <div>
                <Input placeholder='请输入简单截图说明' style={{width: '50%', height: '100px'}} type='textarea' value={this.state.trajectoryMapDesc2} onChange={this.onChangeTrajectoryMapDesc2} />
              </div>
            </div> */}
        </div>
        {/* 物联网被盗电动自行车轨迹视频地图（必填）end */}
        {/* 可疑目标重要图像截图begin */}
        <div className='trackMapBox'>
          <div className='attackResulInformation'>
            <span className='writeAttackText' onClick={this.suspiciousImg} style={{cursor: 'pointer'}}>可疑目标重要图像截图</span>
            <span>您可以打开电动车盗窃嫌疑人库，进行嫌疑人关联，</span> <a href='./#/police/suspicion'> 查看电动车盗窃嫌疑人库资料</a>
            <span className='nonePicture' onClick={this.suspiciousCallBack} style={{cursor: 'pointer'}}> &nbsp; 无图片说明</span>
          </div>
          <div className='attackResultInput'>
            <Col span={18}>
              {/* <ImageUploadMore data={this.state.imgType7} caseImgsAll={this.caseImgsAll} /> */}
              {this.state.suspicious === true ? <ImageUploadMore data={this.state.imgType5}
                removeImg={this.removeImg}
                caseImgsAll={this.caseImgsAll} listFile={this.state.imgtypeData7} />
                : <div>
                  请输入无图片说明
                  <Input style={{height: '100px'}}
                    onChange={this.onChangeSuspiciousTargetDesc1}
                    value={this.state.suspiciousTargetDesc1}
                  />
                </div>
              }
            </Col>
          </div>
        </div>
        {/* 可疑目标重要图像截图end */}
        <div className='carryOutVideo'> 其他侦查活动情况</div>
        {/* 记录在侦查过程中运用现场勘验，走访调查，经营线索，数据分析和研判以及采取的技术手段措施等内容begin */}
        <div className='trackMapBox' style={{height: '200px'}}>
          <div className='attackResulInformation'>
            <span className='writeAttackText'>记录在侦查过程中运用现场勘验，走访调查，经营线索，数据分析和研判以及采取的技术手段措施等内容</span>
          </div>
          <div>
            <div>
              <Input placeholder='请输入' style={{width: '50%', height: '100px'}} type='textarea' value={this.state.investigationActivity} onChange={this.onChangeInvestigationActivity} />
            </div>
          </div>
        </div>
        {/* 记录在侦查过程中运用现场勘验，走访调查，经营线索，数据分析和研判以及采取的技术手段措施等内容end */}
        <div className='report'>
          {
            this.state.showReportButton ? <Button type='primary' className='serachCrimeButton' onClick={this.modifyPendingCaseFile}>一键生成报告</Button>
              : <Button type='primary' className='serachCrimeButton' onClick={this.showReport}>报告预览</Button>
          }
        </div>
        <Modal
          visible={this.state.reportVisible}
          title='报告预览'
          width={800}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key='back' onClick={this.handleCancel}>关闭</Button>,
            <Button key='submit' type='primary' onClick={this.handleOk}>
              下载
            </Button>
          ]}
        >
          <div ref='pdf' id='example1' style={{height: '600px'}} />
        </Modal>
      </div>

    )
  }
}
