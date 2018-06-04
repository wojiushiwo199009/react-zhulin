// 车辆资料的车辆轨迹
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ajax from '../../../api'
// import {  } from 'antd'
export default class VehicleTrajectoryMap extends Component {
  constructor (props) {
    super(props)
    this.state = {
      mapconfig: {
        type: ['GDSL'], // 地图类型
        center: [102.759312, 25.124456], // 中心点经纬度
        zoom: 12, // 当前地图级别
        maxZoom: 20, // 地图最大缩放级别
        minZoom: 9// 地图最小缩放级别
      },
      plateCode: this.props.plateCode
    }
    this.addMorePoint = this.addMorePoint.bind(this)
  }

  // 添加多点及轨迹线
  addMorePoint () {
    ajax.searchTrajectory({ plateCode: this.state.plateCode }, response => {
      if (response.code === 101) {
        let lineArr = []
        let pointList = response.data.trajectory
        for (let i = 0; i < response.data.trajectory.length; i++) {
          // 添加多点
          var sPoint = pointList[i]
          this.map.addPoint(sPoint.lng, sPoint.lat, {
            data: {
              location: sPoint.location
            }
          })
          // 添加轨迹线
          pointList.map((item) => {
            lineArr.push([item.lng, item.lat])
          })
          this.map.addTrackLine(lineArr, {
            id: 'track1',
            width: 2,
            arrowPosition: 'middle',
            isShowArrow: true,
            color: 'rgb(255,0,234)'
          })
        }
      }
    }, error => {
      console.log(error)
    })
  }

  componentDidMount () {
    this.map = window.TMap.map(
      this.refs.ModalMap, // 与div对应
      this.state.mapconfig
    )
    this.addMorePoint()
  }
  render () {
    return (
      <div className='modal-map'>
        <div ref='ModalMap' id='modal-map' style={{width: '100%'}} />
      </div>
    )
  }
}
VehicleTrajectoryMap.propTypes = {
  plateCode: PropTypes.string
}
