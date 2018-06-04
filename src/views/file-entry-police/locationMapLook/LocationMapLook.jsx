// 车辆资料的车辆轨迹
import React, { Component } from 'react'
import {Button, message} from 'antd'
import Location from '../../../assets/images/location.png'
import PropTypes from 'prop-types'
import './LocationMapLook.scss'
// import {  } from 'antd'
export default class LocationMapLook extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pointIds: [],
      mapconfig: {
        type: ['GDSL'], // 地图类型
        center: [102.759312, 25.124456], // 中心点经纬度
        zoom: 12, // 当前地图级别
        maxZoom: 20, // 地图最大缩放级别
        minZoom: 9// 地图最小缩放级别
      },
      lng: this.props.lng,
      lat: this.props.lat,
      latlag: {}
    }
    this.addMorePoint = this.addMorePoint.bind(this)
    this.drawPicPoint = this.drawPicPoint.bind(this)
    this.cleanMap = this.cleanMap.bind(this)
  }

  // 获取10个随机点位数据
  getpointList () {
    var pointList = []
    for (var i = 0; i < 10; i++) {
      var x = 116.40 + (0.1 * Math.random())
      var y = 39.91 + (0.1 * Math.random())
      pointList.push({
        lng: x,
        lat: y,
        id: i
      })
    }
    return pointList
  }
  getpointLists () {
    var pointList = []
    for (var i = 0; i < 10; i++) {
      var x = 116.33979 + (0.1 * Math.random())
      var y = 40.01442 + (0.1 * Math.random())
      pointList.push([
        x, y
      ])
    }
    return pointList
  }

  // 添加多点
  addMorePoint () {
    var pointList = this.getpointList()
    for (var i = 0; i < pointList.length; i++) {
      var sPoint = pointList[i]
      this.map.addPoint(sPoint.lng, sPoint.lat, {
        id: sPoint.id
      })
    }
  }
  getPointId () {
    var id = 'point-' + parseInt(Math.random() * 10000)
    this.state.pointIds.push(id)
    return id
  }
  // 绘制图片点
  drawPicPoint (callback, option) {
    this.map.drawPicPoint(this.pp, option || {
      id: this.getPointId(),
      pic: Location
    })
  }
  pp =(e) => {
    // console.log(e)
    this.setState({
      latlag: e
    })
    this.props.lngLats(e)
    message.success('添加定位成功', 3)
    // this.props.pp
    // console.log(e, 'lng')
  }

  // // 移除绘制点
  // removeDrawPoint (_pointIds) {
  //   this.map.removeDrawPoint(_pointIds || this.state.pointIds)
  //   console.log(_pointIds)
  // }
  cleanMap () {
    this.map.cleanMap()
  }
  // 添加轨迹线
  addTrackLine () {
    var points = this.getpointLists()
    this.map.addTrackLine(points, {
      id: 'track1',
      width: 2,
      arrowPosition: 'middle',
      isShowArrow: true,
      color: 'rgb(255,0,234)'
    })
  }

  componentDidMount () {
    this.map = window.TMap.map(
      this.refs.ModalMap, // 与div对应
      this.state.mapconfig
    )
    // this.addMorePoint()
    // this.addTrackLine()
    // 102.80888026522383, lat: 25.15822659619383

    if (this.state.lng) this.map.addPoint(this.state.lng, this.state.lat)
  }
  render () {
    return (
      <div>
        <div className='LocationMapBox1' >
          <div className='LocationMapButton1'>
            <span> <Button type='primary' className='serachCrimeButton' onClick={this.drawPicPoint}>添加定位点</Button></span>
            <span> <Button type='primary' className='serachCrimeButton' onClick={this.cleanMap}>移除定位点</Button></span>
          </div>
          <div className='modal-map1'>
            <div ref='ModalMap' id='modal-map' style={{height: '100%', width: '100%'}} />
          </div>
        </div>
      </div>

    )
  }
}
LocationMapLook.propTypes = {
  lngLats: PropTypes.func,
  lng: PropTypes.number,
  lat: PropTypes.number
}
