// 分局一案一档管理页面
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Select, Button, Tooltip, Icon, Form, Input, message } from 'antd'
import ajax from '../../api'
import axiosUrl from '../../api/axios'
import RangePicker from '../../components/common/rangePicker/RangePicker'
import CustomPagingTable from '../../components/common/table/TablePaging'
import LineChart from './line-chart/LineChart'// 布控派出所折线图
import PolistList from './police-list/PoliceList'// 布控派出所列表
import ItemTitle from './item-title/ItemTitle'
import PoliceNum from './police-num/PoliceNum' // 布控派出所饼图
import GongYou from '../../assets/images/gongyou.png'
import Video from '../../assets/images/video.png'
import Mobel from '../../assets/images/mobel.png'
import Label from '../../assets/images/label.png'
import Datas from '../../assets/images/datas.png'
import './HomePage.scss'
const FormItem = Form.Item
const Option = Select.Option

export class HomePageForm extends Component {
  constructor () {
    super()
    this.state = {
      showList: false,
      tatalPage: 0,
      keyWord: '',
      fileType: -1,
      carNumber: '',
      fileName: '',
      startTime: null, // 案发开始时间
      endTime: null, // 案发结束时间
      isSeizedElectrombile: -1, // 是否缴获电动车
      seizedElectrombileArr: [
        {
          name: '全部',
          id: -1
        },
        {
          name: '是',
          id: 1
        }, {
          name: '否',
          id: 0
        }
      ], // 缴获电动车列表
      seizedLabelArr: [
        {
          name: '全部',
          id: -1
        },
        {
          name: '是',
          id: 1
        }, {
          name: '否',
          id: 0
        }
      ], // 是否有标签列表
      isSeizedLabel: -1, // 是否缴获标签
      isVideoCapture: -1, // 视频截图
      videoCaptureArr: [
        {
          name: '全部',
          id: -1
        },
        {
          name: '是',
          id: 1
        }, {
          name: '否',
          id: 0
        }
      ], // 视频截图下拉列表
      reportPoliceStation: '', // 派出所
      reportPoliceStationArr: [
        {
          name: '金星派出所',
          id: '22222'
        }
      ], // 派出所下拉列表
      controlStartTime: null, // 布控开始时间
      controlEndTime: null, // 布控结束时间
      isJudged: -1, // 研判
      isJudgedArr: [
        {
          name: '全部',
          id: -1
        },
        {
          name: '是',
          id: 1
        }, {
          name: '否',
          id: 0
        }
      ], // 研判列表
      pageSize: 10,
      pageNum: 1,
      currentPage: 1,
      totalCaseCount: 20,
      videoCaseCount: 30,
      seizedElectrombileCaseCount: 2,
      seizedLabelCaseCount: 5,
      collectBiologyCount: 9,
      columns: [
        {
          title: '一案一档名称',
          dataIndex: 'caseName',
          key: 'caseName',
          render: (text, record, index) => {
            return (<div className='file-name' > <a title={text} href={'/#/check-look?fileId=' + record.id} target='_blank'> {text}</a></div>)
          }
        }, {
          title: '案发时间',
          dataIndex: 'occurTime',
          key: 'occurTime'
        }, {
          title: '布控时间',
          dataIndex: 'controlTime',
          key: 'controlTime'
        }, {
          title: '查获标签',
          dataIndex: 'isSeizedLabel',
          key: 'isSeizedLabel',
          render: (text, record, index) => {
            let Text = record.isSeizeLabel === 0 ? '否' : '是'
            return (<span >{Text}</span>)
          }
        }, {
          title: '查获电动车',
          dataIndex: 'isSeizeElectricbicycle',
          key: 'isSeizeElectricbicycle',
          render: (text, record, index) => {
            let Text = record.isSeizeElectricbicycle === 0 ? '否' : '是'
            return (<span >{Text}</span>)
          }
        }, {
          title: '视频截图',
          dataIndex: 'isVideoCapture',
          key: 'isVideoCapture',
          render: (text, record, index) => {
            let Text = record.isVideoCapture === 0 ? '否' : '是'
            return (<span >{Text}</span>)
          }
        }, {
          title: '开展研判',
          dataIndex: 'judgeStatus',
          key: 'judgeStatus',
          render: (text, record, index) => {
            let hasFile = record.judgeData === 1
            let Text = record.judgeStatus === 0 ? '开始研判' : '已开展'
            let color = record.judgeStatus === 0 ? '#0099FF' : '#FF9900'
            return (<div>
              <span style={{ color: '#0099FF', cursor: 'pointer' }} onClick={() => this.downloadFiles(record.id)}>下载一案一档</span>
              {hasFile ? <span style={{ color: '#0099FF', cursor: 'pointer' }} onClick={(event) => this.seeFile(event, record)}>查看材料</span> : <span onClick={(event) => this.startJudge(event, record)} style={{ marginLeft: '10px', color: color, cursor: 'pointer' }} >{Text}</span>}
            </div>)
          }
        }
      ],
      dataSource: [
        {
          id: 'f12324',
          caseName: '20180101电动车被盗案件20180101电动车被盗案件20180101电动车被盗案件',
          occurTime: '2018-01 - 01 12: 21',
          controlTime: '2018-01 - 01 14: 23',
          isSeizedLabel: 1,
          isSeizeElectricbicycle: 1,
          isVideoCapture: 1,
          judgeStatus: 0
        },
        {
          id: 'f1232a4',
          caseName: '20180101电动车被盗案件',
          occurTime: '2018-01 - 01 12: 21',
          controlTime: '2018-01 - 01 14: 23',
          isSeizedLabel: 0,
          isSeizeElectricbicycle: 0,
          isVideoCapture: 0,
          judgeStatus: 1
        }

      ],
      downloadParam: '',
      showPoliceList: false, // 显示布控派出所折线图对应的列表
      dataPie: [],
      dataLine: [],
      flag: 0// 是否有筛选条件
    }
    this.showPoliceList = this.showPoliceList.bind(this)
    this.loadClick = this.loadClick.bind(this)
  }

