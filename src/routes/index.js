import Login from '../views/login/HomePage' // 登陆页面
import Home from '../views/home/Home'
import Content from '../views/content/Content'
import Course from '../views/course/Course'
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
    path: '/platform',
    component: Home,
    childRoutes: [
      {
        path: '/platform/all',
        component: Content
      },
      {
        path: '/platform/course',
        component: Course
      }
    ]
  }
]
