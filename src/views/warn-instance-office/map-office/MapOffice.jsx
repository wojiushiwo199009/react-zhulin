// 分局地图
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
      modalVisible: false,
      modalId: ''
    }
    this.polygonClick = this.polygonClick.bind(this)
    this.showModal = this.showModal.bind(this)
  }
  // 清空地图
  cleanMap () {
    this.map.cleanMap()
  }
  // 地图居中方法
  centerAndZoom (lng, lat, zoom) {
    this.map.centerAndZoom(lng, lat, zoom)
  }

  // 热力图得到点的方法
  getPointList () {
    let pointList = []
    for (let i = 0; i < 10; i++) {
      let x = 116.4024572952 + (0.1 * Math.random())
      let y = 39.9140173126 + (0.1 * Math.random())
      let weight = Math.random()
      pointList.push({
        lng: x,
        lat: y,
        weight: weight
      })
    }
    return pointList
  }
  // 添加热力图
  addHeatMap (e) {
    console.log(e)
    let pointList = []
    ajax.getSearchPoliceStationCases({ policeId: e.id }, response => {
      if (response.code === 101) {
        response.data.map((item) => {
          pointList.push({ lng: item.caseLocationLng, lat: item.caseLocationLat, weight: 100 })
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

  // 地图点击方法
  polygonClick (e) {
    console.log(e)
    this.cleanMap()
    this.centerAndZoom(e.centerPoint[0], e.centerPoint[1], 13)
    this.addHeatMap(e)
    this.addPoliceMap(e)
    this.setState({
      modalId: e.id
    })
  }
  // 显示地图弹层
  showModal () {
    this.setState({
      modalVisible: true
    })
  }
  // 在地图上添加一个派出所区域的方法
  addPoliceMap (event) {
    console.log(event)
    let points = event.pointsList
    this.map.addPolygon(points, {
      id: event.policeKey,
      outLineWidth: event.outLineWidth,
      outLineColor: event.outLineColor,
      color: event.color,
      onClick: this.showModal
    })
  }

  // 地图上添加所有派出所所属区域的方法
  addAllPoliceMap () {
    ajax.getSearchPoliceDistribution({ policeId: '' }, response => {
      if (response.code === 101) {
        response.data.map((item) => {
          let boundary = item.boundary.split(';')
          let boundaryArray = []
          let boundaryPoints = []
          boundary.map((item) => {
            let boundaryLng = parseFloat(item)
            let boundaryLat = parseFloat(item.split(',')[1])
            boundaryPoints.push([boundaryLng, boundaryLat])
            boundaryArray.push(boundaryPoints)
          })
          item.lngAndLat = boundaryArray
        })
        for (let i = 0; i < response.data.length; i++) {
          this.map.addPolygon(response.data[i].lngAndLat, {
            id: response.data[i].policeKey,
            outLineWidth: parseInt(response.data[i].lineWidth),
            outLineColor: [parseInt(response.data[i].lineColor.split(',')), parseInt(response.data[i].lineColor.split(',')[1]), parseInt(response.data[i].lineColor.split(',')[2]), parseFloat(response.data[i].transparency)],
            color: [parseInt(response.data[i].lineColor.split(',')), parseInt(response.data[i].lineColor.split(',')[1]), parseInt(response.data[i].lineColor.split(',')[2]), parseFloat(response.data[i].transparency)],
            onClick: this.polygonClick
          })
        }
      }
    }, error => {
      console.log(error)
    })
  }

  /*   // 地图上添加派出所所在圆圈的方法
  addCircle () {
    this.map.addCircle(116.4024572952, 39.9140173126, 5000, {
      id: '123',
      outLineWidth: 2,
      outLineColor: [255, 0, 0, 0.7],
      color: [255, 153, 0, 0.6]
    })
  } */
  // 地图上添加派出所名字及圆圈的方法
  addInfoPoint () {
    ajax.getStatisticsSubbureauCaseDistribution({}, response => {
      if (response.code === 101) {
        for (let i = 0; i < response.data.length; i++) {
          this.map.addInfoPoint(response.data[i].centerLng, response.data[i].centerLat, response.data[i].policeStationName.replace(/派出所/, '\n') + response.data[i].caseTotalCount, {
            color: response.data[i].color,
            font_weight: 'bold',
            id: response.data[i].policeKey
          })
          this.map.addCircle(response.data[i].centerLng, response.data[i].centerLat, 800, {
            id: response.data[i].policeKey,
            outLineWidth: 2,
            outLineColor: [255, 153, 0, 0.8],
            color: [255, 153, 0, 0.8]
          })
        }
      }
    }, error => {
      console.log(error)
    })
  }
  // 关闭对话框
  handleCancel = (e) => {
    this.setState({
      modalVisible: false
    })
    this.cleanMap()
    this.addAllPoliceMap()
    // this.addCircle()
    this.addInfoPoint()
  }
  componentDidMount () {
    this.map = window.TMap.map(
      this.refs.map, // 与div对应
      this.state.mapconfig
    )
    this.addAllPoliceMap()
    // this.addCircle()
    this.addInfoPoint()
  }
  render () {
    return (
      <div style={{ background: '#122346', height: '100%', paddingTop: '1vh' }}>
        <h3>盘龙分局案件分布区域</h3>
        <div ref='map' id='map' />
        <Modal title='' width={1200} visible={this.state.modalVisible} onCancel={this.handleCancel} afterClose={this.handleCancel} footer={null}>
          <ModalMap modalId={this.state.modalId} style={{width: '100%'}} />
        </Modal>
      </div>
    )
  }
}
