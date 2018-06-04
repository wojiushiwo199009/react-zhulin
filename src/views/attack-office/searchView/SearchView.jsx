import React, { Component } from 'react'
// import RangePicker from '../../../components/common/rangePicker/RangePicker'
// import { Col } from 'antd'
// import TableList from '../table-list/TableList'
import ajax from '../../../api'
import CustomPagingTable from '../../../components/common/table/TablePaging'
import Progress from '../progress-item/Progress'
import Xiaohongdian from '../../../assets/images/xiaohongdian.png'
import Xiaohuangdian from '../../../assets/images/xiaohuangdian.png'
import Xiaolvdian from '../../../assets/images/xiaolvdian.png'
import './SearchView.scss'
// function handleChange (value) {
//   console.log(`selected ${value}`)
// }
export default class SearchView extends Component {
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
          width: '15%',
          render: (text, record) => (
            <span>
              {record.warningBy === '0' ? <img src={Xiaolvdian} /> : null || record.warningBy === '1' ? <img src={Xiaohuangdian} /> : null || record.warningBy === '2' ? <img src={Xiaohongdian} /> : null}&nbsp;&nbsp;&nbsp;{record.policeName}
            </span>
          )
        },
        {
          title: '整车查缉率(%)',
          dataIndex: 'allCarCheckRate',
          key: 'allCarCheckRate',
          width: '15%',
          render: (text, record) => (
            <div>
              <span>{record.carDiscoverPer}</span>
            </div>
          )
        },
        {
          title: '退回整改率(%)',
          dataIndex: 'returnAllAlterRate',
          key: 'returnAllAlterRate',
          width: '15%',
          render: (text, record) => (
            <div>
              <span>{record.correctPer}</span>
            </div>
          )
        },
        {
          title: '',
          dataIndex: 'rate',
          key: 'rate',
          width: '55%',
          render: (text, record) => {
            let allNum = record.carDiscoverCount + record.discoverCount + record.caseDiscoverCount + record.caseCount
            return (
              <div className='RateSlipBox-searchView'>
                <div className='allCarCheckNum slipBox'>
                  <Progress caseNum={record.carDiscoverCount} percent={record.carDiscoverCount / allNum * 100} style={{width: '100%'}} />
                </div>
                <div className='checkNum slipBox'>
                  <Progress caseNum={record.discoverCount} percent={record.discoverCount / allNum * 100} style={{width: '100%'}} />
                </div>
                <div className='checkCaseNum slipBox'>
                  <Progress caseNum={record.caseDiscoverCount} percent={record.caseDiscoverCount / allNum * 100} style={{width: '100%'}} />
                </div>
                <div className='caseNum slipBox'>
                  <Progress caseNum={record.caseCount} percent={record.caseCount / allNum * 100} style={{width: '100%'}} />
                </div>
              </div>
            )
          }
        }
      ],
      // 表格中的数据
      data: [
        // {
        //   key: '1',
        //   policeName: '龙头派出所',
        //   carDiscoverPer: '67%', // 整车查获率
        //   correctPer: '67%', // 退回整改率
        //   carDiscoverCount: 30, // 整车查获量
        //   discoverCount: 40, // 查获量
        //   caseDiscoverCount: 50, // 查缉案件数量
        //   caseCount: 100, // 案发总数
        //   warningBy: '0' // 挂载
        // }
      ]
    }
  }
  componentDidMount () {
    // 分局下属派出所查缉情况
    ajax.searchFJCaseInfo({}, response => {
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
     return (<div className='searchView'>
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
     </div>
     )
   }
}
