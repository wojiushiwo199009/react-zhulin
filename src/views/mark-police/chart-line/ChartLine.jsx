// 派出所饼图
import React, { Component } from 'react'
import { Button } from 'antd'
import ajax from '../../../api'
import moment from 'moment'
import Echarts from '../../../components/common/Echarts'
import RangePicker from '../../../components/common/rangePicker/RangePicker'
export default class ChartLine extends Component {
  constructor () {
    super()
    this.state = {
      option: {
        color: '#0099ff',
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            return params[0].axisValue + '安装  ' + params[0].data + '个'
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
              date: '2018-01 - 01',
              count: 200
            },
            {
              date: '2018-01 - 02',
              count: 300
            },
            {
              date: '2018-01 - 03',
              count: 500
            }
          ]
        },
      beginTime: '',
      endTime: '',
      seriesData: [],
      lineData: []
    }
  }
  // 选择日期
  selectDate = (startDate, endDate) => {
    let StartDate = moment(startDate).format('YYYY-MM-DD')
    let EndDate = moment(endDate).format('YYYY-MM-DD')
    this.setState({
      beginTime: StartDate,
      endTime: EndDate
    })
  }
  // 分类检索点击事件
  searckClick = () => {
    let seriesData = []
    ajax.getStatisticsInstallData({ startTime: this.state.beginTime, endTime: this.state.endTime }, response => {
      if (response.code === 101) {
        response.data.lineData.map((item) => {
          seriesData.push(item.instalNumber)
        })
        this.setState({
          lineData: response.data.lineData,
          seriesData: seriesData,
          installTotalCount: response.data.installTotalCount
        })
      }
    }, error => {
      console.log(error)
    })
  }
  componentDidMount () {
    let seriesData = []
    ajax.getStatisticsInstallData({startTime: this.state.beginTime, endTime: this.state.endTime}, response => {
      if (response.code === 101) {
        response.data.lineData.map((item) => {
          seriesData.push(item.instalNumber)
        })
        this.setState({
          lineData: response.data.lineData,
          seriesData: seriesData,
          installTotalCount: response.data.installTotalCount
        })
      }
    }, error => {
      console.log(error)
    })
  }
  render () {
    let xAxisData = []
    this.state.lineData.map((item) => {
      xAxisData.push(item.times)
    })
    this.state.option.xAxis.data = xAxisData
    return (
      <div>
        <span className='total'>安装总数：<span className='total-num'> {this.state.installTotalCount}</span></span>
        <span className='search'>
          <span className='search-key'>
            <span className='label normal-color'>选择时间段&nbsp;</span>
            <RangePicker width='8vw' selectDate={this.selectDate} />
          </span>
          <Button type='primary' onClick={this.searckClick}>确认</Button>
        </span>
        <Echarts options={this.state.option} data={this.state.seriesData} width='100%' height='40vh' />
      </div>
    )
  }
}
