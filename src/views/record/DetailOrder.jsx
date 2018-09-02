import React, { Component } from 'react'
// import Cookies from 'js-cookie'
import {Row, Col, Table} from 'antd'
import ajax from '../../api'
import './detailOrder.scss'
export default class Dealt extends Component {
  state = {
    orderNum: '1',
    number: 1,
    payment: '200',
    eassyType: 1,
    title: 'ss',
    originalLevel: '2',
    picture: 2,
    type: 1,
    endTime: '2018-03-08',
    wordCount: 3000,
    columns: [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href='javascript:;'>{text}</a>
      }, {
        title: 'Age',
        dataIndex: 'age',
        key: 'age'
      }, {
        title: 'Address',
        dataIndex: 'address',
        key: 'address'
      }, {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
          <span>
            {tags}
          </span>
        )
      }],
    data: [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer']
      }, {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser']
      }, {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher']
      }]

  }
  getOrder=() => {
    let params = {
      id: location.hash.split('=')[1]
    }
    ajax.getOrder(params, response => {
      if (response.code === 106) {
        this.setState({

        })
      } else {
      }
    }, error => {
      console.log(error)
    })
  }
  componentDidMount () {
    this.getOrder()
  }
  render () {
    return (
      <div className='detail-order' >
        <div className='title'>
          <h3>订单号:{this.state.orderNum}</h3>
          <Row>
            <Col span={8}>订单标题:{this.state.title}</Col>
            <Col span={8}>商户定价:{this.state.payment}</Col>
            <Col span={8}>文章领域:{this.state.eassyType}</Col>
          </Row>
          <Row>
            <Col span={8}>文章数量:{this.state.number}</Col>
            <Col span={8}>原创度:{this.state.originalLevel}</Col>
            <Col span={8}>图片数量要求:{this.state.picture}</Col>
          </Row>
          <Row>
            <Col span={8}>字数要求:{this.state.wordCount}</Col>
            <Col span={8}>类型:{this.state.type}</Col>
            <Col span={8}>截止交稿时间:{this.state.endTime}</Col>
          </Row>
        </div>
        <div className='content'>
          <Table columns={this.state.columns} dataSource={this.state.data} pagination={false} />
        </div>
      </div>
    )
  }
}
