// 车辆资料的失踪点及逃窜现场
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import ajax from '../../../api'
import { Col, Table, Badge } from 'antd'
import aroundPoint from '../../../assets/images/around-point.png'
import './DisappearanceEscape.scss'
export default class DisappearanceEscape extends Component {
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
      plateCode: this.props.plateCode,
      columns: [
        {
          title: '周边以往案件',
          dataIndex: 'caseName',
          key: 'caseName'
          // render: text => <a href='#'>{text}</a>
        },
        {
          title: '案发时间',
          dataIndex: 'caseTime',
          key: 'caseTime',
          render: (text, record, index) => {
            return moment(text).format('YYYY-MM-DD HH:MM:SS')
          }
        },
        {
          title: '视频截图',
          dataIndex: 'issueTime',
          key: 'issueTime',
          render: (text, record, index) => {
            // console.log(record, 'record')
            let Text = record.isVideoCapture === true ? '有图' : '无图'
            return (<span >
              {Text}
            </span>)
          }
        }
      ],
      data: []

    }
    this.addMorePoint = this.addMorePoint.bind(this)
  }

  // 添加多点
  addMorePoint () {
    ajax.searchDisappearPoint({ plateCode: this.state.plateCode }, response => {
      if (response.code === 101) {
        // 添加信号消失点
        let disappearPointObj = response.data.disappearPoint
        let aroundDisappearPointArr = response.data.aroundDisappearPoint
        let aroundCaseFilesArr = response.data.aroundCaseFiles
        this.map.addPoint(disappearPointObj.lng, disappearPointObj.lat)
        this.map.addInfoPoint(disappearPointObj.lng, disappearPointObj.lat, disappearPointObj.location, {
          color: '#FF0000',
          font_size: '20px'
        })

        // 添加以往案件周边消失点添加多点
        for (let i = 0; i < aroundDisappearPointArr.length; i++) {
          var sPoint = aroundDisappearPointArr[i]
          this.map.addPoint(sPoint.lng, sPoint.lat,
            { pic: aroundPoint }
          )
        }
        aroundCaseFilesArr.map((item, index) => {
          item.key = index
        })
        this.setState({
          data: aroundCaseFilesArr
        })
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
      <div>
        <Col span={10} className='DisappearanceEscapeTable'>
          <Table columns={this.state.columns} dataSource={this.state.data} pagination={false} />
        </Col>
        <Col span={14} className='DisappearanceEscapeMap'>
          <div className='modal-map'><div ref='ModalMap' id='modal-map' style={{float: 'none', width: '99%'}} /></div>
          <div className='signal' style={{textAlign: 'right', color: '#0099ff'}}>
            <Badge status='error' text='本案信号消失点' />
            <Badge status='warning' text='以往案件周边销赃点' />
          </div>
        </Col>
      </div>
    )
  }
}
DisappearanceEscape.propTypes = {
  plateCode: PropTypes.string
}
