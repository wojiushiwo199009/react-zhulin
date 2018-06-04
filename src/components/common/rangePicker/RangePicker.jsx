
/**
 * 起始时间选择框
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DatePicker } from 'antd'

import './RangePicker.scss'

// const dateFormat = 'YYYY年MM月DD日'

export default class RangePicker extends Component {
  static propTypes = {
    selectDate: PropTypes.func,
    width: PropTypes.string
  }
  constructor (props) {
    super(props)
    this.state = {
      startValue: null,
      endValue: null,
      endOpen: false
    }
  }
  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue
    if (!startValue || !endValue) {
      return false
    }
    return startValue.valueOf() > endValue.valueOf()
  }

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue
    if (!endValue || !startValue) {
      return false
    }
    return endValue.valueOf() <= startValue.valueOf()
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value
    }, () => {
      const { startValue, endValue } = this.state
      this.props.selectDate(startValue, endValue)
    })
  }

  onStartChange = (value) => {
    this.onChange('startValue', value)
  }

  onEndChange = (value) => {
    this.onChange('endValue', value)
  }

  handleStartOpenChange = (open) => {
    if (!open && (!this.state.endValue)) {
      this.setState({ endOpen: true })
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open })
  }

  render () {
    const { startValue, endValue, endOpen } = this.state
    const Width = this.props.width || '6vw'
    return (
      <span className='date-select' >
        <DatePicker
          disabledDate={this.disabledStartDate}
          format='YYYY-MM-DD'
          value={startValue}
          placeholder='开始日期'
          onChange={this.onStartChange}
          onOpenChange={this.handleStartOpenChange}
          style={{width: Width, minWidth: '95px'}}
        />
        <span className='sep'>&nbsp;至&nbsp;</span>
        <DatePicker
          disabledDate={this.disabledEndDate}
          format='YYYY-MM-DD'
          value={endValue}
          placeholder='结束日期'
          onChange={this.onEndChange}
          open={endOpen}
          onOpenChange={this.handleEndOpenChange}
          style={{width: Width, minWidth: '95px'}}
        />
      </span>
    )
  }
}
