import React, { Component } from 'react'
import {Button, Col, Table} from 'antd'
import moment from 'moment'
import ajax from '../../../api'
import RangePicker from '../../../components/common/rangePicker/RangePicker'
import Empty from '../../../components/common/empty/Empty'
import ChartPie from './chart-pie/ChartPie'
export default class HomePage extends Component {
  constructor () {
    super()
    this.state = {
      installTotalCount: 1000,
      startTime: '',
      endTime: '',
      branchOfficeInstallCountList: [
        {
          branchOfficeName: '盘龙分局',
          installTotalCount: 3
        },
        {
          branchOfficeName: '官渡分局',
          installTotalCount: 13
        }
      ],
      officeColumns: [
        {
          title: '分局名称',
          dataIndex: 'branchOfficeName',
          key: 'branchOfficeName'
        },
        {
          title: '占比',
          dataIndex: 'percentage',
          key: 'percentage',
          render: (text, reocrd, index) => {
            return reocrd.percentage + '%'
          }
        },
        {
          title: '安装数量',
          dataIndex: 'installTotalCount',
          key: 'installTotalCount'
        }
      ],
      policeColumns: [
        {
          title: '',
          dataIndex: 'policeStationName',
          key: 'PoliceName'
        }, {
          title: '',
          dataIndex: 'installCount',
          key: 'installCount'
        }
      ],
      policeData: [
        {
          policeStationName: '新迎派出所',
          installCount: 32,
          key: 0
        }, {
          policeStationName: '白龙派出所',
          installCount: 42,
          key: 1
        }, {
          policeStationName: '拓东派出所',
          installCount: 32,
          key: 2
        }
      ],
      currentPolice: '盘龙分局',
      currentPoliceId: '',
      hasData: false
    }
  }

  // 选择日期
  selectDate = (startDate, endDate) => {
    let StartDate = moment(startDate).format('YYYY-MM-DD')
    let EndDate = moment(endDate).format('YYYY-MM-DD')
    this.setState({
      startTime: StartDate,
      endTime: EndDate
    })
  }
  rowClick (e) {
    console.log(e)
    this.setState({
      currentPolice: e.branchOfficeName,
      currentPoliceId: e.branchOfficeId
    }, () => {
      this.getPoliceStationData()
    })
  }
  // 得到各个分局的安装数据
  getOfficeData () {
    ajax.getStatisticsBranchOfficeInstallData({ startTime: this.state.startTime, endTime: this.state.endTime }, response => {
      if (response.code === 101) {
        if (response.data.branchOfficeInstallCountList) {
          this.setState({
            hasData: true,
            installTotalCount: response.data.totalCount,
            branchOfficeInstallCountList: response.data.branchOfficeInstallCountList,
            currentPoliceId: response.data.branchOfficeInstallCountList[0].branchOfficeId
          }, () => {
            this.getPoliceStationData()
          })
        } else {
          this.setState({
            hasData: false
          }, () => {
            this.getPoliceStationData()
          })
        }
      }
    }, error => {
      console.log(error)
    })
  }
  // 得到各分局下各个派出所的安装数据
  getPoliceStationData () {
    ajax.getStatisticsPoliceStationInstallData({ startTime: this.state.startTime, endTime: this.state.endTime, subbureauId: this.state.currentPoliceId }, response => {
      if (response.code === 101) {
        this.setState({
          policeData: response.data
        })
      }
    }, error => {
      console.log(error)
    })
  }
  // 时间查询按钮方法
  searckClick= () => {
    this.getOfficeData()
  }
  componentDidMount () {
    this.getOfficeData()
    // this.getPoliceStationData()
  }
  render () {
    this.allInstallNum = 0
    this.state.branchOfficeInstallCountList.map((item) => {
      this.allInstallNum += item.installTotalCount
    })
    this.state.branchOfficeInstallCountList.map((item, index) => {
      item.key = index
    })
    this.state.policeData.map((item, index) => {
      item.key = index
    })
    let dataLength = this.state.policeData.length % 2 === 0 ? this.state.policeData.length / 2 : parseInt(this.state.policeData.length / 2) + 1
    return (
      <div style={{overflow: 'hidden'}}>
        <div className='content-left-top'>
          <span className='search-key'>
            <span className='label normal-color'>选择时间段&nbsp;</span>
            <RangePicker width='8vw' selectDate={this.selectDate} />
            <Button type='primary' onClick={this.searckClick}>确认</Button>
          </span>
          {this.state.hasData ? <div className='total-num'>安装总数：<span>{this.state.installTotalCount}</span> </div> : <Empty msg='暂无数据' />}
          <Col span={12}>
            {this.state.hasData ? <ChartPie style={{ height: '28vh' }} PieListData={this.state.branchOfficeInstallCountList} /> : <Empty msg='暂无数据' />}
          </Col>
          <Col span={12}>
            {this.state.hasData ? <Table onRow={(reocrd, index) => {
              return {
                onClick: () => { this.rowClick(reocrd, index) }
              }
            }} style={{ height: '32vh', paddingTop: '2vh' }} columns={this.state.officeColumns} dataSource={this.state.branchOfficeInstallCountList} pagination={false} /> : <Empty msg='暂无数据' />}
          </Col>
        </div>
        <div className='content-left-bottom'>
          <Col span={24}>
            <h3>{this.state.currentPolice}下属派出所安装数据</h3>
            {this.state.policeData.length > 0 ? <div className='table-content'>
              <Col span={12}>
                <Table pagination={false} columns={this.state.policeColumns} dataSource={this.state.policeData.slice(0, dataLength)} />
              </Col>
              <Col span={12}>
                <Table pagination={false} columns={this.state.policeColumns} dataSource={this.state.policeData.slice(dataLength)} />
              </Col>
            </div> : <Empty msg='暂无数据' />}
          </Col>
        </div>
      </div>
    )
  }
}
