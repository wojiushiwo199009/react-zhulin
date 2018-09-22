import React, { Component } from 'react'
// import Cookies from 'js-cookie'
import { Row, Col, Table, Divider, Button, message } from 'antd'
import moment from 'moment'
import ajax from '../../api'
export default class DealtDetail extends Component {
  state = {
    userType: '',
    orderCode: '',
    name: '',
    sex: '',
    email: '',
    address: '',
    wechat: '',
    qq: '',
    creditLevel: '',
    good: '',
    result: '',
    columns: [
      {
        title: '文章标题',
        dataIndex: 'essay_title'
      }, {
        title: '原创度',
        dataIndex: 'originalLevel'
      }, {
        title: '图片数量',
        dataIndex: 'pictureTotal'
      }, {
        title: '状态',
        dataIndex: 'Status',
        render: (text, record) => {
          return (
            <div>
              {
                text === 0 ? <span>待管理员审核</span> : (text === 1) ? <span>商家退稿</span> : (text === 2) ? <span>收稿成功</span> : (text === 3) ? <span>商家已打款</span> : (text === 4) ? <span>待商家审核</span> : (text === 5) ? <span>商家退稿</span> : (text === 6) ? <span>管理员已打款</span> : ''
              }
            </div>
          )
        }
      },
      {
        title: '审核结果',
        dataIndex: 'result'
      },
      {
        title: '操作',
        dataIndex: 'result',
        render: (text, record) => {
          return (
            <div>
              <a href='javascript:;' onClick={() => this.downLoad(record)}>下载<Divider type='vertical' /></a>
              <a href='javascript:;' onClick={() => this.seePic(record)}>查看图片<Divider type='vertical' /></a>
              {
                (text === 4 || 0) ? <a href='javascript:;' onClick={() => this.verify(record)}>审核<Divider type='vertical' /></a> : ''
              }
              {
                (text === 2 || 3) ? <a href='javascript:;' onClick={() => this.Money(record)}>打款</a> : ''
              }
            </div>
          )
        }
      }
    ],
    orderEssayRecords: [
      {
        key: '1',
        essay_title: '',
        originalLevel: 32,
        pictureTotal: 32,
        Status: '',
        result: ''
      }]

  }
  seePic = (record) => {

  }
  downLoad = (record) => {
    console.log(record)
  }
  verify = (record) => {

  }
  Money = (record) => {

  }
  getOrder = () => {
    let params = {
      id: location.hash.split('=')[1]
    }
    ajax.detailOrder(params, response => {
      if (response.state.stateCode === 0) {
        let resData = response.data
        this.setState({
          orderCode: resData.orderRecord.orderCode,
          eassyTotal: resData.orderRecord.eassyTotal,
          merchantPrice: resData.orderRecord.merchantPrice,
          eassyType: resData.orderRecord.eassyType,
          orderTitle: resData.orderRecord.orderTitle,
          originalLevel: resData.orderRecord.originalLevel,
          picture: resData.orderRecord.picture,
          type: resData.orderRecord.type,
          endTime: moment.unix(parseInt(resData.orderRecord.endTime.toString().slice(0, 10))).format('YYYY-MM-DD HH:mm:ss'),
          wordCount: resData.orderRecord.wordCount
        })
      }
    }, error => {
      console.log(error)
    })
  }
  getMerchantDetail = () => {
    ajax.getMerchantDetail({}, response => {
      if (response.state.stateCode === 0) {
        response.data.length > 0 && response.data.map((item, index) => {
          item.key = index + ''
        })
        this.setState({
          orderEssayRecords: response.data
        })
      } else {
        message.error('请求失败，请稍后再试')
      }
    }, error => {
      console.log(error)
    })
  }

  AdminUserDetail = () => {
    ajax.AdminUserDetail({id: location.hash.split('=')[1]}, response => {
      if (response.state.stateCode === 0) {
        this.setState({
          orderCode: response.data.code,
          name: response.data.name,
          sex: response.data.sex,
          email: response.data.email,
          address: response.data.address,
          wechat: response.data.wechat,
          qq: response.data.qq,
          creditLevel: response.data.creditLevel,
          good: response.data.good,
          result: response.data.result === '1' ? '待提交信息' : (response.data.result === '2') ? '待审核' : (response.data.result === '3') ? '审核成功' : (response.data.result === '4') ? '审核失败' : (response.data.result === '5') ? '禁用' : ''
        })
      } else {
        message.error('请求失败，请稍后再试')
      }
    }, error => {
      console.log(error)
    })
  }
  getUserInfo = () => {
    ajax.getUserInfo({}, response => {
      this.setState({
        userType: response.data.type
      })
    }, error => {
      console.log(error)
    })
  }
  componentWillMount () {
    this.getUserInfo()
  }
  componentDidMount () {
    this.AdminUserDetail()
  }
  render () {
    console.log(this.state.userType, 'useetupe')

    return (
      <div className='detail-order' >
        <div className='title'>
          <h3>订单号:{this.state.orderCode}</h3>
          <Row>
            <Col span={8}>姓名:{this.state.name}</Col>
            <Col span={8}>性别:
              {
                this.state.sex === 1 ? '女' : ''
              }
              {
                this.state.sex === 0 ? '男' : ''
              }
            </Col>
            <Col span={8}>邮箱:{this.state.email}</Col>
          </Row>
          <Row>
            <Col span={8}>地址:{this.state.address}</Col>
            <Col span={8}>微信:{this.state.wechat}</Col>
            <Col span={8}>qq号:{this.state.qq}</Col>
          </Row>
          <Row>
            <Col span={8}>信用等级:{this.state.creditLevel}</Col>
            <Col span={8}>擅长:{this.state.good}</Col>
            <Col span={8}>审核结果:{this.state.result}</Col>
          </Row>
        </div>
        {
          (this.state.userType === 4 || this.state.userType === 2) ? '' : <div className='content'>
            <Table columns={this.state.columns} dataSource={this.state.orderEssayRecords} pagination={false} />
          </div>
        }

      </div>
    )
  }
}
