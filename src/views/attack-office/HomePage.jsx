// 查缉打击页面
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getName } from '$redux/actions'
// import TablePaging from '../../components/common/table/TablePaging'
// import {Button, Spin, Form, Input, Table, Row, Col, Select} from 'antd'
import { Row, Col, Checkbox, Input, message, Button, Modal, Upload, Icon } from 'antd'
import People from '../../assets/images/people.png'
import Gongyou from '../../assets/images/gongyou.png'
import ChajiImg from '../../assets/images/chajiImg.png'
import Weichaji from '../../assets/images/weichaji.png'
import Xiaohongdian from '../../assets/images/xiaohongdian.png'
import Xiaohuangdian from '../../assets/images/xiaohuangdian.png'
import Xiaolvdian from '../../assets/images/xiaolvdian.png'
import SearchChart from './searchChart/SearchChart'
import SearchView from './searchView/SearchView'
import SearchTable from './searchTable/SearchTable'
import CheckState from './checkState/CheckState'
import ajax from '../../api'
import './HomePage.scss'
import './SearchChart/SearchChart.scss'
const CheckboxGroup = Checkbox.Group
const plainOptions = ['整车查获量', '查获量', '查缉案件数量', '案件总量']

// 光荣榜列表
// const searchHonorLists = [
//   { 'name': '李万华',
//     'searchCount': '1354件',
//     'discoverPer': '98%'
//   },
//   { 'name': '李万华',
//     'searchCount': '1354件',
//     'discoverPer': '98%'
//   },
//   { 'name': '李万华',
//     'searchCount': '1354件',
//     'discoverPer': '98%'
//   }
// ]
// 统计案件数量
// const statisticsCaseCounts = [
//   { 'caseCount': '1258',
//     'discovered': '1258',
//     'unDiscovered': '1258'
//   }
// ]

export class HomePage extends Component {
  constructor (props) {
    super(props)
    console.log(props)
    this.state = {
      upLoad: '',
      searchHonorLists: [], // 从后台获取的光荣榜列表数据
      statisticsCaseCounts: [], // 从后台获取的统计案件数量的数据
      optionToggle: false, // 控制checked窗口的显隐
      BtnSwitch: 'chart',
      pageVisible: true,
      indeterminate: true,
      checkAll: false,
      checkedList: plainOptions,
      CheckedListSearchChart: ['整车查获量', '查获量', '查缉案件数量', '案件总量'],
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
      pageNumInvest: 1,
      pageSizeInvest: 5,
      pageSizeCompany: 5,
      dataInvest: [],
      mapconfig: {// 与div对应
        type: ['GDSL'], // 地图类型
        center: [116.4024572952, 39.9140173126], // 中心点经纬度
        zoom: 11, // 当前地图级别
        maxZoom: 20, // 地图最大缩放级别
        minZoom: 10// 地图最小缩放级别
      },
      modalVisible: false,
      confirmLoading: false, // 确定按钮的loading
      taskName: '', // 任务名称
      fileName: '', // 文件名称
      file: null
    }
    // 上传组件配置
    this.uploadProps = {
      action: '',
      accept: '.xls,.xlsx',
      onRemove: (file) => {
        this.setState({
          file: null,
          fileName: ''
        })
      },
      beforeUpload: (file) => {
        this.setState({
          file,
          fileName: file.name
        })
        return false
      }
    }
    this.onShowSizeChangeInvest = this.onShowSizeChangeInvest.bind(this)
    this.onChangeInvest = this.onChangeInvest.bind(this)
    // this.handleChange = this.handleChange.bind(this)
    this.handleOptionShow = this.handleOptionShow.bind(this)
    this.handleViewPageShow = this.handleViewPageShow.bind(this)
    this.handleTablePageShow = this.handleTablePageShow.bind(this)
    this.handleCheckedList = this.handleCheckedList.bind(this)
    this.handleDownView = this.handleDownView.bind(this)
    this.handleDownTable = this.handleDownTable.bind(this)
  }

  // 设置modal可见状态
  setModalVisible = (visible) => {
    this.setState({
      modalVisible: visible
    })
  }
  // 打开modal
  openModal = () => {
    this.setModalVisible(true)
  }

  // 确定
  modalOk = () => {
    if (this.state.confirmLoading === false) {
      if (this.state.taskName.trim() !== '') {
        if (this.state.file != null) {
          let formData = new FormData()
          formData.append('file', this.state.file)
          formData.append('taskName', this.state.taskName)
          formData.append('creator', this.props.data.getname.userName)

          this.setState({
            confirmLoading: true
          })
          // 文件上传
          ajax.upload(formData, res => {
            if (res.data.success === true) {
              // 关闭modal框 清空表单数据
              this.setState({
                modalVisible: false,
                confirmLoading: false,
                file: null,
                fileName: '',
                taskName: ''
              })
              message.success('上传成功')
            } else {
              message.warning('上传失败,请稍后再试')
            }
          }, error => {
            console.log(error)
            message.warning('上传失败,请稍后再试')
            this.setState({
              confirmLoading: false
            })
          })
        } else {
          message.warning('请选择要上传的文件')
        }
      } else {
        message.warning('请填写任务名称')
      }
    } else {
      message.warning('文件正在上传，请稍后···')
    }
  }

