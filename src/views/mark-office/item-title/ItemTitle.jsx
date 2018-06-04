// 分局标签安装页面最上部
import React, { Component } from 'react'
import {Col} from 'antd'
import PropTypes from 'prop-types'
import './ItemTitle.scss'
export default class ItemTitle extends Component {
  static propTypes = {
    src: PropTypes.string,
    title: PropTypes.string,
    num: PropTypes.number,
    rate: PropTypes.string
  }
  render () {
    return (
      <Col span={8}>
        <Col span={24}>
          <Col span={12} className='head-img-main'>
            <img className='head-img' src={this.props.src} alt='' />
          </Col>
          <Col span={12} className='head-text-main'>
            <div className='head-text1'>{this.props.title}</div>
            <div className='head-text2'>
              <span className='head-text2-content' >
                <b>{this.props.num}{this.props.rate ? '%' : ''}</b>
                <i>{this.props.rate ? '' : '起'}</i>
              </span>
            </div>
          </Col>
        </Col>
      </Col>
    )
  }
}
