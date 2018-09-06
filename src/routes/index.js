import Login from '../views/login/Login' // 登陆页面
import Home from '../views/home/Home'
import Record from '../views/record/Record'
import Message from '../views/message/Message'
import DetailOrder from '../views/record/DetailOrder'
import Dealt from '../views/dealt/Dealt'
import Index from '../views/index/Index'
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
    path: 'message',
    component: Message
  },
  {
    path: '/',
    component: Home,
    childRoutes: [
      {
        path: '/index',
        component: Index
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
        path: '/authority',
        component: Authority
      },
      {
        path: '/detailOrder',
        component: DetailOrder
      }
    ]
  }
]