  // 取消
  modalCancel = () => {
    if (this.state.confirmLoading === false) {
      this.setState({
        file: null,
        fileName: '',
        taskName: ''
      })
      this.setModalVisible(false)
    } else {
      message.warning('文件正在上传，请稍后···')
    }
  }

  // 下载视图
  handleDownView = () => {
    ajax.exportInvestigationExcel({}, response => {
      window.open('http://172.16.74.95:8080/exportInvestigationExcel', '_self')
    }, error => {
      console.log(error)
    })
  }
  // 下载表格
  handleDownTable = () => {
    ajax.exportInvestigationExcel({}, response => {
      window.open('http://172.16.74.95:8080/exportInvestigationExcel', '_self')
    }, error => {
      console.log(error)
    })
  }
  handleCheckedList () {
    this.setState({
      CheckedListSearchChart: this.state.checkedList,
      optionToggle: false
    })
  }
  componentDidMount () {
    // 光荣榜接口
    ajax.searchHonorList({}, response => {
      if (response.code === 101) {
        this.setState({
          searchHonorLists: response.data
        })
        console.log(this.state.searchHonorLists)
      }
    }, error => {
      console.log(error)
    })
    // 案件数量
    ajax.searchCaseCount({}, response => {
      if (response.code === 101) {
        this.setState({
          statisticsCaseCounts: response.data
        })
        console.log(this.state.statisticsCaseCounts)
      }
    }, error => {
      console.log(error)
    })
  }
  // 控制多选框的显隐
  handleOptionShow () {
    this.setState({
      optionToggle: !this.state.optionToggle
    })
  }
  // 多选框的组件
  onChange = (checkedList) => {
    console.log('checked = ', checkedList)
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
      checkAll: checkedList.length === plainOptions.length
    })
  }
  onCheckAllChange = (e) => {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked
    })
  }
  // 按钮控制查看视图页面切换
  handleViewPageShow () {
    this.setState({
      BtnSwitch: 'view'
    })
  }
  // 按钮控制查看表格页面切换
  handleTablePageShow () {
    this.setState({
      BtnSwitch: 'table'
    })
  }
  // 每页个数改变时
  onShowSizeChangeInvest (current, pageSize) {
    this.setState({ pageNumInvest: current, pageSizeInvest: pageSize })
  }
  // 页码改变时
  onChangeInvest (current, pageSize) {
    this.setState({ pageNumInvest: current, pageSizeInvest: pageSize })
  }
  // 任务名称修改
  taskNameEdit = (evt) => {
    let taskName = evt.target.value
    this.setState({
      taskName
    })
  }
  render () {
    return (
      <div>
        <Row className='dajiMain'>
          {/* 左边光荣榜框 begin */}
          <Col span={5} className='MainLeft'>
            <div className='MainLeftUp'>
              <CheckState />
            </div>
            <div className='MainLeftUnder'>
              <div className='MainLeftHeader'><b>2018光荣榜</b>
                <span className='MainLeftText'>（本年1月1日起被包含的成功查车案件数）</span>
              </div>
              <div>
                {this.state.searchHonorLists.map((searchHonorList, index) => {
                  return (
                    <div key={index}>
                      <div className='MainLeftConter'>
                        <div className='LeftConterImg'><img src={People} style={{ height: '120px', marginTop: '10px' }} /></div>
                        <div className='LeftConterMain-office'>
                          <div className='ConterMainText'>
                            <Col span={14} className='MainTextLeft'>姓名：</Col>
                            <Col span={10} className='MainTextRight'>{searchHonorList.name}</Col>
                          </div>
                          <div className='ConterMainText'>
                            <Col span={14} className='MainTextLeft'>所属派出所：</Col>
                            <Col span={10} className='MainTextRight'>{searchHonorList.policeStation}</Col>
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
            </div>
          </Col>
          {/* end */}
          {/* 右边内容框 begin */}
          <Col span={19}>
            <div className='MainRight'>
              {/* 右边头部  案件详情begin */}
              <div className='MainRightHeader'>
                <div className='RightHeaderAn'>案件详情</div>
                {this.state.statisticsCaseCounts.map((statisticsCaseCount, index) => {
                  return (
                    <div key={index}>
                      <div className='RightHeaderMain'>
                        <Col span={6}>
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
                        <Col span={6}>
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
                        <Col span={6}>
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
                      <div className='RightHeaderMain-upload displayNone'>
                        <Col span={6}>
                          <Button className='create-task-btn MiddleViewBtn' onClick={this.openModal}>新建上传任务</Button>
                        </Col>
                      </div>
                    </div>
                  )
                })}
              </div>
              {/* end */}
              {/* 各分局派出所查缉情况 begin */}
              <div className='MainRightMiddle'>
                <div className='MiddleHeader'>
                  {/* 检索框begin */}
                  <div className='MainRightMain'>
                    <div className='serachBox-office'>
                      <div className='MiddleHeaderConter-office'>各分局派出所查缉情况</div>
                      <div className='MiddleHeaderConterL clearfix'>
                        <Col span={6}>
                          <Col span={8} ><img src={Xiaolvdian} />&nbsp;<span>所内挂牌</span></Col>
                          <Col span={8} ><img src={Xiaohuangdian} />&nbsp;<span>分局挂牌</span></Col>
                          <Col span={8} ><img src={Xiaohongdian} />&nbsp;<span>市局挂牌</span></Col>
                        </Col>
                        <Col span={18}>
                          <Col span={12} >
                            <div className='MiddleInput'>
                              <Input type='text' defaultValue='全部' onClick={this.handleOptionShow} style={{ width: 120 }} className='MiddleSelectInput' />
                              {this.state.optionToggle ? <div className='selectBox'>
                                <div className='MiddleSelectBox clearfix'>
                                  <CheckboxGroup options={plainOptions} onChange={this.onChange} value={this.state.checkedList} />
                                  <br />
                                  <div className='MiddleSearchCheck' style={{ borderBottom: '1px solid #E9E9E9' }}>
                                    <Checkbox indeterminate={this.state.indeterminate} onChange={this.onCheckAllChange} checked={this.state.checkAll}>全部</Checkbox>
                                  </div>
                                </div>
                                <div>
                                  <div className='MiddleSureBtn' onClick={this.handleCheckedList}>确定</div>
                                </div>
                              </div> : null}
                            </div>
                            <div className='MiddleText'>查询条件&nbsp;&nbsp;&nbsp;</div>
                          </Col>
                          <Col span={3} ><div className='MiddleViewBtn' onClick={this.handleViewPageShow}>查看视图</div></Col>
                          <Col span={3} ><div className='MiddleViewBtn' onClick={this.handleDownView}>下载视图</div></Col>
                          <Col span={3} ><div className='MiddleViewBtn' onClick={this.handleTablePageShow}>查看表格</div></Col>
                          <Col span={3} ><div className='MiddleViewBtn' onClick={this.handleDownTable}>下载表格</div></Col>
                        </Col>
                      </div>
                    </div>
                  </div>
                  {/* end */}
                  <div className='Middle-office clearfix'>
                    {this.state.BtnSwitch === 'chart' ? <SearchChart checkedList={this.state.CheckedListSearchChart} /> : null || this.state.BtnSwitch === 'view' ? <SearchView /> : null || this.state.BtnSwitch === 'table' ? <SearchTable /> : null }
                  </div>
                </div>
              </div>
              {/* end */}
            </div>
          </Col>
        </Row>
        <Modal
          title='新建上传任务'
          className='task-modal'
          visible={this.state.modalVisible}
          onOk={() => this.modalOk()} // 上传
          onCancel={() => this.modalCancel()} // 取消取消上传
          confirmLoading={this.state.confirmLoading} // 确定文件是否在上传中
          maskClosable={false} // 点击蒙层是否允许关闭
          okText='上传'
          style={{margin: '0 auto'}}
        >
          <div>
            <div className='label'>任务名称：</div>
            <div className='task-input'>
              <Input className='input large ellipsis' placeholder='请输入任务名称' value={this.state.taskName} onChange={this.taskNameEdit} disabled={this.state.confirmLoading} />
            </div>
          </div>
          <div>
            <div className='label'>上传文件：</div>
            <div className='upload-input-con'>
              <Input className='input large ellipsis' title={this.state.fileName} readOnly placeholder='请上传文件（支持xls/xlsx格式）' value={this.state.fileName} />
              {(this.state.file != null)
                ? <button className='upload-btn close' onClick={this.uploadProps.onRemove} disabled={this.state.confirmLoading}><Icon type='plus' /></button>
                : <Upload {...this.uploadProps}><button className='upload-btn' title='上传文件'><Icon type='plus' /></button></Upload>}
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
HomePage.propTypes = {
  data: PropTypes.object
}

const mapStateToProps = state => ({
  data: state
})

const mapDispatchToProps = dispatch => ({
  getName: bindActionCreators(getName, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)
