import React, { Component } from 'react'
import RangePicker from '../../../components/common/rangePicker/RangePicker'
import {Button} from 'antd'
import CustomPagingTable from '../../../components/common/table/TablePaging'
import ajax from '../../../api'
import { getRingOption } from '../../../utils/getEchartsOptions'
import Echarts from '../../../components/common/Echarts'
import './CheckState.scss'
export default class EveryOffice extends Component {
  constructor () {
    super()
    this.state = {
      hasData: false,
      searchCaseLists: [],
      urlData: {
        beginTime: '',
        endTime: ''
      },
      columns: [
        {
          title: '分局名称',
          dataIndex: 'officeName',
          key: 'officeName',
          render: (text, record) => (
            <div className='checkStateOfficeName'>{record.fjName}</div>
          )
        },
        {
          title: '查缉占比',
          dataIndex: 'checkRate',
          key: 'checkRate',
          render: (text, record) => (
            <div className='officeCheckRate'>{record.discoverPer}</div>
          ),
          sorter: (a, b) => {
            return a.discoverPer - b.discoverPer
          }
        },
        {
          title: '查缉案件数',
          dataIndex: 'checkNum',
          key: 'checkNum',
          render: (text, record) => (
            <div className='officeCheckNUm'>{record.caseDiscoverCount}</div>
          ),
          sorter: (a, b) => {
            return a.caseDiscoverCount - b.caseDiscoverCount
          }
        },
        {
          title: '整车查获率',
          dataIndex: 'carCheckRate',
          key: 'carCheckRate',
          render: (text, record) => (
            <div className='officeCarCheckRate'>{record.carDiscoverPer}</div>
          ),
          sorter: (a, b) => {
            return a.carDiscoverPer - b.carDiscoverPer
          }
        }
      ],
      data: [
        // {
        //   key: '1',
        //   officeName: '盘龙分局',
        //   checkRate: '2.3%',
        //   checkNum: '2',
        //   carCheckRate: '80%'
        // }
      ]
    }
  }
  checkDate = (startDate, endDate) => {
    console.log(startDate, endDate, '时间段')
    this.setState({
      beginTime: startDate,
      endTime: endDate
    })
  }
  getData = (urlData) => {
    // 各分局查缉情况searchEveryFJCaseInfo
    ajax.searchEveryFJCaseInfo(urlData, response => {
      if (response.code === 101) {
        this.setState({
          hasData: true,
          searchCaseLists: response.data
        })
      }
    }, error => {
      console.log(error)
    })
  }
  searchClick = (urlData) => {
    urlData = {
      beginTime: this.state.beginTime ? this.state.beginTime.format('YYYY-MM-DD') : '',
      endTime: this.state.endTime ? this.state.endTime.format('YYYY-MM-DD') : ''
    }
    this.getData(urlData)
  }
  componentDidMount () {
    let Parmas = {
      beginTime: '2017-01-01',
      endTime: '2019-01-01'
    }
    this.getData(Parmas)
  }
  render () {
    return (
      <div>
        <div className='checkCrimeHeader'>
          <b className='checkCrimeHeaderTitle'>各分局查缉情况</b>&nbsp;&nbsp;
          <span className='checkCrimeHeaderText'>(截止日期:2018年2月27日)</span>
        </div>
        <div className='checkSelect'>
          <div>
            <span className='checkCrimeTime'>时间段:</span><RangePicker width='5vw' selectDate={this.checkDate} />
          </div>
          <Button type='primary' className='searchCrimeButton' onClick={this.searchClick}>确认</Button>
        </div>
        <div className='checkPieChart'>
          <Echarts options={getRingOption(this.state.searchCaseLists)} width='17vw' height='22vh' />
        </div>
        {/* 搜索完出来的表格的内容 */}
        <div className='officeCheckTable'>
          {/* <TableList columns={this.state.columns} dataSource={this.state.data} /> */}
          <CustomPagingTable
            dataSource={this.state.searchCaseLists}
            columns={this.state.columns}
          />
        </div>
      </div>
    )
  }
}
