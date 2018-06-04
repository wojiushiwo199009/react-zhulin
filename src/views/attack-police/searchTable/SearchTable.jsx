
import React, { Component } from 'react'
import RangePicker from '../../../components/common/rangePicker/RangePicker'
import {Col, Select, Button} from 'antd'
import CustomPagingTable from '../../../components/common/table/TablePaging'
// import Progress from './progress/Progress'
// import TableList from '../table-list/TableList'
import ajax from '../../../api'
import './SearchTable.scss'
const Option = Select.Option
export default class SearchTable extends Component {
  constructor () {
    super()
    this.state = {
      pageVisible: true, //
      searchCaseLists: [],
      tatalPage: 0,
      urlParmas: {
        beginTime: '',
        endTime: '',
        issueBeginTime: '',
        issueEndTime: '',
        caseState: '',
        pageSize: '',
        pageNum: ''
      },
      columns: [
        {
          title: '案件车牌号',
          dataIndex: 'carNum',
          key: 'carNum'
          // render: text => <a href='#'>{text}</a>
        },
        {
          title: '案件时间',
          dataIndex: 'beginTime',
          key: 'beginTime'
        },
        {
          title: '下发时间',
          dataIndex: 'issueTime',
          key: 'issueTime'
        },
        {
          title: '目前状态',
          dataIndex: 'currentState',
          key: 'currentState',
          render: (text, record, index) => {
            // console.log(record, 'record')
            let Text = record.states === '3' ? '完成查缉' : '查缉中'
            let statesColor = record.states === '3' ? 'green' : 'yellow'
            return (<span style={{color: statesColor}} >
              {Text}
            </span>)
          }
        },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          render: (text, record, index) => {
            let Text = record.states === '3' ? '查看一案一档' : ''

            return (<span style={{cursor: 'pointer'}} onClick={() => this.handleChange(record.key)}>
              {Text}
            </span>)
          }
        }
      ]
    }
  }
  // 跳转到一案一档页面
  handleChange = (key) => {
    window.open('./#/check-look?fileId=' + key)
  }
  // 每页个数改变时
  onShowSizeChange (current, pageSize) {
    this.setState({ pageNum: current, pageSize: pageSize }, () => {
      this.searckClick()
    })
  }
  // 页码改变时
  onChangePage (current, pageSize) {
    this.setState({ pageNum: current, pageSize: pageSize }, () => {
      this.searckClick()
    })
  }
  // 案发时间
  caseDate = (startDate, endDate) => {
    let StartDate = startDate
    let EndDate = endDate
    console.log(StartDate, EndDate, 'oo')
    this.setState({
      beginTime: StartDate,
      endTime: EndDate
    })
  }
  // 下发时间
  issueDate = (startDate, endDate) => {
    let StartDate = startDate
    let EndDate = endDate
    this.setState({
      issueBeginTime: StartDate,
      issueEndTime: EndDate
    })
  }
  // 案件状态
  selectChange= (value) => {
    console.log('value', value)
    let Value = parseInt(value)
    // this.caseState = `${value}`

    this.setState({
      caseState: Value + ''
    })
    console.log(`selected ${value}`)
  }
   // 分类检索点击事件
   searckClick = () => {
     let urlParmas = {
       beginTime: this.state.beginTime ? this.state.beginTime.format('YYYY-MM-DD') : '',
       endTime: this.state.endTime ? this.state.endTime.format('YYYY-MM-DD') : '',
       issueBeginTime: this.state.endTime ? this.state.issueBeginTime.format('YYYY-MM-DD') : '',
       issueEndTime: this.state.issueEndTime ? this.state.issueEndTime.format('YYYY-MM-DD') : '',
       caseState: this.state.caseState || '1',
       pageSize: this.state.pageSize || 1,
       pageNum: this.state.pageNum || 10
     }
     this.getData(urlParmas)
   }
   getData=(urlParmas) => {
     ajax.searchCaseList(urlParmas, response => {
       console.log(response, 'pppp')
       console.log('this.urlParmas', urlParmas)
       if (response.code === 101) {
         this.setState({
           searchCaseLists: response.data.result,
           tatalPage: response.data.count
         })
         console.log('searchTall', this.state.searchTall)
       }
     }, error => {
       console.log(error)
     })
   }
   componentDidMount () {
     let Parmas = {
       beginTime: '',
       endTime: '',
       issueBeginTime: '',
       issueEndTime: '',
       caseState: 1,
       pageSize: 1,
       pageNum: 10
     }
     this.getData(Parmas)
   }
   render () {
     return (<div>
       <div className='serachBox'>
         <Col span={9} className='serachCrimeBox'> <span className='serachCrime'> 案发时间</span><RangePicker width='10vw' selectDate={this.caseDate} /></Col>
         <Col span={9} > <span className='serachCrime'> 下发时间</span>  <RangePicker width='10vw' selectDate={this.issueDate} /></Col>
         <Col span={6} >

           <Col span={6} className='serachCrimeBox'> 案件状态</Col>
           <Col span={10} >
             <Select defaultValue='1' onChange={this.selectChange} style={{ width: 120 }}>
               <Option value='1'>全部</Option>
               <Option value='3'>查缉完毕</Option>
               <Option value='0'>查缉中</Option>
             </Select>
           </Col>
           <Col span={8} ><Button type='primary' className='serachCrimeButton' onClick={this.searckClick}>确认</Button></Col>
         </Col>
       </div>
       {/* 搜索完出来的表格的内容 */}
       <div>
         <CustomPagingTable
           dataSource={this.state.searchCaseLists}
           columns={this.state.columns}
           pageVisible
           pageNum={this.state.pageNum}
           pageSize={this.state.pageSize}
           currentPage={this.state.currentPage}
           onShowSizeChange={(current, pageSize) => this.onShowSizeChange(current, pageSize)}
           onChange={(current, pageSize) => this.onChangePage(current, pageSize)}
           total={this.state.searchCaseLists.length || 0}
           tatalPage={this.state.tatalPage}
         />
       </div>
     </div>)
   }
}
