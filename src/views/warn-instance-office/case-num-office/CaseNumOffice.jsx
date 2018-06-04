// 各分局发案总数列表
import React, { Component } from 'react'
import { Badge, List } from 'antd'
import ajax from '../../../api'
import './CaseNumOffice.scss'
export default class ReturnFiles extends Component {
  constructor () {
    super()
    this.state = {
      closeTime: '2018年2月18日',
      columns: [
        {
          title: '' // 超时情况
        },
        {
          title: '分局名称',
          dataIndex: 'branchOfficeName'
        },
        {
          title: '占比',
          dataIndex: 'percentage'
        },
        {
          title: '案件数量',
          dataIndex: 'caseTotalCount'
        }
      ],
      data: [
        {
          key: '1',
          branchOfficeName: '盘龙分局',
          percentage: 2.3,
          caseTotalCount: 3
        },
        {
          key: '2',
          branchOfficeName: '官渡分局',
          percentage: 17.3,
          caseTotalCount: 23
        },
        {
          key: '3',
          branchOfficeName: '西山分局',
          percentage: 33.8,
          caseTotalCount: 45
        },
        {
          key: '4',
          branchOfficeName: '五华分局',
          percentage: 48.9,
          caseTotalCount: 65
        }
      ]
    }
  }
  componentDidMount () {
    ajax.getStatisticsBranchOfficeCase({}, response => {
      if (response.code === 101) {
        let BranchOfficeCaseCountList = response.data.branchOfficeCaseCountList
        BranchOfficeCaseCountList.map((item, index) => {
          item.key = index
        })
        let Data = BranchOfficeCaseCountList.length > 4 ? BranchOfficeCaseCountList.slice(0, 4) : BranchOfficeCaseCountList
        this.setState({
          data: Data,
          closeTime: response.data.closeTime
        })
      }
    }, error => {
      console.log(error)
    })
  }
  render () {
    return (
      <div className='case-num-office'>
        <h3>分局发案总数<span className='end-time'>(上次截止：{this.state.closeTime})</span></h3>
        {/* <TableList columns={this.state.columns} dataSource={this.state.data} /> */}
        <List className='case'>
          <List.Item>
            <div className='status' />
            <div className='branch-office-name'>分局名称</div>
            <div className='case-percentage'>占比</div>
            <div className='case-count'>案件数量</div>
          </List.Item>
          {this.state.data.map((item, index) => {
            let Status = index === 0 ? <Badge status='Processing' /> : index === 1 ? <Badge status='Warning' /> : index === 2 ? <Badge status='Success' /> : <Badge status='Error' />
            console.log(index)
            return (<List.Item key={index}>
              <div className='status'>{Status}</div>
              <div className='branch-office-name'>{item.branchOfficeName}</div>
              <div className='case-percentage'>{item.percentage}%</div>
              <div className='case-count'>{item.caseTotalCount}</div>
            </List.Item>)
          })}
        </List>
      </div>
    )
  }
}
