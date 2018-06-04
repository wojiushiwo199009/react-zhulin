import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
export default class TableList extends Component {
  constructor (props) {
    super(props)
    console.log(this.sum(this.props.data))
    this.state = ({
      columns: [{
        title: '事件区间',
        dataIndex: 'time',
        key: 'time'
      }, {
        title: '占比',
        dataIndex: 'percent',
        key: 'percent',
        render: text => { return text + '%' }
      }, {
        title: '案发数',
        dataIndex: 'caseNum',
        key: 'caseNum'
      }],
      dataSource: [{
        key: '1',
        time: '0-3',
        percent: (this.sum(this.props.data.slice(0, 3)) / this.sum(this.props.data) * 100).toFixed(2),
        caseNum: this.sum(this.props.data.slice(0, 3))
      }, {
        key: '2',
        time: '3-6',
        percent: (this.sum(this.props.data.slice(3, 6)) / this.sum(this.props.data) * 100).toFixed(2),
        caseNum: this.sum(this.props.data.slice(3, 6))
      }, {
        key: '3',
        time: '6-9',
        percent: (this.sum(this.props.data.slice(6, 9)) / this.sum(this.props.data) * 100).toFixed(2),
        caseNum: this.sum(this.props.data.slice(6, 9))
      }, {
        key: '4',
        time: '9-12',
        percent: (this.sum(this.props.data.slice(9, 12)) / this.sum(this.props.data) * 100).toFixed(2),
        caseNum: this.sum(this.props.data.slice(9, 12))
      }, {
        key: '5',
        time: '12-15',
        percent: (this.sum(this.props.data.slice(12, 15)) / this.sum(this.props.data) * 100).toFixed(2),
        caseNum: this.sum(this.props.data.slice(12, 15))
      }, {
        key: '6',
        time: '15-18',
        percent: (this.sum(this.props.data.slice(15, 18)) / this.sum(this.props.data) * 100).toFixed(2),
        caseNum: this.sum(this.props.data.slice(15, 18))
      }, {
        key: '7',
        time: '18-21',
        percent: (this.sum(this.props.data.slice(18, 21)) / this.sum(this.props.data) * 100).toFixed(2),
        caseNum: this.sum(this.props.data.slice(18, 21))
      }, {
        key: '8',
        time: '21-24',
        percent: (this.sum(this.props.data.slice(21, 24)) / this.sum(this.props.data) * 100).toFixed(2),
        caseNum: this.sum(this.props.data.slice(21, 24))
      }]
    })
  }
  sum=(arr) => {
    var len = arr.length
    if (len === 0) {
      return 0
    } else if (len === 1) {
      return arr[0]
    } else {
      return arr[0] + this.sum(arr.slice(1))
    }
  }
  componentWillMount () {
    this.allSum = this.sum(this.props.data)
  }
  componentDidMount () {

  }
  render () {
    return (
      <Table columns={this.state.columns} dataSource={this.state.dataSource} pagination={false} />
    )
  }
}
TableList.propTypes = {
  data: PropTypes.array
}
