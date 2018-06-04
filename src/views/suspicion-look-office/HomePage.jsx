//  嫌疑人全局视图
import React, { Component } from 'react'
import { Col } from 'antd'
import Suspicion from '../../assets/images/suspicion.png'
import SuspicionWoman from '../../assets/images/suspicionWoman.png'
import SuspicionMan from '../../assets/images/suspicionMan.png'
import ajax from '../../api'
// import PieChart from './pie-chart-office/PieChartOffice'
import LineChart from './chart-line/ChartLine'
import ParChart from './chart-par/ChartPar'
import PieChart from './chart-pie/ChartPie'
import './HomePage.scss'
export default class HomePage extends Component {
  constructor () {
    super()
    this.state = {
      statisticsSuspectCount: {}
    }
  }

  componentDidMount () {
    // ajax.searchSuspectList({}, response => {
    //   console.log(response, 'searchSuspectList')

    //   if (response.code === 101) {
    //     this.setState({
    //       searchSuspectList: response.data.result,
    //       searchSuspectListCount: response.data.count
    //     })
    //     console.log('searchSuspectListCount', this.state.searchSuspectListCount)
    //   }
    // }, error => {
    //   console.log(error)
    // })
    ajax.statisticsSuspectCount({}, response => {
      console.log(response, 'statisticsSuspectCount')
      if (response.code === 101) {
        this.setState({
          statisticsSuspectCount: response.data
        })
      }
    }, error => {
      console.log(error)
    })
  }
  render () {
    return (<div>
      {/* 全局视图头部begin */}
      <div className='suspicionLookHeader'>
        <div className='headerText'>
          嫌疑人
        </div>
        <div className='headerMain'>
          <Col span={8} className='Mainleft'>
            <Col span={12} className='MainLeftImg'>
              <img className='imgImg' src={Suspicion} alt='' />
            </Col>
            <Col span={12} className='MainLeftText'>
              <div className='supicionPeople'>共有嫌疑人</div>
              <div className='supicionNumBox'> <span className='supicionNum'> <b>{this.state.statisticsSuspectCount.suspect}</b></span>人</div>
            </Col>
          </Col>
          <Col span={8} className='Mainleft'>
            <Col span={12} className='MainLeftImg'>
              <img className='imgImg' src={SuspicionWoman} alt='' />
            </Col>
            <Col span={12} className='MainLeftText'>
              <div className='supicionPeople'>女性嫌疑人</div>
              <div className='supicionNumBox'> <span className='supicionNum'> <b>{this.state.statisticsSuspectCount.womanSuspect}</b>人</span>
                <span style={{marginLeft: '30px', color: '#FFCC33'}}> {this.state.statisticsSuspectCount.womanPer}%</span>
              </div>
            </Col>
          </Col>
          <Col span={8} className='Mainleft'>
            <Col span={12} className='MainLeftImg'>
              <img className='imgImg' src={SuspicionMan} alt='' />
            </Col>
            <Col span={12} className='MainLeftText'>
              <div className='supicionPeople'>男性嫌疑人</div>
              <div className='supicionNumBox'> <span className='supicionNum'> <b>{this.state.statisticsSuspectCount.manSuspect}</b>人</span>
                <span style={{marginLeft: '30px', color: '#FFCC33'}}> {this.state.statisticsSuspectCount.manPer}%</span>
              </div>
            </Col>
          </Col>
        </div>
      </div>
      {/* 全局视图头部end */}
      {/* 全局视图中部begin */}
      <div className='suspicionLookMain'>
        <Col span={8} className='mainLineBox'>
          <div className='mainLine'>
            <div> <LineChart /></div>
          </div>
        </Col>
        <Col span={8} className='mainParBox'>
          <div className='mainLine'>
            <div> <ParChart /></div>
          </div>
        </Col>
        <Col span={8} className='mainPieBox'>
          <div className='mainLine'>
            <div> <PieChart /></div>
          </div>
        </Col>
      </div>
      {/* 全局视图中部end */}

    </div>
    )
  }
}
