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
import Accounting from '../views/accounting/Accounting'
import Cash from '../views/cash/Cash'
import MessageInfo from '../views/message-info/MessageInfo'
import AdminSet from '../views/admin-set/AdminSet'
import Search from '../views/search/Search'
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
        path: 'search',
        component: Search
      },
      {
        path: '/admin-set',
        component: AdminSet
      },
      {
        path: '/message-info',
        component: MessageInfo
      },
      {
        path: '/index/detailOrder',
        component: DetailOrder
      },
      {
        path: '/index',
        component: Record
      },
      {
        path: '/writer/writerDetailOrder',
        component: WriterDetail
      },
      {
        path: '/writer',
        component: Writer
      },
      {
        path: '/dealt/dealtDetail',
        component: DealtDetail
      },
      {
        path: '/dealt',
        component: Dealt
      },

      {
        path: '/authority',
        component: Authority
      },

      {
        path: '/account',
        component: Accounting
      },
      {
        path: '/cash',
        component: Cash
      }
    ]
  }
]
