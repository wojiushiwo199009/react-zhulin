//  分局警情速递页面
import React, {Component} from 'react'
import { Row, Col, Divider } from 'antd'
import MapOffice from './map-office/MapOffice' // 分局盘龙区案件分布区域
import Police from './police/Police' // 分局警情
import CaseNumOffice from './case-num-office/CaseNumOffice' // 各分局发案总数
import PieChartOffice from './pie-chart-office/PieChartOffice' // 分局饼图
import CaseNumPolice from './case-num-police/CaseNumPolice' // 各所案件数量
import './HomePage.scss'
export default class HomePage extends Component {
  render () {
    return (
      <div className='warn-instance-office'>
        <Row style={{height: '65%'}}>
          <Col span={15} style={{paddingRight: '1vw', height: '100%', paddingBottom: '1vh'}}>
            <MapOffice />
          </Col>
          <Col span={9} style={{height: '100%', paddingBottom: '1vh'}}>
            <Police />
          </Col>
        </Row>
        <Row style={{ height: '35%', paddingBottom: '1vh' }}>
          <Col span={15} style={{paddingRight: '1vw'}}>
            <Row style={{background: '#122346'}}>
              <Col span={14} style={{height: '30vh'}}>
                <Row style={{ background: '#122346' }}>
                  <Col span={22}><CaseNumOffice /></Col>
                  <Col span={2}><Divider type='vertical' style={{height: '24vh', top: '3vh'}} /></Col>
                </Row>
              </Col>
              <Col span={10}>
                <PieChartOffice />
              </Col>
            </Row>
          </Col>
          <Col span={9}>
            <CaseNumPolice />
          </Col>
        </Row>
      </div>
    )
  }
}
