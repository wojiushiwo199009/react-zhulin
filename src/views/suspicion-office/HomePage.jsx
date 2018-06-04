// 派出所 嫌疑人库
import React, { Component } from 'react'
import './HomePage.scss'
import { Col, Input, Select, Button, Tabs, List, Card } from 'antd'
import ajax from '../../api'
import LocationMap from './locationMap/LocationMap'

import CustomPagingTable from '../../components/common/table/TablePaging'
import Suspicon from '../../assets/images/u311.jpg'
// import {axiosUrl} from '../../api/axios'
const Option = Select.Option

const TabPane = Tabs.TabPane

// function callback (key) {
//   console.log(key)
// }

// 下载模板
// var fileUrl = url.control + responseData.data;
//     var a = document.createElement('a');
//     a.target = "_blank";
//     a.href = fileUrl;
//     a.download = "";
//     a.click();
// }
// 图片假数据
const data = [
  {
    title: 'Title 1',
    idCardNum: '220303',
    url: 'www.baidu.com',
    caseId: '005688',
    logo: '典型',
    name: '小明',
    age: '16'

  },
  {
    title: 'Title 2',
    idCardNum: '220303',
    url: 'www.baidu.com',
    caseId: '005688',
    logo: '典型',
    name: '小华',
    age: '16'
  },
  {
    title: 'Title 3',
    idCardNum: '220303',
    url: 'www.baidu.com',
    caseId: '005688',
    logo: '典型',
    name: '小华',
    age: '16'
  },
  {
    title: 'Title 4',
    idCardNum: '220303',
    url: 'www.baidu.com',
    caseId: '005688',
    logo: '典型',
    name: '小华',
    age: '16'
  },
  {
    title: 'Title 5',
    idCardNum: '220303',
    url: 'www.baidu.com',
    caseId: '005688',
    logo: '',
    name: '小华',
    age: '16'
  },
  {
    title: 'Title 6',
    idCardNum: '220303',
    url: 'www.baidu.com',
    caseId: '005688',
    logo: '',
    name: '小华',
    age: '16'
  },

  {
    title: 'Title 7',
    idCardNum: '220303',
    url: 'www.baidu.com',
    caseId: '005688',
    logo: '典型',
    name: '小华',
    age: '16'
  },
  {
    title: 'Title 8',
    idCardNum: '220303',
    url: 'www.baidu.com',
    caseId: '005688',
    logo: '典型',
    name: '小华',
    age: '16'
  }
]
const pagination = {
  pageSize: 8,
  current: 1,
  total: data.length,
  onChange: () => {}
}
const pagination4 = {
  pageSize: 6,
  current: 1,
  total: data.length,
  onChange: () => {}
}
// 查询已抓获嫌疑人详情
// const searchArrestSuspectInfo = [
//   {
//     name: '小明',
//     sex: '男',
//     idCardNum: '220303',
//     age: '13',
//     address: '北京',
//     time: '2018-03-05',
//     caseId: '005688',
//     logo: '典型',
//     caseName: '来广营偷车案',
//     imgUrl: 'www.baidu.com '

//   },
//   {
//     name: '小明',
//     sex: '男',
//     idCardNum: '220303',
//     age: '13',
//     address: '北京',
//     time: '2018-03-05',
//     caseId: '005688',
//     logo: '典型',
//     caseName: '来广营偷车案',
//     imgUrl: 'www.baidu.com '

//   }

// ]
// 查询未抓获嫌疑人详情
// const searchUnarrestSuspectInfo = [
//   {
//     caseName: '来广营偷车案',
//     imgUrl: 'www.baidu.com '

//   },
//   {
//     caseName: '来广营偷车案',
//     imgUrl: 'www.baidu.com '

//   }

