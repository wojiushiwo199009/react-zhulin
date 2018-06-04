// 布控派出所折线图
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Echarts from '../../../components/common/Echarts'
import Empty from '../../../components/common/empty/Empty'
export default class LineChart extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [13, 25, 901, 934, 1290, 1330, 1320, 22, 35],
      hasData: false,
      option: {}
    }
  }
  initChart (data) {
    this.setState({
      option: {
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            return params[0].value
          }
        },
        xAxis: {
          type: 'category',
          axisLine: {
            onZero: false,
            lineStyle: {
              color: '#C9C9C9'
            }
          },
          splitLine: {
            show: false
          },
          data: ['00', '02', '04', '06', '08', '10', '12', '14', '16', '18', '20', '22', '24']
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: '#C9C9C9'
            }
          }
        },
        series: [{
          data: this.props.data,
          type: 'line'
        }]
      }
    })
  }

  componentDidMount () {
    this.setState({
      hasData: true
    }, () => {
      this.initChart()
    })
  }

  render () {
    return (
      <div style={{height: '100%'}}>
        {this.state.hasData ? <Echarts options={this.state.option} data={this.props.data} width='100%' height='100%' /> : <Empty msg='暂无数据' />}
      </div>

    )
  }
}
LineChart.propTypes = {
  data: PropTypes.array
}
