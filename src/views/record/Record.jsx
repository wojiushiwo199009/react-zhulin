import React, { Component } from 'react'
// import Cookies from 'js-cookie'
import PropTypes from 'prop-types'
import {Table, Button, Form, Icon, Input, DatePicker, Modal, Select, Popconfirm, message, Divider} from 'antd'
import AddOrder from './AddOrder'
import moment from 'moment'
import ajax from '../../api'
import {axiosUrl} from '../../api/axios'
import './record.scss'
const Option = Select.Option
const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker
const EditableContext = React.createContext()
function hasErrors (fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

export class RecordForm extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    visible: false,
    startTime: '',
    endTime: '',
    orderCode: '',
    status: 0,
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
      type: '',
      endTime: '2018-09-02',
      require: '',
      wordCount: 2000
    },
    isEdit: false,
    statusArr: [
      {
        name: '待审核',
        value: 0
      },
      {
        name: '发布中',
        value: 1
      },
      {
        name: '已接单',
        value: 2
      },
      {
        name: '审核未通过',
        value: 8
      },
      {
        name: '已删除',
        value: 6
      },
      {
        name: '已完成',
        value: 4
      }
    ],
    data: [
      {
        id: '1',
        key: '1',
        order_status: 1,
        orderNum: 'sss',
        eassyType: 'ssc',
        orderTitle: '是',
        notes: '备注',
        originalLevel: 'ssd',
        picture: 2,
        type: '0',
        require: 'ss',
        wordCount: 222,
        total: 2,
        bespokeTotal: 1,
        merchantPrice: 33,
        state: '一',
        startTime: '一',
        endTime: '2018-09-02',
        result: '0'
      }, {
        id: '2',
        key: '2',
        order_status: 8,
        orderNum: 'Jim Green',
        eassyType: 'ssc',
        orderTitle: 'fou',
        notes: '备注',
        originalLevel: 'ssd',
        picture: 2,
        type: '1',
        require: 'ss',
        wordCount: 222,
        total: 3,
        bespokeTotal: 2,
        merchantPrice: 123,
        state: 's',
        startTime: 's',
        endTime: '2018-09-02',
        result: '0'
      }],
    columns: [
      {
        title: '订单号',
        dataIndex: 'orderNum',
        render: text => <a href='javascript:;'>{text}</a>
      }, {
        title: '订单标题',
        dataIndex: 'orderTitle'
      }, {
        title: '文章数量',
        dataIndex: 'total'
      }, {
        title: '已预约数量',
        dataIndex: 'bespokeTotal'
      }, {
        title: '商户定价',
        dataIndex: 'merchantPrice'
      }, {
        title: '发布状态',
        dataIndex: 'state'
      }, {
        title: '发布时间',
        dataIndex: 'startTime'
      }, {
        title: '截稿时间',
        dataIndex: 'endTime'
      }, {
        title: '审核结果',
        dataIndex: 'result'
      }, {
        title: '操作',
        dataIndex: 'operate',
        render: (text, record) => {
          // const editable = this.isEditing(record)
          return (
            <div>
              {
                <a href='javascript:;' onClick={() => this.handleDetail(record)}>查看详情<Divider type='vertical' /></a>
              }
              {
              //   editable ? (
              //   <span>
              //     <EditableContext.Consumer>
              //       {form => (
              //         <a
              //           href='javascript:;'
              //           onClick={() => this.save(form, record.key)}
              //           style={{ marginRight: 8 }}
              //         >
              //           保存<Divider type='vertical' />
              //         </a>
              //       )}
              //     </EditableContext.Consumer>
              //     <Popconfirm
              //       title='确定取消吗?'
              //       onConfirm={() => this.cancel(record.key)}
              //     >
              //       <a>取消<Divider type='vertical' /></a>
              //     </Popconfirm>
              //   </span>
              // ) : (
                <a onClick={() => this.edit(record)}>编辑<Divider type='vertical' /></a>
              // )
              }
              {
                <Popconfirm title='确定删除吗?' onConfirm={() => this.handleDelete(record)}>
                  <a href='javascript:;' className='delete'>删除</a>
                </Popconfirm>
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
        type: '',
        endTime: '2018-09-02',
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
      if (response.code === 106) {
        this.setState({

        })
      } else {
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
    // window.open(axiosUrl + '/detailOrder?flag=1')
    window.open(window.location.origin + `/#/detailOrder?id=${row.id}`)
    // this.props.history.push(`/detailOrder?id=${row.id}`)
  }
  handleDelete = (record) => {
    console.log(record)
    // const dataSource = [...this.state.data]
    ajax.deleteOrder({ id: record.id }, response => {
      if (response.code === 106) {
        message.success(response.msg)
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
        order_status: record.order_status,
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

  save (form, key) {
    console.log(form, key)
    form.validateFields((error, row) => {
      console.log(row)
      if (error) {
        return
      }
      ajax.updateUser(row, response => {
        if (response.code === 106) {
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
          <Button type='primary' onClick={this.publicOrder}>发布订单</Button>
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
        <Table columns={this.state.columns} dataSource={this.state.data} />
        <Modal
          title={this.state.modalTitle}
          visible={this.state.visible}
          footer={null}
          onCancel={this.onCancel}
        >
          <AddOrder modalObj={this.state.modalObj} onCancel={this.onCancel} isEdit={this.state.isEdit} getOrder={this.getOrder} />
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
