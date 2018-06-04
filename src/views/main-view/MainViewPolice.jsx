// 主页面
import Logo from '../../assets/images/logo.png'
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
// NavLink as Link,
import { Layout, Menu, Icon, Badge } from 'antd'
import './MainView.scss'
import Cookies from 'js-cookie'
const { Header, Content } = Layout

class MainView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      adminClick: false,
      current: 'warn-instance',
      tipClick: false
    }
    this.route = {
      'warn-instance': '/warn-instance',
      'mark': '/mark',
      'attack': '/attack',
      'personnel-file': '/personnel-file',
      'suspicion': '/suspicion',
      'un-submit': '/un-submit',
      'tips': '/tips'
    }
    this.powerOff = this.powerOff.bind(this)
    this.bell = this.bell.bind(this)
  }
  menuClick = (menu) => {
    console.log(menu.key)
    if (this.props.history.location.pathname !== '/police/' + menu.key) {
      if (menu.key !== 'logo') {
        if (menu.key !== 'tips') {
          this.props.history.push('/police/' + menu.key)
          localStorage.setItem('current', menu.key)
          this.setState({
            current: menu.key,
            adminClick: false,
            tipClick: false
          })
        }
      }
    }
  }
  changeNavState () {
    let path = this.props.history.location.pathname.replace(/\/police/, '')
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
    this.setState({
      tipClick: true,
      adminClick: false
    }, () => {
      this.props.history.push('/police/' + 'tips')
    })
  }
  componentWillMount () {
    this.changeNavState()
  }
  componentDidMount () {
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
            defaultSelectedKeys={[this.state.current]}
            style={{ lineHeight: '30px' }}
            onClick={(menu) => this.menuClick(menu)}
          >
            <Menu.Item className='list-normal-left warn-instance' key='warn-instance'><Icon type='rocket' />警情速递</Menu.Item>
            <Menu.Item className='list-normal-left mark' key='mark'><Icon type='tag' />标签安装</Menu.Item>
            <Menu.Item className='list-normal-left attack' key='attack'><Icon type='video-camera' />查缉打击</Menu.Item>
            <Menu.Item className='list-normal-left personnel-file' key='personnel-file'><Icon type='contacts' />一案一档管理</Menu.Item>
            <Menu.Item className='logo' key='logo' ><span><img src={Logo} alt='' style={{ width: '30px', height: '30px' }} /> <b style={{color: 'rgba(255, 255, 255, 0.84)', fontSize: '16px'}}>盘龙分局-电动车案件档案管理平台</b> </span></Menu.Item>
            <Menu.Item className='list-normal-right suspicion' key='suspicion'><Icon type='idcard' />嫌疑人库</Menu.Item>
            <Menu.Item className='list-normal-right un-submit' key='un-submit'><Icon type='profile' />待提交档案</Menu.Item>
            <Menu.Item className='list-normal-right tips' key='tips'>
              <Icon type='poweroff' onClick={this.powerOff} className={adminClick} />
              <Badge count={3} onClick={this.bell} className={tipClick} >
                <Icon type='bell' />
              </Badge>
            </Menu.Item>
            <Menu.Item className='admin' key='admin'>管理员：王小虎</Menu.Item>
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
