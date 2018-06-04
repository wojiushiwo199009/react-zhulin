import React, { Component } from 'react'
// import { Col } from 'antd'
import CustomPagingTable from '../../../components/common/table/TablePaging'
import ajax from '../../../api'
import './SearchTable.scss'
import Xiaohongdian from '../../../assets/images/xiaohongdian.png'
import Xiaohuangdian from '../../../assets/images/xiaohuangdian.png'
import Xiaolvdian from '../../../assets/images/xiaolvdian.png'
// 查询查缉情况
export default class SearchTable extends Component {
  constructor () {
    super()
    this.state = {
      pageVisible: true,
      // 表格的标题
      columns: [
        {
          title: '派出所名称',
          dataIndex: 'officeName',
          key: 'officeName',
          width: '17%',
          render: (text, record) => (
            <span>
              {record.warningBy === '0' ? <img src={Xiaolvdian} /> : null || record.warningBy === '1' ? <img src={Xiaohuangdian} /> : null || record.warningBy === '2' ? <img src={Xiaohongdian} /> : null}&nbsp;&nbsp;&nbsp;{record.policeName}
            </span>
          )
        },
        {
          title: '案件总数',
          dataIndex: 'caseNum',
          key: 'caseNum',
          width: '17%',
          render: (text, record) => (
            <div>
              <span>{record.caseCount}</span>
            </div>
          )
        },
        {
          title: '查缉数',
          dataIndex: 'checkNum',
          key: 'checkNum',
          width: '17%',
          render: (text, record) => (
            <div>
              <span>{record.caseDiscoverCount}</span>
            </div>
          )
        },
        {
          title: '查缉率',
          dataIndex: 'checkRate',
          key: 'checkNum',
          width: '17%',
          render: (text, record) => (
            <div>
              <span>{record.caseDiscoverPer}</span>
            </div>
          )
        },
        {
          title: '整车查缉数',
          dataIndex: 'allCarCheckRate',
          key: 'allCarCheckRate',
          width: '16%',
          render: (text, record) => (
            <div>
              <span>{record.carDiscoverCount}</span>
            </div>
          )
        },
        {
          title: '退回整改率',
          width: '16%',
          dataIndex: 'returnAllAlterRate',
          key: 'returnAllAlterRate',
          render: (text, record) => (
            <div className='RateSlipBox-searchTable'>
              <span>{record.correctPer}</span>
            </div>
          )
        }
      ],
      // 表格中的数据
      data: [
        // {
        //   key: '1',
        //   policeName: '龙头派出所',
        //   carDiscoverPer: '67', // 整车查获率
        //   correctPer: '67', // 退回整改率
        //   carDiscoverCount: 30, // 整车查获量
        //   discoverCount: 40, // 查获量
        //   caseDiscoverCount: 50, // 查缉案件数量
        //   caseCount: 100, // 案发总数-
        //   warningBy: '0' // 挂载
        // }
      ]
    }
  }
  componentDidMount () {
    // 分局下属派出所查缉情况
    ajax.searchFJCaseInfo({}, response => {
      console.log('111')
      if (response.code === 101) {
        this.setState({
          data: response.data
        })
      }
    }, error => {
      console.log(error)
    })
  }
  handleChange = (key) => {
    window.open('./#/check-look?fileId=' + key)
  }
  handleInputSubmit () {
    console.log('11')
  }
  // 每页个数改变时
  onShowSizeChangeInvest (current, pageSize) {
    this.setState({ pageNumInvest: current, pageSizeInvest: pageSize })
  }
  // 页码改变时
  onChangeInvest (current, pageSize) {
    this.setState({ pageNumInvest: current, pageSizeInvest: pageSize })
  }
  selectDate = (startDate, endDate) => {
    this.startDate = startDate
    this.endDate = endDate
  }
   // 分类检索点击事件
   searckClick = () => {
     let val = this.refs.classificationName.value.trim()
     if (val) {
       ajax.getStatisticsPoliceStationAlarm({}, response => {
         console.log(response)
         if (response.code === 200) {
           this.setState({
             news: response.data
           })
         }
       }, error => {
         console.log(error)
       })
     }
   }
   render () {
     return (<div className='searchTable'>
       {/* 搜索完出来的表格的内容 */}
       <CustomPagingTable
         dataSource={this.state.data}
         columns={this.state.columns}
         yScroll={700}
         //  pageVisible={this.state.searchCaseLists.length > 5}
         //  pageNum={this.state.pageNumInvest}
         //  pageSize={this.state.pageSizeInvest}
         //  currentPage={this.state.currentPage}
         //  onShowSizeChange={this.onShowSizeChangeInvest}
         //  onChange={this.onChangeInvest}
         //  total={this.state.searchCaseLists.length}
       />
     </div>)
   }
}