  // 案发时间
  occurDate = (startDate, endDate) => {
    console.log(startDate, endDate)
    let StartDate = new Date(startDate).getTime()
    let EndDate = new Date(endDate).getTime()
    console.log(StartDate, EndDate)
    this.setState({
      startTime: StartDate,
      endTime: EndDate,
      flag: 1
    })
  }
  // 布控时间
  controlDate = (startDate, endDate) => {
    let StartDate = new Date(startDate).getTime()
    let EndDate = new Date(endDate).getTime()
    console.log(StartDate, EndDate)
    this.setState({
      controlStartTime: StartDate,
      controlEndTime: EndDate,
      flag: 1
    })
  }
  // 每页个数改变时
  onShowSizeChange (current, pageSize) {
    this.setState({ pageNum: current, pageSize: pageSize }, () => {
      this.getSearchCaseFileList()
    })
  }
  // 页码改变时
  onChangePage (current, pageSize) {
    this.setState({ pageNum: current, pageSize: pageSize }, () => {
      this.getSearchCaseFileList()
    })
  }
  // 查看哪个框被选中
  onSelectChange (selectedRowKeys, selectedRows) {
    let selectedRowsIds = []
    this.selectedRowsIdObj = {}
    this.selectedRowsIdObj.fileId = ''
    selectedRows.map((el) => {
      selectedRowsIds.push(el.id)
    })
    selectedRowsIds.map((el) => {
      let Id = ',' + el
      this.selectedRowsIdObj.fileId += Id
    })
    this.setState({ downloadParam: this.selectedRowsIdObj.fileId.slice(1), flag: 0 })// 选中的框的id集合
  }

