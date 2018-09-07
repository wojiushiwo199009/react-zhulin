import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ajax from '../../api'
import {Form, Input, Button, message, Radio, InputNumber, Upload, Icon, Row, Col} from 'antd'
import './message.scss'
const FormItem = Form.Item
const RadioGroup = Radio.Group
export class MessageForm extends Component {
    state = {
      modalObj: {
        qq: '',
        weChat: '',
        email: '',
        address: '',
        sex: 0,
        age: '',
        profession: '',
        good: '',
        fullTime: 0,
        payPicture: ''

      }
    }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      console.log(values)
      if (!err && !this.state.isEdit) {
        // let endTime = moment(values.endTime).format('YYYY-MM-DD')
        let params = { ...values }
        ajax.publicOrder(params, response => {
          if (response.code === 106) {
            message.success(response.msg)
            this.props.getOrder()
          } else {
            message.error('添加失败，请重新填写')
            this.props.getOrder()
          }
        }, error => {
          console.log(error)
          message.error('添加失败，请重新填写')
          this.props.getOrder()
        })
      } else if (!err && this.state.isEdit) {
        let params = { ...values, endTime: this.state.endTime, id: this.state.modalObj.id }

        ajax.updateOrder(params, response => {
          if (response.code === 106) {
            message.success(response.msg)
            this.props.getOrder()
          } else {
            message.error('编辑失败，请重新填写')
            this.props.getOrder()
          }
        }, error => {
          console.log(error)
          message.error('编辑失败，请重新填写')
          this.props.getOrder()
        })
      }
    })
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

  validateqq = (rule, value, callback) => {
    if (value) {
      let myreg = /[1-9][0-9]{4,}/
      if (value && myreg.test(value)) {
        this.setState({
          qq: value
        })
        callback()
      } else {
        let validatemobile = '请输入正确的qq号!'
        callback(validatemobile)
      }
    } else {
      callback()
    }
  }
  validateemail = (rule, value, callback) => {
    if (value) {
      let myreg = /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/
      if (value && myreg.test(value)) {
        this.setState({
          mail: value
        })
        callback()
      } else {
        let validatemobile = '请输入正确的邮箱!'
        callback(validatemobile)
      }
    } else {
      callback()
    }
  }
  validateage = (rule, value, callback) => {
    if (value) {
      let myreg = /^[0-9]{1,2}$/
      if (value && myreg.test(value)) {
        this.setState({
          age: value
        })
        callback()
      } else {
        let validatemobile = '请输入正确的年龄!'
        callback(validatemobile)
      }
    } else {
      callback()
    }
  }
  normFile = (e) => {
    console.log('Upload event:', e)
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
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
      <div className='message'>
        <Form onSubmit={this.handleSubmit} >
          <FormItem {...formItemLayout} label='qq号'>
            {getFieldDecorator('qq', {
              initialValue: this.state.modalObj.qq,
              rules: [{ required: true, message: '请输入qq号!' },
                {
                  validator: this.validateqq
                }]
            })(
              <Input placeholder='请输入qq号' />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label='微信号'>
            {getFieldDecorator('weChat', {
              initialValue: this.state.modalObj.weChat,
              rules: [{ required: true, message: '请输入微信号!' }]
            })(
              <Input placeholder='请输入微信号' />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label='邮箱'>
            {getFieldDecorator('email', {
              initialValue: this.state.modalObj.email,
              rules: [{
                required: true, message: '请输入邮箱!'
              }, {
                validator: this.validateemail
              }]
            })(
              <Input placeholder='请输入邮箱' />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label='地址'>
            {getFieldDecorator('address', {
              initialValue: this.state.modalObj.address,
              rules: [{
                required: true, message: '请输入地址!'
              }]
            })(
              <Input placeholder='请输入地址' />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label='性别'>
            {getFieldDecorator('sex', {
              initialValue: this.state.modalObj.sex,
              rules: [{
                required: true, message: '请选择性别!'
              }]
            })(
              <RadioGroup>
                <Radio value={0} >男</Radio>
                <Radio value={1} >女</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label='年龄'>
            {getFieldDecorator('age', {
              initialValue: this.state.modalObj.age,
              rules: [{
                required: true, message: '请输入年龄!'
              }, {
                validator: this.validateage
              }]
            })(
              <Input placeholder='请输入年龄' />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label='职业'>
            {getFieldDecorator('profession', {
              initialValue: this.state.modalObj.profession,
              rules: [{
                required: true, message: '请输入职业!'
              }]
            })(
              <Input placeholder='请输入职业' />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label='擅长领域'>
            {getFieldDecorator('good', {
              initialValue: this.state.modalObj.good,
              rules: [{
                required: true, message: '请输入擅长领域!'
              }]
            })(
              <Input placeholder='请输入擅长领域' />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label='工作类型'>
            {getFieldDecorator('fullTime', {
              initialValue: this.state.modalObj.fullTime,
              rules: [{
                required: true, message: '请选择工作类型!'
              }]
            })(
              <RadioGroup>
                <Radio value={0} >全职</Radio>
                <Radio value={1} >兼职</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label='支付宝二维码图片'>
            {getFieldDecorator('payPicture', {
              getValueFromEvent: this.normFile,
              rules: [{
                required: true, message: '请上传支付宝二维码图片!'
              }]
            })(
              <Upload name='payPicture' action='/upload.do' >
                <Button>
                  <Icon type='upload' /> 点击上传图片
                </Button>
              </Upload>
            )}
          </FormItem>
          <FormItem>
            <Row>
              <Col span={6} offset={6}>
                <Button type='primary' size='large' htmlType='submit' className='login-form-button'>提交</Button>
              </Col>
            </Row>
          </FormItem>
        </Form>
      </div>
    )
  }
}
const Message = Form.create()(MessageForm)
MessageForm.propTypes = {
  form: PropTypes.object,
  onCancel: PropTypes.func
}
export default Message
