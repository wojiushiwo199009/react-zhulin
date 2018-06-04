// 派出所饼图
import React, { Component } from 'react'
import {Col, Table, Button} from 'antd'
import ajax from '../../../api'
// import moment from 'moment'
import Echarts from '../../../components/common/Echarts'
import './ChartPie.scss'
export default class ChartPie extends Component {
  constructor () {
    super()
    this.state = {
      tableShow: false,
      statisticsSuspectAddresss: [],
      columns: [
        {
          title: '年龄段',
          dataIndex: 'statisticsType',
          key: 'statisticsType'

          // render: text => <a href='#'>{text}</a>
        },
        {
          title: '占比',
          dataIndex: 'percent',
          key: 'percent',
          render: (text, record, index) => {
            return (<span >
              {record.percent} %
            </span>)
          }
        },
        {
          title: '人数',
          dataIndex: 'userCount',
          key: 'userCount'

        }

      ],
      option: {
        axisLabel: {
          color: '#C9C9C9'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          // orient: 'vertical',
          x: 'left',
          bottom: 10,
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
          textStyle: { // 图例文字的样式
            color: '#C9C9C9',
            fontSize: 12
          }
        },
        series: [
          {
            name: '年龄分布',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            // axisLabel: {
            //   color: '#C9C9C9'
            // },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {value: 335, name: '直接访问'},
              {value: 310, name: '邮件营销'},
              {value: 234, name: '联盟广告'},
              {value: 135, name: '视频广告'},
              {value: 1548, name: '搜索引擎'}
            ]
          }
        ]
      },
      data:
        {
          // installTotalCount: 1000,
          lineData:
          [
            {
              statisticsType: '2018-01 - 01',
              userCount: 200
            },
            {
              statisticsType: '2018-01 - 02',
              userCount: 300
            },
            {
              statisticsType: '2018-01 - 03',
              userCount: 500
            }
          ]
        },
      // beginTime: '',
      // endTime: '',
      seriesData: [],
      lineData: []
    }
  }
  // 选择日期
  // selectDate = (startDate, endDate) => {
  //   let StartDate = moment(startDate).format('YYYY-MM-DD HH:MM:SS')
  //   let EndDate = moment(endDate).format('YYYY-MM-DD HH:MM:SS')
  //   this.setState({
  //     beginTime: StartDate,
  //     endTime: EndDate
  //   })
  // }
  // 分类检索点击事件
  // searckClick = () => {
  //   let seriesData = []
  //   ajax.getStatisticsInstallData({ startTime: this.state.beginTime, endTime: this.state.endTime }, response => {
  //     if (response.code === 101) {
  //       response.data.lineData.map((item) => {
  //         seriesData.push(item.instalNumber)
  //       })
  //       this.setState({
  //         lineData: response.data.lineData,
  //         seriesData: seriesData,
  //         installTotalCount: response.data.installTotalCount
  //       })
  //     }
  //   }, error => {
  //     console.log(error)
  //   })
  // }
  // 点击更多的时候
  tableCallback=() => {
    this.setState({
      tableShow: true
    })
  }
  // 点关闭的时候
  hiddenTable=() => {
    this.setState({
      tableShow: false
    })
  }
  componentDidMount () {
    let seriesData = []
    ajax.statisticsSuspectAge({}, response => {
      console.log(response, 'statisticsSuspectAge')
      if (response.code === 101) {
        response.data.map((item) => {
          seriesData.push({
            name: item.statisticsType,
            value: item.userCount
          })
          console.log(seriesData, 'seriesData6666')
        })
        this.setState({
          lineData: response.data,
          seriesData: seriesData,
          statisticsSuspectAddresss: response.data
          // installTotalCount: response.data.installTotalCount
        })
      }
    }, error => {
      console.log(error)
    })
  }
  render () {
    let legend = []
    this.state.lineData.map((item) => {
      legend.push(item.statisticsType)
    })
    this.state.option.legend.data = legend
    // console.log(this.state.option.xAxis.data, xAxisData, 'xAxisData')
    return (
      <div>
        <div className='ChartPieBox'>
          {this.state.tableShow === true ? <div className='tableBox'>
            <div className='mainLineText2'>
            年龄分布
            </div>
            <div><Table columns={this.state.columns} dataSource={this.state.statisticsSuspectAddresss} pagination={false} /></div>
            <div className='hiddenTable'> <Button type='primary' className='tableButton' onClick={this.hiddenTable}> 关闭</Button></div>

          </div> : ''
          }

          <div className='mainLineText'>
            <Col span={20}>年龄分布</Col>
            <Col span={4} className='moreText' onClick={this.tableCallback} >更多</Col>
          </div>
          <Echarts options={this.state.option} data={this.state.seriesData} width='100%' height='450px' />
        </div>

      </div>
    )
  }
}