  // 表格中的下载材料
  downloadFiles (recordId) {
    console.log(recordId, 'recordId')
    console.log('选中的项的id:' + this.state.downloadParam)
    this.setState({
      flag: 2
    })
    let downloadParam
    if (this.state.flag === 0) {
      downloadParam = {
        id: this.state.downloadParam
      }
    } else if (this.state.flag === 1) {
      downloadParam = {
        fileName: this.state.fileName,
        keyWord: this.state.keyWord,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
        isSeizedElectrombile: this.state.isSeizedElectrombile,
        isSeizedLabel: this.state.isSeizedLabel,
        isVideoCapture: this.state.isVideoCapture,
        fileType: this.state.fileType,
        carNumber: this.state.carNumber,
        reportPoliceStation: this.state.reportPoliceStation,
        controlStartTime: this.state.controlStartTime,
        controlEndTime: this.state.controlEndTime,
        isJudged: this.state.isJudged,
        pageSize: this.state.pageSize,
        pageNum: this.state.pageNum
      }
    } else {
      downloadParam = {
        id: recordId
      }
    }
    let downloadStr = encodeURI(JSON.stringify(downloadParam))
    window.open(axiosUrl + '/downloadFiles?flag=' + this.state.flag + '&downloadParam=' + downloadStr, '_self')
  }

  // 开始研判
  startJudge (e, recored) {
    if (recored.judgeStatus === 0) {
      e.target.style.color = '#ff9900'
      e.target.innerHTML = '已开展'
      ajax.startJudge({id: recored.id}, response => {
        if (response.code === 106) {
          message.success(response.msg)
          recored.judgeStatus = 1
        } else {
          message.error('研判失败')
        }
      }, error => {
        console.log(error)
      })
    } else {
      message.error('已经有其他人员开始研判，请重新选择')
    }
  }
  // 查看研判材料接口
  seeFile (e, recored) {
    console.log('点击的recored为：', recored)
  }
  // 批量下载
  loadClick () {
    console.log('选中的项的id:' + this.state.downloadParam)
    if (this.state.flag === 0 && this.state.downloadParam === '') {
      message.warning('请选择列表中对应的数据或者输入搜索条件筛选完后进行下载')
    } else {
      this.downloadFiles(this.state.downloadParam)
    }
  }
  // 查询案件时间数量分布 折线图
  searchCaseTimeDistributionData (urlParams) {
    ajax.searchCaseTimeDistributionData(urlParams, response => {
      if (response.code === 101) {
        this.setState({
          dataLine: response.data
        })
      } else {

      }
    }, error => {
      console.log(error)
    })
  }
  // 布控派出所折线图点击
  showPoliceList () {
    this.setState({
      showPoliceList: !this.state.showPoliceList
    })
  }
  // 得到上报派出所列表数据
  getSearchPoliceInfoByPid () {
    ajax.getSearchPoliceInfoByPid({}, response => {
      if (response.code === 101) {
        let reportPoliceStationArr = []
        reportPoliceStationArr.push({
          name: '全部',
          id: ''
        })
        response.data.map((item) => {
          reportPoliceStationArr.push(
            {
              name: item.deptName,
              id: item.deptId
            }
          )
        })
        this.setState({
          reportPoliceStationArr,
          reportPoliceStation: reportPoliceStationArr[0].id
        })
      }
    }, error => {
      console.log(error)
    })
  }

