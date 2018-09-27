import React, { Component } from 'react'
import { Row, Col, message, Button, Icon, Modal, Upload } from 'antd'
import PropTypes from 'prop-types'
import { axiosUrl } from '../../api/axios'
import ajax from '../../api'
import './message.scss'
export default class Message extends Component {
  state={
    name: '',
    qq: '',
    weChat: '',
    email: '',
    address: '',
    sex: null,
    age: '',
    profession: '',
    good: '',
    fullTime: 0,
    creditLevel: '',
    payPicture: '',
    previewVisible: false,
    previewImage: '',
    fileList: [{
      uid: '-1',
      name: '支付宝图片.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }]
  }
  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    console.log(file, 'file')
    ajax.getUserFile({name: file.name}, response => {
      if (response.state.stateCode === 0) {
        this.setState({
          previewImage: file.url || file.thumbUrl,
          previewVisible: true
        })
      } else {
        message.error('个人信息查询失败，请重试')
      }
    }, error => {
      console.log(error)
      message.error('个人信息查询失败，请重试')
    })
  }

  handleChange = ({ fileList }) => this.setState({ fileList })

  getUser=() => {
    ajax.getUserInfo({}, response => {
      if (response.state.stateCode === 0) {
        let resData = response.data
        this.setState({
          name: resData.name,
          qq: resData.qq,
          weChat: resData.weChat,
          email: resData.email,
          address: resData.address,
          sex: resData.sex,
          age: resData.age,
          profession: resData.profession,
          good: resData.good,
          fullTime: resData.fullTime,
          payPicture: resData.payPicture,
          creditLevel: resData.creditLevel,
          fileList: [
            {
              uid: '-1',
              name: '支付宝.png',
              status: 'done',
              url: `${axiosUrl}/user/file/` + resData.payPicture
            }
          ]
        })
      } else {
        message.error('个人信息查询失败，请重试')
      }
    }, error => {
      console.log(error)
      message.error('个人信息查询失败，请重试')
    })
  }
  changeMessage=() => {
    this.props.history.push('/fillmessage')
  }
  cancel=() => {
    this.props.history.push('/index')
  }
  componentDidMount () {
    this.getUser()
  }
  render () {
    const { previewVisible, fileList } = this.state
    return (
      <div className='message'>
        <Row>
          <Col className='gutter-row' span={8}>
            <div className='gutter-box'>姓名:</div>
          </Col>
          <Col className='gutter-row' span={16}>
            <div className='gutter-box'>{this.state.name}</div>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col className='gutter-row' span={8}>
            <div className='gutter-box'>性别:</div>
          </Col>
          <Col className='gutter-row' span={16}>
            <div className='gutter-box'>{this.state.sex === 0 ? '男' : (this.state.sex === 1) ? '女' : ''}</div>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col className='gutter-row' span={8}>
            <div className='gutter-box'>年龄:</div>
          </Col>
          <Col className='gutter-row' span={16}>
            <div className='gutter-box'>{this.state.age}</div>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col className='gutter-row' span={8}>
            <div className='gutter-box'>qq号:</div>
          </Col>
          <Col className='gutter-row' span={16}>
            <div className='gutter-box'>{this.state.qq}</div>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col className='gutter-row' span={8}>
            <div className='gutter-box'>微信号:</div>
          </Col>
          <Col className='gutter-row' span={16}>
            <div className='gutter-box'>{this.state.weChat}</div>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col className='gutter-row' span={8}>
            <div className='gutter-box'>邮箱:</div>
          </Col>
          <Col className='gutter-row' span={16}>
            <div className='gutter-box'>{this.state.email}</div>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col className='gutter-row' span={8}>
            <div className='gutter-box'>信用分:</div>
          </Col>
          <Col className='gutter-row' span={16}>
            <div className='gutter-box'>{this.state.creditLevel}</div>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col className='gutter-row' span={8}>
            <div className='gutter-box'>地址:</div>
          </Col>
          <Col className='gutter-row' span={16}>
            <div className='gutter-box'>{this.state.address}</div>
          </Col>
        </Row>

        <Row gutter={20}>
          <Col className='gutter-row' span={8}>
            <div className='gutter-box'>职业:</div>
          </Col>
          <Col className='gutter-row' span={16}>
            <div className='gutter-box'>{this.state.profession}</div>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col className='gutter-row' span={8}>
            <div className='gutter-box'>擅长领域:</div>
          </Col>
          <Col className='gutter-row' span={16}>
            <div className='gutter-box'>{this.state.good}</div>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col className='gutter-row' span={8}>
            <div className='gutter-box'>是否全职:</div>
          </Col>
          <Col className='gutter-row' span={16}>
            <div className='gutter-box'>{this.state.fullTime === 0 ? '全职' : '兼职'}</div>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col className='gutter-row' span={8}>
            <div className='gutter-box'>支付宝图片:</div>
          </Col>
          <Col className='gutter-row' span={16}>
            <div className='clearfix'>
              <Upload
                action='//jsonplaceholder.typicode.com/posts/'
                listType='picture-card'
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
              />
              <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt='二维码图片' style={{ width: '100%' }} src={this.state.payPicture} />
              </Modal>
            </div>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col className='gutter-row' span={8} style={{textAlign: 'right'}}>
            <Button onClick={this.cancel}>取消</Button>
          </Col>
          <Col className='gutter-row' offset={1} span={15}>
            <Button type='primary' onClick={this.changeMessage}>修改个人信息</Button>
          </Col>
        </Row>
      </div>
    )
  }
}
Message.propTypes = {
  history: PropTypes.object
}
