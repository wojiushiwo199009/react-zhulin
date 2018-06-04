// 布控派出所饼图
import React, { Component } from 'react'
import { Modal } from 'antd'
import PropTypes from 'prop-types'
import Echarts from '../../../components/common/Echarts'
import Empty from '../../../components/common/empty/Empty'
import PoliceList from './police-list/PoliceList'
export default class PoliceNum extends Component {
  constructor (props) {
    super(props)
    this.state = {
      option: {},
      showModal: false
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
    data.data.map((item) => {
      legendData.push(item.policeStationName)
    })
    data.data.slice(0, 3).map((item) => {
      seriesData0.push({
        value: item.caseTotalCount,
        name: item.policeStationName
      })
    })
    data.data.slice(3).map((item) => {
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
          right: 'right',
          y: 'center',
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
            radius: [0, '40%'],
            center: ['40%', '35%'],
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
            radius: ['50%', '65%'],
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

  componentWillReceiveProps (nextProps) {
    if (nextProps.data.length > 0) {
      this.setState({
        data: nextProps
      }, () => { this.initChart(this.state.data) })
    } else {
      this.setState({
        data: {
          data: []
        }
      }, () => { this.initChart(this.state.data) })
    }
  }
  componentDidMount () {
    if (this.props.data.length > 0) {
      let resData = this.props.data
      resData.map((item, index) => {
        item.key = index
      })
      this.setState({
        data: resData
      }, () => { this.initChart(this.state.data) })
    }
  }
  render () {
    return (
      <div className='case-num-police'>
        <h3>布控派出所</h3>
        <div style={{width: '100%', height: '34vh'}} >
          {this.props.data.length > 0 ? <Echarts options={this.state.option} style={{width: '100%', height: '100%'}} /> : <Empty msg='暂无数据' />}
        </div>
        <div className='show-details' onClick={this.showModal}>列表</div>
        <Modal
          title='各所案件数量分布' width={600} style={{ top: 80, left: '30%' }} onCancel={this.handleOnCancel}
          visible={this.state.showModal} footer={null} ><PoliceList data={this.props.data} /></Modal>
      </div>
    )
  }
}
PoliceNum.propTypes = {
  data: PropTypes.array
}
