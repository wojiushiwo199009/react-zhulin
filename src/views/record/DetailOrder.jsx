import React, { Component } from 'react'
// import Cookies from 'js-cookie'
import {Row, Col, Table, Divider, Button, message} from 'antd'
import moment from 'moment'
import ajax from '../../api'
import './detailOrder.scss'
export default class Dealt extends Component {
  state = {
    userType: '',
    orderCode: '1',
    eassyTotal: 1,
    merchantPrice: '200',
    eassyType: 1,
    orderTitle: 'ss',
    originalLevel: '2',
    picture: 2,
    type: 1,
    endTime: '2018-03-08',
    wordCount: 3000,
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
              <a onClick={() => this.seePic(record)}>查看图片<Divider type='vertical' /></a>
              {
                (text === 4 || 0) ? <Button onClick={() => this.verify(record)}>审核<Divider type='vertical' /></Button> : ''
              }
              {
                (text === 2 || 3) ? <Button onClick={() => this.Money(record)}>打款</Button> : ''
              }
            </div>
          )
        }
      }
    ],
    orderEssayRecords: [
      {
        key: '1',
        essay_title: 'John Brown',
        originalLevel: 32,
        pictureTotal: 32,
        Status: 'New York No. 1 Lake Park',
        result: 'lll'
      }]

  }
  seePic = (record) => {

  }
  downLoad = (record) => {
    console.log(record)
  }
  verify=(record) => {

  }
  Money = (record) => {

  }
  getOrder=() => {
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
  getMerchantDetail=() => {
    ajax.getMerchantDetail({}, response => {
      if (response.state.stateCode === 0) {
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
  getAdminMerchantDetail=() => {
    ajax.getAdminMerchantDetail({}, response => {
      if (response.state.stateCode === 0) {
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
  getWriterDetail=() => {
    ajax.getWriterDetail({id: location.hash.split('=')[1]}, response => {
      if (response.state.stateCode === 0) {
        let resData = response.data
        this.setState({
          orderCode: resData.orderCode,
          eassyTotal: resData.eassyTotal,
          merchantPrice: resData.merchantPrice,
          eassyType: resData.eassyType,
          orderTitle: resData.orderTitle,
          originalLevel: resData.originalLevel,
          picture: resData.picture,
          type: resData.type,
          endTime: moment.unix(parseInt(resData.endTime.toString().slice(0, 10))).format('YYYY-MM-DD HH:mm:ss'),
          wordCount: resData.wordCount
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
      if (response.state.stateCode === 0) {
        this.setState({
          userType: response.data.type
        }, () => {
          if (this.state.userType === 3) {
            this.getOrder()
            this.getMerchantDetail()
          } else if (this.state.userType === 2) {
            this.getOrder()
            this.getAdminMerchantDetail()
          } else if (this.state.userType === 4) {
            this.getWriterDetail()
          }
        })
      } else {
        message.error('请求失败，请稍后再试')
      }
    }, error => {
      console.log(error)
    })
  }
  componentDidMount () {
    this.getUserInfo()
  }
  render () {
    return (
      <div className='detail-order' >
        <div className='title'>
          <h3>订单号:{this.state.orderCode}</h3>
          <Row>
            <Col span={8}>订单标题:{this.state.orderTitle}</Col>
            <Col span={8}>商户定价:{this.state.merchantPrice}</Col>
            <Col span={8}>文章领域:{this.state.eassyType}</Col>
          </Row>
          <Row>
            <Col span={8}>文章数量:{this.state.eassyTotal}</Col>
            <Col span={8}>原创度:{this.state.originalLevel}</Col>
            <Col span={8}>图片数量要求:{this.state.picture}</Col>
          </Row>
          <Row>
            <Col span={8}>字数要求:{this.state.wordCount}</Col>
            <Col span={8}>类型:{this.state.type}</Col>
            <Col span={8}>截止交稿时间:{this.state.endTime}</Col>
          </Row>
        </div>
        {
          this.state.userType === 4 ? '' : <div className='content'>
            <Table columns={this.state.columns} dataSource={this.state.orderEssayRecords} pagination={false} />
          </div>
        }

      </div>
    )
  }
}
