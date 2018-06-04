// 派出所饼图
import React, { Component } from 'react'
import Echarts from '../../../../components/common/Echarts'
import PropTypes from 'prop-types'
export default class News extends Component {
  static propTypes = {
    PieListData: PropTypes.array
  }
  constructor () {
    super()
    this.state = {
      option: {
        title: {
          text: ''
        },
        color: ['red', 'pink', 'green', 'yellow'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: '5%',
          y: '40%',
          icon: 'circle',
          data: [],
          textStyle: {
            color: '#f2f2f2'
          }
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['45%', '50%'],
            label: {
              show: false
            },
            data: [

            ]
          }
        ]
      }
    }
  }
  render () {
    let legendData = []
    this.props.PieListData.map((data, i) => {
      legendData.push(data.branchOfficeName)
      this.state.option.series[0].data[i] = {}
      this.state.option.series[0].data[i].name = data.branchOfficeName
      this.state.option.series[0].data[i].value = data.installTotalCount
    })
    this.state.option.legend.data = legendData
    return (
      <Echarts options={this.state.option} width='26vw' height='28vh' />
    )
  }
}
