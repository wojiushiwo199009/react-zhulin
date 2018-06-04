// 分局警情
import React, { Component } from 'react'
import RangePicker from '../../../components/common/rangePicker/RangePicker'
import ajax from '../../../api'
import CaseItem from './CaseItem'
import { Button, Divider, List, Badge } from 'antd'
import moment from 'moment'
export default class Police extends Component {
  constructor () {
    super()
    this.state = {
      news: {
        caseTotalNumber: 1203,
        internetCaseCount:
          {
            count: 20,
            percentage: 50
          },
        notInternetCaseCount:
          {
            count: 20,
            percentage: 50
          },
        misreportCases: 25,
        investigationCases: 1203,
        submitCaseFiles: 6
      }
    }
  }
  // 选择日期
  selectDate = (startDate, endDate) => {
    let StartDate = moment(startDate).format('YYYY-MM-DD HH:MM:SS')
    let EndDate = moment(endDate).format('YYYY-MM-DD HH:MM:SS')
    this.setState({
      beginTime: StartDate,
      endTime: EndDate
    })
  }
  // 得到数据
  getData = (starttime, endtime) => {
    ajax.getStatisticsPoliceStationAlarm({ startTime: starttime, endTime: endtime }, response => {
      if (response.code === 101) {
        this.setState({
          news: response.data
        })
      }
    }, error => {
      console.log(error)
    })
  }

  // 分类检索点击事件
  searckClick = () => {
    this.getData(this.state.beginTime, this.state.endTime)
  }
  componentDidMount () {
    this.getData('', '')
  }
  render () {
    return (
      <div className='police'>
        <div className='search-tips'>
          <h3>盘龙分局警情</h3>
          <span className='search-key'>
            <span className='label normal-color'>选择时间段&nbsp;</span>
            <RangePicker width='8vw' selectDate={this.selectDate} />
          </span>
          <Button type='primary' onClick={this.searckClick}>确认</Button>
        </div>
        <Divider />
        <div className='total-case'>
          <CaseItem caseTitle='发案总数' caseNumber={this.state.news.caseTotalNumber} />
          <List className='case'>
            <List.Item>
              <Badge status='processing' />
              <div className='inter-case'>物联网案件</div>
              <div className='case-percentage'>{this.state.news.internetCaseCount.percentage}%</div>
              <div className='case-count'>{this.state.news.internetCaseCount.count}</div>
            </List.Item>
            <List.Item>
              <Badge status='warning' />
              <div className='inter-case'>非物联网案件</div>
              <div className='case-percentage'>{this.state.news.notInternetCaseCount.percentage}%</div>
              <div className='case-count'>{this.state.news.notInternetCaseCount.count}</div>
            </List.Item>
          </List>
          <CaseItem caseTitle='确定误报案件' caseNumber={this.state.news.misreportCases} />
          <CaseItem caseTitle='目前查缉案件数量' caseNumber={this.state.news.investigationCases} />
          <CaseItem caseTitle='提交档案数量' caseNumber={this.state.news.submitCaseFiles} />
        </div>
      </div>
    )
  }
}
