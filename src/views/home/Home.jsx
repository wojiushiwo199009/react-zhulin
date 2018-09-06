import React, { Component } from 'react'
import { renderRoutes } from 'react-router-config'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getName } from '$redux/actions'
import { Layout, Menu, message } from 'antd'
import ajax from '../../api'
import './Home.scss'
const { Header, Content, Footer } = Layout
// import Cookies from 'js-cookie'

export class Home extends Component {
  state = {
    collapsed: false,
    noBreadcrumb: true,
    breadcrumbItem1: '',
    current: 'index'
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  handleClick = (e) => {
    console.log('click ', e)
    if (!localStorage.getItem('phoneNumber')) {
      this.props.history.push('/login')
      return
    }
    this.setState({
      current: e.key
    }, () => {
      this.props.history.push(`/${e.key}`)
    })
  }
  logout=() => {
    console.log('退出')
    sessionStorage.removeItem('phoneNumber')
    localStorage.removeItem('phoneNumber')
    ajax.logout({}, response => {
      if (response.state.stateCode === 1) {
        message.success('退出成功')
        this.props.history.push('/login')
      } else {
        message.error('退出失败，请重试')
      }
    }, error => {
      console.log(error)
      message.error('退出失败，请重试')
    })
  }
  isLogin=() => {
    if (!localStorage.getItem('phoneNumber')) {
      this.props.history.push('/login')
    }
  }
  componentWillMount () {
    this.isLogin()
  }
  render () {
    console.log(this.props)
    return (
      <div className='bgwrap'>
        <Layout className='layout'>
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className='logo' />
            <Menu
              theme='dark'
              mode='horizontal'
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              style={{
                lineHeight: '64px',
                float: 'left'}}
            >
              <Menu.Item key='index'>首页</Menu.Item>
              <Menu.Item key='record'>我的记录</Menu.Item>
              <Menu.Item key='dealt'>待办</Menu.Item>
              <Menu.Item key='authority'>权限</Menu.Item>
            </Menu>
            <div className='user'>
              <span>欢迎{this.props.data.getname.userName}</span>
              <span className='logout' onClick={this.logout}>退出</span>
            </div>
          </Header>
          <Content style={{ margin: '90px 50px 0 50px',
            background: '#fff',
            overflow: 'hidden',
            paddingBottom: '60px'}}>

            {
              renderRoutes(this.props.route.childRoutes)
            }
          </Content>
          <Footer style={{
            textAlign: 'center',
            position: 'absolute',
            bottom: 0,
            height: '60px',
            width: '100%'}}>
              版权所有
          </Footer>
        </Layout>
      </div>
    )
  }
}
Home.propTypes = {
  data: PropTypes.object,
  history: PropTypes.object,
  route: PropTypes.object
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
)(Home)
