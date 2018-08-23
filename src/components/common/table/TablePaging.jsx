import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'

export default class CustomPagingTable extends React.Component {
  constructor (props) {
    super(props)
    this.showTotal = this.showTotal.bind(this)
  }

  /**
   * 展示表格的显示情况
   * @param total
   * @param range
   * @returns {string}
   */
  showTotal (total, range) {
    console.log(total, range, 'totalrange')
    return `显示${range[0]}-${range[1]}条记录，共${this.props.tatalPage}条记录`
  }

  render () {
    return (
      <div style={{height: '100%', position: 'relative'}}>
        <Table dataSource={this.props.dataSource}
          bordered={false}
          rowKey={(record, index) => {
            return index
          }
          }
          defaultCurrent={1}
          scroll={{ x: this.props.xScroll ? this.props.xScroll : 0, y: this.props.yScroll ? this.props.yScroll : 0 }}
          className={this.props.customCls}
          columns={this.props.columns}
          pagination={this.props.pageVisible ? {
            onShowSizeChange: this.props.onShowSizeChange,
            style: { float: 'right', marginTop: '30px' },
            total: this.props.tatalPage || 0,
            showTotal: this.showTotal,
            onChange: this.props.onChange,
            showQuickJumper: true,
            showSizeChanger: true,
            defaultCurrent: 1,
            pageSize: this.props.pageSize,
            current: this.props.pageNum,
            position: 'bottom'
          } : false}
          rowSelection={this.props.rowSelection || null} />
      </div>
    )
  }
}

CustomPagingTable.propTypes = {
  dataSource: PropTypes.array,
  xScroll: PropTypes.bool,
  yScroll: PropTypes.bool,
  customCls: PropTypes.string,
  pageVisible: PropTypes.bool,
  columns: PropTypes.array,
  onShowSizeChange: PropTypes.func,
  // total: PropTypes.number,
  onChange: PropTypes.func,
  rowSelection: PropTypes.object,
  pageSize: PropTypes.number,
  pageNum: PropTypes.number,
  tatalPage: PropTypes.number
}
