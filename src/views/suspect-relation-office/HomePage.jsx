import React, { Component } from 'react'
import './HomePage.scss'
import { List, Col, Button } from 'antd'
import Suspicon from '../../assets/images/u311.jpg'
import Relation from './relation/Relation'
import LocationMap from './locationMap/LocationMap'
import pointImg from '../../assets/images/u1022.png'
import ajax from '../../api'

// const root = {
//   'nodes': [
//     { 'name': '云天河', 'image': pointImg },
//     { 'name': '韩菱纱', 'image': pointImg },
//     { 'name': '柳梦璃', 'image': pointImg },
//     { 'name': '慕容紫英', 'image': pointImg }
//   ],
//   'edges': [
//     { 'source': 0, 'target': 1, 'relation': '挚友' },
//     { 'source': 0, 'target': 2, 'relation': '挚友' },
//     { 'source': 0, 'target': 3, 'relation': '挚友' }
//   ]
// }

// root['nodes'] = nodes
// root['edges'] = edges

export default class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      caseNames: [],
      root: {edges: [], nodes: []},
      searchSuspectRelationImg: [],
      mapShow: false,
      suspectPeoples: [],
      //  {
      //   key: '1',
      //   name: '小明',
      //   sex: '1', // 1为男
      //   idCardNum: '220303',
      //   age: '13',
      //   address: '北京',
      //   judgeCount: '1', // 研判次数
      //   arrestTime: '2018-01-01',
      //   buyCount: '1',
      //   accent: '北京口音',
      //   caseName: '电动车盗窃／破坏'
      // }

      searchSuspectList: []

    }
  }
    // 嫌疑人点击出现详情
    newslistclick = (item) => {
      this.state.mapShow = true
      this.setState({
        suspectPeoples: item
      })
      // let arr = location.hash.split('=').slice(1)
      // let caseId = parseInt(arr[0].replace(/&plateCode/, ''))
      // let plateCode = arr[1]
      // console.log(arr, 'arr')

      console.log(item, 'item')
      let urlParmas = {
        name: item.name,
        idCardNum: item.idCardNum,
        caseId: item.name
      }
      console.log(urlParmas)
      ajax.searchCaseForSuspect(urlParmas, response => {
        console.log(response, 'searchCaseForSuspect')

        if (response.code === 101) {
          this.setState({
            caseNames: response.data
          })
          console.log('caseNames', this.state.caseNames)
        }
      }, error => {
        console.log(error)
      })
    }
    // 点击关闭个人详情
    detailsHidden=() => {
      this.setState({
        mapShow: false
      })
    }
    componentDidMount =() => {
      let arr = location.hash.split('=').slice(1)
      console.log(arr, 'arr')
      let name = arr[0].replace(/&idCardNum/, '')
      let idCardNum = arr[1].replace(/&idCardNum/, '')
      let caseId = arr[2]
      decodeURI(decodeURI(location.search))
      // console.log(caseId, 'caseId')
      let urlParmas = {
        name: decodeURI(decodeURI(name)),
        idCardNum: decodeURI(decodeURI(idCardNum)),
        caseId: caseId
      }
      console.log(urlParmas, 'urlParmas')
      ajax.searchSuspectRelationImg(urlParmas, response => {
        // console.log(response, 'searchSuspectRelationImg')

        if (response.code === 101) {
          let edges = []
          let nodes = []
          response.data.edges.map((item) => {
            edges.push({
              source: item.source - 0,
              target: item.target - 0,
              relation: '朋友'
            })

            console.log(item)
          })
          response.data.nodes.map((item) => {
            nodes.push({
              name: item.name,
              image: pointImg
            })
          })
          this.setState({
            searchSuspectRelationImg: response.data.edges,
            root: {edges, nodes},
            searchSuspectList: response.data.nodes
          })

          // setTimeout(() => {
          //   this.setState({
          //     root: rootS
          //   })
          //   console.log(this.state.root, 'rootS')
          // }, 1000)

          // console.log(this.state, 'seriesData6666')
          // this.render()
        }
      }, error => {
        console.log(error)
      })
    }
    render () {
      return (<div >
        <div className='realationHeader'>
     嫌疑人库&nbsp;/&nbsp;嫌疑人图谱
          {/* 案件嫌疑人详情框begin */}
          {this.state.mapShow === true ? <div className='searchCaseForSuspect'>
            <div className='SuspectHeader'>
                 嫌疑人详情
            </div>
            <div className='SuspectMainHeader'>
              <div className='MainHeaderImg'>
                <img src={Suspicon} alt='' style={{height: '150px'}} />
              </div>
              <div className='MainHeaderText'>
                <div className='HeaderTextHeader'>
                   案件关键词：{this.state.suspectPeoples.caseName}
                </div>
                <div className='suspectPeoBox ' >
                  <span className='suspectPeo' >{this.state.suspectPeoples.name}</span>
                  <span className='suspectPeo' >{this.state.suspectPeoples.sex === '1' ? '男' : '女'}</span>
                  <span className='suspectPeo' >{this.state.suspectPeoples.age}</span>
                  {/* 身高数据库暂时没有 */}
                  {/* <span className='suspectPeo' style={{marginRight: '10px'}}>{this.state.searchSuspectDetail.name}</span> */}
                  <span className='suspectPeo' >{this.state.suspectPeoples.accent}</span>
                  {/* 特征数据库暂时没有数据 */}
                  {/* <span className='suspectPeo' style={{marginRight: '10px'}}>{this.state.searchSuspectDetail.name}</span> */}
                  <span className='suspectPeo' >{this.state.suspectPeoples.idCardNum}</span>
                </div>
                <div className='suspectPeoBox ' >
                    籍贯：<span className='suspectPeo' >{this.state.suspectPeoples.address}</span>
                </div>
                <div className='suspectPeoBox ' >
                  {/* 作案次数：<span className='suspectPeo' style={{marginRight: '10px'}}>{this.state.searchSuspectDetail.name}</span> */}

                    打处次数：<span className='suspectPeo' >{this.state.suspectPeoples.judgeCount}</span>

                      出所时间：<span className='suspectPeo' >{this.state.suspectPeoples.arrestTime}</span>
                </div>
              </div>
            </div>
            <div className='SuspectMainMain'>
              <Col span={6} className='SuspectCase'>
                <div className='SuspectCaseName'>
                  <Col span={6}>案件名称</Col>
                  {/* <Col span={6} className='suspicionRel'><a href='./#/police/suspect-relation'><Button type='primary' style={{marginLeft: '30px'}} onClick={this.SuspectLook}>关系图谱</Button> </a></Col> */}
                </div>
                <div className='SuspectCaseNameBox'>
                  {this.state.caseNames.map((item, index) => {
                    return (
                      <div className='SuspectCaseNames' key={index}>
                        {item.caseName}
                      </div>
                    )
                  })}
                </div>
              </Col>
              <Col span={18} className='SuspectCaseMap'>  <LocationMap /></Col>
            </div>
            <div className='MapHidden'>
              <Button type='primary' style={{marginLeft: '30px'}} onClick={this.detailsHidden}>关闭</Button>
            </div>
          </div> : ''}
        </div>
        <div className='realatioMain'>
          <div className='realatioMainLeft'>
            <div className='headerText'>
           嫌疑人信息
            </div>
            <div className='suspectPeople'>
              <List
                itemLayout='horizontal'
                dataSource={this.state.searchSuspectList}
                renderItem={searchSuspectDetail => (
                  <div className='SuspectMainHeader'>
                    <div>
                      <div className='MainHeaderImg'>
                        <img src={Suspicon} alt='' style={{height: '150px'}} />
                      </div>
                      <div className='MainHeaderText'>
                        <div className='HeaderTextHeader'>
                   案件关键词：{searchSuspectDetail.caseName}
                        </div>
                        <div className='suspectPeoBox ' >
                          <span className='suspectPeo' >{searchSuspectDetail.name}</span>
                          <span className='suspectPeo' >{searchSuspectDetail.sex === '1' ? '男' : '女'}</span>
                          <span className='suspectPeo' >{searchSuspectDetail.age}</span>
                          {/* 身高数据库暂时没有 */}
                          {/* <span className='suspectPeo' style={{marginRight: '10px'}}>{this.state.searchSuspectDetail.name}</span> */}
                          <span className='suspectPeo' >{searchSuspectDetail.accent}</span>
                          {/* 特征数据库暂时没有数据 */}
                          {/* <span className='suspectPeo' style={{marginRight: '10px'}}>{this.state.searchSuspectDetail.name}</span> */}
                          <span className='suspectPeo' >{searchSuspectDetail.idCardNum}</span>
                        </div>
                        <div className='suspectPeoBox ' >
                    籍贯：<span className='suspectPeo' >{searchSuspectDetail.address}</span>
                        </div>
                        <div className='suspectPeoBox ' >
                          {/* 作案次数：<span className='suspectPeo' style={{marginRight: '10px'}}>{this.state.searchSuspectDetail.name}</span> */}

                    打处次数：<span className='suspectPeo' >{searchSuspectDetail.judgeCount}</span>

                      出所时间：<span className='suspectPeo' >{searchSuspectDetail.arrestTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className='SuspectMore'>
                      <span onClick={(tem) => this.newslistclick(searchSuspectDetail)} style={{cursor: 'pointer'}}>更多 </span>
                    </div>
                  </div>
                )}
              />
            </div>
          </div>
          <div className='realatioMainRight'>
            <div className='headerText'>
          嫌疑人图谱
            </div>
            <div>
              <Relation root={this.state.root} style={{width: '80%', height: '80vh'}} />
            </div>
          </div>
        </div>
      </div>
      )
    }
}
