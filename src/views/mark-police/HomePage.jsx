// 标签安装页面
import React, { Component } from 'react'
import ajax from '../../api'
import ChartLine from './chart-line/ChartLine'
import ChartPie from './chart-pie/ChartPie'
import './HomePage.scss'
export default class HomePage extends Component {
  constructor () {
    super()
    this.state = {
      data: '2018-02-03'
    }
  }
  componentDidMount () {
    ajax.getSearchCloseTime({}, response => {
      if (response.code === 101) {
        this.setState({
          data: response.data
        })
      }
    }, error => {
      console.log(error)
    })
  }
  render () {
    return <div className='mark'>
      <div className='mark-left'>
        <div className='line-chart'>
          <h3>数据详情<span className='install-num'>安装数据截止：{this.state.data}</span></h3>
        </div>
        <ChartLine />
      </div>
      <div className='mark-right'>
        <div className='line-chart'>
          <h3>本所硬件数据</h3>
        </div>
        <ChartPie />
      </div>
    </div>
  }
}