  // 下拉列表变化
  selectCaseChange = (key, value) => {
    console.log(key, value, 'val')
    this.setState({
      [key]: value,
      flag: 1
    })
  }
  // 查询案件详细信息数据
  getSearchCaseDetailData () {
    let urlParams = {
      fileName: this.state.fileName,
      keyWord: this.state.keyWord,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      isSeizedElectrombile: this.state.isSeizedElectrombile,
      isSeizedLabel: this.state.isSeizedLabel,
      isVideoCapture: this.state.isVideoCapture,
      fileType: this.state.fileType,
      carNumber: this.state.carNumber,
      reportPoliceStation: this.state.reportPoliceStation,
      controlStartTime: this.state.controlStartTime,
      controlEndTime: this.state.controlEndTime,
      isJudged: this.state.isJudged,
      pageSize: this.state.pageSize,
      pageNum: this.state.pageNum
    }
    ajax.getSearchCaseDetailData(urlParams, response => {
      if (response.code === 101) {
        this.setState({
          totalCaseCount: response.data.totalCaseCount,
          videoCaseCount: response.data.videoCaseCount,
          seizedElectrombileCaseCount: response.data.seizedElectrombileCaseCount,
          seizedLabelCaseCount: response.data.seizedLabelCaseCount,
          collectBiologyCount: response.data.collectBiologyCount
        })
      }
    }, error => {
      console.log(error)
    })
  }

  // 得到列表数据
  getSearchCaseFileList () {
    const urlParams = {
      keyWord: this.state.keyWord,
      fileName: this.state.fileName,
      isSeizedLabel: this.state.isSeizedLabel,
      isVideoCapture: this.state.isVideoCapture,
      fileType: this.state.fileType,
      carNumber: this.state.carNumber,
      isSeizedElectrombile: this.state.isSeizedElectrombile,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      controlStartTime: this.state.controlStartTime,
      controlEndTime: this.state.controlEndTime,
      reportPoliceStation: this.state.reportPoliceStation,
      isJudged: this.state.isJudged,
      pageSize: this.state.pageSize,
      pageNum: this.state.pageNum
    }
    ajax.getSearchCaseFileList(urlParams, response => {
      console.log(response)
      if (response.code === 101) {
        this.setState({
          dataSource: response.data.resultList,
          tatalPage: response.data.total
        })
      }
    }, error => {
      console.log(error)
    })
  }
  // 查询案件的派出所数量分布 得到右下角饼图的数据
  getSearchCasePoliceDistributionData (urlParams) {
    ajax.getSearchCasePoliceDistributionData(urlParams, response => {
      if (response.code === 101) {
        this.setState({
          dataPie: response.data
        })
      } else {
        this.setState({
          dataPie: []
        })
      }
    }, error => {
      console.log(error)
    })
  }

  // 表单提交方法
  handleSearch = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      const fieldsValue = {
        ...values,
        fileName: this.state.fileName,
        isSeizedLabel: this.state.isSeizedLabel,
        isVideoCapture: this.state.isVideoCapture,
        fileType: this.state.fileType,
        carNumber: this.state.carNumber,
        isSeizedElectrombile: this.state.isSeizedElectrombile,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
        controlStartTime: this.state.controlStartTime,
        controlEndTime: this.state.controlEndTime,
        reportPoliceStation: this.state.reportPoliceStation,
        isJudged: this.state.isJudged,
        pageSize: this.state.pageSize,
        pageNum: this.state.pageNum
      }
      if (err) {
        return
      }
      this.setState({
        showList: true,
        fieldsValue
      }, () => {
        this.getSearchCasePoliceDistributionData(fieldsValue)
        this.getSearchCaseFileList()
        this.searchCaseTimeDistributionData(fieldsValue)
      })

