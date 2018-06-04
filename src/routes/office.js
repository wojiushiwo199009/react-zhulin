import Login from '../views/login/HomePage' // 登陆页面
import Home from '../views/home/Home'
import WarnInstanceOffice from '../views/warn-instance-office/HomePage' //  分局警情速递页面
import MarkOffice from '../views/mark-office/HomePage' //  分局标签安装页面
import AttackOffice from '../views/attack-office/HomePage' // 分局查缉打击页面
import PersonnelFile from '../views/personnel-file-office/HomePage' // 一案一档管理页面
import Suspicion from '../views/suspicion-office/HomePage' // 分局嫌疑人库
import SuspectLook from '../views/suspicion-look-office/HomePage'// 嫌疑人全局查看
import SuspectRelation from '../views/suspect-relation-office/HomePage'// 嫌疑人关系图谱
import CheckLook from '../views/attack-office/checkLook/CheckLook' // 查看一案一档
import SendMsg from '../views/mark-office/send-msg/HomePage' // 短信发送记录
import MainView from '../views/main-view/MainViewOffice' // 主页面
import News from '../views/news-office/News' // 消息页面
import {Redirect} from 'react-router-dom'
import React from 'react'

// To see more options in https://github.com/theKashey/react-imported-component
// const AsyncView = Imported(() =>
//   import('views/async-view/AsyncView'))

// const Redirection = () => <Redirect to='/index' />
const Redirection = () => <Redirect to='/login' />

export default [
  {
    path: '/',
    component: Redirection,
    exact: true
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/office',
    component: MainView,
    childRoutes: [
      {
        path: '/office/warn-instance',
        component: WarnInstanceOffice
      },
      {
        path: '/office/mark',
        component: MarkOffice
      },
      {
        path: '/office/mark',
        component: MarkOffice
      },
      {
        path: '/office/attack',
        component: AttackOffice
      },
      {
        path: '/office/personnel-file',
        component: PersonnelFile
      },
      {
        path: '/office/suspicion',
        component: Suspicion
      },
      {
        path: '/office/suspicion-look',
        component: SuspectLook
      },
      {
        path: '/office/suspect-relation',
        component: SuspectRelation
      },
      {
        path: '/office/tips',
        component: News
      },
      {
        path: '/office/send-msg',
        component: SendMsg
      }
    ]
  },
  {
    path: '/check-look',
    component: CheckLook
  }
]
