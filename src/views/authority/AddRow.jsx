import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ajax from '../../api'
import { Form, Input, Button, Row, Col, message } from 'antd'

const FormItem = Form.Item
export class AddRowForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        let params = {
          name: values.name,
          phoneNumber: values.mobilephone,
          password: values.password,
          code: values.code
        }
        ajax.regist(params, response => {
          if (response.code === 106) {
            message.success(response.msg)
            this.props.handleOk()
          } else {
            message.error('添加失败，请重新填写')
          }
        }, error => {
          console.log(error)
          message.error('添加失败，请重新填写')
          this.props.handleOk()
        })
      }
    })
  }
  handleCancel=() => {
    this.props.onCancel()
  }
  validateMobilephone = (rule, value, callback) => {
    console.log(rule, value)
    if (value) {
      let myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (value && myreg.test(value)) {
        callback()
      } else {
        let validatemobile = '请输入正确的手机号!'
        callback(validatemobile)
      }
    } else {
      callback()
    }
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
        <FormItem {...formItemLayout} label='姓名'>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入姓名!' }
            ]
          })(
            <Input placeholder='请输入姓名' />
          )}
        </FormItem>
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
            }]
          })(
            <Input placeholder='请输入密码' />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='邀请码'>
          {getFieldDecorator('code', {
            rules: [{ required: true, message: '请输入邀请码!' }]
          })(
            <Input placeholder='请输入邀请码' />
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
const AddRow = Form.create()(AddRowForm)
AddRowForm.propTypes = {
  form: PropTypes.object,
  handleOk: PropTypes.func,
  onCancel: PropTypes.func
}
export default AddRow