      console.log('表单提交过来的查询条件是: ', fieldsValue, this.state)
    })
  }
  // 输入框值改变
  InpChange = (e) => {
    this.setState({ keyWord: e.target.value })
  }
  componentWillMount () {
    const fieldsValue = {
      // ...values,
      fileName: this.state.fileName,
      isSeizedLabel: this.state.isSeizedLabel,
      isVideoCapture: this.state.isVideoCapture,
      fileType: this.state.fileType,
      carNumber: this.state.carNumber,
      isSeizedElectrombile: this.state.isSeizedElectrombile,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      controlStartTime: this.state.controlStartTime,
      controlEndTime: this.state.controlEndTime,
      reportPoliceStation: this.state.reportPoliceStation,
      isJudged: this.state.isJudged,
      pageSize: this.state.pageSize,
      pageNum: this.state.pageNum
    }
    this.setState({
      showList: true,
      fieldsValue
    }, () => {
      this.getSearchCasePoliceDistributionData(fieldsValue)
      this.getSearchCaseFileList()
      this.searchCaseTimeDistributionData(fieldsValue)
    })
  }
  componentDidMount () {
    this.getSearchPoliceInfoByPid()
    this.getSearchCaseDetailData()
  }
  render () {
    const {getFieldDecorator} = this.props.form
    const rowSelection = {
      onChange: this.onSelectChange.bind(this)
    }
    return (
      <div className='personnel-file'>
        <div className='search-top'>
          <div className='search-ipt'>
            <h3>案件相关人员</h3>
            <Form onSubmit={this.handleSearch}>
              <Row>
                <Col span={4}>
                  <FormItem
                    label='关键字'
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 12 }}
                  >
                    {getFieldDecorator('keyWord', {
                      initialValue: this.state.keyWord
                    })(
                      <Input onChange={this.InpChange} placeholder='车牌/档案名称' style={{ width: '100%' }} />)
                    }
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem
                    label='案发时间'
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                  >
                    <RangePicker width='10vw' selectDate={this.occurDate} />
                  </FormItem>
                </Col>
                <Col span={4}>
                  <FormItem
                    label='是否缴获电动车'
                    labelCol={{ span: 12 }}
                    wrapperCol={{ span: 10 }}
                  >
                    {getFieldDecorator('isSeizedElectrombile', {
                      initialValue: this.state.isSeizedElectrombile
                    })(
                      <Select style={{ width: '100%' }} onChange={(value) => { this.selectCaseChange('isSeizedElectrombile', value) }}>
                        {this.state.seizedElectrombileArr.map((item, index) => {
                          return <Option key={item.id} value={item.id}>{item.name}</Option>
                        }
                        )}
                      </Select>)
                    }
                  </FormItem>
                </Col>
                <Col span={4}>
                  <FormItem
                    label='是否缴标签'
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 12 }}
                  >
                    {getFieldDecorator('isSeizedLabel', {
                      initialValue: this.state.isSeizedLabel
                    })(
                      <Select style={{ width: '100%' }} onChange={(value) => { this.selectCaseChange('isSeizedLabel', value) }}>
                        {this.state.seizedLabelArr.map((item, index) =>
                          <Option key={item.id} value={item.id}>{item.name}</Option>
                        )}
                      </Select>)
                    }
                  </FormItem>
                </Col>
                <Col span={4}>
                  <FormItem
                    label='视频截图'
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 12 }}
                  >
                    {getFieldDecorator('isVideoCapture', {
                      initialValue: this.state.isVideoCapture
                    })(
                      <Select style={{ width: '100%' }} onChange={(value) => { this.selectCaseChange('isVideoCapture', value) }}>
                        {this.state.videoCaptureArr.map((item, index) =>
                          <Option key={item.id} value={item.id}>{item.name}</Option>
                        )}
                      </Select>)
                    }
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={4}>
                  <FormItem
                    label='上报派出所'
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 12 }}
                  >
                    {getFieldDecorator('reportPoliceStation', {
                      initialValue: ''
                    })(
                      <Select style={{ width: '100%' }} onChange={(value) => { this.selectCaseChange('reportPoliceStation', value) }}>
                        {this.state.reportPoliceStationArr.map((item, index) => {
                          return <Option key={item.id} value={item.id}>{item.name}</Option>
                        }
                        )}
                      </Select>)
                    }
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem
                    label='布控时间'
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                  >
                    {(
                      <RangePicker width='10vw' selectDate={this.controlDate} />)
                    }
                  </FormItem>
                </Col>
                <Col span={4}>
                  <FormItem
                    label='是否研判'
                    labelCol={{ span: 12 }}
                    wrapperCol={{ span: 10 }}
                  >
                    {getFieldDecorator('isJudged', {
                      initialValue: this.state.isJudged
                    })(
                      <Select style={{ width: '100%' }} onChange={(value) => { this.selectCaseChange('isJudged', value) }}>
                        {this.state.isJudgedArr.map((item, index) =>
                          <Option key={item.id} value={item.id}>{item.name}</Option>
                        )}
                      </Select>)
                    }
                  </FormItem>
                </Col>
                <Col span={4} offset={4}>
                  <Col span={10} >
                    <FormItem>
                      <Button type='primary' htmlType='submit' className='btn-clear btn-com'>开始检索</Button>
                    </FormItem>
                  </Col>
                  <Col span={13} offset={1}>
                    <FormItem>
                      <Button type='primary' className='btn-submit btn-com' onClick={this.loadClick}>批量下载</Button>
                      <Tooltip placement='bottom' title='可对案件筛选后下载'>
                        <Icon type='question-circle-o' />
                      </Tooltip>
                    </FormItem>
                  </Col>
                </Col>
              </Row>
            </Form>
          </div>
          { this.state.showList ? ''
            : <div className='search-result'>
              <Row>
                <Col style={{ width: '20%', float: 'left' }}>
                  <ItemTitle src={GongYou} title='共有案件' num={this.state.totalCaseCount} />
                </Col>
                <Col style={{ width: '20%', float: 'left' }}>
                  <ItemTitle src={Video} title='有视频截图案件' num={this.state.videoCaseCount} />

                </Col>
                <Col style={{ width: '20%', float: 'left' }}>
                  <ItemTitle src={Mobel} title='查获电动车案件' num={this.state.seizedElectrombileCaseCount} />

                </Col>
                <Col style={{ width: '20%', float: 'left' }}>
                  <ItemTitle src={Label} title='查获标签案件' num={this.state.seizedLabelCaseCount} />

                </Col>
                <Col style={{ width: '20%', float: 'left' }}>
                  <ItemTitle src={Datas} title='收集生物数据' num={this.state.collectBiologyCount} />
                </Col>
              </Row>
            </div>}
        </div>
        {
          this.state.showList ? <div className='search-bottom'>
            <Row>
              <Col span={16} style={{background: '#122346', height: '80vh'}}>
                <div style={{ height: '100%', overflowY: 'auto' }}>
                  <CustomPagingTable
                    dataSource={this.state.dataSource}
                    columns={this.state.columns}
                    pageVisible
                    pageNum={this.state.pageNum}
                    pageSize={this.state.pageSize}
                    currentPage={this.state.currentPage}
                    onShowSizeChange={(current, pageSize) => this.onShowSizeChange(current, pageSize)}
                    onChange={(current, pageSize) => this.onChangePage(current, pageSize)}
                    total={this.state.dataSource.length || 0}
                    rowSelection={rowSelection}
                    tatalPage={this.state.tatalPage}
                  />
                </div>
              </Col>
              <Col span={8} style={{height: '80vh', overflowY: 'hidden'}}>
                <div style={{marginLeft: '10px', marginBottom: '10px', background: '#122346'}}>
                  <h3>时间分布</h3>
                  <div style={{height: '34vh', overflowY: 'auto'}}>
                    {this.state.showPoliceList ? <PolistList data={this.state.dataLine} /> : <LineChart height='100%' data={this.state.dataLine} /> }
                  </div>
                  <span style={{position: 'absolute', right: '10px', top: '10px', cursor: 'pointer'}} onClick={this.showPoliceList}>{this.state.showPoliceList ? '图表' : '视图'}</span>
                </div>
                <div style={{ marginLeft: '10px', background: '#122346' }}><PoliceNum data={this.state.dataPie} /></div>
              </Col>
            </Row>
          </div> : ''
        }
      </div>)
  }
}
const HomePage = Form.create()(HomePageForm)
export default HomePage
HomePageForm.propTypes = {
  form: PropTypes.object
}
