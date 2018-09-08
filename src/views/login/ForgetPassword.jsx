import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ajax from '../../api'
import { Form, Input, Button, Row, Col, message } from 'antd'

const FormItem = Form.Item
export class ForgetPasswordForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      phoneNumber: '',
      msgid: ''
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    let self = this
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        let params = {
          phoneNumber: values.mobilephone,
          password: values.password,
          validCode: values.captcha,
          msgid: this.state.msgid
        }
        ajax.resetPassword(params, response => {
          if (response.state.stateCode === 0) {
            message.success(response.state.stateMessage)
            self.handleCancel()
          } else {
            message.error('重置失败，请重试')
          }
        }, error => {
          console.log(error)
          message.error('重置失败，请重试')
          self.handleCancel()
        })
      }
    })
  }
  handleCancel = () => {
    this.props.onCancel()
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      let call = '两次密码不一致，请重新输入'
      callback && callback(call)
    } else {
      callback()
    }
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }
  validateMobilephone = (rule, value, callback) => {
    console.log(rule, value)
    if (value) {
      let myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (value && myreg.test(value)) {
        this.setState({
          phoneNumber: value
        })
        callback()
      } else {
        let validatemobile = '请输入正确的手机号!'
        callback(validatemobile)
      }
    } else {
      callback()
    }
  }
  forgetPassword=() => {
    let param = {
      phoneNumber: this.state.phoneNumber
    }
    ajax.forgetPassword(param, response => {
      if (response.state.stateCode === 0) {
        message.success('验证码发送成功，请查收')
        this.setState({
          msgid: response.data
        })
      } else {
        message.error(response.state.stateMessage)
      }
    }, error => {
      console.log(error)
      message.error('获取验证码失败，请重试')
    })
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
        <FormItem {...formItemLayout} label='手机号'>
          {getFieldDecorator('mobilephone', {
            rules: [{ required: true, message: '请输入手机号!' },
              {
                validator: this.validateMobilephone
              }
            ]
          })(
            <Input placeholder='请输入手机号' />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='密码'>
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '请输入密码!'
            }, {
              validator: this.validateToNextPassword
            }]
          })(
            <Input type='password' placeholder='请输入密码' />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='确认密码'>
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: '请确认密码!'
            }, {
              validator: this.compareToFirstPassword
            }]
          })(
            <Input type='password' onBlur={this.handleConfirmBlur} placeholder='请确认密码' />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='验证码'>
          <Row gutter={8}>
            <Col span={12}>
              {getFieldDecorator('captcha', {
                rules: [{ required: true, message: '请输入验证码' }]
              })(
                <Input />
              )}
            </Col>
            <Col span={12} align='right'>
              <Button onClick={this.forgetPassword}>获取验证码</Button>
            </Col>
          </Row>
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
const ForgetPassword = Form.create()(ForgetPasswordForm)
ForgetPasswordForm.propTypes = {
  form: PropTypes.object,
  handleOk: PropTypes.func,
  onCancel: PropTypes.func
}
export default ForgetPassword
