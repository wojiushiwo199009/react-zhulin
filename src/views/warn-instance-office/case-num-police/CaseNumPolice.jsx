// 各所案件数量
import React, { Component } from 'react'
import { Badge, Tooltip, Icon, Modal } from 'antd'
import ajax from '../../../api'
import Echarts from '../../../components/common/Echarts'
import PoliceList from './police-list/PoliceList'
import Empty from '../../../components/common/empty/Empty'
export default class UnSubmit extends Component {
  constructor () {
    super()
    this.state = {
      option: { },
      showModal: false,
      hasData: false,
      overdueCaseCount: 0
    }
    this.showModal = this.showModal.bind(this)
  }
  showModal () {
    this.setState({
      showModal: true
    })
  }
  // 关闭对话框
  handleOnCancel = (e) => {
    this.setState({
      showModal: false
    })
  }
  initChart (data) {
    let legendData = []
    let seriesData0 = []
    let seriesData1 = []
    data.map((item) => {
      legendData.push(item.policeStationName)
    })
    data.slice(0, 3).map((item) => {
      seriesData0.push({
        value: item.caseTotalCount,
        name: item.policeStationName
      })
    })
    data.slice(3).map((item) => {
      seriesData1.push({
        value: item.caseTotalCount,
        name: item.policeStationName
      })
    })
    let allCaseNum = 0
    for (let i in seriesData0) {
      allCaseNum += seriesData0[i].value
    }
    for (let j in seriesData1) {
      allCaseNum += seriesData1[j].value
    }
    this.setState({
      option: {
        color: ['#00b6ff', '#3399ff', '#0cc', '#6ff', '#c9f', '#f33', '#f96', '#fc3', '#0f9'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'right',
          icon: 'circle',
          data: legendData,
          formatter: function (name) {
            for (let i = 0; i < seriesData0.length; i++) {
              if (name === seriesData0[i].name) {
                return name + '  ' + parseInt((seriesData0[i].value / allCaseNum).toFixed(2) * 100) + '%'
              }
            }
            for (let i = 0; i < seriesData1.length; i++) {
              if (name === seriesData1[i].name) {
                return name + '  ' + parseInt((seriesData1[i].value / allCaseNum).toFixed(2) * 100) + '%'
              }
            }
          },
          textStyle: {
            color: '#7f90b7'
          }
        },
        series: [
          {
            name: '派出所',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '45%'],
            center: ['40%', '45%'],
            label: {
              show: false
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: seriesData0
          },
          {
            name: '派出所',
            type: 'pie',
            radius: ['60%', '75%'],
            center: ['40%', '45%'],
            label: {
              show: false
            },
            data: seriesData1
          }
        ]
      }
    })
  }
  // 得到数据
  getData () {
    let self = this
    ajax.getStatisticsPoliceStationCase({}, response => {
      console.log(response)
      if (response.code === 101) {
        self.setState({
          hasData: true,
          data: response.data.policeStationCaseCountList,
          overdueCaseCount: response.data.overdueCaseCount
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
      <div className='case-num-police'>
        <h3>
          <span>各所案件数量</span>
          <span style={{marginLeft: '10px', fontWeight: 'normal'}}>
            <Badge count={this.state.overdueCaseCount}>
              <span>超期未报案件</span>
            </Badge>
            <Tooltip placement='bottom' title='布控后48小时未上报一案一档材料'>
              <Icon type='question-circle-o' />
            </Tooltip>
          </span>
        </h3>
        {this.state.hasData ? <Echarts options={this.state.option} width='35vw' height='24vh' /> : <Empty msg='暂无数据' />}
        <div className='show-police-details' onClick={this.showModal}>查看详情</div>
        <Modal
          title='各所案件数量分布' width={600} style={{ top: '80' }} onCancel={this.handleOnCancel}
          visible={this.state.showModal} footer={null} ><PoliceList /></Modal>
      </div>
    )
  }
}
