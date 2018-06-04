// 派出所饼图
import React, { Component } from 'react'
import Echarts from '../../../../components/common/Echarts'
import Empty from '../../../../components/common/empty/Empty'
import ajax from '../../../../api'
import { Tag, Input, Table, Tooltip, Icon, Modal, message, Col } from 'antd'
import { Button } from 'antd/lib/radio'

export default class ChartPie extends Component {
  constructor () {
    super()
    this.state = {
      data: [],
      hasData: false,
      hasLabel: 0,
      option: {}, // 饼图
      selectedLenged: 1, // 点击图例的id
      columns: [
        {
          title: '',
          dataIndex: 'icon',
          key: 'icon',
          render: (text, reocrd, index) => {
            return <div style={{ textAlign: 'right' }}>{this.state.hasLabel === index ? <Icon style={{ color: '#0099ff' }} type='double-right' /> : ''}</div>
          }
        },
        {
          title: '分局名称',
          dataIndex: 'subbureauName',
          key: 'subbureauName'
        }, {
          title: '车辆数量',
          dataIndex: 'installCount',
          key: 'installCount',
          sorter: (a, b) => a.installCount - b.installCount
        }
      ],
      subbureauId: '0', // 分局id
      selectedName: '0-1年',
      dataSource: [
        {
          key: 1,
          icon: '',
          subbureauId: 'd24325435',
          subbureauName: '盘龙分局',
          installCount: 23
        },
        {
          key: 2,
          icon: '',
          subbureauId: 'd24325435',
          subbureauName: '官渡分局',
          installCount: 13
        }
      ],
      sendMsgPeopleNum: 0, // 总发送人数
      PeopleNum: 0, // 总人数
      tags: [
        {
          name: '设备过期',
          content: '尊进的用户，您的电动车物联网设备即将过期，请于2018年3月6日前至昆明市内安装点，进行设备更换。'
        },
        {
          name: '案件高发',
          content: '尊进的用户，近日穿金路南段附件电动车盗窃案件高发，请注意停车位置，保证车辆上锁，尽量停放于保管机构。谨防丢失！'
        },
        {
          name: '行车安全',
          content: '尊进的用户，近期发生多起电单车交通事故，多为电单车骑行人员速度过快所致，为了您的生命财产安全，请谨慎骑车，礼让行人。'
        },
        {
          name: '设备召回',
          content: '尊进的用户，您的电动车物联网设备即将过期，请于2018年3月6日前至昆明市内安装点，进行设备更换。'
        }
      ], // 发送短信模板标题
      inputVisible: false, // 添加短信的input显隐
      name: '', // 短信新增模板的标题value值
      content: '', // 短信新增模板的内容value值
      currentContentValue: '', // 当前显示的模板内容
      confirmSendMsg: false, // 短信确认弹出框
      verificationCode: 2345, // 验证码
      currentId: '9'
    }
  }
  initChart (data) {
    let legendData = []
    let seriesData = []
    data.map((item) => {
      if (item.timeSlot !== '超过使用期限') {
        legendData.push(item.timeSlot + '年')
        seriesData.push({
          name: item.timeSlot + '年',
          value: item.count
        })
      } else {
        legendData.push(item.timeSlot)
        seriesData.push({
          name: item.timeSlot,
          value: item.count
        })
      }
    })
    this.setState({
      option: {
        title: {
          text: ''
        },
        color: ['#00a9ff', '#ff6600', '#fc3', '#0f9'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          x: 'center',
          y: 'bottom',
          itemGap: 20,
          icon: 'circle',
          data: legendData,
          textStyle: {
            color: '#f2f2f2'
          }
        },
        series: [
          {
            name: '安装数据',
            type: 'pie',
            radius: ['45%', '60%'],
            center: ['50%', '50%'],
            label: {
              normal: {
                position: 'center'
              }
            },
            data: [{
              value: seriesData[0].value,
              name: seriesData[0].name,
              label: {
                show: false
              }
            }, {
              value: seriesData[1].value,
              name: seriesData[1].name,
              tooltip: {
                show: true
              },
              label: {
                normal: {
                  formatter: function (params) {
                    return seriesData[0].value + seriesData[1].value + seriesData[2].value + seriesData[3].value + '辆'
                  },
                  textStyle: {
                    color: '#f2f2f2',
                    fontSize: 22
                  }
                },
                textStyle: {
                  color: '#f2f2f2',
                  fontSize: 22
                }
              }
            },
            {
              value: seriesData[2].value,
              name: seriesData[2].name,
              tooltip: {
                show: true
              },
              label: {
                normal: {
                  formatter: '\n总数据',
                  textStyle: {
                    color: '#f2f2f2',
                    fontSize: 18
                  }
                },
                textStyle: {
                  color: '#f2f2f2',
                  fontSize: 18
                }
              }
            },
            {
              value: seriesData[3].value,
              name: seriesData[3].name,
              tooltip: {
                show: true
              },
              label: {
                show: false
              }
            }]
          }
        ]
      }
    })
  }
  // 获取饼图的分局安装数据数据
  getPieData () {
    let self = this
    ajax.getStatisticsHardwareData({}, response => {
      if (response.code === 101) {
        self.setState({
          hasData: true,
          data: response.data
        }, () => {
          self.initChart(this.state.data)
        })
      }
    }, error => {
      console.log(error)
    })
  }
  // 获取分局表格的安装数据数据
  getTableListData () {
    let self = this
    ajax.getStatisticsSubbureauHardwareData({timeSlotKey: this.state.selectedLenged}, response => {
      response.data.subbureauCount.map((item, index) => {
        item.key = index
      })
      if (response.code === 101) {
        self.setState({
          dataSource: response.data.subbureauCount,
          PeopleNum: response.data.total,
          subbureauId: response.data.subbureauCount[0].subbureauId,
          sendMsgPeopleNum: response.data.subbureauCount[0].installCount
        })
      }
    }, error => {
      console.log(error)
    })
  }
  // 点击图例的方法
  onLegendselectchanged=(params) => {
    this.setState({
      hasLabel: 0
    })
    var isSelected = params.selected[params.name]
    if (params.name === '0~1年') {
      this.setState({
        selectedLenged: 1,
        selectedName: params.name
      }, () => {
        this.getTableListData()
      })
    } else if (params.name === '1~2年') {
      this.setState({
        selectedLenged: 2,
        selectedName: params.name
      }, () => {
        this.getTableListData()
      })
    } else if (params.name === '2~3年') {
      this.setState({
        selectedLenged: 3,
        selectedName: params.name
      }, () => {
        this.getTableListData()
      })
    } else if (params.name === '超过使用期限') {
      this.setState({
        selectedLenged: 4,
        selectedName: params.name
      }, () => {
        this.getTableListData()
      })
    }
    // 在控制台中打印
    console.log((isSelected ? '选中了' : '取消选中了') + '图例' + params.name)
  }
  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    })
  }
  showModal = () => {
    this.setState({ inputVisible: true })
  }
  hideModal = () => {
    this.setState({ inputVisible: false })
  }
  hideConfirmModal = () => {
    this.setState({ confirmSendMsg: false })
  }
  handleContentChange = (e) => {
    this.setState({ content: e.target.value })
  }
  handleTitleChange = (e) => {
    this.setState({ name: e.target.value })
  }
  // 点击弹出层的确定按钮
  handleInputConfirm = () => {
    const state = this.state
    const name = state.name
    const content = state.content
    let tags = state.tags
    tags.push({
      name,
      content
    })
    ajax.getAddSMSTemplate({ name: state.name, content: state.content }, response => {
      if (response.msg === '添加成功') {
        this.setState({
          tags,
          inputVisible: false,
          name: '',
          content: ''
        })
        message.success('添加成功')
      } else {
        message.error('添加失败')
      }
    }, error => {
      console.log(error)
    })
  }
  // 点击每个tag发生的事件
  tagChange = (e) => {
    this.state.tags.map((item) => {
      if (item.name === e.target.innerHTML) {
        for (let i = 0; i < document.getElementsByClassName('ant-tag').length; i++) {
          document.getElementsByClassName('ant-tag')[i].style.color = '#7F90B7'
        }
        e.target.style.color = '#0099ff'
        this.setState({
          currentContentValue: item.content
        })
      }
    })
  }
  // 得到短信模板内容
  getSearchSMSTemplateList () {
    ajax.getSearchSMSTemplateList({}, response => {
      if (response.code === 101) {
        this.setState({
          tags: response.data,
          currentContentValue: response.data[0].content
        })
      }
    }, error => {
      console.log(error)
    })
  }
  // 点击分局的行的方法
  RowClick = (reocrd, index) => {
    console.log(reocrd)
    console.log(index)
    this.setState({
      hasLabel: reocrd.key,
      subbureauId: reocrd.subbureauId,
      sendMsgPeopleNum: reocrd.installCount
    })
  }
  // 得到发送短信的接口
  getSendVerificationCode =() => {
    ajax.getSendVerificationCode({ content: this.state.currentContentValue, receiveObj: this.state.selectedLenged, sendCount: this.state.sendMsgPeopleNum, subbureauId: this.state.subbureauId }, response => {
      if (response.code === 105) {
        this.setState({
          currentId: response.data.id
        })
      }
    }, error => {
      console.log(error)
    })
  }
  // 点击短信模板下边的确定按钮
  confirm = () => {
    if (this.state.sendMsgPeopleNum === 0) {
      message.error('发送短信条数为0，请重新选择')
    } else {
      this.setState({
        confirmSendMsg: true
      }, () => {
        this.getSendVerificationCode()
      })
    }
  }
  // 发送短信
  sendSMS=() => {
    ajax.sendSMS({ id: this.state.currentId, receiveObj: this.state.selectedLenged, verificationCode: this.state.verificationCode, subbureauId: this.state.subbureauId }, response => {
      if (response.code === 105) {
        message.success('发送成功')
      } else {
        message.error('发送失败')
      }
    }, error => {
      console.log(error)
    })
  }

  // 点击发送短信弹出框的确定按钮
  handleSendConfirm = () => {
    this.setState({
      confirmSendMsg: false,
      verificationCode: this.refs.sendcontent.value
    }, () => {
      this.sendSMS()
    })
  }
  componentDidMount () {
    this.getPieData()
    this.getTableListData()
    this.getSearchSMSTemplateList()
  }
  render () {
    return (
      <div className='chart-pie'>
        <div style={{height: '36vh'}}>
          {this.state.hasData ? <Echarts options={this.state.option} width='100%' height='36vh' onLegendselectchanged={this.onLegendselectchanged} /> : <Empty msg='暂无数据' />}
        </div>
        <h3 style={{padding: '2vh 2vw 0vh'}}>
          <span>以下为{this.state.selectedName}的数据</span>
          <div className='icon'>
            <Tooltip placement='bottom' title='可直接编辑短信发送到以上4个状态的车主，发送前需连级主任审核'>
              <Icon type='question-circle-o' /><a href='./#/office/send-msg' >查看发送记录</a>
            </Tooltip>
          </div>
        </h3>
        <div className='table-list'>
          <Table pagination={false} onRow={(reocrd, index) => {
            return {
              onClick: () => { this.RowClick(reocrd, index) }
            }
          }} columns={this.state.columns} dataSource={this.state.dataSource} onChange={this.handleChange} />
          <div className='total-num'>共{this.state.PeopleNum}人</div>
        </div>
        <div className='message'>
          <h3>短信模板</h3>
          <div style={{overflow: 'hidden'}}>
            {this.state.tags.map((tag, index) => {
              const isLongTag = tag.length > 20
              const tagElem = (
                <Tag key={index} onClick={this.tagChange} >
                  {isLongTag ? `${tag.name.slice(0, 20)}...` : tag.name}
                </Tag>
              )
              return isLongTag ? <Tooltip title={tag.name} key={index}>{tagElem}</Tooltip> : tagElem
            })}
            <Icon onClick={this.showModal} type='plus-circle-o' />
            <div className='input-content'>
              <textarea style={{display: 'inline-block', width: '100%', height: '15vh', marginBottom: '1vh'}} type='text' value={this.state.currentContentValue} />
              <Col span={16}>
                <span>文字内容需要1条短信&nbsp; &nbsp; &nbsp;&nbsp;目前还剩余{this.state.sendMsgPeopleNum}条</span>
              </Col>
              <Col span={8} style={{textAlign: 'right', paddingRight: '1vw'}}>
                <span>
                  <Button onClick={this.confirm} style={{marginBottom: '1vh',
                    marginRight: '1vw',
                    color: '#fff',
                    backgroundColor: '#40a9ff',
                    borderColor: '#40a9ff'}}>确认</Button>
                </span>
                <span>
                  <Button style={{color: '#fff', backgroundColor: '#f5222d', borderColor: '#f5222d'}}>取消</Button>
                </span>
              </Col>
            </div>

            {this.state.inputVisible && (
              <Modal
                title='新增短信模板'
                visible={this.state.inputVisible}
                onOk={this.handleInputConfirm}
                maskClosable={false}
                onCancel={this.hideModal}
                cancelText='取消'
                okText='确认'
                style={{ width: '40%', height: '35vh', top: '20%' }}
              >
                <p>
                  <Input
                    ref={this.inputTitle}
                    type='text'
                    placeholder='请输入标题'
                    style={{ width: '25vw' }}
                    value={this.state.name}
                    onChange={this.handleTitleChange}
                  />
                </p>
                <p>
                  <textarea
                    ref={this.inputContent}
                    type='text'
                    placeholder='请输入内容'
                    style={{width: '25vw', height: '18vh'}}
                    value={this.state.content}
                    onChange={this.handleContentChange}
                  />
                </p>
              </Modal>

            )}
            <div>
              {this.state.confirmSendMsg && (
                <Modal
                  title='短信确认信息'
                  visible={this.state.confirmSendMsg}
                  onOk={this.handleSendConfirm}
                  maskClosable={false}
                  onCancel={this.hideConfirmModal}
                  cancelText='取消'
                  okText='确认'
                  style={{ width: '40vw', height: '30vh', top: '30%' }}
                >
                  <p>本次发送短信：{this.state.sendMsgPeopleNum}条</p>
                  <p>
                    <label htmlFor=''>请输入领导验证码: <input type='text' style={{width: '200px', outline: 'none'}} ref='sendcontent' /></label>
                  </p>
                </Modal>
              )}
            </div>
          </div>
        </div>
      </div>

    )
  }
}
