
import React, { Component } from 'react'
import RangePicker from '../../components/common/rangePicker/RangePicker'
import {Col, Select, Button, Input} from 'antd'
import CustomPagingTable from '../../components/common/table/TablePaging'
import ajax from '../../api'
import './News.scss'
const Option = Select.Option
export default class News extends Component {
  constructor () {
    super()
    this.state = {
      pageVisible: true,
      urlParmas: {
        messageInfo: '',
        beginTime: '',
        endTime: '',
        messageType: '',
        pageSize: '',
        pageNum: ''
      },
      columns: [
        {
          dataIndex: 'beginTime',
          key: 'beginTime',
          render: (text, record) => (
            <div className='officeCheckNUm'>{record.messageType}</div>
          )
        },
        {
          dataIndex: 'issueTime',
          key: 'issueTime',
          render: (text, record) => (
            <div className='officeCheckNUm'>{record.messageInfo}</div>
          )
        },
        {
          dataIndex: 'carNum',
          key: 'carNum',
          render: (text, record) => (
            <div className='officeCheckNUm'>{record.sentTime}</div>
          )
        }
      ],
      data: [
        // {
        //   key: '1',
        //   messageType: '退回整改1',
        //   messageInfo: '需要修改1',
        //   sentTime: '2017-01-01 11:03'
        // },
        // {
        //   key: '2',
        //   messageType: '一案一档提交1',
        //   messageInfo: '需要修改1',
        //   sentTime: '2017-01-02 12:03'
        // },
        // {
        //   key: '3',
        //   messageType: '挂牌警告1',
        //   messageInfo: '需要修改1',
        //   sentTime: '2017-01-03 13:03'
        // },
        // {
        //   key: '4',
        //   messageType: '一案一档提交1',
        //   messageInfo: '需要修改1',
        //   sentTime: '2017-01-04 14:03'
        // },
        // {
        //   key: '5',
        //   messageType: '退回整改',
        //   messageInfo: '需要修改',
        //   sentTime: '2017-01-05 15:03'
        // }
      ]
    }
    this.searchClick = this.searchClick.bind(this)
    this.caseDate = this.caseDate.bind(this)
    this.selectCrimeChange = this.selectCrimeChange.bind(this)
    this.selectBelongTOPolice = this.selectBelongTOPolice.bind(this)
  }
  // handleChange = (key) => {
  //   window.open('./#/check-look?fileId=' + key)
  // }
  // 每页个数改变时
  onShowSizeChangeInvest = (current, pageSize) => {
    this.setState({ pageNum: current, pageSize: pageSize }, () => {
      this.getData()
    })
  }
  // 页码改变时
  onChangeInvest = (pageNum, pageSize) => {
    this.setState({ pageSize,
      pageNum }, () => {
      this.searchClick()
    })
    // console.log(current, pageSize)
  }
  // 时间筛选框
  caseDate = (startDate, endDate) => {
    let StartDate = startDate
    let EndDate = endDate
    this.setState({
      beginTime: StartDate,
      endTime: EndDate
    })
  }
  // 内容搜索框
  getValue = (e) => {
    this.setState({ messageInfo: e.target.value })
  }
  // 消息类型的选项框
  selectCrimeChange = (value) => {
    this.setState({
      messageType: value
    })
    console.log(`selected ${value}`)
  }
  // 所属派出所的选项框
   selectBelongTOPolice = (value) => {
     this.setState({
       stationId: value
     })
   }
  // 分类检索点击事件
  searchClick = () => {
    let datas = {
      messageInfo: this.state.messageInfo || '',
      messageType: this.state.messageType || '',
      stationId: this.state.stationId || '',
      beginTime: this.state.beginTime ? this.state.beginTime.format('YYYY-MM-DD') : '',
      endTime: this.state.endTime ? this.state.endTime.format('YYYY-MM-DD') : '',
      pageSize: this.state.pageNum || 10,
      pageNum: this.state.pageSize || 1
    }
    this.getData(datas)
  }
  getData = (urlParmas) => {
    ajax.searchMessageList(urlParmas, response => {
      if (response.code === 101) {
        this.setState({
          data: response.data.result
        })
      }
    }, error => {
      console.log(error)
    })
  }
  componentDidMount () {
    let Parmas = {
      messageInfo: '',
      messageType: '',
      beginTime: '',
      endTime: '',
      pageSize: this.state.current || 1,
      pageNum: this.state.pageSize || 10
    }
    this.getData(Parmas)
  }
  render () {
    return (<div>
      <div className='serachBox-NewsPolice'>
        <Col span={6} className='serachCrimeBox'>内容搜索&nbsp;&nbsp;&nbsp;<Input placeholder='请输入名称' style={{ width: 250 }} onChange={this.getValue} /></Col>
        <Col span={10} > <span className='serachCrime'>下派时间</span>  <RangePicker width='10vw' selectDate={this.caseDate} /></Col>
        <Col span={4} >
          <Col span={6} className='searchCrimeBox' style={{ textAlign: 'right' }}>消息类型:&nbsp;&nbsp;&nbsp;</Col>
          <Col span={18} >
            <Select defaultValue='一案一档退回整改' onChange={this.selectCrimeChange} style={{ width: 120 }}>
              <Option value='1'>一案一档退回整改</Option>
              <Option value='2'>工作挂牌</Option>
              <Option value='3'>一案一档待提交</Option>
            </Select>
          </Col>
        </Col>
        <Col span={4} ><Button type='primary' className='serachCrimeButton' onClick={this.searchClick}>开始检索</Button></Col>
      </div>
      {/* 搜索完出来的表格的内容 */}
      <div>
        <CustomPagingTable
          dataSource={this.state.data}
          columns={this.state.columns}
          pageVisible={this.state.data.length > 0}
          pageNum={this.state.pageNum}
          pageSize={this.state.pageSize}
          onShowSizeChange={this.onShowSizeChangeInvest}
          onChange={this.onChangeInvest}
          total={this.state.data.length}
        />
      </div>
    </div>)
  }
}
