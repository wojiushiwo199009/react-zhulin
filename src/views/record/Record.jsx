import React, { Component } from 'react'
// import Cookies from 'js-cookie'
import PropTypes from 'prop-types'
import {Table, Button, Form, Input, DatePicker, Modal, Select, Popconfirm, message, Divider} from 'antd'
import AddOrder from './AddOrder'
import VerifyOrder from './VerifyOrder'
import DistributeOrder from './DistributeOrder'
import WriterOrder from './WriterOrder'
import Money from './Money'
import moment from 'moment'
import ajax from '../../api'
import './record.scss'
const Option = Select.Option
const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker

export class RecordForm extends Component {
  state = {
    userRole: '',
    money: '',
    verifyVisible: false,
    distributeVisible: false,
    orderVisible: false,
    MoneyVisible: false,
    filteredInfo: null,
    sortedInfo: null,
    visible: false,
    startTime: '',
    endTime: '',
    orderCode: '',
    status: 1,
    modalTitle: '发布订单',
    modalObj: {
      id: '',
      total: 1,
      merchantPrice: '',
      eassyType: '',
      notes: '',
      orderTitle: '',
      originalLevel: '',
      picture: 2,
      type: 0,
      endTime: '2018-09-02',
      require: '',
      wordCount: 2000
    },
    verifyObj: {},
    distributeObj: {},
    orderObj: {},
    isEdit: false,
    statusArr: [
      // 0：待审核 1：发布中 2：已完成 3：待点评 4：商家已打款5：取消 6.已截稿 7：管理员已完成（已打款）, 8 - 审核未通过
      {
        name: '待审核',
        value: 0
      },
      {
        name: '发布中',
        value: 1
      },
      {
        name: '已完成',
        value: 2
      },
      {
        name: '待点评',
        value: 3
      },
      {
        name: '商家已打款',
        value: 4
      },
      {
        name: '取消',
        value: 5
      },
      {
        name: '已截稿',
        value: 6
      },
      {
        name: '管理员已完成(已打款)',
        value: 7
      },
      {
        name: '审核未通过',
        value: 8
      }
    ],
    businessData: [
      {
        id: '1',
        key: '1',
        orderStatus: 1,
        orderCode: '',
        eassyType: '',
        orderTitle: '',
        notes: '',
        originalLevel: '',
        picture: 2,
        type: 0,
        require: '',
        wordCount: 222,
        total: 2,
        appointTotal: 1,
        merchantPrice: 33,
        adminPrice: 33,
        createdAt: '2018-02-03',
        endTime: '2018-02-07',
        adminEndTime: '2018-02-07',
        result: ''
      }],
    columns: [
      {
        title: '订单号',
        dataIndex: 'orderCode',
        render: text => <a href='javascript:;'>{text}</a>
      }, {
        title: '订单标题',
        dataIndex: 'orderTitle'
      }, {
        title: '可预约数量',
        dataIndex: 'total'
      }, {
        title: '已预约数量',
        dataIndex: 'appointTotal',
        render: text => <span>{text || 'null'}</span>
      }, {
        title: '我的定价',
        dataIndex: 'adminPrice'
      }, {
        title: '发布状态',
        dataIndex: 'orderStatus',
        render: (text, record) => {
          // 0：待审核 1：发布中 2：已完成 3：待点评 4：商家已打款5：取消 6：已截稿 7：管理员已完成（已打款）, 8 - 审核未通过
          return (
            <div>
              {
                text === 0 ? <span>待审核</span> : (text === 1) ? <span>发布中</span> : (text === 2) ? <span>已完成</span> : (text === 3) ? <span>待点评</span> : (text === 4) ? <span>商家已打款</span> : (text === 5) ? <span>取消</span> : (text === 6) ? <span>已截稿</span> : (text === 7) ? <span>管理员已完成(已打款)</span> : (text === 8) ? <span>审核未通过</span> : ''
                // <a href='javascript:;' onClick={() => this.handleDetail(record)}>查看详情<Divider type='vertical' /></a>
              }
            </div>
          )
        }
      }, {
        title: '发布时间',
        dataIndex: 'createdAt',
        render: text => <span>{text ? moment.unix(parseInt(text.toString().slice(0, 10))).format('YYYY-MM-DD HH:mm:ss') : '--'}</span>
      },
      {
        title: '我的截稿时间',
        dataIndex: 'adminEndTime',
        render: text => <span>{text ? moment.unix(parseInt(text.toString().slice(0, 10))).format('YYYY-MM-DD HH:mm:ss') : '--'}</span>
      }, {
        title: '审核结果',
        dataIndex: 'result',
        render: text => (text || '')
      }, {
        title: '操作',
        dataIndex: 'operate',
        render: (text, record) => {
          console.log(text, record, 'dsfs')
          console.log(this.state.userRole, record.orderStatus, 'ssssss')
          return (
            <div>
              {
                this.state.userRole === 2 ? <a disabled={record.orderStatus !== 0} onClick={() => this.handleAllot(record)}>分配订单<Divider type='vertical' /></a> : ''
              }
              {
                (this.state.userRole === 2 && record.orderStatus === 0) ? <a onClick={() => this.handleVerify(record)}>审核<Divider type='vertical' /></a> : ''
              }
              {
                (this.state.userRole === 3 && (record.orderStatus === 0 || record.orderStatus === 8)) ? <a onClick={() => this.edit(record)}>编辑<Divider type='vertical' /></a> : ''
              }
              {
                (this.state.userRole === 3 && (record.orderStatus === 0 || record.orderStatus === 8)) ? <Popconfirm title='确定删除吗?' onConfirm={() => this.handleDelete(record)}><a href='javascript:;' className='delete'>删除<Divider type='vertical' /></a></Popconfirm> : ''
              }
              {
                (this.state.userRole === 4 && record.orderStatus === 1) ? <a onClick={() => this.handleOrder(record)} href='javascript:;'>预约<Divider type='vertical' /></a> : ''
              }
              {
                (this.state.userRole === 3 && record.orderStatus === 6) ? <a onClick={() => this.handleMoney(record)} href='javascript:;'>打款<Divider type='vertical' /></a> : ''
              }
              {
                (this.state.userRole === 2 && record.orderStatus === 4) ? <Popconfirm title='确定打款吗?' onConfirm={() => this.handleConfirmMoney(record)}><a href='javascript:;'>确认商家打款<Divider type='vertical' /></a></Popconfirm> : ''
              }
              {
                <a href='javascript:;' onClick={() => this.handleDetail(record)}>查看详情</a>
              }

            </div>
          )
        }
      }
    ]
  };
  publicOrder = () => {
    this.setState({
      visible: true,
      isEdit: false,
      modalTitle: '发布订单',
      modalObj: {
        id: '',
        total: 1,
        merchantPrice: '',
        eassyType: '',
        notes: '',
        orderTitle: '',
        originalLevel: '',
        picture: 2,
        type: 0,
        endTime: '',
        require: '',
        wordCount: 2000
      }
    })
  }
  handleSubmit=(e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.getOrder()
      }
    })
  }
  getOrder = () => {
    let params = {
      orderCode: this.state.orderCode,
      status: this.state.status,
      startTime: this.state.startTime,
      endTime: this.state.endTime
    }
    ajax.getOrder(params, response => {
      if (response.state.stateCode === 0) {
        response.data.content.map((item, index) => {
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
  handleDetail=(row) => {
    console.log(row, 'row')
    window.open(window.location.origin + `/#/index/detailOrder?id=${row.id}`)
  }
  handleOrder=(row) => {
    this.setState({
      orderVisible: true,
      orderObj: {
        orderId: row.id
      }
    })
    // let params = {
    //   orderId: row.id,
    //   total: row.total
    // }
    // ajax.getWriterOrder(params, response => {
    //   if (response.state.stateCode === 0) {
    //     message.success(response.state.stateMessage || '预约成功')
    //     this.getOrder()
    //   } else {
    //     message.error(response.state.stateMessage || '预约失败，请重试')
    //     this.getOrder()
    //   }
    // }, error => {
    //   console.log(error)
    //   message.error('预约失败，请重试')
    //   this.getOrder()
    // })
  }
  handleConfirmMoney = (record) => {
    this.adminFinance(record.id)
  }
  adminFinance = (record) => {
    ajax.adminFinance({ orderId: record }, response => {
      if (response.state.stateCode === 0) {
        message.success(response.state.stateMessage || '确认打款成功')
      } else {
        message.error(response.state.stateMessage || '确认打款失败，请稍后再试')
      }
    }, error => {
      console.log(error)
      message.error('确认打款失败，请稍后再试')
    })
  }

  getMakeMoney=(record) => {
    ajax.getMakeMoney({ orderId: record }, response => {
      if (response.state.stateCode === 0) {
        message.success(response.state.stateMessage || '打款成功')
      } else {
        message.error(response.state.stateMessage || '打款失败，请稍后再试')
      }
    }, error => {
      console.log(error)
      message.error('打款失败，请稍后再试')
    })
  }
  handleMoney = (record) => {
    this.setState({
      MoneyVisible: true,
      moneyOrderId: record.id
    })
  }

  handleDelete = (record) => {
    console.log(record)
    ajax.deleteOrder({ id: record.id }, response => {
      if (response.state.stateCode === 0) {
        message.success(response.state.stateMessage || '删除成功')
        // this.setState({ data: dataSource.filter(item => item.key !== record.key) })
        this.getOrder()
      } else {
        message.error('删除失败，请重试')
        this.getOrder()
      }
    }, error => {
      console.log(error)
      message.error('删除失败，请重试')
      this.getOrder()
    })
  }
  edit (record) {
    this.setState({
      isEdit: true,
      visible: true,
      modalTitle: '修改订单',
      modalObj: {
        orderStatus: record.orderStatus,
        id: record.id,
        total: record.total,
        merchantPrice: record.merchantPrice,
        eassyType: record.eassyType,
        notes: record.notes,
        orderTitle: record.orderTitle,
        originalLevel: record.originalLevel,
        picture: record.picture,
        type: record.type,
        endTime: record.endTime,
        require: record.require,
        wordCount: record.wordCount
      }
    })
  }
  handleVerify = (row) => {
    this.setState({
      verifyVisible: true,
      verifyObj: row
    })
  }
  handleAllot=(row) => {
    this.setState({
      distributeObj: row,
      distributeVisible: true
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

  onCancel=() => {
    this.setState({
      visible: false
    })
  }
  moneyOnCancel=() => {
    this.setState({
      MoneyVisible: false,
      moneyOrderId: ''
    })
  }
  InpChange=(e) => {
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
        }, () => {
          if (this.state.userRole === 2) {
            this.state.columns.splice(4, 0, {
              title: '商家定价',
              dataIndex: 'merchantPrice'
            })
            this.state.columns.splice(8, 0, {
              title: '商家的截稿时间',
              dataIndex: 'endTime',
              render: text => <span>{text ? moment.unix(parseInt(text.toString().slice(0, 10))).format('YYYY-MM-DD HH:mm:ss') : '--'}</span>
            })
          } else if (this.state.userRole === 3) {
            this.state.columns.map((item, index) => {
              if (item.dataIndex === 'adminPrice') {
                item.dataIndex = 'merchantPrice'
              }
              if (item.dataIndex === 'adminEndTime') {
                item.dataIndex = 'endTime'
                item.title = '截稿时间'
              }
            })
          } else if (this.state.userRole === 4) {
            this.state.columns.map((item, index) => {
              if (item.dataIndex === 'adminPrice') {
                item.title = '定价'
              }
              if (item.dataIndex === 'adminEndTime') {
                item.title = '截稿时间'
              }
            })
            this.setState({
              status: 1,
              statusArr: [
                {
                  name: '发布中',
                  value: 1
                },
                {
                  name: '已完成',
                  value: 2
                },
                {
                  name: '已截稿',
                  value: 6
                }
              ]
            })
          }
        })
      }
    }, error => {
      console.log(error)
    })
  }
  verifyOnCancel= () => {
    this.setState({
      verifyVisible: false
    })
  }
  distributeOnCancel = () => {
    this.setState({
      distributeVisible: false
    })
  }
  orderOnCancel = () => {
    this.setState({
      orderVisible: false
    })
  }
  componentWillMount () {
    this.getUserInfo()
  }
  componentDidMount () {
    this.getOrder()
  }
  render () {
    const {getFieldDecorator} = this.props.form
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
      <div className='record'>
        <div className='title'>
          {
            this.state.userRole === 3 ? <Button type='primary' onClick={this.publicOrder}>发布订单</Button> : ''
          }
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
                <Select placeholder='请选择订单状态' style={{ width: 180 }} onChange={this.selectChange}>
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
          title={this.state.modalTitle}
          visible={this.state.visible}
          footer={null}
          onCancel={this.onCancel}
        >
          <AddOrder modalObj={this.state.modalObj} onCancel={this.onCancel} isEdit={this.state.isEdit} getOrder={this.getOrder} modalTitle={this.state.modalTitle} />
        </Modal>
        <Modal
          title='审核订单'
          visible={this.state.verifyVisible}
          footer={null}
          onCancel={this.verifyOnCancel}
        >
          <VerifyOrder verifyObj={this.state.verifyObj} onCancel={this.verifyOnCancel} getOrder={this.getOrder} />
        </Modal>
        <Modal
          title='审核分配'
          visible={this.state.distributeVisible}
          footer={null}
          onCancel={this.distributeOnCancel}
        >
          <DistributeOrder distributeObj={this.state.distributeObj} onCancel={this.distributeOnCancel} getOrder={this.getOrder} />
        </Modal>
        <Modal
          title='预约订单'
          visible={this.state.orderVisible}
          footer={null}
          onCancel={this.orderOnCancel}
        >
          <WriterOrder orderObj={this.state.orderObj} onCancel={this.orderOnCancel} getOrder={this.getOrder} />
        </Modal>
        <Modal
          title='打款'
          visible={this.state.MoneyVisible}
          footer={null}
          onCancel={this.moneyOnCancel}
        >
          <Money moneyOrderId={this.state.moneyOrderId} onCancel={this.moneyOnCancel} getOrder={this.getOrder} />
        </Modal>
      </div>
    )
  }
}
const Record = Form.create()(RecordForm)

RecordForm.propTypes = {
  form: PropTypes.object
}
export default Record
