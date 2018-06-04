//  派出所警情速递页面
import React, {Component} from 'react'
import { Row, Col, Divider } from 'antd'
import Map from './map/Map' // 派出所盘龙区案件分布区域
import Police from './police/Police' // 派出所金星派出所警情
import ReturnFiles from './return-files/ReturnFiles' // 派出所退回档案整改
import PieChart from './pie-chart/pieChart' // 派出所饼图
import UnSubmit from './un-submit/UnSubmit' // 派出所待提交档案
import './HomePage.scss'
export default class HomePage extends Component {
  render () {
    return (
      <div className='warn-instance'>
        <Row style={{height: '65%'}}>
          <Col span={15} style={{paddingRight: '1vw', height: '100%', paddingBottom: '1vh'}}>
            <Map />
          </Col>
          <Col span={9} style={{height: '100%', paddingBottom: '1vh'}}>
            <Police />
          </Col>
        </Row>
        <Row style={{ height: '35%', paddingBottom: '1vh' }}>
          <Col span={15} style={{paddingRight: '1vw', height: '100%'}}>
            <Row style={{background: '#122346', height: '100%'}}>
              <Col span={14} style={{height: '100%'}}>
                <Row style={{ background: '#122346', height: '100%' }}>
                  <Col span={22} style={{height: '100%'}}><ReturnFiles /></Col>
                  <Col span={2}><Divider type='vertical' style={{height: '24vh', top: '3vh'}} /></Col>
                </Row>
              </Col>
              <Col span={10}>
                <PieChart />
              </Col>
            </Row>
          </Col>
          <Col span={9} style={{ height: '100%' }}>
            <UnSubmit />
          </Col>
        </Row>
      </div>
    )
  }
}
