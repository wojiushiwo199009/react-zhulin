import React, { Component } from 'react'
import { Table } from 'antd'
import PropTypes from 'prop-types'
import './TableList.scss'
export default class TableList extends Component {
  render () {
    return (
      <Table columns={this.props.columns} dataSource={this.props.dataSource} pagination={false} />
    )
  }
}

TableList.propTypes = {
  columns: PropTypes.array,
  dataSource: PropTypes.array
}
