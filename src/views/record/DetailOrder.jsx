import React, { Component } from 'react'
// import Cookies from 'js-cookie'
import { Row, Col, Table, Divider, Button, message, Modal } from 'antd'
import moment from 'moment'
import ajax from '../../api'
import { axiosUrl } from '../../api/axios'
import SeePic from '../writer/SeePic'
import './detailOrder.scss'
export default class DetailOrder extends Component {
  state = {
    picVisable: false,
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
        dataIndex: 'essayTitle'
      }, {
        title: '原创度',
        dataIndex: 'originalLevel'
      }, {
        title: '图片数量',
        dataIndex: 'pictureTotal'
      }, {
        title: '状态',
        dataIndex: 'status',
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
        dataIndex: 'oprate',
        render: (text, record) => {
          return (
            <div>
              {
                (this.state.userType === 2 || 3) ? <a href='javascript:;' onClick={() => this.Money(record)}>打款<Divider type='vertical' /></a> : ''
              }
              {
                (this.state.userType === 2 || 0) ? <a href='javascript:;' onClick={() => this.verify(record)}>审核<Divider type='vertical' /></a> : ''
              }
              {
                (this.state.userType === 3 || 2) ? <a href='javascript:;' onClick={() => this.SendBack(record)}>退稿<Divider type='vertical' /></a> : ''
              }
              {
                (this.state.userType === 3) ? <a href='javascript:;' onClick={() => this.Received(record)}>收稿<Divider type='vertical' /></a> : ''
              }
              <a href='javascript:;' onClick={() => this.downLoad(record)}>下载<Divider type='vertical' /></a>
              <a href='javascript:;' onClick={() => this.seePic(record)}>查看图片</a>
            </div>
          )
        }
      }
    ],
    orderEssayRecords: [
      {
        key: '1',
        id: '',
        essayTitle: 'John Brown',
        originalLevel: 32,
        pictureTotal: 32,
        status: 'New York No. 1 Lake Park',
        result: 'lll'
      }]

  }
  SendBack=(record) => {

  }
  Received=(record) => {

  }
  handlePicCancel = () => {
    this.setState({
      picVisable: false
    })
  }
  seePic = (record) => {
    this.setState({
      orderEssayId: record.id,
      picVisable: true
    })
  }
  downLoad = (record) => {
    window.open(axiosUrl + '/order/essay/download?fileName=' + record.eassyFile, '_self')
  }
  verify=(record) => {

  }
  Money = (record) => {

  }
  getMerchantDetail=() => {
    let params = {
      id: location.hash.split('=')[1]
    }
    ajax.getMerchantDetail(params, response => {
      if (response.state.stateCode === 0) {
        let resData = response.data
        resData.orderEssayRecords.map((item, index) => {
          item.key = index + 1 + ''
        })
        this.setState({
          orderEssayRecords: resData.orderEssayRecords,
          orderCode: resData.orderRecord.orderCode,
          eassyTotal: resData.orderRecord.eassyTotal,
          merchantPrice: resData.orderRecord.merchantPrice,
          eassyType: resData.orderRecord.eassyType,
          orderTitle: resData.orderRecord.orderTitle,
          originalLevel: resData.orderRecord.originalLevel,
          picture: resData.orderRecord.picture,
          type: resData.orderRecord.type === 1 ? '养号文' : '流量文',
          endTime: moment.unix(parseInt(resData.orderRecord.endTime.toString().slice(0, 10))).format('YYYY-MM-DD HH:mm:ss'),
          wordCount: resData.orderRecord.wordCount
        })
      } else {
        message.error('请求失败，请稍后再试')
      }
    }, error => {
      console.log(error)
    })
  }
  getAdminMerchantDetail=() => {
    let params = {
      id: location.hash.split('=')[1]
    }
    ajax.getAdminMerchantDetail(params, response => {
      if (response.state.stateCode === 0) {
        let resData = response.data
        resData.orderEssayRecords.map((item, index) => {
          item.key = index + 1 + ''
        })
        this.setState({
          orderEssayRecords: resData.orderEssayRecords,
          orderCode: resData.orderRecord.orderCode,
          eassyTotal: resData.orderRecord.eassyTotal,
          merchantPrice: resData.orderRecord.merchantPrice,
          eassyType: resData.orderRecord.eassyType,
          orderTitle: resData.orderRecord.orderTitle,
          originalLevel: resData.orderRecord.originalLevel,
          picture: resData.orderRecord.picture,
          type: resData.orderRecord.type === 1 ? '养号文' : '流量文',
          endTime: moment.unix(parseInt(resData.orderRecord.endTime.toString().slice(0, 10))).format('YYYY-MM-DD HH:mm:ss'),
          wordCount: resData.orderRecord.wordCount
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
          orderEssayRecords: resData.orderEssayRecords,
          orderCode: resData.orderCode,
          eassyTotal: resData.eassyTotal,
          merchantPrice: resData.merchantPrice,
          eassyType: resData.eassyType,
          orderTitle: resData.orderTitle,
          originalLevel: resData.originalLevel,
          picture: resData.picture,
          type: resData.type === 1 ? '养号文' : '流量文',
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
            this.getMerchantDetail()
          } else if (this.state.userType === 2) {
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
            <Col span={8}>文章类型:{this.state.type}</Col>
            <Col span={8}>截止交稿时间:{this.state.endTime}</Col>
          </Row>
        </div>
        {
          this.state.userType === 4 ? '' : <div className='content'>
            <Table columns={this.state.columns} dataSource={this.state.orderEssayRecords} pagination={false} />
          </div>
        }
        <Modal title={null}
          visible={this.state.picVisable}
          onCancel={this.handlePicCancel}
          footer={null}
          width={800}
          height={460}
          bodyStyle={{ 'background': '#1f2630', color: 'red' }}
        >
          <SeePic orderEssayId={this.state.orderEssayId} onCancel={this.handlePicCancel} />
        </Modal>
      </div>
    )
  }
}
