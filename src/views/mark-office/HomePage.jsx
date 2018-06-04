// 分局标签安装页面
import React, { Component } from 'react'
import {Col} from 'antd'
import ajax from '../../api'
import ItemTitle from './item-title/ItemTitle'
import gongyou from '../../assets/images/gongyou.png'
import chajiImg from '../../assets/images/chajiImg.png'
import weichaji from '../../assets/images/weichaji.png'
import ContentLeft from './content-left/ContentLeft'
import ContentRight from './content-right/ContentRight'
import './HomePage.scss'
// import ChartLine from './chart-line/ChartLine'
// import ChartPie from './chart-pie/ChartLine'
export default class HomePage extends Component {
  constructor () {
    super()
    this.state = {
      internetElectrombileCaseCount: 1528,
      backCount: 545,
      completeRecoveryRate: 31.2,
      closeTime: '2018-02-03'
    }
  }
  componentDidMount () {
    ajax.getStatisticsInternetCase({}, response => {
      if (response.code === 101) {
        this.setState({
          internetElectrombileCaseCount: response.data.internetElectrombileCaseCount,
          backCount: response.data.backCount,
          completeRecoveryRate: response.data.completeRecoveryRate,
          closeTime: response.data.closeTime
        })
      }
    }, error => {
      console.log(error)
    })
  }
  render () {
    return (
      <div className='mark'>
        <div className='title'>
          <h3>案件详情</h3>
          <ItemTitle src={gongyou} title='物联网电动车被盗' num={this.state.internetElectrombileCaseCount} rate='' />
          <ItemTitle src={chajiImg} title='找回' num={this.state.backCount} rate='' />
          <ItemTitle src={weichaji} title='整车查获率' num={parseFloat(this.state.completeRecoveryRate)} rate='率' />
        </div>
        <div className='content'>
          <Col className='content-left' span={14}>
            <h3 style={{background: '#122346', padding: '2vh 2vw 0vh 2vw', overflow: 'hidden', borderRadius: '4px', marginBottom: '0'}}>数据详情：<span className='closeTime'>各分局安装数据截止：{this.state.closeTime}</span>   </h3>
            <ContentLeft />
          </Col>
          <Col className='content-right' span={10}>
            <ContentRight closeTime={this.state.closeTime} />
          </Col>
        </div>
      </div>
    )
  }
}
