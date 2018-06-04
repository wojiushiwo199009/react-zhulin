// 主页面
import Logo from '../../assets/images/logo.png'
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
// NavLink as Link,
import { Layout, Menu, Icon, Badge } from 'antd'
import ajax from '../../api'
import './MainView.scss'
import Cookies from 'js-cookie'
const { Header, Content } = Layout

class MainView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      MsgNum: '1',
      current: 'warn-instance',
      adminClick: false,
      tipClick: false
    }
    this.route = {
      'warn-instance': '/warn-instance',
      'mark': '/mark',
      'attack': '/attack',
      'personnel-file': '/personnel-file',
      'suspicion': '/suspicion',
      'tips': '/tips'
    }
    this.powerOff = this.powerOff.bind(this)
    this.bell = this.bell.bind(this)
  }
  menuClick = (menu) => {
    if (this.props.history.location.pathname !== '/office/' + menu.key) {
      if (menu.key !== 'logo') {
        if (menu.key !== 'kips') {
          this.props.history.push('/office/' + menu.key)
          this.setState({
            current: menu.key,
            adminClick: false,
            tipClick: false
          })
        }
      }
    }
  }
  powerOff = (e) => {
    // this.setState({
    //   adminClick: true,
    //   tipClick: false
    // })
    e.stopPropagation()
    window.location.href = './#/login/'
    Cookies.remove('type')
  }
  bell = (e) => {
    // e.stopPropagation()
    this.setState({
      tipClick: true,
      adminClick: false
    }, () => {
      this.props.history.push('/office/' + 'tips')
    })
  }
  changeNavState () {
    let path = this.props.history.location.pathname.replace(/\/office/, '')
    let current = ''
    for (let el in this.route) {
      if (path.indexOf(this.route[el]) === 0) {
        current = el
      }
    }
    if (this.state.current !== current) {
      this.setState({
        current
      })
    }
  }
  componentDidMount () {
    this.changeNavState()
    ajax.searchMessageCount({}, response => {
      if (response.code === 101) {
        this.setState({
          MsgNum: response.data
        })
      }
    })
  }
  componentWillMount () {
    this.changeNavState()
  }
  render () {
    let adminClick = this.state.adminClick ? 'admin-click' : ''
    let tipClick = this.state.tipClick ? 'tips-click' : ''
    return (
      <Layout className='main-view'>
        <Header>
          <Menu
            theme='dark'
            mode='horizontal'
            selectedKeys={[this.state.current]}
            style={{ lineHeight: '30px' }}
            onClick={(menu) => this.menuClick(menu)}
          >
            <Menu.Item className='list-normal-left warn-instance' key='warn-instance'><Icon type='rocket' />警情速递</Menu.Item>
            <Menu.Item className='list-normal-left mark' key='mark'><Icon type='tag' />标签安装</Menu.Item>
            <Menu.Item className='list-normal-left attack' key='attack'><Icon type='video-camera' />查缉打击</Menu.Item>
            <Menu.Item className='list-normal-left personnel-file' key='personnel-file'><Icon type='contacts' />一案一档管理</Menu.Item>
            <Menu.Item className='logo' key='logo' ><span><img src={Logo} alt='' style={{ width: '30px', height: '30px' }} /> <b style={{color: 'rgba(255, 255, 255, 0.84)', fontSize: '16px'}}>盘龙分局-电动车案件档案管理平台</b> </span></Menu.Item>
            <Menu.Item className='list-normal-right suspicion' key='suspicion'><Icon type='idcard' />嫌疑人库</Menu.Item>
            <Menu.Item className='list-normal-right tips' key='tips'>
              <Icon type='poweroff' ref='powerOff' onClick={this.powerOff} className={adminClick} />
              <Badge count={this.state.MsgNum} onClick={this.bell} className={tipClick} >
                <Icon type='bell' />
              </Badge>
            </Menu.Item>
            <Menu.Item className='admin' style={{left: '-8%', top: '3px'}} key='admin'>管理员：王小虎</Menu.Item>
          </Menu>
        </Header>
        <Content>
          {
            renderRoutes(this.props.route.childRoutes)
          }
        </Content>

      </Layout>

    )
  }
}
MainView.propTypes = {
  route: PropTypes.object,
  history: PropTypes.object
}

export default withRouter(MainView)
