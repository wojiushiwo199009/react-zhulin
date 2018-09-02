import React, { Component } from 'react'
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
