import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Breadcrumb, Row, Col, Select, Button, Form, Modal, message} from 'antd'
import ajax from '../../../api'
import moment from 'moment'
import RangePicker from '../../../components/common/rangePicker/RangePicker'
import CustomPagingTable from '../../../components/common/table/TablePaging'
import Empty from '../../../components/common/empty/Empty'
import './HomePage.scss'
const FormItem = Form.Item
const Option = Select.Option
export class HomePageForm extends Component {
  constructor () {
    super()
    this.state = {
      id: '',
      sendStatus: -1, // 短信状态
      showModal: false,
      sendMsgPeopleNum: 0, // 发送短信条数
      sendStatusArr: [
        {
          name: '全部',
          status: -1
        },
        {
          name: '发送成功',
          status: 1
        },
        {
          name: '发送失败',
          status: 0
        }
      ], // 短信状态数组
      receiveObj: '', // 接收人
      recipientArr: [
        {
          name: '全部',
          status: ''
        },
        {
          name: '0-1年的用户',
          status: '1'
        },
        {
          name: '1-2年的用户',
          status: '2'
        },
        {
          name: '2-3年的用户',
          status: '3'
        },
        {
          name: '已过期用户',
          status: '4'
        }], // 接收人数组
      hasData: true,
      startTime: '',
      endTime: '',
      pageSize: 10,
      pageNum: 1,
      totalNum: 0, // 总条数
      columns: [
        {
          title: '发送内容',
          dataIndex: 'content',
          key: 'content'
        }, {
          title: '发送状态',
          dataIndex: 'sendStatus',
          key: 'sendStatus',
          render: (text, record, index) => {
            let Text = record.sendStatus === 0 ? '发送失败' : '发送成功'
            return (<span >{Text}</span>)
          }
        }, {
          title: '发送时间',
          dataIndex: 'sendTime',
          key: 'sendTime'
        }, {
          title: '接收人',
          dataIndex: 'receiveObj',
          key: 'receiveObj',
          render: (text) => {
            return (<span >{text}年的用户</span>)
          }
        }, {
          title: '发送条数',
          dataIndex: 'sendCount',
          key: 'sendCount'
        }, {
          title: '操作',
          dataIndex: 'handle',
          key: 'handle',
          render: (text, record) => {
            return (<span style={{cursor: 'pointer', color: '#0099ff'}} onClick={() => this.reSend(record)} >再次发送</span>)
          }
        }
      ],
      data: [
        {
          content: 'f12324',
          sendStatus: 0,
          sendTime: '2018-01 - 01 12: 21',
          receiveObj: '问问',
          sendCount: 1
        },
        {
          content: 'f12324',
          sendStatus: 1,
          sendTime: '2018-01 - 01 12: 21',
          receiveObj: 'www',
          sendCount: 22
        }

      ]
    }
  }
  // 每页个数改变时
  onShowSizeChange (current, pageSize) {
    this.setState({ pageNum: current, pageSize: pageSize }, () => {
      this.getMsgData()
    })
  }
  // 页码改变时
  onChangePage (current, pageSize) {
    this.setState({ pageNum: current, pageSize: pageSize }, () => {
      this.getMsgData()
    })
  }
  // 案发时间
  occurDate = (startDate, endDate) => {
    let StartDate = moment(startDate).format('YYYY-MM-DD HH:MM:SS')
    let EndDate = moment(endDate).format('YYYY-MM-DD HH:MM:SS')
    this.setState({
      startTime: StartDate,
      endTime: EndDate
    })
  }
  // 表单提交方法
  handleSearch = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) {
        return
      }
      console.log(values)
      this.setState({
        hasData: true,
        sendStatus: this.state.sendStatus,
        receiveObj: this.state.receiveObj,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
        pageSize: this.state.pageSize,
        pageNum: this.state.pageNum,
        ...values
      }, () => {
        this.getMsgData()
      })
      // console.log('表单提交过来的查询条件是: ', fieldsValue)
    })
  }
  // 再次发送按钮
  reSend=(record) => {
    console.log(record)
    this.setState({
      id: record.id,
      sendMsgPeopleNum: record.sendCount,
      showModal: true
    }, () => this.sendSecondVerificationCode(this.state.id))
  }

  sendSecondVerificationCode (id) {
    ajax.sendSecondVerificationCode({id: id}, response => {
      console.log(response)
    }, error => {
      console.log(error)
    })
  }
  // 点击发送短信弹出框的确定按钮
  handleSendConfirm = () => {
    this.setState({
      showModal: false,
      verificationCode: this.refs.sendcontent.value
    }, () => {
      this.sendSecondSMS()
    })
  }
  // 点击发送短信弹出框的确定按钮的请求
  sendSecondSMS () {
    ajax.sendSecondSMS({ id: this.state.id, verificationCode: this.state.verificationCode }, response => {
      console.log(response)
      if (response.code === 105) {
        message.success('发送成功')
        this.getMsgData()
      } else {
        message.error('发送失败')
      }
    }, error => {
      console.log(error)
    })
  }

  // 隐藏弹出框
  hideConfirmModal = () => {
    this.setState({ showModal: false })
  }
  // 得到数据
  getMsgData () {
    ajax.getSearchSMSLogList({startTime: this.state.startTime, endTime: this.state.endTime, sendStatus: this.state.sendStatus, receiveObj: this.state.receiveObj, pageSize: this.state.pageSize, pageNum: this.state.pageNum}, response => {
      console.log(response)
      if (response.code === 101) {
        this.setState({
          id: response.data.resultList[0].id,
          totalNum: response.data.total, // 总条数
          data: response.data.resultList
        })
      }
    }, error => {
      console.log(error)
    })
  }
  componentDidMount () {
    this.getMsgData()
  }
  render () {
    const { getFieldDecorator } = this.props.form

    return (
      <div className='send-msg'>
        <Breadcrumb>
          <Breadcrumb.Item> <a href='./#/office/mark'>标签安装</a></Breadcrumb.Item>
          <Breadcrumb.Item>短信发送记录</Breadcrumb.Item>
        </Breadcrumb>
        <div className='search-ipt'>
          <h3>案件相关人员</h3>
          <Form onSubmit={this.handleSearch}>
            <Row>
              <Col span={6}>
                <FormItem
                  label='短信状态'
                  labelCol={{ span: 10 }}
                  wrapperCol={{ span: 14 }}
                >
                  {getFieldDecorator('sendStatus', {
                    initialValue: this.state.sendStatus
                  })(
                    <Select style={{ width: '100%' }}>
                      {this.state.sendStatusArr.map((item, index) => {
                        return <Option key={index} value={item.status}>{item.name}</Option>
                      }
                      )}
                    </Select>)
                  }
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem
                  label='接收人'
                  labelCol={{ span: 10 }}
                  wrapperCol={{ span: 14 }}
                >
                  {getFieldDecorator('receiveObj', {
                    initialValue: this.state.receiveObj
                  })(
                    <Select style={{ width: '100%' }}>
                      {this.state.recipientArr.map((item, index) => {
                        return <Option key={index} value={item.status}>{item.name}</Option>
                      }
                      )}
                    </Select>)
                  }
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem
                  label='发送时间'
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 20 }}
                >
              (
                  <RangePicker width='10vw' selectDate={this.occurDate} />
              )
                  }
                </FormItem>
              </Col>
              <Col span={2} >
                <FormItem>
                  <Button type='primary' htmlType='submit' className='btn-clear btn-com'>开始检索</Button>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
        {this.state.hasData
          ? <div style={{ background: '#122346' }}>
            <CustomPagingTable
              dataSource={this.state.data}
              columns={this.state.columns}
              pageVisible={this.state.data.length > 0}
              pageNum={this.state.pageNum}
              pageSize={this.state.pageSize}
              currentPage={this.state.currentPage}
              tatalPage={this.state.totalNum}
              onShowSizeChange={(current, pageSize) => this.onShowSizeChange(current, pageSize)}
              onChange={(current, pageSize) => this.onChangePage(current, pageSize)}
              total={this.state.data.length}
            />
          </div> : <Empty />}
        <Modal
          title='再次发送短信'
          visible={this.state.showModal}
          onOk={this.handleSendConfirm}
          maskClosable={false}
          onCancel={this.hideConfirmModal}
          cancelText='取消'
          okText='确认'
          style={{ width: '40vw', height: '30vh', left: '45%' }}
        >
          <p>本次发送短信：{this.state.sendMsgPeopleNum}条</p>
          <p>
            <label htmlFor=''>请输入领导验证码: <input type='text' style={{ width: '200px', outline: 'none' }} ref='sendcontent' /></label>
          </p>
        </Modal>
          )}
      </div>
    )
  }
}
const HomePage = Form.create()(HomePageForm)
export default HomePage
HomePageForm.propTypes = {
  form: PropTypes.object
}
