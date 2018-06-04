// 派出所 退回档案整改
import React, { Component } from 'react'
import { Tooltip, Icon } from 'antd'
import ajax from '../../../api'
import TableList from './table-list/TableList'
export default class ReturnFiles extends Component {
  constructor () {
    super()
    this.state = {
      columns: [
        {
          title: '档案名称',
          dataIndex: 'caseName'
        },
        {
          title: '退回时间',
          dataIndex: 'returnTime'
        }
      ],
      data: [
        {
          key: '1',
          caseName: '201801期张艳萍电动车被盗案',
          returnTime: '2018年3月15日 10:32:11'
        },
        {
          key: '2',
          caseName: '201801期张艳萍电动车被盗案',
          returnTime: '2018年3月15日 10:32:11'
        },
        {
          key: '3',
          caseName: '201801期张艳萍电动车被盗案',
          returnTime: '2018年3月15日 10:32:11'
        },
        {
          key: '4',
          caseName: '201801期张艳萍电动车被盗案',
          returnTime: '2018年3月15日 10:32:11'
        }
      ]
    }
  }
  showMoreReturn () {
    window.open('./#/police/un-submit')
  }
  componentDidMount () {
    ajax.getSearchReturnFiles({}, response => {
      if (response.code === 101) {
        response.data.rectificationFileList.map((item, index) => {
          item.key = index
        })
        let RectificationFileList = response.data.rectificationFileList.length > 4 ? response.data.rectificationFileList.slice(0, 4) : response.data.rectificationFileList
        this.setState({
          data: RectificationFileList
        })
      }
    }, error => {
      console.log(error)
    })
  }
  render () {
    return (
      <div className='return-files'>
        <h3>退回档案整改<Tooltip placement='bottom' title='分局查看后退回，需要重新按照修改要求填写！'>
          <Icon type='question-circle-o' />
        </Tooltip>
        </h3>
        <div>
          <TableList columns={this.state.columns} dataSource={this.state.data} />
        </div>
        <div className='show-more-return' onClick={this.showMoreReturn}>更多</div>
      </div>
    )
  }
}
