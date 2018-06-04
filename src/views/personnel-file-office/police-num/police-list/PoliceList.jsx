// 各个派出所接收案件量列表
import React, { Component } from 'react'
import { Badge, Table } from 'antd'
import PropTypes from 'prop-types'
export default class PoliceList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      columns: [
        {
          title: '',
          dataIndex: 'icon',
          render: (text, record, index) => {
            console.log(record)
            if (record.percentage < 5) {
              return <Badge status='success' />
            } else if (record.percentage >= 5 && record.percentage < 20) {
              return <Badge status='warning' />
            } else {
              return <Badge status='error' />
            }
          }
        },
        {
          title: '派出所名称',
          dataIndex: 'policeStationName'
        },
        {
          title: '接收占比',
          dataIndex: 'percentage',
          render: (text) => {
            return text + '%'
          }
        },
        {
          title: '接收案件量',
          dataIndex: 'caseTotalCount'
        }
      ],
      DataSource: [
        {
          key: '1',
          icon: '',
          policeStationName: '金星派出所',
          percentage: 15,
          caseTotalCount: 23
        },
        {
          key: '2',
          icon: '',
          policeStationName: '金星派出所',
          percentage: 20,
          caseTotalCount: 23
        }
      ]
    }
  }

  componentDidMount () {
    console.log(this.props.data)
    let DataSource = []
    this.props.data.map((item, index) => {
      DataSource.push({
        key: index,
        icon: '',
        policeStationName: item.policeStationName,
        percentage: item.percentage,
        caseTotalCount: item.caseTotalCount
      })
    })
    this.setState({
      DataSource: DataSource
    })
  }
  render () {
    return (
      <Table columns={this.state.columns} dataSource={this.state.DataSource} pagination={false} />
    )
  }
}
PoliceList.propTypes = {
  data: PropTypes.array
}
