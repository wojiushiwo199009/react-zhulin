import React, { Component } from 'react'
import ajax from '../../api'
import { Upload, Icon, message, Button } from 'antd'
export default class Index extends Component {
  constructor (props) {
    super(props)
    console.log(props)
    this.state = {
    }
  }

  render () {
    return (
      <div className='index'>
       首页
      </div>
    )
  }
}
