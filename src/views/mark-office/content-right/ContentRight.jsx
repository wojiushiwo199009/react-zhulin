import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ChartPie from './chart-pie/ChartPie'
export default class ContentRight extends Component {
  render () {
    return (
      <div className='install-num'>
        <h3 style={{ background: '#122346', padding: '2vh 2vw 0vh 2vw', overflow: 'hidden', borderRadius: '4px', marginBottom: '0' }}>各分局安装数据&nbsp;&nbsp;<span className='closeTime'>各分局安装数据截止：{this.props.closeTime}</span></h3>
        <ChartPie />
      </div>
    )
  }
}
ContentRight.propTypes = {
  closeTime: PropTypes.string
}
