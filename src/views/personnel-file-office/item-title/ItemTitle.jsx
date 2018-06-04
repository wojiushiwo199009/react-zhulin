// 分局标签安装页面最上部
import React, { Component } from 'react'
import { Col } from 'antd'
import PropTypes from 'prop-types'
export default class ItemTitle extends Component {
  static propTypes = {
    src: PropTypes.string,
    title: PropTypes.string,
    num: PropTypes.number
  }
  render () {
    return (
      <Col span={24}>
        <Col span={12} className='head-img-main'>
          <img className='head-img' src={this.props.src} alt='' />
        </Col>
        <Col span={12} className='head-text-main'>
          <div className='head-text1'>{this.props.title}</div>
          <div className='head-text2'>
            <span className='head-text2-content' >
              <b>{this.props.num}</b>
              <i>件</i>
            </span>
          </div>
        </Col>
      </Col>
    )
  }
}
