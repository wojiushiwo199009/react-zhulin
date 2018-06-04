import React, { Component } from 'react'
import { Table } from 'antd'
import PropTypes from 'prop-types'
import './TableList.scss'
export default class TableList extends Component {
  goFileEntry (fileId) {
    window.open('./#/police/file-entry?fileId=' + fileId)
  }
  rowClick (reocrd, index) {
    this.goFileEntry(reocrd.id)
  }
  render () {
    return (
      <Table onRow={(reocrd, index) => {
        return {
          onClick: () => { this.rowClick(reocrd, index) }
        }
      }} columns={this.props.columns} dataSource={this.props.dataSource} pagination={false} />
    )
  }
}

TableList.propTypes = {
  columns: PropTypes.array,
  dataSource: PropTypes.array
}
