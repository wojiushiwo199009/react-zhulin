import React, { Component } from 'react'
// import Cookies from 'js-cookie'
import PropTypes from 'prop-types'
import { Table, Button, Form, Input, DatePicker, Modal, Select, Popconfirm, message, Divider } from 'antd'
import moment from 'moment'
import ajax from '../../api'
import DeleteOrder from './DeleteOrder'
import './writer.scss'
const Option = Select.Option
const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker

export class WriterForm extends Component {
  state = {
    orderNum: 0,
    userRole: '',
    filteredInfo: null,
    sortedInfo: null,
    startTime: '',
    endTime: '',
    orderCode: '',
    deleteOrderVisible: false,
    userOrderId: '',
    status: 0,
    statusArr: [
      {
        name: '待预约',
        value: 0
      },
      {
        name: '待完成',
        value: 1
      },
      {
        name: '已截稿',
        value: 3
      },
      {
        name: '已完成',
        value: 2
      }
    ],
    businessData: [
      {
        key: '1',
        orderCode: '',
        essayTitle: '',
        reserveTotal: 0,
        createdAt: '2018-02-07',
        adminPrice: 33,
        unfinishedNum: 33,
        userOrderStatus: 1,
        adminEndTime: '2018-02-07'
      }],
    columns: [
      {
        title: '订单号',
        dataIndex: 'orderCode',
        render: text => <a href='javascript:;'>{text || '--'}</a>
      }, {
        title: '订单标题',
        dataIndex: 'essayTitle',
        render: text => <span>{text || '--'}</span>
      }, {
        title: '预约数量',
        dataIndex: 'reserveTotal'
      }, {
        title: '价格',
        dataIndex: 'adminPrice'
      },
      {
        title: '未完成文章',
        dataIndex: 'unfinishedNum',
        render: (text, record) => {
          return (
            <div>
              {
                record.reserveTotal - record.complete
              }
            </div>
          )
        }
      },
      {
        title: '状态',
        dataIndex: 'userOrderStatus',
        render: (text, record) => {
          return (
            <div>
              {
                text === 0 ? <span>待预约</span> : (text === 1) ? <span>待完成</span> : (text === 2) ? <span>已完成</span> : ''
              }
            </div>
          )
        }
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        render: text => <span>{text ? moment.unix(parseInt(text.toString().slice(0, 10))).format('YYYY-MM-DD HH:mm:ss') : '--'}</span>
      },
      {
        title: '截稿时间',
        dataIndex: 'adminEndTime',
        render: text => <span>{text ? moment.unix(parseInt(text.toString().slice(0, 10))).format('YYYY-MM-DD HH:mm:ss') : '--'}</span>
      }, {
        title: '操作',
        dataIndex: 'operate',
        render: (text, record) => {
          console.log(text, record, 'dsfs')
          return (
            <div>
              {
                record.userOrderStatus === 0 ? <Popconfirm title='确定预约吗?' onConfirm={() => this.handleOrder(record)}>
                  <a href='javascript:;'>预约<Divider type='vertical' /></a>
                </Popconfirm> : ''
              }
              {
                record.userOrderStatus === 1 ? <a href='javascript:;' onClick={() => this.handleDelete(record)} className='delete'>取消预约<Divider type='vertical' /></a> : ''
              }
              <a href='javascript:;' onClick={() => this.handleDetail(record)}>查看详情</a>
            </div>
          )
        }
      }
    ]
  };

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.getWriterOrder()
      }
    })
  }
  getWriterOrder = () => {
    let params = {
      orderCode: this.state.orderCode,
      status: this.state.status,
      startTime: this.state.startTime,
      endTime: this.state.endTime
    }
    ajax.SearchWriterOrder(params, response => {
      if (response.state.stateCode === 0) {
        response.data.content.length > 0 && response.data.content.map((item, index) => {
          item.key = index + ''
        })
        this.setState({
          businessData: response.data.content
        })
      } else {
        message.error(response.state.stateMessage || '请稍后再试')
      }
    }, error => {
      console.log(error)
    })
  }
  onChange = (date, dateString) => {
    this.setState({
      startTime: dateString[0],
      endTime: dateString[1]
    })
  }
  handleDetail = (row) => {
    console.log(row, 'row')
    window.open(window.location.origin + `/#/writer/writerDetailOrder?id=${row.userOrderId}`)
  }
  handleOrder = (row) => {
    let params = {
      userOrderId: row.userOrderId
    }
    ajax.WriterOrderAppoint(params, response => {
      if (response.state.stateCode === 0) {
        message.success(response.state.stateMessage || '预约成功')
        this.getWriterOrder()
      } else {
        message.error(response.state.stateMessage || '预约失败，请重试')
        this.getWriterOrder()
      }
    }, error => {
      console.log(error)
      message.error('预约失败，请重试')
      this.getWriterOrder()
    })
  }
  handleDelete = (record) => {
    console.log(record, 'record')
    this.setState({
      deleteOrderVisible: true,
      userOrderId: record.userOrderId,
      orderNum: record.reserveTotal
    })
  }
  save (form, key) {
    console.log(form, key)
    form.validateFields((error, row) => {
      console.log(row)
      if (error) {
        return
      }
      ajax.updateUser(row, response => {
        if (response.state.stateCode === 0) {
          message.success(response.msg)
        } else {
          message.error('修改失败，请重试')
        }
      }, error => {
        console.log(error)
        message.error('修改失败，请重试')
      })
    })
  }

  InpChange = (e) => {
    this.setState({
      orderCode: e.target.value
    })
  }
  selectChange = (value) => {
    this.setState({
      status: value
    })
  }
  getUserInfo = () => {
    ajax.getUserInfo({}, response => {
      if (response.state.stateCode === 0) {
        this.setState({
          userRole: response.data.type
        })
      }
    }, error => {
      console.log(error)
    })
  }
  OnCancel=(record) => {
    this.setState({
      deleteOrderVisible: false
    })
  }
  componentWillMount () {
    this.getUserInfo()
  }
  componentDidMount () {
    this.getWriterOrder()
  }
  render () {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    }
    return (
      <div className='writer'>
        <div className='title'>
          {/* {
            this.state.userRole === 3 ? <Button type='primary' onClick={this.publicOrder}>发布订单</Button> : ''
          } */}
          <Form layout='inline' onSubmit={this.handleSubmit} className='record-form'>
            <FormItem
              {...formItemLayout}
              label='订单号'
            >
              {getFieldDecorator('orderCode', { initialValue: '' })(
                <Input placeholder='请输入订单号' onChange={this.InpChange} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label='订单状态'
            >
              {getFieldDecorator('status', {
                initialValue: this.state.status
              })(
                <Select placeholder='请选择订单状态' style={{ width: 120 }} onChange={this.selectChange}>
                  {
                    this.state.statusArr.map((item, index) => {
                      return <Option key={index} value={item.value}>{item.name}</Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label='起止时间'
            >
              {(
                <RangePicker onChange={this.onChange} />
              )}
            </FormItem>
            <FormItem>
              <Button type='primary' htmlType='submit'>查询</Button>
            </FormItem>
          </Form>
        </div>
        <Table columns={this.state.columns} dataSource={this.state.businessData} />
        <Modal
          title='取消预约'
          visible={this.state.deleteOrderVisible}
          footer={null}
          onCancel={this.OnCancel}
        >
          <DeleteOrder orderNum={this.state.orderNum} userOrderId={this.state.userOrderId} onCancel={this.OnCancel} getWriterOrder={this.getWriterOrder} />
        </Modal>
      </div>
    )
  }
}
const Writer = Form.create()(WriterForm)

WriterForm.propTypes = {
  form: PropTypes.object
}
export default Writer
