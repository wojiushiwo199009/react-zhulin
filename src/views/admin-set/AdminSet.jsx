import React, { Component } from 'react'
// import Cookies from 'js-cookie'
import { Row, Col, message, Button, InputNumber } from 'antd'
import ajax from '../../api'
import './admin-set.scss'
// import Auditing from './Auditing'
export default class AdminSet extends Component {
  state = {
    userid: '',
    id: '',
    limitTime: null,
    showSet: true,
    params: null
  };

  getAdminMerchantOrderLimitTime = () => {
    ajax.getAdminMerchantOrderLimitTime({}, response => {
      if (response.state.stateCode === 0) {
        let resData = response.data
        this.setState({
          limitTime: resData.limitTime
        })
      } else {
        message.error(response.state.stateMessage || '请稍后再试')
      }
    }, error => {
      console.log(error)
    })
  }
  setLimtTime=() => {
    this.setState({
      showSet: false
    })
  }
  updateLimtTime=() => {
    let self = this
    this.setState({
      showSet: true
    })
    ajax.getAdminMerchantOrderTime({'limitTime': parseInt(this.state.params)}, response => {
      if (response.state.stateCode === 0) {
        self.getAdminMerchantOrderLimitTime()
      } else {
        message.error(response.state.stateMessage || '请稍后再试')
      }
    }, error => {
      console.log(error)
    })
  }
  changeTime=(val) => {
    this.setState({
      params: val
    })
  }
  getUserInfo = () => {
    ajax.getUserInfo({}, response => {
      if (response.state.stateCode === 0) {
        this.setState({
          userid: response.data.id
        })
      }
    }, error => {
      console.log(error)
    })
  }
  hideSetLimtTimt=() => {
    this.setState({
      showSet: true
    })
  }

  componentWillMount () {
    this.getUserInfo()
  }
  componentDidMount () {
    this.getAdminMerchantOrderLimitTime()
  }
  render () {
    return (
      <div className='admin-set'>
        <Row>
          <Col span={10}>设置写手订单取消时间</Col>
          {
            this.state.showSet ? <Col span={8}>{this.state.limitTime}小时</Col> : <Col span={8}> <InputNumber min={0} onChange={this.changeTime} />小时</Col>
          }

          {
            this.state.showSet ? <Col span={6} ><Button onClick={this.setLimtTime}>设置</Button></Col>
              : <Col span={6}><Button style={{marginRight: '10px'}} onClick={this.updateLimtTime}>保存</Button><Button onClick={this.hideSetLimtTimt}>取消</Button></Col>
          }

        </Row>
      </div>
    )
  }
}
