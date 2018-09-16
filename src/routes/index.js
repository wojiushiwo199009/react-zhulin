import Login from '../views/login/Login' // 登陆页面
import Home from '../views/home/Home'
import Record from '../views/record/Record'
import FillMessage from '../views/message/FillMessage'
import Message from '../views/message/Message'
import DetailOrder from '../views/record/DetailOrder'
import Dealt from '../views/dealt/Dealt'
import DealtDetail from '../views/dealt/DealtDetail'
import Writer from '../views/writer/Writer'
import WriterDetail from '../views/writer/WriterDetail'
import Authority from '../views/authority/Authority'
import { Redirect } from 'react-router-dom'
import React from 'react'

// To see more options in https://github.com/theKashey/react-imported-component
// const AsyncView = Imported(() =>
//   import('views/async-view/AsyncView'))

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
    path: '/message',
    component: Message
  },
  {
    path: '/fillmessage',
    component: FillMessage
  },
  {
    path: '/',
    component: Home,
    childRoutes: [
      {
        path: '/index',
        component: Writer
      },
      {
        path: '/record',
        component: Record
      },
      {
        path: '/dealt',
        component: Dealt
      },
      {
        path: '/dealtDetail',
        component: DealtDetail
      },
      {
        path: '/authority',
        component: Authority
      },
      {
        path: '/detailOrder',
        component: DetailOrder
      },
      {
        path: '/writerDetailOrder',
        component: WriterDetail
      }
    ]
  }
]
