/**
 * 全文检索页面
 */
import React from 'react'
import PropTypes from 'prop-types'

import './BorderBox.scss'

class BorderBox extends React.Component {
  constructor (props) {
    super(props)
    this.style = Object.assign(this.props.style || {}, {
      width: this.props.width + 'px',
      height: this.props.height + 'px',
      background: this.props.background
    })
  }

  render () {
    return (
      <div className={'border-box-div ' + this.props.className || ''} style={this.style}>
        <div className='lt' />
        <div className='rt' />
        <div className='rb' />
        <div className='lb' />
        {
          this.props.children
        }
      </div>
    )
  }
}

BorderBox.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  background: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.any
}

export default BorderBox
