// 派出所 待提交档案
import React, { Component } from 'react'
import { Badge, Tooltip, Icon } from 'antd'
import TableList from '../return-files/table-list/TableList'
import ajax from '../../../api'
export default class UnSubmit extends Component {
  constructor () {
    super()
    this.state = {
      columns: [
        {
          title: '车牌号',
          dataIndex: 'plateCode'
        },
        {
          title: '截止时间',
          dataIndex: 'overdueTime'
        }, {
          title: '', // 超时情况
          render: (text, record) => (<span>{text.flag === 0 ? <Badge status='error' /> : (text.flag === 1 ? <Badge status='warning' /> : '') }</span>)
        }
      ],
      data: [
        {
          key: '1',
          plateCode: '662548',
          overdueTime: '2018年3月15日 10:32:11',
          flag: 0 // (超期未提交)
        },
        {
          key: '2',
          plateCode: '662548',
          overdueTime: '2018年3月15日 10:32:11',
          flag: 1 // 即将超时
        },
        {
          key: '3',
          plateCode: '662548',
          overdueTime: '2018年3月15日 10:32:11',
          flag: 2 // 距离超时时间大于2个小时
        },
        {
          key: '4',
          plateCode: '662548',
          overdueTime: '2018年3月15日 10:32:11',
          flag: 2
        }
      ]
    }
  }
  showMoreReturn () {
    window.open('./#/police/un-submit')
  }
  componentDidMount () {
    ajax.getSearchFilesToBeSubmitted({}, response => {
      if (response.code === 101) {
        response.data.map((item, index) => {
          item.key = index
        })
        let Data = response.data.length > 4 ? response.data.slice(0, 4) : response.data
        this.setState({
          data: Data
        })
      }
    }, error => {
      console.log(error)
    })
  }
  render () {
    return (
      <div className='un-submit'>
        <h3>
          <span>待提交档案</span>
          <div style={{ float: 'right' }}>
            <Badge status='error' text='超时' />
            <Tooltip placement='bottom' title='案件下派后48小时未提交一案一档'>
              <Icon type='question-circle-o' />
            </Tooltip>
            <Badge status='warning' text='即将超时' />
            <Tooltip placement='bottom' title='距离提交一案一档时间少于2小时'>
              <Icon type='question-circle-o' />
            </Tooltip>
          </div>
        </h3>
        <div>
          <TableList columns={this.state.columns} dataSource={this.state.data} />
        </div>
        <div className='show-more-return' onClick={this.showMoreReturn}>更多</div>
      </div>
    )
  }
}
