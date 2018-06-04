// 警情速递页面派出所地图弹出框
import React, { Component } from 'react'
import { List, Col } from 'antd'
import ajax from '../../../../api'
export default class ModalMap extends Component {
  constructor () {
    super()
    this.state = {
      mapconfig: {
        type: ['GDSL'], // 地图类型
        center: [116.4024572952, 39.9140173126], // 中心点经纬度
        zoom: 11, // 当前地图级别
        maxZoom: 20, // 地图最大缩放级别
        minZoom: 10// 地图最小缩放级别
      },
      data: [
        {
          caseName: '盘龙区A酒店门口电动车盗窃案件',
          caseId: '11'
        },
        {
          caseName: '盘龙区A酒店门口电动车盗窃研判',
          caseId: '22'
        },
        {
          caseName: '金星立交桥下电动车盗窃案件',
          caseId: '33'
        },
        {
          caseName: '金星立交桥下电动车盗窃研判',
          caseId: '44'
        },
        {
          caseName: '白龙路口李欣小卖铺电动车盗窃研判',
          caseId: '55'
        }
      ] // 案件名称的列表
    }
    this.addMorePoint = this.addMorePoint.bind(this)
    this.showWindow = this.showWindow.bind(this)
  }

  // 显示气泡窗口
  showWindow (e) {
    this.map.hideAllInfoWindow()
    // < img width = "40px" src = ' + e.data.imgSrc + ' >
    let userDiv = document.createElement('div')
    userDiv.innerHTML = '<div class="ant-list-item"><div class="ant-list-item-meta"><div class="ant-list-item-meta-avatar"><span class="ant-avatar ant-avatar-circle ant-avatar-image"></span></div><div class="ant-list-item-meta-content"><h4 class="ant-list-item-meta-title">' + e.data.currentTime + '<br>' + e.data.caseName + '</h4></div></div></div>'
    // userDiv.innerHTML += "<List.Item>< List.Item.Meta avatar = {< Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />} title = {< span > e.data.currentTime < br > e.data.caseName </span>} description = 'Ant Design, a design language for background applications, is refined by Ant UED Team'/></List.Item >"
    this.map.infoWindowThrough(e.lng, e.lat, userDiv)
  }
  // 添加多点及左边案件list列表
  addMorePoint () {
    let pointList = []
    let caseList = []
    ajax.getSearchPoliceStationCases({ policeKey: '' }, response => {
      if (response.code === 101) {
        console.log(response)
        response.data.map((item) => {
          caseList.push({
            caseName: item.caseName,
            caseId: item.id
          })
          this.setState({
            data: caseList
          })
          pointList.push({
            lng: item.caseLocationLng,
            lat: item.caseLocationLat,
            id: item.id,
            caseName: item.caseName
          })
        })
        for (let i = 0; i < pointList.length; i++) {
          var sPoint = pointList[i]
          this.map.addPoint(sPoint.lng, sPoint.lat, {
            data: {
              currentTime: sPoint.receivingTime,
              caseName: sPoint.caseName
              // imgSrc: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
            },
            id: sPoint.id,
            onMouseOver: this.showWindow
          })
        }
      }
    }, error => {
      console.log(error)
    })
  }
  CheckLook (caseId) {
    console.log(caseId)
    window.open('./#/check-look?fileId=' + caseId)
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
        <Col span={6} style={{height: '100%'}}>
          <List
            header={<div>案件名称</div>}
            bordered
            dataSource={this.state.data}
            renderItem={item => (<List.Item style={{ cursor: 'pointer' }} onClick={() => this.CheckLook(item.caseId)}> {item.caseName}</List.Item>)}
          />
        </Col>
        <Col span={18}>
          <div ref='ModalMap' id='modal-map' />
        </Col>
      </div>
    )
  }
}
