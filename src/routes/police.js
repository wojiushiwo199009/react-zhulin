import Login from '../views/login/HomePage' // 登陆页面
import Home from '../views/home/Home'
import WarnInstancePolice from '../views/warn-instance-police/HomePage' //  派出所警情速递页面
import Mark from '../views/mark-police/HomePage' // 派出所标签安装页面
import Attack from '../views/attack-police/HomePage' // 派出所查缉打击页面
import PersonnelFile from '../views/personnel-file-police/HomePage' // 一案一档管理页面
import UnSubmit from '../views/un-submit-police/HomePage' // 派出所待提交档案
import Suspicion from '../views/suspicion-police/HomePage' // 派出所嫌疑人库
import fileEntry from '../views/file-entry-police/HomePage' // 派出所一案一档录入
import checkVehicle from '../views/check-vehicle-police/HomePage' // 派出所车辆查看
import CheckLook from '../views/attack-office/checkLook/CheckLook' // 查看一案一档
import SuspectLook from '../views/suspicion-look-police/HomePage'// 嫌疑人全局查看
import SuspectRelation from '../views/suspect-relation-police/HomePage'// 嫌疑人关系图谱
import MainView from '../views/main-view/MainViewPolice' // 主页面
import News from '../views/news-police/News' // 消息页面
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
    path: '/police',
    component: MainView,
    childRoutes: [{
      path: '/police/warn-instance',
      component: WarnInstancePolice
    },
    {
      path: '/police/mark',
      component: Mark
    },
    {
      path: '/police/attack',
      component: Attack
    },
    {
      path: '/police/personnel-file',
      component: PersonnelFile
    },
    {
      path: '/police/un-submit',
      component: UnSubmit
    },
    {
      path: '/police/suspicion',
      component: Suspicion
    },
    {
      path: '/police/file-entry',
      component: fileEntry
    },
    {
      path: '/police/check-vehicle',
      component: checkVehicle
    },
    {
      path: '/police/suspect-relation',
      component: SuspectRelation
    },
    {
      path: '/police/suspicion-look',
      component: SuspectLook
    }, {
      path: '/police/tips',
      component: News
    }
    ]
  },
  {
    path: '/check-look',
    component: CheckLook
  }

]
