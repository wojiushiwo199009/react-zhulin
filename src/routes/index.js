import Login from '../views/login/HomePage' // 登陆页面
import Home from '../views/home/Home'
import ceshi from '../views/ceshi/ceshi'
import { Redirect } from 'react-router-dom'
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
    path: '/ceshi',
    component: ceshi
  }
]
