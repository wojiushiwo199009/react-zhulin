// 登陆页面
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Icon, Input, Button, Row, Col, message, Spin, Radio, Modal } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getName } from '$redux/actions'
import Cookies from 'js-cookie'
import leftLogo from '../../assets/images/left-logo.png'
import ajax from '../../api'
import './login.scss'
import ForgetPass from './ForgetPassword'
const FormItem = Form.Item
const RadioGroup = Radio.Group
// import WrappedNormalLoginForm from './LoginTable'
export class HomePageForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      role: 3,
      hasUser: false,
      phoneNumberNumber: '',
      user: '',
      showRegister: false,
      showLoading: false,
      value: 4,
      msgid: '',
      visible: false
    }
  }
  goRegist=() => {
    let self = this
    // this.setState({
    // }, () => {
    self.refs['login-form'].classList.add('switching')
    setTimeout(() => {
      this.setState({
        showRegister: !this.state.showRegister
      })
    }, 400)
    setTimeout(function () {
      self.refs['login-form'].classList.remove('switching')
    }, 800)
    // })
    this.props.form.resetFields()
  }
  forgetPassword = () => {
    console.log('忘记密d码')
    this.setState({
      visible: true
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    let self = this
    console.log(self)
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values)

      if (!err) {
        // 发送请求
        if (self.state.showRegister) {
          let params = {
            phoneNumber: values.phoneNumber,
            password: values.password,
            code: values.code,
            type: values.role,
            validCode: values.captcha,
            msgid: this.state.msgid
          }
          ajax.regist(params, response => {
            self.setState({
              showLoading: true
            })
            if (response.state.stateCode === 0) {
              let sucMes = response.state.stateMessage || '注册成功'
              message.success(sucMes)
              self.setState({
                showLoading: false,
                user: self.props.getName(values.phoneNumber),
                hasUser: true
              }, () => {
                // Cookies.set('phoneNumber', self.props.getName(values.phoneNumber).phoneNumber)
                sessionStorage.setItem('phoneNumber', values.phoneNumber)
                localStorage.setItem('phoneNumber', values.phoneNumber)
                // self.props.history.push('/index')
                self.getUserInfo()
              })
            } else {
              message.error(response.state.stateMessage || '注册失败，请重新填写')
              self.setState({
                showLoading: false
              })
            }
          }, error => {
            console.log(error)
            message.error('注册失败，请重新填写')
            self.setState({
              showLoading: false
            })
          })
        } else {
          let params = {
            phoneNumber: values.phoneNumber,
            password: values.password
          }
          ajax.login(params, response => {
            console.log(response, 'res')
            self.setState({
              showLoading: true
            })
            if (response.state.stateCode === 0) {
              let sucMes = response.state.stateMessage || '登陆成功'
              message.success(sucMes)
              self.setState({
                showLoading: false,
                user: self.props.getName(values.phoneNumber),
                hasUser: true
              }, () => {
                // Cookies.set('phoneNumber', self.props.getName(values.phoneNumber).phoneNumber)
                sessionStorage.setItem('phoneNumber', values.phoneNumber)
                localStorage.setItem('phoneNumber', values.phoneNumber)
                self.getUserInfo()
                // self.props.history.push('/index')
              })
            } else if (response.state.stateCode === 1) {
              let errMes = response.state.stateMessage || '登陆失败'
              message.error(errMes)
              self.setState({
                showLoading: false
              })
            }
          }, error => {
            console.log(error)
            self.setState({
              showLoading: false
            })
          })
        }
      }
    })
  }
  getUserInfo=() => {
    let self = this
    ajax.getUserInfo({}, response => {
      if (response.state.stateCode === 0) {
        if (response.data.status === 1 && (response.data.type === 3 || 4)) {
          self.props.history.push('/fillmessage')
        } if (response.data.status === 2) {
          message.info('信息已提交，请耐心等待审核')
        } if (response.data.status === 4) {
          message.error('个人信息审核失败，请重新提交')
          self.props.history.push('/fillmessage')
        } if (response.data.status === 3 && (response.data.type === 3 || 4)) {
          self.props.history.push('/index')
        } if (response.data.status === 5) {
          message.error('该个人信息已被禁用')
        } if (response.data.type === 2) {
          self.props.history.push('/index')
        } if (response.data.type === 1) {
          self.props.history.push('/authority')
        }
        if (response.data.status !== 3) {
          message.info('信息已提交，请耐心等待审核')
        }
      } else {
        message.error('添加失败，请重新填写')
      }
    }, error => {
      console.log(error)
    })
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
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

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }
  validatephoneNumber = (rule, value, callback) => {
    if (value) {
      let myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (value && myreg.test(value)) {
        this.setState({
          phoneNumberNumber: value
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
  getCaptcha=() => {
    console.log(this.state.phoneNumberNumber)
    ajax.getCaptcha({ phoneNumber: this.state.phoneNumberNumber }, response => {
      console.log(response)
      if (response.state.stateCode === 0) {
        this.setState({
          msgid: response.data
        })
        message.success('验证码已发送，请注意查收')
      } else {
        message.error('验证码发送失败，请重新发送')
      }
    }, error => {
      console.log(error)
      message.error('验证码发送失败，请重新发送')
    })
  }
  onChange = (e) => {
    console.log('radio checked', e.target.value)
    this.setState({
      value: e.target.value
    })
  }
  handleCancel=() => {
    this.setState({
      visible: false
    })
  }
  handleOk=() => {
    this.setState({
      visible: false
    })
  }
  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <div className='show-loading'>
        {
          this.state.showLoading
            ? <Spin size='large' />
            : <div className='login'>
              <h2>竹林平台</h2>
              <div className='login-content'>
                <img src={leftLogo} alt='pic' className='left-logo' />
                <div className='login-form' ref='login-form'>
                  {
                    this.state.showRegister ? <div className='register' ref='register'>
                      <Form onSubmit={this.handleSubmit} >
                        <FormItem>
                          {getFieldDecorator('phoneNumber', {
                            rules: [{ required: true, message: '请输入手机号!' },
                              {
                                validator: this.validatephoneNumber
                              }
                            ]
                          })(
                            <Input prefix={<Icon type='user' />} placeholder='请输入手机号' />
                          )}
                        </FormItem>
                        <FormItem>
                          {getFieldDecorator('password', {
                            rules: [{
                              required: true, message: '请输入密码!'
                            }, {
                              validator: this.validateToNextPassword
                            }]
                          })(
                            <Input type='password' prefix={<Icon type='lock' />} placeholder='请输入密码' />
                          )}
                        </FormItem>
                        <FormItem >
                          {getFieldDecorator('confirm', {
                            rules: [{
                              required: true, message: '请确认密码!'
                            }, {
                              validator: this.compareToFirstPassword
                            }]
                          })(
                            <Input type='password' prefix={<Icon type='lock' />} onBlur={this.handleConfirmBlur} placeholder='请确认密码' />
                          )}
                        </FormItem>
                        <FormItem >
                          {getFieldDecorator('code', {
                            rules: [{
                              required: true, message: '请输入邀请码!'
                            }]
                          })(
                            <Input prefix={<Icon type='barcode' />} onBlur={this.handleConfirmBlur} placeholder='请输入邀请码' />
                          )}
                        </FormItem>
                        <FormItem>
                          <Row gutter={8}>
                            <Col span={12}>
                              {getFieldDecorator('captcha', {
                                rules: [{ required: true, message: '请输入验证码' }]
                              })(
                                <Input />
                              )}
                            </Col>
                            <Col span={12} align='right'>
                              <Button onClick={this.getCaptcha}>获取验证码</Button>
                            </Col>
                          </Row>
                        </FormItem>
                        <FormItem>
                          {getFieldDecorator('role', {
                            initialValue: this.state.role,
                            rules: [{
                              required: true, message: '请选择商家或者作者!'
                            }]
                          })(
                            <RadioGroup>
                              <Radio value={3}>商家</Radio>
                              <Radio value={4}>作者</Radio>
                            </RadioGroup>
                          )}
                          <a className='login-form-forgot gologin' href='javascript:;' onClick={this.goRegist}>已有账号？请登陆</a>
                        </FormItem>
                        <FormItem>
                          <Button type='primary' size='large' htmlType='submit' className='login-form-button'>注册</Button>
                        </FormItem>
                      </Form>
                    </div> : <div className='login'>
                      <Form onSubmit={this.handleSubmit} >
                        <FormItem>
                          {getFieldDecorator('phoneNumber', {
                            rules: [
                              { required: true, message: '请输入手机号!' },
                              {
                                validator: this.validatephoneNumber
                              }
                            ]
                          })(
                            <Input prefix={<Icon type='user' />} style={{ width: '100%' }} placeholder='请输入手机号' />
                          )}
                        </FormItem>
                        <FormItem>
                          {getFieldDecorator('password', {
                            rules: [{
                              required: true, message: '请输入密码!'
                            }]
                          })(
                            <Input prefix={<Icon type='lock' />} type='password' placeholder='请输入密码' />
                          )}
                        </FormItem>
                        <FormItem>
                          <a className='forget-password' href='javascript:;' onClick={this.forgetPassword}>忘记密码？</a>
                          <a className='login-form-forgot goregister' href='javascript:;' onClick={this.goRegist}>没有账号？请注册</a>
                        </FormItem>
                        <FormItem>
                          <Button type='primary' size='large' htmlType='submit' className='login-form-button'>登陆</Button>
                        </FormItem>
                      </Form>
                    </div>
                  }
                </div>
              </div>
            </div>
        }
        <Modal title='重置密码'
          visible={this.state.visible}
          footer={null}
        >
          <ForgetPass handleOk={this.handleOk} onCancel={this.handleCancel} />
        </Modal>
      </div>

    )
  }
}
const HomePage = Form.create()(HomePageForm)
HomePageForm.propTypes = {
  form: PropTypes.object
}
const mapStateToProps = state => ({
  data: state,
  loginLoading: state.login.loginLoading
})

const mapDispatchToProps = dispatch => ({
  getName: bindActionCreators(getName, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)
