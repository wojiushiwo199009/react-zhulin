// 派出所饼图
import React, { Component } from 'react'
import Echarts from '../../../components/common/Echarts'
import ajax from '../../../api'
export default class News extends Component {
  constructor () {
    super()
    this.state = {
      qualifiedFileCount: 1,
      rectificationFileCount: 1,
      option: {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          x: 'center',
          y: 'bottom',
          icon: 'circle',
          data: ['合格档案', '退回整改'],
          textStyle: {
            color: '#7d838b'
          }
        },
        series: [
          {
            type: 'pie',
            center: ['40%', '50%'],
            radius: ['50%', '70%'],
            label: {
              normal: {
                position: 'center'
              }
            },
            data: [{
              value: 435,
              name: '合格档案',
              itemStyle: {
                normal: {
                  color: '#0099ff'
                }
              },
              label: {
                normal: {
                  formatter: function (params) {
                    const percent = (100 - params.percent).toFixed(2) + '%'
                    return percent
                  },
                  textStyle: {
                    color: '#f2f2f2',
                    fontSize: 22
                  }
                }
              }
            }, {
              value: 100,
              name: '退回整改',
              tooltip: {
                show: false
              },
              itemStyle: {
                normal: {
                  color: '#ec5a45'
                }
              },
              label: {
                normal: {
                  formatter: '\n整改率',
                  textStyle: {
                    color: '#f2f2f2',
                    fontSize: 20
                  }
                }
              }
            }]
          }
        ]
      },
      hasData: false
    }
  }
  componentDidMount () {
    ajax.getSearchReturnFiles({}, response => {
      if (response.code === 101) {
        this.setState({
          hasData: true,
          qualifiedFileCount: response.data.qualifiedFileCount, // 合格档案
          rectificationFileCount: response.data.rectificationFileCount // 退回整改文件
        })
      }
    }, error => {
      console.log(error)
    })
  }
  render () {
    let self = this
    this.state.option.legend.formatter = function (name) {
      let oa = self.state.option.series[0].data
      for (let i = 0; i < self.state.option.series[0].data.length; i++) {
        if (name === oa[i].name) {
          return name + '  ' + oa[i].value + '件'
        }
      }
    }
    this.state.option.series[0].data[0].value = this.state.qualifiedFileCount
    this.state.option.series[0].data[1].value = this.state.rectificationFileCount
    return (
      this.state.hasData ? <Echarts options={this.state.option} data={this.state.data} width='30vw' height='30vh' /> : ''
    )
  }
}
