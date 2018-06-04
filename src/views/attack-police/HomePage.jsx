// 查缉打击页面
import React, { Component } from 'react'
// import TablePaging from '../../components/common/table/TablePaging'
// import {Button, Spin, Form, Input, Table, Row, Col, Select} from 'antd'
import { Row, Col } from 'antd'
import People from '../../assets/images/people.png'
import Gongyou from '../../assets/images/gongyou.png'
import ChajiImg from '../../assets/images/chajiImg.png'
import Weichaji from '../../assets/images/weichaji.png'
import Xiaohongdian from '../../assets/images/xiaohongdian.png'
import Progress from './progress/Progress'
import SearchTable from './searchTable/SearchTable'
import ajax from '../../api'
import './HomePage.scss'

export default class HomePage extends Component {
  constructor () {
    super()
    this.state = {
      searchHonorLists: [],
      searchCaseCount: [],
      searchCaseInfo: {},
      pageVisible: true,
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: text => <a href='#'>{text}</a>
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age'
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address'
        }
      ],
      data: [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park'
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park'
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park'
        },
        {
          key: '4',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park'
        },
        {
          key: '5',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park'
        },
        {
          key: '6',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park'
        },
        {
          key: '7',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park'
        },
        {
          key: '8',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park'
        },
        {
          key: '9',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park'
        },
        {
          key: '10',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park'
        },
        {
          key: '11',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park'
        },
        {
          key: '12',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park'
        },
        {
          key: '13',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park'
        }
      ],
      pageNumInvest: 1,
      pageSizeInvest: 5,
      pageSizeCompany: 5,
      dataInvest: []
      // mapconfig: {// 与div对应
      //   type: ['GDSL'], // 地图类型
      //   center: [116.4024572952, 39.9140173126], // 中心点经纬度
      //   zoom: 11, // 当前地图级别
      //   maxZoom: 20, // 地图最大缩放级别
      //   minZoom: 10// 地图最小缩放级别
      // }
    }
  }
  componentDidMount () {
    // 光荣榜接口
    ajax.searchHonorList({}, response => {
      // console.log(response, 'res')
      if (response.code === 101) {
        this.setState({
          searchHonorLists: response.data
        })
      }
    }, error => {
      console.log(error)
    })
    //  案件详情接口
    ajax.searchCaseCount({}, response => {
      // console.log(response, 'res')
      if (response.code === 101) {
        this.setState({
          searchCaseCount: response.data
        })
      }
    }, error => {
      console.log(error)
    })
    // 查询查缉情况接口
    ajax.searchCaseInfo({}, response => {
      // console.log(response, 'res')
      if (response.code === 101) {
        this.setState({
          searchCaseInfo: response.data
        })
        // console.log('searchCaseInfos1', searchCaseInfos)
      }
    }, error => {
      console.log(error)
    })
    // }
  }

  render () {
    let allNum = this.state.searchCaseInfo.carDiscoverCount + this.state.searchCaseInfo.discoverCount + this.state.searchCaseInfo.caseDiscoverCount + this.state.searchCaseInfo.caseCount
    return (
      <div>
        <Row className='dajiMain'>
          {/* 左边光荣榜框 begin */}
          <Col span={5} className='MainLeft'>
            <div className='MainLeftHeader'><b>2018光荣榜</b>
              <span className='MainLeftText'>（本年1月1日起被包含的成功查车案件数）</span>
            </div>
            <div>
              {this.state.searchHonorLists.map((searchHonorList, index) => {
                return (
                  <div key={index}>
                    <div className='MainLeftConter'>
                      <div className='LeftConterImg'>
                        {/* <img src={searchHonorList.imgUrl} style={{ width: '100px', height: '120px', marginTop: '10px' }} alt='暂无图片' /> */}
                        <img src={People} style={{ width: '100px', height: '120px', marginTop: '10px' }} alt='暂无图片' />
                      </div>
                      <div className='LeftConterMain'>
                        <div className='ConterMainText'>
                          <Col span={14} className='MainTextLeft'>姓名：</Col>
                          <Col span={10} className='MainTextRight'>{searchHonorList.name}</Col>
                        </div>
                        <div className='ConterMainText'>
                          <Col span={14} className='MainTextLeft'>查缉案件数：</Col>
                          <Col span={10} className='MainTextRight'>{searchHonorList.searchCount}</Col>
                        </div>
                        <div className='ConterMainText'>
                          <Col span={14} className='MainTextLeft'>整车查获率：</Col>
                          <Col span={10} className='MainTextRight'>{searchHonorList.discoverPer}</Col>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}

            </div>

          </Col>
          {/* end */}
          {/* 右边内容框 begin */}
          <Col span={19}>
            <div className='MainRight'>
              {/* 右边头部  案件详情begin */}
              <div className='MainRightHeader'>
                <div className='RightHeaderAn'>案件详情</div>
                {this.state.searchCaseCount.map((statisticsCaseCount, index) => {
                  return (
                    <div key={index}>
                      <div className='RightHeaderMain'>
                        <Col span={8}>
                          <Col span={16} className='RightHeaderImgBox'>
                            <img className='RightHeaderImg' src={Gongyou} alt='' />
                          </Col>
                          <Col span={8} className='RightHeaderTextBox'>
                            <div className='RightHeaderText'>共有案件</div>
                            <div className='RightHeaderText2'>
                              <span className='RightHeaderTextConcer' ><b>{statisticsCaseCount.caseCount}</b></span>件
                            </div>
                          </Col>
                        </Col>
                      </div>
                      <div className='RightHeaderMain'>
                        <Col span={8}>
                          <Col span={12} className='RightHeaderImgBox'>
                            <img className='RightHeaderImg' src={ChajiImg} alt='' />
                          </Col>
                          <Col span={12} className='RightHeaderTextBox'>
                            <div className='RightHeaderText'>查缉案件</div>
                            <div className='RightHeaderText2'>
                              <span className='RightHeaderTextConcer' ><b>{statisticsCaseCount.discovered}</b></span>件
                            </div>
                          </Col>
                        </Col>
                      </div>
                      <div className='RightHeaderMain'>
                        <Col span={8}>
                          <Col span={8} className='RightHeaderImgBox'>
                            <img style={{ height: '46px', width: '46px' }} src={Weichaji} alt='' />
                          </Col>
                          <Col span={16} className='RightHeaderTextBox'>
                            <div className='RightHeaderText'>未查辑案件</div>
                            <div className='RightHeaderText2'>
                              <span className='RightHeaderTextConcer' ><b>{statisticsCaseCount.unDiscovered}</b></span>件
                            </div>
                          </Col>
                        </Col>
                      </div>
                    </div>
                  )
                })}
              </div>
              {/* end */}
              {/* 本所所有查辑情况 begin */}
              <div className='MainRightMiddle'>
                <div className='MiddleHeader'>
                  <div className='MiddleHeaderConter'>  本所所有查辑情况</div>
                  <div className='MiddleHeaderConterL'>
                    <img src={Xiaohongdian} alt='' />
                    已被分局挂牌：目前查辑数-案件发生数>10
                  </div>
                  <div className='MiddleMiddle' style={{borderBottom: 'none'}}>
                    <div>
                      <div className='carloadDiscoverBox'>
                        <Col span={5} className='carloadDiscover'>整车查获率（%）</Col>
                        <Col span={19} className='carloadDiscoverText'>{this.state.searchCaseInfo.carDiscoverPer}%</Col>
                      </div>
                      <div className='carloadDiscoverBox'>
                        <Col span={5} className='carloadDiscover'>整车查获量（件）</Col>
                        <Col span={19} className='carloadDiscoverText2'>
                          <Progress caseNum={parseInt(this.state.searchCaseInfo.carDiscoverCount)} percent={this.state.searchCaseInfo.carDiscoverCount / allNum * 100} style={{ width: '100%' }} /></Col>
                      </div>
                      <div className='carloadDiscoverBox'>
                        <Col span={5} className='carloadDiscover'>查获量（件）</Col>
                        <Col span={19} className='carloadDiscoverText2'>
                          <Progress caseNum={parseInt(this.state.searchCaseInfo.discoverCount)} percent={this.state.searchCaseInfo.discoverCount / allNum * 100} style={{ width: '100%' }} /></Col>
                      </div>
                      <div className='carloadDiscoverBox'>
                        <Col span={5} className='carloadDiscover'>查辑案件数量（件）</Col>
                        <Col span={19} className='carloadDiscoverText2'>
                          <Progress caseNum={parseInt(this.state.searchCaseInfo.caseDiscoverCount)} percent={this.state.searchCaseInfo.caseDiscoverCount / allNum * 100} style={{ width: '100%' }} /></Col>
                      </div>
                      <div className='carloadDiscoverBox'>
                        <Col span={5} className='carloadDiscover'>案发总数（件）</Col>
                        <Col span={19} className='carloadDiscoverText2'>
                          <Progress caseNum={parseInt(this.state.searchCaseInfo.caseCount)} percent={this.state.searchCaseInfo.caseCount / allNum * 100} style={{ width: '100%' }} /></Col>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* end */}
              {/* 检索框begin */}
              <div className='MainRightMain'> <SearchTable /></div>
              {/* end */}
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
