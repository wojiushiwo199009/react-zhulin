// 派出所饼图
import React, { Component } from 'react'
import Echarts from '../../../components/common/Echarts'
import Empty from '../../../components/common/empty/Empty'
import ajax from '../../../api'
export default class News extends Component {
  constructor () {
    super()
    this.state = {
      data: [],
      hasData: false,
      option: {}
    }
  }
  initChart (data) {
    let legendData = []
    let seriesData = []
    data.map((item) => {
      if (item.timeSlot !== '超过使用期限') {
        legendData.push(item.timeSlot + '年 \t\t\t| \t\t\t' + item.count + ' 辆')
        seriesData.push({
          name: item.timeSlot + '年 \t\t\t| \t\t\t' + item.count + ' 辆',
          value: item.count
        })
      } else {
        legendData.push(item.timeSlot)
        seriesData.push({
          name: item.timeSlot,
          value: item.count
        })
      }
    })
    this.setState({
      option: {
        title: {
          text: ''
        },
        color: ['#00a9ff', '#ff6600', '#fc3', '#0f9'],
        tooltip: {
          trigger: 'item',
          // formatter: `{a} <br/>{b} : {c} ({d}%)`
          formatter: function (params) {
            var res = params.seriesName + '<br/>' + params.data.name.split('|')[0] + ' : ' + params.percent + '%'
            return res
          }
        },
        legend: {
          orient: 'vertical',
          left: '77%',
          top: 'bottom',
          itemGap: 20,
          icon: 'circle',
          data: legendData,
          textStyle: {
            color: '#f2f2f2'
          }
        },
        series: [
          {
            name: '本所硬件数据',
            type: 'pie',
            radius: '60%',
            center: ['50%', '50%'],
            label: {
              show: false
            },
            data: seriesData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    })
  }
  // 获取数据
  getData () {
    let self = this
    ajax.getStatisticsHardwareData({}, response => {
      console.log(response)
      if (response.code === 101) {
        self.setState({
          hasData: true,
          data: response.data
        }, () => {
          self.initChart(this.state.data)
        })
      }
    }, error => {
      console.log(error)
    })
  }
  componentDidMount () {
    this.getData()
  }
  render () {
    return (
      <div>
        {this.state.hasData ? <Echarts options={this.state.option} width='100%' height='43vh' /> : <Empty msg='暂无数据' />}
      </div>
    )
  }
}
