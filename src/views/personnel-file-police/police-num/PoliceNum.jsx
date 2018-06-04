// 布控派出所饼图
import React, { Component } from 'react'
import PropTypes from 'prop-types'
export default class PoliceNum extends Component {
  constructor (props) {
    super(props)
    this.state = {
      mapconfig: {
        type: ['GDSL'], // 地图类型
        center: [102.759312, 25.124456], // 中心点经纬度
        zoom: 12, // 当前地图级别
        maxZoom: 20, // 地图最大缩放级别
        minZoom: 9// 地图最小缩放级别
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log(nextProps, this.props)
    let pointList = []
    this.map.cleanMap()
    if (nextProps.data.length > 0) {
      nextProps.data.map((item) => {
        pointList.push({ lng: item.caseLocationLng, lat: item.caseLocationLat, weight: 100 })
      })
      this.map.drawHeatMap(pointList, {
        alpha: 1,
        blur: 8,
        radius: 15
      })
    }
  }
  componentDidMount () {
    console.log(this.props.data)
    this.map = window.TMap.map(
      this.refs.map, // 与div对应
      this.state.mapconfig
    )
  }
  render () {
    return (
      <div className='case-num-police'>
        <h3>布控派出所</h3>
        <div ref='map' id='map' style={{ padding: '1vw', height: '34vh' }} />
      </div>
    )
  }
}
PoliceNum.propTypes = {
  data: PropTypes.array
}
