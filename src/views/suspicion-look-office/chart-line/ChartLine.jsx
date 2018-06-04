// 派出所饼图
import React, { Component } from 'react'
import {Col, Table, Button} from 'antd'
import ajax from '../../../api'
// import moment from 'moment'
import Echarts from '../../../components/common/Echarts'
import './ChartLine.scss'
export default class ChartLine extends Component {
  constructor () {
    super()
    this.state = {
      tableShow: false,
      statisticsSuspectAddresss: [],
      columns: [
        {
          title: '户籍地区',
          dataIndex: 'statisticsType',
          key: 'statisticsType'

          // render: text => <a href='#'>{text}</a>
        },
        {
          title: '占比',
          dataIndex: 'percent',
          key: 'percent',
          render: (text, record, index) => {
            return (<span >
              {record.percent} %
            </span>)
          }

        },
        {
          title: '人数',
          dataIndex: 'userCount',
          key: 'userCount'

        }

      ],
      option: {
        color: '#0099ff',
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            return params[0].axisValue + params[0].data + '个人'
          }
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisLine: {
            onZero: false,
            lineStyle: {
              color: '#1b376d',
              type: 'dashed'
            }
          },
          axisLabel: {
            color: '#C9C9C9'
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            onZero: false,
            lineStyle: {
              color: '#1b376d',
              type: 'dashed'
            }
          },
          axisLabel: {
            color: '#C9C9C9'
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: ['#2a364b'],
              type: 'dashed'
            }
          }
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      },
      data:
        {
          installTotalCount: 1000,
          lineData:
          [
            {
              statisticsType: '2018-01 - 01',
              userCount: 200
            },
            {
              statisticsType: '2018-01 - 02',
              userCount: 300
            },
            {
              statisticsType: '2018-01 - 03',
              userCount: 500
            }
          ]
        },
      // beginTime: '',
      // endTime: '',
      seriesData: [],
      lineData: []
    }
  }
  // 选择日期
  // selectDate = (startDate, endDate) => {
  //   let StartDate = moment(startDate).format('YYYY-MM-DD HH:MM:SS')
  //   let EndDate = moment(endDate).format('YYYY-MM-DD HH:MM:SS')
  //   this.setState({
  //     beginTime: StartDate,
  //     endTime: EndDate
  //   })
  // }
  // 分类检索点击事件
  // searckClick = () => {
  //   let seriesData = []
  //   ajax.getStatisticsInstallData({ startTime: this.state.beginTime, endTime: this.state.endTime }, response => {
  //     if (response.code === 101) {
  //       response.data.lineData.map((item) => {
  //         seriesData.push(item.instalNumber)
  //       })
  //       this.setState({
  //         lineData: response.data.lineData,
  //         seriesData: seriesData,
  //         installTotalCount: response.data.installTotalCount
  //       })
  //     }
  //   }, error => {
  //     console.log(error)
  //   })
  // }
  // 点击更多的时候
  tableCallback=() => {
    this.setState({
      tableShow: true
    })
  }
  // 点关闭的时候
  hiddenTable=() => {
    this.setState({
      tableShow: false
    })
  }
  componentDidMount () {
    let seriesData = []
    ajax.statisticsSuspectAddress({}, response => {
      console.log(response, 'statisticsSuspectAddress')
      if (response.code === 101) {
        response.data.map((item) => {
          seriesData.push(item.userCount)
        })
        this.setState({
          lineData: response.data,
          seriesData: seriesData,
          statisticsSuspectAddresss: response.data
          // installTotalCount: response.data.installTotalCount
        })
      }
    }, error => {
      console.log(error)
    })
  }
  render () {
    let xAxisData = []
    this.state.lineData.map((item) => {
      xAxisData.push(item.statisticsType)
    })
    this.state.option.xAxis.data = xAxisData
    return (
      <div>
        <div className='ChartLineBox'>
          {this.state.tableShow === true ? <div className='tableBox'>
            <div className='mainLineText2'>
             户籍分布
            </div>
            <div><Table columns={this.state.columns} dataSource={this.state.statisticsSuspectAddresss} pagination={false} /></div>
            <div className='hiddenTable'> <Button type='primary' className='tableButton' onClick={this.hiddenTable}> 关闭</Button></div>

          </div> : ''
          }

          <div className='mainLineText'>
            <Col span={20}>户籍分布</Col>
            <Col span={4} className='moreText' onClick={this.tableCallback} >更多</Col>
          </div>
          <Echarts options={this.state.option} data={this.state.seriesData} width='100%' height='450px' />
        </div>

      </div>
    )
  }
}
