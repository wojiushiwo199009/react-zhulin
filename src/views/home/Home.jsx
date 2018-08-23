import React, { Component } from 'react'
import { renderRoutes } from 'react-router-config'
import PropTypes from 'prop-types'
import { Layout, Menu, Breadcrumb } from 'antd'
import './Home.scss'
const { Header, Content, Footer } = Layout
const SubMenu = Menu.SubMenu
// import Cookies from 'js-cookie'

export default class Home extends Component {
  state = {
    collapsed: false,
    noBreadcrumb: true,
    breadcrumbItem1: '',
    current: 'index',
    submenuList: [
      {
        keyItem: 'cloud',
        title: '云计算'
      },
      {
        keyItem: 'bigdata',
        title: '大数据'
      },
      {
        keyItem: 'artificial',
        title: '人工智能'
      },
      {
        keyItem: 'blockchain',
        title: '区块链'
      },
      {
        keyItem: 'internet',
        title: '物联网'
      }
    ]

  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  handleClick = (e) => {
    console.log('click ', e)
    this.setState({
      current: e.key
    }, () => {
      this.props.history.push(`/platform/${e.key}`)
    })
  }
  render () {
    return (
      <div className='bgwrap'>
        <Layout className='layout'>
          <Header>
            <div className='logo' />
            <Menu
              theme='light'
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              mode='horizontal'
            >
              <Menu.Item key='index'>首页</Menu.Item>
              <SubMenu title={<span onClick={(e) => this.handleClick(e)}>全部课程</span>}>
                {
                  this.state.submenuList.map((item) => {
                    return <Menu.Item key={item.keyItem}>{item.title}</Menu.Item>
                  })
                }

              </SubMenu>
              <Menu.Item key='my-course'>我的课程</Menu.Item>
              <Menu.Item key='experiment'>实验任务</Menu.Item>
            </Menu>

          </Header>
          <Content style={{padding: 24, background: '#fff'}}>

            {
              renderRoutes(this.props.route.childRoutes)
            }
          </Content>
          <Footer style={{ textAlign: 'center' }}>
              Big Data Practical Training Platform ©2018 Created by Yin&Gao
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
