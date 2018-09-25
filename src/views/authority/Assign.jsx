import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ajax from '../../api'
import { Form, Button, Row, Col, message, Select } from 'antd'

const FormItem = Form.Item
const Option = Select.Option
export class AssignForm extends Component {
  state={
    WriterParam: '',
    id: '',
    adminArr: [
      {
        key: '1',
        id: '2',
        name: 'gjx',
        value: 'sss'
      }
    ],
    writerArr: [
      {
        key: '12',
        id: '22',
        name: 'gjx',
        value: 'sss'
      }
    ]
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        let params = {
          id: this.state.WriterParam,
          adminId: this.state.id
        }
        ajax.getUserUpdateAdmin(params, response => {
          if (response.state.stateCode === 0) {
            let msg = response.state.stateMessage || '分派成功'
            message.success(msg)
            this.props.getUserList()
            this.handleCancel()
          } else {
            let msg = response.state.stateMessage || '分派失败，请重新填写'
            message.error(msg)
            this.props.getUserList()
          }
        }, error => {
          console.log(error)
          message.error('分派失败，请重新填写')
          this.props.getUserList()
          this.handleCancel()
        })
      }
    })
  }
  handleCancel = () => {
    this.props.onCancel()
  }
  getUserMerchantList=() => {
    ajax.getUserMerchantList({id: this.state.id}, response => {
      if (response.state.stateCode === 0) {
        this.setState({
          writerArr: response.data
        })
      } else {
        this.setState({
          writerArr: []
        })
      }
    }, error => {
      console.log(error)
      this.setState({
        writerArr: []
      })
    })
  }
  BussinessChange=(val) => {
    console.log(val, 'val')
    this.setState({
      id: val
    }, () => {
      this.getUserMerchantList()
    })
  }
  WriterChange=(val) => {
    this.setState({
      WriterParam: val
    })
  }
  AdminChange=(val) => {
    this.setState({
      adminId: val
    })
  }
  getAllUserList=() => {
    ajax.getUserList({}, response => {
      if (response.state.stateCode === 0) {
        this.setState({
          adminArr: response.data
        })
      } else {
        this.setState({
          adminArr: []
        })
      }
    }, error => {
      console.log(error)
      this.setState({
        adminArr: []
      })
    })
  }
  compareToAdmin = (rule, value, callback) => {
    const form = this.props.form
    if (value && value === form.getFieldValue('bussiness')) {
      let call = '两次选择的管理员一致，请重新输入'
      callback && callback(call)
    } else {
      callback()
    }
  }
  componentDidMount () {
    this.getAllUserList()
  }
  render () {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 }
      }
    }

    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} >
        <FormItem {...formItemLayout} label='管理员'>
          {getFieldDecorator('bussiness', {
            rules: [{
              required: true, message: '请选择管理员!'
            }]
          })(
            <Select placeholder='请选择管理员' onChange={this.BussinessChange}>
              {
                this.state.adminArr.map((item, index) => {
                  return <Option key={index} value={item.id}>{item.name}</Option>
                })
              }
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='商家与写手'>
          {getFieldDecorator('writer', {
            rules: [{
              required: true, message: '请选择商家或写手!'
            }]
          })(
            <Select placeholder='请选择商家或写手' onChange={this.WriterChange}
              mode='multiple'
              style={{ width: '100%' }}
            >
              {
                this.state.writerArr.map((item, index) => {
                  return <Option key={index} value={item.id}>{item.name}</Option>
                })
              }
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='其他管理员'>
          {getFieldDecorator('admin', {
            rules: [{
              required: true, message: '请选择其他管理员!'
            }, {
              validator: this.compareToAdmin
            }]
          })(
            <Select placeholder='请选择其他管理员' onChange={this.AdminChange}>
              {
                this.state.adminArr.map((item, index) => {
                  return <Option key={index} value={item.id}>{item.name}</Option>
                })
              }
            </Select>
          )}
        </FormItem>
        <FormItem>
          <Row>
            <Col span={6} offset={6}><Button onClick={this.handleCancel}>取消
            </Button></Col>
            <Col span={6} offset={2}><Button type='primary' htmlType='submit' className='login-form-button'>确定</Button></Col>
          </Row>
        </FormItem>
      </Form>
    )
  }
}
const Assign = Form.create()(AssignForm)
AssignForm.propTypes = {
  form: PropTypes.object,
  getUserList: PropTypes.func,
  onCancel: PropTypes.func
}
export default Assign
