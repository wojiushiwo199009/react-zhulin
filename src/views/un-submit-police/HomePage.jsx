// 待提交档案

import React, { Component } from 'react'
import Xiaohuangdian from '../../assets/images/xiaohuangdian.png'
import Xiaohongdian from '../../assets/images/xiaohongdian.png'
import RangePicker from '../../components/common/rangePicker/RangePicker'
import {Col, Select, Button, Input, Table} from 'antd'
import moment from 'moment'
import ajax from '../../api'
import './HomePage.scss'
const Option = Select.Option

export default class HomePage extends Component {
  constructor () {
    super()
    this.state = {
      caseRectificationsCount: 0,
      pendingFilesConut: 0,
      caseRectificationsData: [],
      pendingFilesData: [],
      // pageVisible: true,
      urlParmas: {
        carNumber: '',
        assignStartTime: '',
        assignEndTime: '',
        cutoffStartTime: '',
        cutoffEndTime: '',
        outOfTime: 2
      },
      caseRectifications: [
        {
          title: '案件标题',
          dataIndex: 'caseTitle',
          key: 'caseTitle',
          render: (text, record, index) => {
            return (<span style={{color: '#ff3300'}} >
              {record.caseTitle}
            </span>)
          }
        },
        {
          title: '退回的时间',
          dataIndex: 'returnTime',
          key: 'returnTime',
          render: (text, record, index) => {
            return (<span style={{color: '#ff3300'}} >
             退回时间：
              { moment(record.returnTime).format('YYYY-MM-DD:HH:mm:ss')}
            </span>)
          }
        },
        {
          title: '整改要求',
          dataIndex: 'returnAdvice',
          key: 'returnAdvice',
          render: (text, record, index) => {
            return (<span style={{color: '#ff3300'}}>
             整改要求： {record.returnAdvice}
            </span>)
          }
        },
        {
          title: '目前状态',
          dataIndex: 'currentState',
          key: 'currentState',
          render: (text, record, index) => {
            let Text = record.caseStatus === 4 ? '' : ''
            let statesColor = record.caseStatus === 4 ? 'green' : 'yellow'
            return (<span style={{color: statesColor}} >
              {Text}
            </span>)
          }
        },
        {
          title: '重新填写',
          dataIndex: 'retuenWrite',
          key: 'retuenWrite',
          render: (text, record, index) => {
            let Text = record.caseStatus === 4 ? '重新填写' : ''
            let Link = './#/police/file-entry?fileId=' + record.caseId
            return (<a href={Link} style={{color: '#ff3300'}}>
              {Text}
            </a>)
          }
          // alert(1)
          //
        }
      ],
      // caseRectificationsData: [{
      //   'caseId': 11, // 一案一档的id
      //   'caseTitle': '201801期张艳萍电动车被盗案', // 一案一档的案件标题
      //   'returnTime': '20180315104005', // 不合规的一案一档被退回的时间
      //   'returnAdvice': '行车轨迹截图不合格，查缉信息未填写', // 不合规一案一档被退回的整改要求
      //   'caseStatus': 3// 一案一档的状态码
      // },
      // {
      //   'caseId': 22, // 一案一档的id
      //   'caseTitle': '201801期张艳萍电动车被盗案', // 一案一档的案件标题
      //   'returnTime': '20180315104005', // 不合规的一案一档被退回的时间
      //   'returnAdvice': '行车轨迹截图不合格，查缉信息未填写', // 不合规一案一档被退回的整改要求
      //   'caseStatus': 3// 一案一档的状态码
      // }
      // ],
      pendingFiles: [
        {
          title: '车牌号码',
          dataIndex: 'carNumber',
          key: 'carNumber',
          render: (text, record, index) => {
            let Text = record.docStatus === 0 ? <img src={Xiaohongdian} style={{height: '8px', marginRight: '5px'}} /> : (record.docStatus === 1 ? <img src={Xiaohuangdian} style={{height: '7px', marginRight: '5px'}} /> : '')
            // let statesColor = record.states === 3 ? 'green' : 'yellow'
            return (<span >
              {Text}车牌号：{ record.carNumber}
            </span>)
          }
        },
        {
          title: '报警电话',
          dataIndex: 'callPoliceNumber',
          key: 'callPoliceNumber',
          render: (text, record, index) => {
            return (<span >
             报警电话 ：{ record.callPoliceNumber}
            </span>)
          }
        },
        {
          title: '下派时间',
          dataIndex: 'assignTime',
          key: 'assignTime',
          render: (text, record, index) => {
            return (<span >
            下派时间 ：{ moment(record.assignTime).format('YYYY-MM-DD:HH:mm:ss')}
            </span>)
          }
        },
        {
          title: '截止提交时间',
          dataIndex: 'cutoffTime',
          key: 'cutoffTime',
          render: (text, record, index) => {
            return (<span >
           截止提交时间 ：
              { moment(record.cutoffTime).format('YYYY-MM-DD:HH:mm:ss')}
            </span>)
          }
        },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          render: (text, record, index) => {
            let Text = record.caseStatus === 3 ? '填写档案' : '继续填写档案'
            let statesColor = record.caseStatus === 3 ? '#0099FF' : '#ffcc33'
            return (<a href={'./#/police/file-entry?caseId=' + record.caseId} style={{cursor: 'pointer', color: statesColor}}>
              {Text}
            </a>)
          }
          // alert(1)
          //
        }
      ]
      // pendingFilesData: [

      //   {
      //     'caseId': 1, // 一案一档的id
      //     'carNumber': '662548', // 车牌号码
      //     'callPoliceNumber': '13555555555', // 报警电话
      //     'assignTime': '201801111019', // 下派时间
      //     'cutoffTime': '201801131019', // 截止提交时间
      //     'caseStatus': 1, // 一案一档的状态码
      //     'docStatus': 0// 一案一档是否超过或即将超过预期的提交时间。0，超过，1，即将超过，null，未超期
      //   },
      //   {
      //     'caseId': 2, // 一案一档的id
      //     'carNumber': '662548', // 车牌号码
      //     'callPoliceNumber': '13555555555', // 报警电话
      //     'assignTime': '201801111019', // 下派时间
      //     'cutoffTime': '201801131019', // 截止提交时间
      //     'caseStatus': 3, // 一案一档的状态码
      //     'docStatus': 1// 一案一档是否超过或即将超过预期的提交时间。0，超过，1，即将超过，null，未超期
      //   },

      //   {
      //     'caseId': 3, // 一案一档的id
      //     'carNumber': '662548', // 车牌号码
      //     'callPoliceNumber': '13555555555', // 报警电话
      //     'assignTime': '201801111019', // 下派时间
      //     'cutoffTime': '201801131019', // 截止提交时间
      //     'caseStatus': 1, // 一案一档的状态码
      //     'docStatus': null// 一案一档是否超过或即将超过预期的提交时间。0，超过，1，即将超过，null，未超期
      //   }
      // ]
    }
  }

  // 每页个数改变时
  onShowSizeChangeInvest (current, pageSize) {
    this.setState({ pageNumInvest: current, pageSizeInvest: pageSize })
  }
  // 页码改变时
  onChangeInvest (current, pageSize) {
    this.setState({ pageNumInvest: current, pageSizeInvest: pageSize })
  }

  // selectDate = (startDate, endDate) => {
  //   this.startDate = startDate
  //   this.endDate = endDate
  // }

  assignTime = (startDate, endDate) => {
    this.setState({
      assignStartTime: startDate,
      assignEndTime: endDate
    })
  }
  cutoffTime = (startDate, endDate) => {
    this.setState({
      cutoffStartTime: startDate,
      cutoffEndTime: endDate
    })
  }
  outOfTimeSelect= (value) => {
    console.log('value', value)
    let Value = parseInt(value)
    // this.caseState = `${value}`
    this.setState({
      outOfTime: Value + ''
    })
    console.log(`selected ${value}`)
  }
  onChangeCarNumber = (e) => {
    this.setState({ carNumber: e.target.value })
  }
   // 分类检索点击事件
   beginSearckClick = (urlParmas) => {
     urlParmas = {
       carNumber: this.state.carNumber || '',
       assignStartTime: this.state.assignStartTime ? this.state.assignStartTime.format('YYYY-MM-DD') : '',
       assignEndTime: this.state.assignEndTime ? this.state.assignEndTime.format('YYYY-MM-DD') : '',
       cutoffStartTime: this.state.cutoffStartTime ? this.state.cutoffStartTime.format('YYYY-MM-DD') : '',
       cutoffEndTime: this.state.cutoffEndTime ? this.state.cutoffEndTime.format('YYYY-MM-DD') : '',
       outOfTime: this.state.outOfTime || 2
     }
     this.getSearch(urlParmas)
     console.log(111)
   }
   getSearch=(urlParmas) => {
     ajax.getsearchPendingCaseFiles(urlParmas, response => {
       console.log(response, 'pppp')
       if (response.code === 101) {
         this.setState({
           caseRectificationsData: response.data.caseRectifications,
           pendingFilesData: response.data.pendingFiles,
           caseRectificationsCount: response.data.caseRectificationsCount,
           pendingFilesConut: response.data.pendingFilesConut

         })
         console.log('searchCaseLists', this.state.searchCaseLists)
       }
     }, error => {
       console.log(error)
     })
   }
   componentDidMount () {
     let Parmas = {
       carNumber: this.state.carNumber || '',
       assignStartTime: this.state.assignStartTime ? this.state.assignStartTime.format('YYYY-MM-DD') : '',
       assignEndTime: this.state.assignEndTime ? this.state.assignEndTime.format('YYYY-MM-DD') : '',
       cutoffStartTime: this.state.cutoffStartTime ? this.state.cutoffStartTime.format('YYYY-MM-DD') : '',
       cutoffEndTime: this.state.cutoffEndTime ? this.state.cutoffEndTime.format('YYYY-MM-DD') : '',
       outOfTime: 2
     }
     this.getSearch(Parmas)
   }
   render () {
     return <div>
       <div className='unSubmit'>
         {/* 待提交档案头部begin */}
         <div className='unSubmitHeader'>案件详情</div>
         {/* 待提交档案中部begin */}
         <div className='unSubmitMain'>
           <div className='MainHeader'>
             <span>目前待提交：</span>
             <span>{this.state.pendingFilesConut}个案件。</span>
             <span> 整改档案：</span>
             <span>{this.state.caseRectificationsCount}个案件</span>
             <span className='moreTimeBox'>
               <img src={Xiaohongdian} alt='' /> <span>超时</span>
               <span className='moreTime'>案件下派后48小时未提交一案一档</span>
             </span>
             <span className='nextMoreTimeBox'><img src={Xiaohuangdian} alt='' style={{ height: '7px', marginRight: '5px' }} />
               <span>即将超时</span>
               <div className='nextMoreTime'>距离提交一案一档时间少于2小时</div>
             </span>
           </div>
           <div className='MainMiddle'>
             <Col span={4} > <span className='serachBoxMargin'> 车牌号</span> <Input placeholder='请输入车牌号' style={{width: '60%'}} onChange={this.onChangeCarNumber} /></Col>
             <Col span={4} > <span className='serachBoxMargin'> 是否超时</span>
               <Select defaultValue='请选择' onChange={this.outOfTimeSelect} style={{ width: 100 }}>
                 <Option value='1'>是</Option>
                 <Option value='0'>否</Option>
               </Select>
             </Col>
             <Col span={6} className='serachCrimeBox'> <span className='serachBoxMargin'> 下派时间</span><RangePicker width='6vw' selectDate={this.assignTime} /></Col>
             <Col span={6} >  <span className='serachBoxMargin'> 截止时间</span>  <RangePicker width='6vw' selectDate={this.cutoffTime} /></Col>

             <Col span={4} className='serachBeginBox'><Button type='primary' onClick={this.beginSearckClick}>开始检索</Button></Col>

           </div>
           <div className='MiddleTableBox'>

             <Table
               style={{color: '#ff3300'}}
               columns={this.state.caseRectifications}
               dataSource={this.state.caseRectificationsData}
               showHeader={false}
               pagination={false}
             />
             <Table columns={this.state.pendingFiles} dataSource={this.state.pendingFilesData} showHeader={false} pagination={false} />
           </div>
           <div />
         </div>

       </div>

     </div>
   }
}
