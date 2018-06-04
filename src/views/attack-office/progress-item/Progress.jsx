import React, {Component} from 'react'
import {Row, Col} from 'antd'
import PropTypes from 'prop-types'
import './Progress.scss'
export default class Progress extends Component {
  render () {
    let {percent, caseNum} = this.props
    // console.log(percent)
    let percents = percent > 100 ? 100 : percent
    return <div className='progress' style={this.props.style}>
      <Row style={this.props.style}>
        <Col span={15} style={{ width: percents + '%' }}>
          <div className={'progress-inside'} style={this.props.style} />
        </Col>
        <Col span={2}>
          <div className='progress-data' style={{ color: '#f0f0f0' }}>{ caseNum }件</div>
        </Col>
      </Row>
    </div>
  }
}
Progress.propTypes = {
  style: PropTypes.object,
  caseNum: PropTypes.number,
  percent: PropTypes.number
}
