import React, { Component } from 'react'
import './Home.scss'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
// import Divider from 'antd/lib/divider';

export default class Home extends Component {
  render () {
    return (
      <div className='bgwrap'>
        <div className='wrapper'>
          <h1 className='toptit'><span className='icologo' />盘龙智慧数据系统<em>Panlong intelligent data system</em></h1>
          <ul className='topul'>
            <li className='li01'><span>智慧文档结构化平台</span><Link to={`/${Cookies.get('type')}/warn-instance`}><em />警情速递</Link></li>
            <li className='li02'><span>工作成果分析平台</span><Link to={`/${Cookies.get('type')}/attack`}><em />查缉打击</Link></li>
            <li className='li03'><span>电动车盗窃案件管理平台</span><Link to={`/${Cookies.get('type')}/mark`}><em />标签安装</Link></li>
          </ul>
        </div>
      </div>
    )
  }
}
