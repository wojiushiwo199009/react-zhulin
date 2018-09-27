import React, { Component } from 'react'
// import Cookies from 'js-cookie'
import PropTypes from 'prop-types'
import { Table, Button, Form, Select, Popconfirm, message, Row, Col, DatePicker } from 'antd'
import moment from 'moment'
import './accounting.scss'
import ajax from '../../api'

// import Auditing from './Auditing'
const Option = Select.Option
const RangePicker = DatePicker.RangePicker
const FormItem = Form.Item

export class WriterForm extends Component {
  state = {
    pagination: {
      current: 1,
      pageSize: 10
    },
    userid: '',
    id: '',
    money: 0,
    expend: 0,
    income: 0,
    visible: false,
    userRole: '',
    filteredInfo: null,
    sortedInfo: null,
    account: '',
    orderCode: '',
    status: 1,
    startTime: '',
    endTime: '',
    accountData: [
      {
        key: '1',
        id: '',
        money: 0,
        tradeCode: 1,
        tradeInfo: '',
        createdAt: '2018-02-03'
      }],
    columns: [
      {
        title: '收支情况',
        dataIndex: 'money'
      },
      {
        title: '交易信息',
        dataIndex: 'tradeInfo',
        render: text => <span>{text || '--'}</span>
      }, {
        title: '交易相关码',
        dataIndex: 'tradeCode'
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        render: text => <span>{text ? moment.unix(parseInt(text.toString().slice(0, 10))).format('YYYY-MM-DD HH:mm:ss') : '--'}</span>
      }
    ]
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.financeRecord()
      }
    })
  }
   handleTableChange = (pagination) => {
     const pager = { ...this.state.pagination }
     pager.current = pagination.current
     this.setState({
       pagination: pager
     }, () => {
       this.financeRecord()
     })
   }
  financeRecord = () => {
    let params = {
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      pageCount: this.state.pagination.pageSize,
      pageId: this.state.pagination.current
    }
    ajax.financeRecord(params, response => {
      if (response.state.stateCode === 0) {
        let resData = response.data
        resData.tradeRecords.map((item, index) => {
          item.key = index + ''
        })
        this.setState({
          accountData: resData.tradeRecords,
          money: resData.userMoneyRecord.money,
          income: resData.income,
          expend: resData.expend

        })
      } else {
        message.error(response.state.stateMessage || '请稍后再试')
      }
    }, error => {
      console.log(error)
    })
  }

  getUserInfo = () => {
    ajax.getUserInfo({}, response => {
      if (response.state.stateCode === 0) {
        this.setState({
          userid: response.data.id
        })
      }
    }, error => {
      console.log(error)
    })
  }
  OnCancel = () => {
    this.setState({
      visible: false
    })
  }
  onChange = (date, dateString) => {
    this.setState({
      startTime: dateString[0],
      endTime: dateString[1]
    })
  }
  componentWillMount () {
    this.getUserInfo()
  }
  componentDidMount () {
    this.financeRecord()
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
      <div className='account'>
        <div className='top'>
          <Row>
            <Col span={8}>总余额:{this.state.money}</Col>
            <Col span={8}>收入:{this.state.income}</Col>
            <Col span={8}>支出:{this.state.expend}</Col>
          </Row>
        </div>
        <div className='title'>
          <Form layout='inline' onSubmit={this.handleSubmit} className='record-form'>
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
        <Table columns={this.state.columns} dataSource={this.state.accountData} pagination={this.state.pagination} onChange={this.handleTableChange} />
        {/* <Modal
          title='信息审核'
          visible={this.state.visible}
          footer={null}
          onCancel={this.OnCancel}
        >
          <Auditing userId={this.state.id} onCancel={this.OnCancel} AdminUserList={this.AdminUserList} />
        </Modal> */}
      </div>
    )
  }
}
const Writer = Form.create()(WriterForm)

WriterForm.propTypes = {
  form: PropTypes.object
}
export default Writer
