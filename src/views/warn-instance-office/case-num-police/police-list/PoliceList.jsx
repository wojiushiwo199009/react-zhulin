// 各个派出所接收案件量列表
import React, { Component } from 'react'
import { Badge, Table } from 'antd'
import ajax from '../../../../api'
export default class PoliceList extends Component {
  constructor () {
    super()
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
          title: '派出所',
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
      data: [
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
        },
        {
          key: '3',
          icon: '',
          policeStationName: '金星派出所',
          percentage: 2,
          caseTotalCount: 23
        },
        {
          key: '4',
          icon: '',
          policeStationName: '金星派出所',
          percentage: 25,
          caseTotalCount: 23
        }
      ]
    }
  }
  // 得到数据
  getData () {
    let self = this
    ajax.getStatisticsPoliceStationCase({}, response => {
      console.log(response)
      response.data.policeStationCaseCountList.map((item, index) => {
        item.key = index
      })
      if (response.code === 101) {
        self.setState({
          data: response.data.policeStationCaseCountList
        })
      }
    }, error => {
      console.log(error)
    })
  }
  componentDidMount () {
    this.getData()
  }
  render () {
    return (
      <Table columns={this.state.columns} dataSource={this.state.data} pagination={false} />
    )
  }
}