// ]
export default class HomePage extends Component {
  constructor () {
    super()
    this.state = {
      pageVisible: true, //
      searchSuspectTotal: 0,
      // cities: cityData[provinceData[0]],
      // secondCity: cityData[provinceData[0]][0],
      pid: 0,
      name: '',
      idCardNum: '',
      tatalPage: 0,
      caseId: '',
      mapShow: false,
      searchSuspectListCount: 0,
      searchSuspectLists: [],
      searchArrestSuspectInfoCount: 0,
      searchArrestSuspectInfo: [],
      searchAddressById: [],
      searchSuspectList: [],
      cityDatas: [],
      countyData: [],
      searchSuspectDetail: {},
      searchUnarrestSuspectInfo: [],
      urlParmasSuspect: {
        name: '',
        idCardNum: '',
        phoneNum: '',
        province: '',
        city: '',
        county: '',
        ageLower: '',
        ageUpper: '',
        heightLower: '',
        heightUpper: '',
        tools: '',
        sex: '',
        peopleType: '',
        crimeType: '',
        pageSize: '',
        pageNum: ''
      },
      urlParmas: {
        name: '',
        idCardNum: '',
        caseId: ''
      },
      columns: [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name'
          // render: text => <a href='#'>{text}</a>
        },
        {
          title: '性别',
          dataIndex: 'sex',
          key: 'sex',
          render: (text, record, index) => {
            // console.log(record, 'record')
            let Text = record.sex === '1' ? '男' : '女'
            return (<span >
              {Text}
            </span>)
          }
        },
        {
          title: '身份证号',
          dataIndex: 'idCardNum',
          key: 'idCardNum'
        },
        {
          title: '年龄',
          dataIndex: 'age',
          key: 'age'
          // render: text => <a href='#'>{text}</a>
        },
        {
          title: '户籍',
          dataIndex: 'address',
          key: 'address'
        },
        {
          title: '研判次数',
          dataIndex: 'judgeCount',
          key: 'judgeCount'
        },
        {
          title: '最近抓获时间',
          dataIndex: 'arrestTime',
          key: 'arrestTime'
        },
        {
          title: '收销赃次数',
          dataIndex: 'buyCount',
          key: 'buyCount'

        },
        {
          title: '口音',
          dataIndex: 'accent',
          key: 'accent'
          // alert(1)
          //
        }
      ],
      // searchSuspectList: [
      //   {
      //     key: '1',
      //     name: '小明',
      //     sex: '1', // 1为男
      //     idCardNum: '220303',
      //     age: '13',
      //     address: '北京',
      //     judgeCount: '1', // 研判次数
      //     arrestTime: '2018-01-01',
      //     buyCount: '1',
      //     accent: '北京口音'

      //   },
      //   {
      //     key: '2',
      //     name: '小华',
      //     sex: '0',
      //     idCardNum: '220303',
      //     age: '13',
      //     address: '北京',
      //     judgeCount: '1', // 研判次数
      //     arrestTime: '2018-01-01',
      //     buyCount: '1',
      //     accent: '北京口音'
      //   },
      //   {
      //     key: '2',
      //     name: '小华',
      //     sex: '0',
      //     idCardNum: '220303',
      //     age: '13',
      //     address: '北京',
      //     judgeCount: '1', // 研判次数
      //     arrestTime: '2018-01-01',
      //     buyCount: '1',
      //     accent: '北京口音'
      //   }
      // ]
      caseNames: [
        {
          idCardNum: '220303',
          caseName: '金星立交桥盗窃案'
        },
        {
          idCardNum: '220303',
          caseName: '火星立交桥盗窃案'
        }

      ]

    }
  }

  // 每页个数改变时
  onShowSizeChange (current, pageSize) {
    this.setState({ pageNum: current, pageSize: pageSize }, () => {
      this.searckClick()
    })
  }
  // 页码改变时
  onChangePage (current, pageSize) {
    this.setState({ pageNum: current, pageSize: pageSize }, () => {
      this.searckClick()
    })
  }
  // onSecondCityChange = (value) => {
  //   this.setState({
  //     secondCity: value
  //   })
  // }

  // 嫌疑人点击出现详情
  newslistclick = (item) => {
    this.state.mapShow = true
    this.setState({
      searchSuspectDetail: item,
      name: item.name,
      idCardNum: item.idCardNum,
      caseId: item.caseId

    })
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
        console.log('searchSuspectListCount', this.state.searchSuspectListCount)
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
  // 姓名
  onChangeName = (e) => {
    this.setState({ name: e.target.value })
  }

  // 身份证号码
  onChangeIdCard = (e) => {
    this.setState({ idCardNum: e.target.value })
  }
   // 电话号码
   onChangePhoneNum = (e) => {
     this.setState({ phoneNum: e.target.value })
   }
  // 省份
   handleChangeProvince= (value, key) => {
     ajax.searchAddressById({pid: key.key}, response => {
       console.log(response, 'city')

       if (response.code === 101) {
         this.setState({
           cityDatas: response.data
         })
       }
     }, error => {
       console.log(error)
     })
     console.log('value', value)
     this.setState({
       province: value
     })
   }
 // 市
 handleChangeCity= (value, key) => {
   ajax.searchAddressById({pid: key.key}, response => {
     console.log(response, 'county')

     if (response.code === 101) {
       this.setState({
         countyData: response.data
       })
     }
   }, error => {
     console.log(error)
   })
   console.log(`selected ${value}`)
   this.setState({
     city: value
   })
 }
  // 县
  handleChangeCounty= (value) => {
    console.log(`selected ${value}`)
    this.setState({
      county: value
    })
  }
    // 年龄下限
    onChangeAgeLower = (e) => {
      this.setState({ ageLower: e.target.value })
    }
       // 年龄上限
       onChangeAgeUpper = (e) => {
         this.setState({ ageUpper: e.target.value })
       }
  // 身高下限
    onChangeHeightLower = (e) => {
      this.setState({ heightLower: e.target.value })
    }
       // 身高上限
       onChangeHeightUpper = (e) => {
         this.setState({ heightUpper: e.target.value })
       }
          // 工具
          onChangeTools = (e) => {
            this.setState({ heightUpper: e.target.value })
          }
  // 性别
  handleChangeSex= (value) => {
    console.log(`selected ${value}`)
    this.setState({
      sex: value
    })
  }
   // 人员类别
   handleChangePeopleType= (value) => {
     console.log(`selected ${value}`)
     this.setState({
       peopleType: value
     })
   }
   // 犯罪类型
   handleChangeSex= (value) => {
     console.log(`selected ${value}`)
     this.setState({
       sex: value
     })
   }

  // tabs回调函数
  searckCallBack=(key) => {
    console.log(key)
    if (key === '3') {
      this.searckClickUnarrestSuspectInfo()
    } else if (key === '2') {
      this.searckClickSuspectInfo()
    } else {
      this.searckClick()
    }
  }
  // 开始检索检索点击事件
  searckClick = (urlParmas) => {
    urlParmas = {
      name: this.state.name || '',
      idCardNum: this.state.idCardNum || '',
      phoneNum: this.state.phoneNum || '',
      province: this.state.province || '',
      city: this.state.city || '',
      county: this.state.county || '',
      ageLower: this.state.ageLower || '',
      ageUpper: this.state.ageUpper || '',
      heightLower: this.state.heightLower || '',
      heightUpper: this.state.heightUpper || '',
      tools: this.state.tools || '',
      sex: this.state.sex || 2,
      peopleType: this.state.peopleType || '',
      crimeType: this.state.crimeType || '',
      pageSize: this.state.current || 1,
      pageNum: this.state.pageSize || 10
    }
    this.searchSuspectList(urlParmas)
  }
  searchSuspectList=(urlParmas) => {
    ajax.searchSuspectList(urlParmas, response => {
      console.log(response, 'searchSuspectList')

      if (response.code === 101) {
        this.setState({
          searchSuspectList: response.data.result,
          searchSuspectListCount: response.data.count,
          searchSuspectTotal: response.data.count

        })
        console.log('searchSuspectTotal', this.state.searchSuspectTotal)
      }
    }, error => {
      console.log(error)
    })
  }

  // 查询已抓获嫌疑人详情/查询嫌疑人图片
   searckClickSuspectInfo = (urlParmas) => {
     urlParmas = {
       name: this.state.name || '',
       idCardNum: this.state.idCardNum || '',
       phoneNum: this.state.phoneNum || '',
       province: this.state.province || '',
       city: this.state.city || '',
       county: this.state.county || '',
       ageLower: this.state.ageLower || '',
       ageUpper: this.state.ageUpper || '',
       heightLower: this.state.heightLower || '',
       heightUpper: this.state.heightUpper || '',
       tools: this.state.tools || '',
       sex: this.state.sex || 2,
       peopleType: this.state.peopleType || '',
       crimeType: this.state.crimeType || '',
       pageSize: this.state.current || 1,
       pageNum: this.state.pageSize || 8
     }
     this.searchArrestSuspectInfo(urlParmas)
   }
   searchArrestSuspectInfo=(urlParmas) => {
     ajax.searchArrestSuspectInfo(urlParmas, response => {
       console.log(response, 'searchArrestSuspectInfo')

       if (response.code === 101) {
         this.setState({
           searchArrestSuspectInfo: response.data.result,
           //  searchArrestSuspectInfoCount: response.data.count,
           tatalPage: response.data.count
         })
         console.log('searchArrestSuspectInfoCount', this.state.searchArrestSuspectInfoCount)
       }
     }, error => {
       console.log(error)
     })
   }

// 查询详情
searckClickUnarrestSuspectInfo = (urlParmas) => {
  urlParmas = {
    name: this.state.name || '',
    idCardNum: this.state.idCardNum || '',
    phoneNum: this.state.phoneNum || '',
    province: this.state.province || '',
    city: this.state.city || '',
    county: this.state.county || '',
    ageLower: this.state.ageLower || '',
    ageUpper: this.state.ageUpper || '',
    heightLower: this.state.heightLower || '',
    heightUpper: this.state.heightUpper || '',
    tools: this.state.tools || '',
    sex: this.state.sex || 2,
    peopleType: this.state.peopleType || '',
    crimeType: this.state.crimeType || '',
    pageSize: this.state.current || 1,
    pageNum: this.state.pageSize || 6
  }
  this.searchUnarrestSuspectInfo(urlParmas)
  this.searchArrestSuspectInfo(urlParmas)
}
searchUnarrestSuspectInfo=(urlParmas) => {
  ajax.searchArrestSuspectInfo(urlParmas, response => {
    console.log(response, 'searchUnarrestSuspectInfo')

    if (response.code === 101) {
      this.setState({
        searchUnarrestSuspectInfo: response.data.result
        // searchArrestSuspectInfoCount: response.data.count
      })
      console.log('searchUnarrestSuspectInfo', this.state.searchUnarrestSuspectInfo)
    }
  }, error => {
    console.log(error)
  })
}
// 省市县
searchAddressById=(pid) => {
  ajax.searchAddressById(pid, response => {
    // console.log(response, 'searchAddressById')

    if (response.code === 101) {
      this.setState({
        searchAddressById: response.data
      })
      // console.log('searchAddressById444', this.state.searchAddressById)
    }
  }, error => {
    console.log(error)
  })
}
// 跳转到全局视图    name: item.name,
  // idCardNum: item.idCardNum,
  // caseId: item.name
SuspectLook=() => {
  window.open('/#/office/suspect-relation?name=' + this.state.name + '&idCardNum=' + this.state.idCardNum + '&caseId=' + this.state.caseId, '_self')
  console.log(this.state.name, 'this.state.name')
}

  handleDownTable = () => {
    ajax.exportSuspectExcel({}, response => {
      window.open('axiosUrl/exportInvestigationExcel', '_self')
    }, error => {
      console.log(error)
    })
  }

  // 下载表格 exportSuspectExcel  handleDownTable
  handleDownTable = (urlParmas) => {
    urlParmas = {
      name: this.state.name || '',
      idCardNum: this.state.idCardNum || '',
      phoneNum: this.state.phoneNum || '',
      province: this.state.province || '',
      city: this.state.city || '',
      county: this.state.county || '',
      ageLower: this.state.ageLower || '',
      ageUpper: this.state.ageUpper || '',
      heightLower: this.state.heightLower || '',
      heightUpper: this.state.heightUpper || '',
      tools: this.state.tools || '',
      sex: this.state.sex || 2,
      peopleType: this.state.peopleType || '',
      crimeType: this.state.crimeType || ''
    }
    this.exportSuspectExcel(urlParmas)
  }
  exportSuspectExcel=(urlParmas) => {
    ajax.exportSuspectExcel(urlParmas, response => {
      console.log(response, 'searchUnarrestSuspectInfo')
      let params = ''
      for (let attr in urlParmas) {
        params += `${attr}=${urlParmas[attr]}&`
      }
      window.open(`http://172.16.74.95:8080/exportSuspectExcel?${params.slice(0, -1)}`, '_self')
    }, error => {
      console.log(error)
    })
  }
  componentDidMount () {
    let Parmas = {
      name: '',
      idCardNum: '',
      phoneNum: '',
      province: '',
      city: '',
      county: '',
      ageLower: '',
      ageUpper: '',
      heightLower: '',
      heightUpper: '',
      tools: '',
      sex: this.state.sex || 2,
      peopleType: '',
      crimeType: '',
      pageSize: this.state.current || 1,
      pageNum: this.state.pageSize || 10
    }
    let pid = {
      pid: 0
    }
    this.searchAddressById(pid)
    this.searchSuspectList(Parmas)
  // this.searchArrestSuspectInfo(Parmas)
  }
  render () {
  // const provinceOptions = provinceData.map(province => <Option key={province}>{province}</Option>)
  // const cityOptions = this.state.cities.map(city => <Option key={city}>{city}</Option>)
    return (
      <div>
        {/* 案件相关人员begin */}
        <div className='supicionPoliceHeader'>
          <div className='headerText'> 案件相关人员</div>
          <div className='headerInput'>
            <Col span={3}>姓名 &nbsp;<Input placeholder='请输入' style={{width: '60%'}} onChange={this.onChangeName} /></Col>
            <Col span={3}>身份证号 &nbsp;<Input placeholder='请输入' style={{width: '60%'}} onChange={this.onChangeIdCard} /></Col>
            <Col span={3}>电话号码 &nbsp;<Input placeholder='请输入' style={{width: '60%'}} onChange={this.onChangePhoneNum} /></Col>
            <Col span={9} style={{ textAlign: 'center' }}> <span>户籍 &nbsp;</span>
              <Select defaultValue='' style={{ width: 140 }} onChange={this.handleChangeProvince}>
                {this.state.searchAddressById.map((searchAddressByIds, key) => {
                  return (
                    <Option value={searchAddressByIds.value} key={searchAddressByIds.key}>{searchAddressByIds.value}</Option>
                  )
                })}
              </Select>
              &nbsp;&nbsp;
              <Select defaultValue='' style={{ width: 140 }} onChange={this.handleChangeCity}>
                {this.state.cityDatas.map((searchAddressByIds, key) => {
                  return (
                    <Option value={searchAddressByIds.value} key={searchAddressByIds.key}>{searchAddressByIds.value}</Option>
                  )
                })}
              </Select>
              &nbsp;&nbsp;
              <Select defaultValue='' style={{ width: 140 }} onChange={this.handleChangeCounty}>
                {this.state.countyData.map((searchAddressByIds, key) => {
                  return (
                    <Option value={searchAddressByIds.value} key={searchAddressByIds.key}>{searchAddressByIds.value}</Option>
                  )
                })}
              </Select>
            </Col>
            <Col span={6}>年龄 <Input placeholder='请输入' style={{ width: '30%' }} onChange={this.onChangeAgeLower} type='number' min='1' /> <span>&nbsp;至&nbsp;</span>
              <Input placeholder='请输入' style={{width: '30%'}} onChange={this.onChangeAgeUpper} type='number' min='1' />
            </Col>

          </div>
          <div className='headerInput' style={{marginTop: '10px'}}>
            <Col span={6}>身高 <Input placeholder='请输入' style={{ width: '30%' }} onChange={this.onChangeHeightLower} type='number' min='1' />  <span>&nbsp;至&nbsp;</span>
              <Input placeholder='请输入' style={{width: '30%'}} onChange={this.onChangeHeightUpper} type='number' min='1' /> cm
            </Col>
            <Col span={3}>工具 &nbsp;<Input placeholder='请输入' style={{width: '60%'}} onChange={this.onChangeTools} /></Col>
            <Col span={3}>性别 &nbsp; <Select defaultValue='2' style={{ width: 130 }} onChange={this.handleChangeSex}>
              <Option value='2'>全部</Option>
              <Option value='1'>男</Option>
              <Option value='0'>女</Option>
            </Select></Col>
            <Col span={3}>人员类型 &nbsp;<Select defaultValue='' style={{ width: 130 }} onChange={this.handleChangePeopleType}>
              <Option value='4'>嫌疑人</Option>
              <Option value='6'>买脏人</Option>
            </Select></Col>
            <Col span={3}>犯罪类型 &nbsp; <Select defaultValue='1' style={{ width: 130 }} onChange={this.handleChange}>
              <Option value='1'>全部</Option>
              <Option value='2'>整车查获量</Option>
              <Option value='3'>查获量</Option>
              <Option value='4'>查辑案件数量</Option>
              <Option value='5'>案发总量</Option>
            </Select></Col>
          </div>
          <div className='headerButton'>
            <Button type='primary' style={{marginRight: '30px'}} onClick={this.searckClick}>开始检索</Button>
            <span> <a href='./#/office/suspicion-look'><Button type='primary' style={{marginRight: '30px'}} >查看全局</Button> </a></span>
            <Button type='primary' onClick={this.handleDownTable}>下载表格</Button>
          </div>
        </div>
        {/* 案件相关人员end */}
        {/* 列表图片详情begin */}
        <div className='supicionPoliceMain'>
          <Tabs defaultActiveKey='1' onChange={this.searckCallBack}>
            <TabPane tab='列表' key='1' style={{background: 'rgba(29, 45, 71, 1)'}}>
              <div className='tableBox'>
                <div className='tableHeader'>
                 检索出{this.state.searchSuspectTotal}项数据
                </div>
                <div>
                  {/* <CustomPagingTable
                    dataSource={this.state.searchSuspectList}
                    columns={this.state.columns}
                    pageVisible={this.state.searchSuspectList.length > 0}
                    pageNum={this.state.pageNumInvest}
                    pageSize={this.state.pageSizeInvest}
                    currentPage={this.state.currentPage}
                    onShowSizeChange={this.onShowSizeChangeInvest}
                    onChange={this.onChangeInvest}
                    total={this.state.searchSuspectListCount}
                  /> */}
                  <CustomPagingTable
                    dataSource={this.state.searchSuspectList}
                    columns={this.state.columns}
                    pageVisible
                    pageNum={this.state.pageNum}
                    pageSize={this.state.pageSize}
                    currentPage={this.state.currentPage}
                    onShowSizeChange={(current, pageSize) => this.onShowSizeChange(current, pageSize)}
                    onChange={(current, pageSize) => this.onChangePage(current, pageSize)}
                    total={this.state.searchSuspectList.length || 0}
                    tatalPage={this.state.searchSuspectTotal}
                  />
                </div>
              </div>
            </TabPane>
            <TabPane tab='图片' key='2' style={{background: 'rgba(29, 45, 71, 1)'}}>
              <div className='tableBox'>
                <div className='tableHeader'>
                  {/* 检索出{this.state.searchArrestSuspectInfoCount}项数据 */}
                </div>
                <div>
                  <List
                    grid={{ gutter: 1, xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 4 }}
                    pagination={pagination}
                    bordered={false}
                    dataSource={this.state.searchArrestSuspectInfo}
                    renderItem={item => (
                      <List.Item >
                        <Card style={{background: 'rgba(29, 45, 71, 1)', border: '0', position: 'relative', padding: '0'}}>
                          <div style={{background: 'rgba(29, 45, 71, 1)'}}>
                            <div>
                              {
                                item.imgUrl ? <img src={item.imgUrl} alt='' /> : <img src={Suspicon} alt='' />
                              }
                            </div>
                            {
                              item.logo ? <div style={{position: 'absolute',
                                background: 'red',
                                height: '40px',
                                width: '40px',
                                borderRadius: '20px',
                                color: 'white',
                                textAlign: 'center',
                                top: '25px',
                                zIndex: '3',
                                lineHeight: '40px'}}>{item.logo}</div> : ''
                            }

                            <div style={{color: '#f2f2f2', textAlign: 'center', marginTop: '5px'}}>
                              <span style={{margin: '0 5%'}}>{item.caseName}</span>
                            </div>
                          </div>

                        </Card>
                      </List.Item>
                    )}
                  />
                </div>
              </div>
            </TabPane>
            <TabPane tab='详情' key='3' onChange={this.searckClickUnarrestSuspectInfo}>
              <div className='tableBox'>
                <div className='tableHeader'>
                  {/* 检索出3项数据 */}
                </div>
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
                   案件关键词：{this.state.searchSuspectDetail.caseName}
                      </div>
                      <div className='suspectPeoBox ' >
                        <span className='suspectPeo' >{this.state.searchSuspectDetail.name}</span>
                        <span className='suspectPeo' >{this.state.searchSuspectDetail.sex === '1' ? '男' : '女'}</span>
                        <span className='suspectPeo' >{this.state.searchSuspectDetail.age}</span>
                        {/* 身高数据库暂时没有 */}
                        {/* <span className='suspectPeo' style={{marginRight: '10px'}}>{this.state.searchSuspectDetail.name}</span> */}
                        <span className='suspectPeo' >{this.state.searchSuspectDetail.accent}</span>
                        {/* 特征数据库暂时没有数据 */}
                        {/* <span className='suspectPeo' style={{marginRight: '10px'}}>{this.state.searchSuspectDetail.name}</span> */}
                        <span className='suspectPeo' >{this.state.searchSuspectDetail.idCardNum}</span>
                      </div>
                      <div className='suspectPeoBox ' >
                    籍贯：<span className='suspectPeo' >{this.state.searchSuspectDetail.address}</span>
                      </div>
                      <div className='suspectPeoBox ' >
                        {/* 作案次数：<span className='suspectPeo' style={{marginRight: '10px'}}>{this.state.searchSuspectDetail.name}</span> */}

                    打处次数：<span className='suspectPeo' >{this.state.searchSuspectDetail.judgeCount}</span>

                      出所时间：<span className='suspectPeo' >{this.state.searchSuspectDetail.arrestTime}</span>
                      </div>
                    </div>
                  </div>
                  <div className='SuspectMainMain'>
                    <Col span={6} className='SuspectCase'>
                      <div className='SuspectCaseName'>
                        <Col span={6}>案件名称</Col>
                        <Col span={6} className='suspicionRel'>
                          <Button type='primary' style={{marginLeft: '30px'}} onClick={this.SuspectLook}>关系图谱</Button>
                        </Col>
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

                {/* 案件嫌疑人详情框end */}
                <div>
                  <Col span={12} style={{borderColor: 'rgba(45, 183, 245, 1)', height: '600px', width: '50%'}}>

                    <div >
                      <div style={{textAlign: 'center', color: '#f2f2f2'}}>
                      已抓获嫌疑人
                      </div>
                      <List
                        grid={{ gutter: 1, xs: 1, sm: 2, md: 4, lg: 2, xl: 2, xxl: 2 }}
                        dataSource={this.state.searchArrestSuspectInfo}
                        pagination={pagination4}
                        renderItem={item => (
                          <List.Item >
                            <Card style={{background: 'rgba(29, 45, 71, 1)', border: '0', position: 'relative', padding: '0'}}>
                              <div style={{background: 'rgba(29, 45, 71, 1)', cursor: 'pointer'}} key={item.idCardNum} onClick={(tem) => this.newslistclick(item)}>
                                <div style={{textAlign: 'center'}}>
                                  <img src={Suspicon} alt='' style={{height: '120px'}} />
                                </div>
                                <div style={{color: '#0099ff', textAlign: 'center', marginTop: '5px'}}>
                                  <span >{item.caseName}</span>
                                </div>
                                <div style={{color: '#ffffff', textAlign: 'center', marginTop: '5px'}}>
                                  <span > 籍贯：{item.address}</span>
                                  <span style={{margin: '0 5%'}}>{item.age}</span>
                                  <span >

                                    {item.sex === '1' ? '男' : '女'}</span>
                                  <span style={{marginLeft: '5%'}}>{item.idCardNum}</span>
                                </div>
                                <div style={{color: '#ffffff', textAlign: 'center', marginTop: '5px'}}>
                                  <span >{item.name}</span>
                                  <span style={{margin: '0 5%'}}>捉获时间：{item.time}</span>
                                </div>
                              </div>
                            </Card>
                          </List.Item>
                        )}
                      />

                    </div>
                  </Col>
                  <Col span={12}>
                    <div style={{marginLeft: '20px'}}>
                      <div style={{textAlign: 'center', color: '#f2f2f2'}}>
                      未抓获嫌疑人
                      </div>
                      <List
                        grid={{ gutter: 1, xs: 1, sm: 2, md: 4, lg: 2, xl: 2, xxl: 2 }}
                        dataSource={this.state.searchUnarrestSuspectInfo}
                        pagination={pagination4}
                        renderItem={item => (
                          <List.Item >
                            <Card style={{background: 'rgba(29, 45, 71, 1)', border: '0', position: 'relative', padding: '0', cursor: 'pointer'}}>
                              <div style={{background: 'rgba(29, 45, 71, 1)'}}>
                                <div style={{textAlign: 'center'}}>
                                  <img src={Suspicon} alt='' style={{height: '120px'}} />
                                </div>
                                <div style={{color: '#0099ff', textAlign: 'center', marginTop: '5px'}}>
                                  <span >{item.caseName}</span>
                                </div>
                              </div>

                            </Card>
                          </List.Item>
                        )}
                      />
                    </div>
                  </Col>
                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>
        {/* 列表图片详情end */}
      </div>
    )
  }
}
