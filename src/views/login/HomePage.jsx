// 登陆页面
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Icon, Input, Button } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getName } from '$redux/actions'
import Cookies from 'js-cookie'
import leftLogo from '../../assets/images/left-logo.png'
import './HomePage.scss'
const FormItem = Form.Item
// import WrappedNormalLoginForm from './LoginTable'
export class HomePageForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hasUser: false,
      user: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit (e) {
    const self = this
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) {
        alert('请重新检查用户名及密码是否正确')
        console.log('Received values of form: ', values)
        // this.props.history.location.pathname.push('/index/')
      } else {
        self.setState({
          user: self.props.getName(values.Username),
          hasUser: true
        }, () => {
          Cookies.set('type', self.props.getName(values.Username).userName)
          // self.props.history.push('/' + self.props.getName(values.Username).userName + '/warn-instance')
          self.props.history.push('/platform/all')
        })
      }
    })
  }
  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <div className='login'>
        <h2>云区大人物</h2>
        <div className='login-content'>
          <img src={leftLogo} alt='pic' style={{position: 'absolute', left: '64px', top: '100px'}} />
          <Form onSubmit={this.handleSubmit} className='login-form'>
            <p>互联网新技术实训平台</p>
            <FormItem>
              {getFieldDecorator('Username', {
                rules: [{ required: true, message: '请输入用户名!' }]
              })(
                <Input prefix={<Icon type='user' style={{color: '#2DB7F5', fontSize: '20px'}} />} placeholder='用户名' />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('Password', {
                rules: [{ required: true, message: '请输入密码!' }]
              })(
                <Input prefix={<Icon type='lock' style={{color: '#2DB7F5', fontSize: '20px'}} />} type='password' placeholder='请输入密码' />
              )}
            </FormItem>
            <FormItem>
              {/* {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true
              })(
                <Checkbox>记住密码</Checkbox>
              )} */}
              <a className='login-form-forgot' href='/#/registe'>没有账号？请注册</a>
            </FormItem>
            <FormItem>
              <Button type='primary' htmlType='submit' className='login-form-button'>登陆</Button>
            </FormItem>
          </Form>
        </div>
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
