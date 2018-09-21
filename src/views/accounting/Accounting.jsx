import React, { Component } from 'react'
// import Cookies from 'js-cookie'
import PropTypes from 'prop-types'
import { Table, Button, Form, Input, Modal, Select, Popconfirm, message, Divider, Row, Col, DatePicker } from 'antd'
import moment from 'moment'
import './accounting.scss'
import ajax from '../../api'

// import Auditing from './Auditing'
const Option = Select.Option
const RangePicker = DatePicker.RangePicker
const FormItem = Form.Item

export class WriterForm extends Component {
  state = {
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
        userId: '',
        createdAt: '2018-02-03'
      }],
    columns: [
      {
        title: '用户订单号号',
        dataIndex: 'userId',
        render: text => <a href='javascript:;'>{text || '--'}</a>
      },
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
        render: text => <span>{moment.unix(parseInt(text.toString().slice(0, 10))).format('YYYY-MM-DD HH:mm:ss')}</span>
      }
    ]
  };

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.financeRecord()
      }
    })
  }
  financeRecord = () => {
    let params = {
      startTime: this.state.startTime,
      endTime: this.state.endTime
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

  handleDetail = (row) => {
    console.log(row, 'row')
    // window.open(axiosUrl + '/detailOrder?flag=1')
    window.open(window.location.origin + `/#/dealtDetail?id=${row.id}`)
    // this.props.history.push(`/detailOrder?id=${row.id}`)
  }
  handleOrder = (row) => {
    this.setState({
      id: row.id,
      visible: true
    })
  }
  handleDelete = (record) => {
    console.log(record)
    ajax.AdminUserDelete({ id: record.id }, response => {
      if (response.state.stateCode === 0) {
        message.success(response.state.stateMessage || '禁用成功')
        // this.setState({ data: dataSource.filter(item => item.key !== record.key) })
        this.AdminUserList()
      } else {
        message.error('禁用失败，请重试')
        this.AdminUserList()
      }
    }, error => {
      console.log(error)
      message.error('禁用失败，请重试')
      this.AdminUserList()
    })
  }
  handleEnable = (record) => {
    console.log(record)
    ajax.AdminUserEnable({ id: record.id }, response => {
      if (response.state.stateCode === 0) {
        message.success(response.state.stateMessage || '启用成功')
        // this.setState({ data: dataSource.filter(item => item.key !== record.key) })
        this.AdminUserList()
      } else {
        message.error('启用失败，请重试')
        this.AdminUserList()
      }
    }, error => {
      console.log(error)
      message.error('启用失败，请重试')
      this.AdminUserList()
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
            <Col span={8}>总金额:{this.state.money}</Col>
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
        <Table columns={this.state.columns} dataSource={this.state.accountData} />
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
