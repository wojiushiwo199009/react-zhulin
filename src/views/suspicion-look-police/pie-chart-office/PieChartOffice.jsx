// 各分局发案总数饼图
import React, { Component } from 'react'
import ajax from '../../../api'
import Echarts from '../../../components/common/Echarts'
import Empty from '../../../components/common/empty/Empty'
export default class PieChartOffice extends Component {
  constructor () {
    super()
    this.state = {
      data: [],
      hasData: false,
      option: {}
    }
  }
  initChart (data) {
    this.setState({
      option: {
        color: ['#0099ff', '#ff6600', '#ffcc33', '#00ff99'],
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'right',
          y: 'center',
          icon: 'circle',
          data: [data[0].branchOfficeName, data[1].branchOfficeName, data[2].branchOfficeName, data[3].branchOfficeName],
          textStyle: {
            color: '#7d838b'
          }
        },
        series: [
          {
            type: 'pie',
            center: ['40%', '45%'],
            radius: ['50%', '70%'],
            label: {
              normal: {
                position: 'center'
              }
            },
            data: [{
              value: data[0].caseTotalCount,
              name: data[0].branchOfficeName,
              label: {
                show: false
              }
            }, {
              value: data[1].caseTotalCount,
              name: data[1].branchOfficeName,
              tooltip: {
                show: true
              },
              label: {
                normal: {
                  formatter: function (params) {
                    return data[0].caseTotalCount + data[1].caseTotalCount + data[2].caseTotalCount + data[3].caseTotalCount
                  },
                  textStyle: {
                    color: '#f2f2f2',
                    fontSize: 22
                  }
                },
                textStyle: {
                  color: '#f2f2f2',
                  fontSize: 20
                }
              }
            },
            {
              value: data[2].caseTotalCount,
              name: data[2].branchOfficeName,
              tooltip: {
                show: true
              },
              label: {
                normal: {
                  formatter: '\n案件数量',
                  textStyle: {
                    color: '#f2f2f2',
                    fontSize: 22
                  }
                },
                textStyle: {
                  color: '#f2f2f2',
                  fontSize: 20
                }
              }
            },
            {
              value: data[3].caseTotalCount,
              name: data[3].branchOfficeName,
              tooltip: {
                show: true
              },
              label: {
                show: false
              }
            }]
          }
        ]
      }
    })
  }
  // 获取数据
  getData () {
    let self = this
    ajax.getStatisticsBranchOfficeCase({}, response => {
      if (response.code === 101) {
        self.setState({
          hasData: true,
          data: response.data.branchOfficeCaseCountList
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
        {this.state.hasData ? <Echarts options={this.state.option} width='24vw' height='30vh' /> : <Empty msg='暂无数据' /> }
      </div>

    )
  }
}
