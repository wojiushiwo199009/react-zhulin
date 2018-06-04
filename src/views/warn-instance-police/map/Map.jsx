// 派出所地图
import React, { Component } from 'react'
import { Modal } from 'antd'
import ModalMap from './modal-map/ModalMap'
import ajax from '../../../api'
export default class Map extends Component {
  constructor () {
    super()
    this.state = {
      mapconfig: {
        type: ['GDSL'], // 地图类型
        center: [102.759312, 25.124456], // 中心点经纬度
        zoom: 12, // 当前地图级别
        maxZoom: 20, // 地图最大缩放级别
        minZoom: 9// 地图最小缩放级别
      },
      modalVisible: false
    }
    // this.getPoints = this.getPoints.bind(this)
    this.addHeatMap = this.addHeatMap.bind(this)
    this.mapClick = this.mapClick.bind(this)
  }

  // 地图点击方法
  mapClick () {
    let self = this
    self.setState({
      modalVisible: true
    })
  }
  // 地图上添加派出所所属地区的方法
  addPoliceMap () {
    ajax.getSearchPoliceDistribution({policeId: ''}, response => {
      let resData = response.data[0]
      if (response.code === 101) {
        let boundary = resData.boundary.split(';')
        let boundaryPoints = []
        let boundaryArray = []
        boundary.map((item) => {
          let boundaryLng = parseFloat(item)
          let boundaryLat = parseFloat(item.split(',')[1])
          boundaryPoints.push([ boundaryLng, boundaryLat ])
        })
        boundaryArray.push(boundaryPoints)
        this.map.addPolygon(boundaryArray, {
          id: resData.id,
          outLineWidth: parseInt(resData.lineWidth),
          outLineColor: [parseInt(resData.lineColor.split(',')), parseInt(resData.lineColor.split(',')[1]), parseInt(resData.lineColor.split(',')[2]), parseFloat(resData.transparency)],
          color: [parseInt(resData.lineColor.split(',')), parseInt(resData.lineColor.split(',')[1]), parseInt(resData.lineColor.split(',')[2]), parseFloat(resData.transparency)],
          onClick: this.mapClick
        })
        this.map.centerAndZoom(resData.center_lng, resData.center_lat, resData.zoom)
      }
    }, error => {
      console.log(error)
    })
  }
  // 添加热力图
  addHeatMap () {
    let pointList = []
    ajax.getSearchPoliceStationCases({policeKey: ''}, response => {
      if (response.code === 101) {
        response.data.map((item) => {
          pointList.push({lng: item.caseLocationLng, lat: item.caseLocationLat, weight: 100})
        })
      }
      this.map.drawHeatMap(pointList, {
        alpha: 1,
        blur: 8,
        radius: 15
      })
    }, error => {
      console.log(error)
    })
  }
  // 关闭对话框
  handleCancel = (e) => {
    this.setState({
      modalVisible: false
    })
    // this.addPoliceMap()
    this.addHeatMap()
  }
  // 清空地图
  cleanMap () {
    this.map.cleanMap()
  }
  componentDidMount () {
    this.map = window.TMap.map(
      this.refs.map, // 与div对应
      this.state.mapconfig
    )
    // this.addPoliceMap()
    this.addHeatMap()
  }
  render () {
    return (
      <div style={{ background: '#122346', height: '100%', paddingTop: '1vh' }}>
        <h3>盘龙区案件分布区域</h3>
        <div ref='map' id='map' />
        <Modal title='' width={1200} visible={this.state.modalVisible} onCancel={this.handleCancel} afterClose={this.handleCancel} footer={null}>
          <ModalMap style={{ width: '100%' }} />
        </Modal>
      </div>
    )
  }
}
