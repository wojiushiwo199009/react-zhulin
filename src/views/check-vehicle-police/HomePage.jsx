// 查看车辆资料页面
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Tabs, Col, Modal } from 'antd'
import ajax from '../../api'
import VehicleTrajectoryMap from './vehicleTrajectoryMap/VehicleTrajectoryMap'
import DisappearanceEscape from './disappearanceEscape/DisappearanceEscape'

import './HomePage.scss'
const TabPane = Tabs.TabPane

function callback (key) {
  console.log(key)
}
export default class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      plateCode: this.props.plateCode,
      ownerInfo: {
        plateCode: '',
        engineCode: '',
        frameCode: '',
        mainLabel: '',
        assistantLabel: '',
        brand: '',
        mainColor: '',
        assistantColor: '',
        type: '',
        purchaseTime: null,
        price: '',
        breed: '',
        bodyPhoto: '',
        idPhoto: '',
        invoicePhoto: '',
        backPhoto: '',
        ownerName: '',
        idType: '',
        idcard: '',
        phoneNumber: '',
        sparePhone: '',
        isPurchase: 0,
        purchaseLife: '',
        purchasePrice: '',
        purchaseInfo: '',
        inputUsername: '',
        inputTime: null,
        updateUsername: '',
        remark: null,
        source: '',
        operatorIp: '',
        isLabel: 0,
        isInvalid: 0,
        isLock: 0,
        purchaseBikeTime: null,
        police: '',
        updateUsertime: null,
        updateTime: null
      },
      previewVisible: false,
      previewImage: ''
    }
    this.handleCancel = this.handleCancel.bind(this)
  }
  showBigImg (img) {
    console.log(img)
    this.setState({
      previewVisible: true,
      previewImage: img
    })
  }
  handleCancel () {
    this.setState({
      previewVisible: false
    })
  }
  // 得到数据
  searchOwnerInfo () {
    ajax.searchOwnerInfo({ plateCode: this.state.plateCode }, response => {
      if (response.code === 101 && response.data !== null) {
        this.setState({
          ownerInfo: response.data
        })
      }
    }, error => {
      console.log(error)
    })
  }

  componentDidMount () {
    this.searchOwnerInfo()
  }
  render () {
    return (<div>
      <Tabs defaultActiveKey='1' onChange={callback}>
        {/* 车主信息begin */}
        <TabPane tab='车主信息' key='1'>
          <div className='ownerInformationBox'>
            <div className='ownerInformationHeader'>
              <Col span={6}>
                <Col span={8} className='ownerInformationText'>
                  <div>   前侧车身照：</div>
                </Col>
                <Col span={16} className='ownerInformationImg'>
                  <div ><img src={this.state.ownerInfo.bodyPhoto} alt='' /></div>
                  <div onClick={() => this.showBigImg(this.state.ownerInfo.bodyPhoto)} style={{cursor: 'pointer', marginTop: '10px'}}> 查看大图 </div>
                </Col>
              </Col>
              <Col span={6}>
                <Col span={8} className='ownerInformationText'>
                  <div>   持车证和证件：</div>
                </Col>
                <Col span={16} className='ownerInformationImg'>
                  <div ><img src={this.state.ownerInfo.idPhoto} alt='' /></div>
                  <div onClick={() => this.showBigImg(this.state.ownerInfo.idPhoto)} style={{cursor: 'pointer', marginTop: '10px'}}> 查看大图 </div>
                </Col>
              </Col>
              <Col span={6}>
                <Col span={8} className='ownerInformationText'>
                  <div>   销售发票照片：</div>
                </Col>
                <Col span={16} className='ownerInformationImg'>
                  <div ><img src={this.state.ownerInfo.invoicePhoto} alt='' /></div>
                  <div onClick={() => this.showBigImg(this.state.ownerInfo.invoicePhoto)} style={{cursor: 'pointer', marginTop: '10px'}}> 查看大图 </div>
                </Col>
              </Col>
              <Col span={6}>
                <Col span={8} className='ownerInformationText'>
                  <div>   后侧车身照：</div>
                </Col>
                <Col span={16} className='ownerInformationImg'>
                  <div ><img src={this.state.ownerInfo.backPhoto} alt='' /></div>
                  <div onClick={() => this.showBigImg(this.state.ownerInfo.backPhoto)} style={{cursor: 'pointer', marginTop: '10px'}}> 查看大图 </div>
                </Col>
              </Col>
            </div>
            <div className='ownerInformationMain'>

              <div className='ownerInformationInfo'>
                <Col span={12} className='informationInfoLeft'> 车牌号：</Col>
                <Col span={12} className='informationInfoRight'>{this.state.ownerInfo.plateCode}</Col>
              </div>
              <div className='ownerInformationInfo'>
                <Col span={12} className='informationInfoLeft'> 发动机编号:</Col>
                <Col span={12} className='informationInfoRight'>{this.state.ownerInfo.engineCode}</Col>
              </div>
              <div className='ownerInformationInfo'>
                <Col span={12} className='informationInfoLeft'> 车架号：</Col>
                <Col span={12} className='informationInfoRight'>{this.state.ownerInfo.frameCode}</Col>
              </div>
              <div className='ownerInformationInfo'>
                <Col span={12} className='informationInfoLeft'> 车辆标签（主）：</Col>
                <Col span={12} className='informationInfoRight'>{this.state.ownerInfo.mainLabel}</Col>
              </div>
              <div className='ownerInformationInfo'>
                <Col span={12} className='informationInfoLeft'> 车辆标签（副）：</Col>
                <Col span={12} className='informationInfoRight'>{this.state.ownerInfo.assistantLabel}</Col>
              </div>
            </div>
            <div className='ownerInformationMain'>

              <div className='ownerInformationInfo'>
                <Col span={12} className='informationInfoLeft'> 车辆品牌：</Col>
                <Col span={12} className='informationInfoRight'>{this.state.ownerInfo.brand}</Col>
              </div>
              <div className='ownerInformationInfo'>
                <Col span={12} className='informationInfoLeft'> 车辆主颜色:</Col>
                <Col span={12} className='informationInfoRight'>{this.state.ownerInfo.mainColor}</Col>
              </div>
              <div className='ownerInformationInfo'>
                <Col span={12} className='informationInfoLeft'> 车辆配色：</Col>
                <Col span={12} className='informationInfoRight'>{this.state.ownerInfo.assistantColor}</Col>
              </div>
              <div className='ownerInformationInfo'>
                <Col span={12} className='informationInfoLeft'> 购买时间：</Col>
                <Col span={12} className='informationInfoRight'>{this.state.ownerInfo.purchaseBikeTime === null ? '无' : moment(this.state.ownerInfo.purchaseBikeTime).format('YYYY-MM-DD HH:MM')}</Col>
              </div>
              <div className='ownerInformationInfo'>
                <Col span={12} className='informationInfoLeft'> 车辆种类：</Col>
                <Col span={12} className='informationInfoRight'>{this.state.ownerInfo.breed}</Col>
              </div>
            </div>
            <div className='ownerInformationMain'>

              <div className='ownerInformationInfo'>
                <Col span={12} className='informationInfoLeft'> 车辆类型：</Col>
                <Col span={12} className='informationInfoRight'>{this.state.ownerInfo.type}</Col>
              </div>
              <div className='ownerInformationInfo'>
                <Col span={12} className='informationInfoLeft'> 购入价：</Col>
                <Col span={12} className='informationInfoRight'>{this.state.ownerInfo.price}</Col>
              </div>
              <div className='ownerInformationInfo'>
                <Col span={12} className='informationInfoLeft'> 车辆所有者：</Col>
                <Col span={12} className='informationInfoRight'>{this.state.ownerInfo.ownerName}</Col>
              </div>
              <div className='ownerInformationInfo'>
                <Col span={12} className='informationInfoLeft'> 证件类型：</Col>
                <Col span={12} className='informationInfoRight'>{this.state.ownerInfo.idType}</Col>
              </div>
              <div className='ownerInformationInfo'>
                <Col span={12} className='informationInfoLeft'> 备用电话：</Col>
                <Col span={12} className='informationInfoRight'>{this.state.ownerInfo.sparePhone}</Col>
              </div>
            </div>
            <div className='ownerInformationMain'>

              <div className='ownerInformationInfo'>
                <Col span={12} className='informationInfoLeft'> 联系手机：</Col>
                <Col span={12} className='informationInfoRight'>{this.state.ownerInfo.phoneNumber}</Col>
              </div>
              <div className='ownerInformationInfo'>
                <Col span={12} className='informationInfoLeft'> 证件号：</Col>
                <Col span={12} className='informationInfoRight'>{this.state.ownerInfo.idcard}</Col>
              </div>
              <div className='ownerInformationInfo'>
                <Col span={12} className='informationInfoLeft'> 是否购买备案装置：</Col>
                <Col span={12} className='informationInfoRight'>{this.state.ownerInfo.isPurchase === 1 ? '是' : '否'}</Col>
              </div>
              <div className='ownerInformationInfo'>
                <Col span={12} className='informationInfoLeft'> 保险价格：</Col>
                <Col span={12} className='informationInfoRight'>{this.state.ownerInfo.purchasePrice}</Col>
              </div>
              <div className='ownerInformationInfo'>
                <Col span={12} className='informationInfoLeft'> 购买日期：</Col>
                <Col span={12} className='informationInfoRight'>{this.state.ownerInfo.purchaseTime === null ? '无' : moment(this.state.ownerInfo.purchaseTime).format('YYYY-MM-DD HH:MM')}</Col>
              </div>
            </div>
            <div className='ownerInformationMain'>

              <div className='ownerInformationInfo'>
                <Col span={12} className='informationInfoLeft'> 详细：</Col>
                <Col span={12} className='informationInfoRight'>{this.state.ownerInfo.purchaseInfo}</Col>
              </div>
              <div className='ownerInformationInfo'>
                <Col span={12} className='informationInfoLeft'> 录入人:</Col>
                <Col span={12} className='informationInfoRight'>{this.state.ownerInfo.inputUsername}</Col>
              </div>
              <div className='ownerInformationInfo'>
                <Col span={12} className='informationInfoLeft'> 录入时间：</Col>
                <Col span={12} className='informationInfoRight'>{this.state.ownerInfo.inputTime === null ? '无' : moment(this.state.ownerInfo.inputTime).format('YYYY-MM-DD HH:MM') }</Col>
              </div>
              <div className='ownerInformationInfo'>
                <Col span={12} className='informationInfoLeft'> 所属单位：</Col>
                <Col span={12} className='informationInfoRight'>{this.state.ownerInfo.police}</Col>
              </div>
              <div className='ownerInformationInfo'>
                <Col span={12} className='informationInfoLeft'> 修改人：</Col>
                <Col span={12} className='informationInfoRight'>{this.state.ownerInfo.updateUsername}</Col>
              </div>
            </div>
            <div className='ownerInformationMain'>

              <div className='ownerInformationInfo'>
                <Col span={12} className='informationInfoLeft'> 修改时间：</Col>
                <Col span={12} className='informationInfoRight'>{this.state.ownerInfo.updateUsertime === null ? '无' : moment(this.state.ownerInfo.updateUsertime).format('YYYY-MM-DD HH:MM')}</Col>
              </div>
              <div className='ownerInformationInfo'>
                <Col span={12} className='informationInfoLeft'> 备注:</Col>
                <Col span={12} className='informationInfoRight'>{this.state.ownerInfo.remark === null ? '无' : this.state.ownerInfo.remark}</Col>
              </div>
              <div className='ownerInformationInfo'>
                <Col span={12} className='informationInfoLeft'> 来源 ：</Col>
                <Col span={12} className='informationInfoRight'>{this.state.ownerInfo.source}</Col>
              </div>
              <div className='ownerInformationInfo'>
                <Col span={12} className='informationInfoLeft'> 操作者I P：</Col>
                <Col span={12} className='informationInfoRight'>{this.state.ownerInfo.operatorIp}</Col>
              </div>
              <div className='ownerInformationInfo'>
                <Col span={12} className='informationInfoLeft'> 是否失效 ：</Col>
                <Col span={12} className='informationInfoRight'>{this.state.ownerInfo.isInvalid === 1 ? '是' : '否'}</Col>
              </div>
            </div>
            <div className='ownerInformationMain'>

              <div className='ownerInformationInfo'>
                <Col span={12} className='informationInfoLeft'> 是否已锁定 ：</Col>
                <Col span={12} className='informationInfoRight'>{this.state.ownerInfo.isLock === 1 ? '是' : '否'}</Col>
              </div>
              <div className='ownerInformationInfo'>
                <Col span={12} className='informationInfoLeft'> 是否安装防盗装置 :</Col>
                <Col span={12} className='informationInfoRight'>{this.state.ownerInfo.isLabel === 1 ? '是' : '否'}</Col>
              </div>
              <div className='ownerInformationInfo' />
              <div className='ownerInformationInfo' />
              <div className='ownerInformationInfo' />
            </div>
          </div>
        </TabPane>
        {/* 车主信息end */}
        {/* 车主轨迹begin */}
        <TabPane tab='车主轨迹' key='2'>
          <div className='vehicleTrajectoryMap'> <VehicleTrajectoryMap plateCode={this.state.plateCode} /></div>
        </TabPane>
        {/* 车主轨迹end */}
        <TabPane tab='失踪点及逃窜现场' key='3'>
          <DisappearanceEscape plateCode={this.state.plateCode} />
        </TabPane>
      </Tabs>
      <Modal style={{ left: '25%', textAlign: 'center' }} visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
        <img alt='大图' style={{height: ' 100%', width: '450px'}} src={this.state.previewImage} />
      </Modal>
    </div>

    )
  }
}
HomePage.propTypes = {
  plateCode: PropTypes.string
}
