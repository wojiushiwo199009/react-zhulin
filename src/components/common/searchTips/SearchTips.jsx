/**
 * 搜索下边的提示行
 */
import React from 'react'
import PropTypes from 'prop-types'

import './SearchTips.scss'

class SearchTips extends React.Component {
  render () {
    return (
      <div className='search-tips'>
        <i className='icon'>i</i>
        <span className='medium-blue'>检索出 {this.props.num} 项数据</span>
      </div>
    )
  }
}
SearchTips.propTypes = {
  num: PropTypes.number
}

export default SearchTips
