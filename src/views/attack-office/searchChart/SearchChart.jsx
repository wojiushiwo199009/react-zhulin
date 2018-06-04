import React, { Component } from 'react'
// import RangePicker from '../../../components/common/rangePicker/RangePicker'
import { Col } from 'antd'
import PropTypes from 'prop-types'
// import TableList from '../table-list/TableList'
import ajax from '../../../api'
import Progress from '../progress-item/Progress'
import CustomPagingTable from '../../../components/common/table/TablePaging'
import Xiaohongdian from '../../../assets/images/xiaohongdian.png'
import Xiaohuangdian from '../../../assets/images/xiaohuangdian.png'
import Xiaolvdian from '../../../assets/images/xiaolvdian.png'
// function handleChange (value) {
//   console.log(`selected ${value}`)
// }
// 查询查缉情况
// const searchCaseInfos = [
//   {
//     'officeName': '龙头派出所',
//     'carDiscoverPer': 20,
//     'carDiscoverCount': 20,
//     'discoverCount': 45,
//     'caseDiscoverCount': 47,
//     'caseCount': 100
//   }
// ]
export default class SearchChart extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pageVisible: true,
      columns: [
        {
          dataIndex: 'officeName',
          key: 'officeName',
          width: '15%',
          render: (text, record) => (
            <div className='clearfix'>
              {record.warningBy === '1' ? <img src={Xiaolvdian} /> : null || record.warningBy === '2' ? <img src={Xiaohuangdian} /> : null || record.warningBy === '3' ? <img src={Xiaohongdian} /> : null}&nbsp;&nbsp;&nbsp;{record.policeName}
            </div>
          )
        },
        {
          dataIndex: 'rate',
          key: 'rate',
          width: '55%',
          render: (text, record) => {
            let allNum = record.carDiscoverCount + record.discoverCount + record.caseDiscoverCount + record.caseCount
            return (
              <div className='RateSlipBox'>
                <div className='carloadDiscoverBox-office'>
                  <Col span={5} className='carloadDiscover'>整车查获率（%）</Col>
                  <Col span={19} className='carloadDiscoverText'>{parseFloat(record.carDiscoverPer)}%&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='carloadDiscoverTextNote'>退回整改率:{record.correctPer}</span></Col>
                </div>
                <div className='carloadDiscoverBox-office' style={{ display: this.props.checkedList.indexOf('整车查获量') === -1 ? 'none' : 'inline-block' }}>
                  <Col span={5} className='carloadDiscover'>整车查获量（件）</Col>
                  <Col span={19} className='carloadDiscoverText2'>
                    <Progress caseNum={parseInt(record.carDiscoverCount)} percent={record.carDiscoverCount / allNum * 100} style={{ width: '100%' }} /></Col>
                </div>
                <div className='carloadDiscoverBox-office' style={{ display: this.props.checkedList.indexOf('查获量') === -1 ? 'none' : 'inline-block' }}>
                  <Col span={5} className='carloadDiscover'>查获量（件）</Col>
                  <Col span={19} className='carloadDiscoverText2'>
                    <Progress caseNum={parseInt(record.discoverCount)} percent={record.discoverCount / allNum * 100} style={{ width: '100%' }} /></Col>
                </div>
                <div className='carloadDiscoverBox-office' style={{ display: this.props.checkedList.indexOf('查缉案件数量') === -1 ? 'none' : 'inline-block' }}>
                  <Col span={5} className='carloadDiscover'>查缉案件数量（件）</Col>
                  <Col span={19} className='carloadDiscoverText2'>
                    <Progress caseNum={parseInt(record.caseDiscoverCount)} percent={record.caseDiscoverCount / allNum * 100} style={{ width: '100%' }} /></Col>
                </div>
                <div className='carloadDiscoverBox-office' style={{ display: this.props.checkedList.indexOf('案件总量') === -1 ? 'none' : 'inline-block' }}>
                  <Col span={5} className='carloadDiscover'>案发总数（件）</Col>
                  <Col span={19} className='carloadDiscoverText2'>
                    <Progress caseNum={parseInt(record.caseCount)} percent={record.caseCount / allNum * 100} style={{ width: '100%' }} /></Col>
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
        //   warningBy: 0 // 挂载
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
     return (<div className='searchChart'>
       <CustomPagingTable
         dataSource={this.state.data}
         columns={this.state.columns}
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
SearchChart.propTypes = {
  checkedList: PropTypes.array
}
