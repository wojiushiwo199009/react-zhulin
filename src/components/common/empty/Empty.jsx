/**
 * 错误信息及无数据组件
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'

class Empty extends Component {
  render () {
    let emptyStyles = {
      width: '100%',
      textAlign: 'center',
      paddingTop: '150px',
      color: '#17719B'
    }
    return (
      <div style={emptyStyles} className='null-data' >
        <Icon type='frown-o' />&nbsp;
        {this.props.msg}
      </div>
    )
  }
}
Empty.propTypes = {
  msg: PropTypes.string
}

export default Empty
