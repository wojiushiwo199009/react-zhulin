import React, { Component } from 'react'
// import Cookies from 'js-cookie'
import PropTypes from 'prop-types'
import { Table, Button, Form, Input, Modal, Select, Popconfirm, message, Divider } from 'antd'
import ajax from '../../api'
import Auditing from './Auditing'
import './dealt.scss'
const Option = Select.Option
const FormItem = Form.Item

export class WriterForm extends Component {
  state = {
    userid: '',
    id: '',
    visible: false,
    userRole: '',
    filteredInfo: null,
    sortedInfo: null,
    account: '',
    orderCode: '',
    status: 1,
    statusArr: [
      {
        name: '待提交信息',
        value: 1
      },
      {
        name: '待审核',
        value: 2
      },
      {
        name: '审核成功',
        value: 3
      },
      {
        name: '审核失败',
        value: 4
      },
      {
        name: '禁用',
        value: 5
      }
    ],
    businessData: [
      {
        key: '1',
        id: '',
        account: '',
        name: '',
        status: 1,
        result: ''
      }],
    columns: [
      {
        title: '账号',
        dataIndex: 'account',
        render: text => <a href='javascript:;'>{text || '--'}</a>
      }, {
        title: '姓名',
        dataIndex: 'name',
        render: text => <span>{text || '--'}</span>
      }, {
        title: '状态',
        dataIndex: 'status',
        render: (text, record) => {
          return (
            <div>
              {
                text === 1 ? <span>待提交信息</span> : (text === 2) ? <span>待审核</span> : (text === 3) ? <span>审核成功</span> : (text === 4) ? <span>审核失败</span> : (text === 5) ? <span>禁用</span> : ''
              }
            </div>
          )
        }
      },
      {
        title: '结果',
        dataIndex: 'result'
      },
      {
        title: '操作',
        dataIndex: 'operate',
        render: (text, record) => {
          console.log(text, record, 'dsfs')
          return (
            <div>
              {
                record.status !== 5 ? <Popconfirm title='确定禁用吗?' onConfirm={() => this.handleDelete(record)}>
                  <a href='javascript:;' className='delete'>禁用<Divider type='vertical' /></a>
                </Popconfirm> : ''
              }
              {
                record.status === 2 ? <a href='javascript:;' onClick={() => this.handleOrder(record)}>审核<Divider type='vertical' /></a> : ''
              }
              {
                record.status === 4 ? <a href='javascript:;' onClick={() => this.handleOrder(record)}>审核<Divider type='vertical' /></a> : ''
              }
              {
                record.status === 5 ? <Popconfirm title='确定启用吗?' onConfirm={() => this.handleEnable(record)}>
                  <a href='javascript:;'>启用<Divider type='vertical' /></a>
                </Popconfirm> : ''
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
        this.AdminUserList()
      }
    })
  }
  AdminUserList = () => {
    let params = {
      account: this.state.account,
      status: this.state.status
    }
    ajax.AdminUserList(params, response => {
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
  OnCancel=() => {
    this.setState({
      visible: false
    })
  }
  componentWillMount () {
    this.getUserInfo()
  }
  componentDidMount () {
    this.AdminUserList()
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
      <div className='dealt'>
        <div className='title'>
          <Form layout='inline' onSubmit={this.handleSubmit} className='record-form'>
            <FormItem
              {...formItemLayout}
              label='账号'
            >
              {getFieldDecorator('orderCode', { initialValue: '' })(
                <Input placeholder='请输人账号' onChange={this.InpChange} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label='账号状态'
            >
              {getFieldDecorator('status', {
                initialValue: this.state.status
              })(
                <Select placeholder='请选择账号状态' style={{ width: 120 }} onChange={this.selectChange}>
                  {
                    this.state.statusArr.map((item, index) => {
                      return <Option key={index} value={item.value}>{item.name}</Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
            <FormItem>
              <Button type='primary' htmlType='submit'>查询</Button>
            </FormItem>
          </Form>
        </div>
        <Table columns={this.state.columns} dataSource={this.state.businessData} />
        <Modal
          title='信息审核'
          visible={this.state.visible}
          footer={null}
          onCancel={this.OnCancel}
        >
          <Auditing userId={this.state.id} onCancel={this.OnCancel} AdminUserList={this.AdminUserList} />
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
