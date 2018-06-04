import React, { Component } from 'react'
import PropTypes from 'prop-types'
export default class CaseItem extends Component {
  render () {
    return (
      <div>
        <div className='case-title'>{this.props.caseTitle}</div>
        <div className='case-num'>
          <div className='num'>{this.props.caseNumber}件</div>
        </div>
      </div>
    )
  }
}
CaseItem.propTypes = {
  caseNumber: PropTypes.number,
  caseTitle: PropTypes.string
}
