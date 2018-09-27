import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ajax from '../../api'
import {Form, Input, Button, message, Radio, Upload, Icon, Row, Col} from 'antd'
import {axiosUrl} from '../../api/axios'
import './message.scss'
const FormItem = Form.Item
const RadioGroup = Radio.Group
export class MessageForm extends Component {
    state = {
      modalObj: {
        name: '',
        qq: '',
        weChat: '',
        email: '',
        creditLevel: '',
        address: '',
        sex: 0,
        age: '',
        profession: '',
        good: '',
        fullTime: 0,
        payPicture: ''
      },
      fileList: [{
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: `${axiosUrl}/user/file/upload`
      }]
    }

  handleChange = ({ fileList }) => this.setState({ fileList })

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      let payPicture = this.state.fileList[0].response.data
      if (!err) {
        let params = { ...values, payPicture }
        ajax.getUserAdd(params, response => {
          if (response.state.stateCode === 0) {
            message.success(response.state.stateMessage || '修改成功')
            this.props.history.push('/login')
          } else {
            message.error('修改失败，请重新填写')
          }
        }, error => {
          console.log(error)
          message.error('修改失败，请重新填写')
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
  getUser = () => {
    ajax.getUserInfo({}, response => {
      if (response.state.stateCode === 0) {
        let resData = response.data
        this.setState({
          modalObj: {
            name: resData.name,
            qq: resData.qq,
            weChat: resData.weChat,
            email: resData.email,
            creditLevel: resData.creditLevel,
            address: resData.address,
            sex: resData.sex,
            age: resData.age,
            profession: resData.profession,
            good: resData.good,
            fullTime: resData.fullTime,
            payPicture: resData.payPicture
          },
          fileList: [
            {
              url: resData.payPicture
            }
          ]
        })
      } else {
        message.error('个人信息查询失败，请重试')
      }
    }, error => {
      console.log(error)
      message.error('个人信息查询失败，请重试')
    })
  }
  cancel=() => {
    this.props.history.push('/index')
  }
  componentDidMount () {
    this.getUser()
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
    const { fileList } = this.state
    const uploadButton = (
      <div>
        <Icon type='plus' />
        <div className='ant-upload-text'>Upload</div>
      </div>
    )
    const PicUrl = `${axiosUrl}/user/file/upload`
    return (
      <div className='fill-message'>
        <Form onSubmit={this.handleSubmit} >
          <FormItem {...formItemLayout} label='姓名'>
            {getFieldDecorator('name', {
              initialValue: this.state.modalObj.name,
              rules: [{ required: true, message: '请输入姓名!' }]
            })(
              <Input placeholder='请输入姓名' />
            )}
          </FormItem>
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
          <FormItem {...formItemLayout} label='信用分'>
            {getFieldDecorator('creditLevel', {
              initialValue: this.state.modalObj.creditLevel,
              rules: [{
                required: true, message: ''
              }]
            })(
              <Input placeholder='' disabled />
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
              getValueFromEvent: this.normFile
            })(
              <div className='clearfix'>
                <Upload
                  name='file'
                  action={PicUrl}
                  listType='picture-card'
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
              </div>
            )}
          </FormItem>
          <FormItem>
            <Row>
              <Col span={5} style={{ textAlign: 'right' }} >
                <Button onClick={this.cancel} htmlType='submit' className='login-form-button'>取消</Button>
              </Col>
              <Col span={6} offset={1}>
                <Button type='primary' htmlType='submit' className='login-form-button'>提交</Button>
              </Col>
            </Row>
          </FormItem>
        </Form>
      </div>
    )
  }
}
const FillMessage = Form.create()(MessageForm)
MessageForm.propTypes = {
  form: PropTypes.object,
  onCancel: PropTypes.func
}
export default FillMessage
