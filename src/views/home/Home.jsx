import React, { Component } from 'react'
import { renderRoutes } from 'react-router-config'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getName } from '$redux/actions'
import { Layout, Menu, message, Dropdown, Icon } from 'antd'
import ajax from '../../api'
import './Home.scss'
const { Header, Content, Footer } = Layout
// import Cookies from 'js-cookie'

export class Home extends Component {
  state = {
    collapsed: false,
    noBreadcrumb: true,
    breadcrumbItem1: '',
    current: 'index',
    userType: '',
    userName: '',
    menuArr: ['dealt', 'index', 'writer', 'authority', 'account', 'cash']
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
      if (response.state.stateCode === 0) {
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
  goMessage=() => {
    this.props.history.push('/message')
  }
  getUserInfo = () => {
    ajax.getUserInfo({}, response => {
      this.setState({
        userType: response.data.type,
        userName: response.data.name,
        result: response.data.result
      })
    }, error => {
      console.log(error)
    })
  }
  componentWillMount () {
    this.isLogin()
    if (this.state.menuArr.indexOf(location.hash.split('/')[1]) > -1) {
      this.setState({
        current: location.hash.split('/')[1]
      })
    }
  }
  componentDidMount () {
    this.getUserInfo()
  }
  render () {
    console.log(this.props)
    const menu = (
      <Menu>
        <Menu.Item>
          <span onClick={this.goMessage}>个人信息</span>
        </Menu.Item>
      </Menu>
    )
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
              {
                this.state.userType !== 1 ? <Menu.Item key='index'>订单记录</Menu.Item> : ''
              }
              {
                this.state.userType === 4 ? <Menu.Item key='writer'>我的订单</Menu.Item> : ''
              }
              {
                this.state.userType === 2 ? <Menu.Item key='dealt'>账号信息</Menu.Item> : ''
              }
              {
                (this.state.userType !== 1) ? <Menu.Item key='account'>财务对账</Menu.Item> : ''
              }
              {
                (this.state.userType === 2 || this.state.userType === 4) ? <Menu.Item key='cash'>提现列表</Menu.Item> : ''
              }
              {
                this.state.userType === 1 ? <Menu.Item key='authority'>权限管理</Menu.Item> : ''
              }

            </Menu>
            <div className='user'>
              <Dropdown overlay={menu}>
                <span>欢迎{this.state.userName} <Icon type='down' /></span>
              </Dropdown>
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
