import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import ajax from '../../api'
import { Form, Input, Button, Row, Col, message, DatePicker, Radio, InputNumber, Tooltip, Icon } from 'antd'
// 商户修改订单的时候，根据订单字段orderStatus的状态判断修改哪些字段。当orderStatus为0或8时，可以修改所有的字段，当orderStatus为1或2时只能修改文章数量total
const FormItem = Form.Item
const RadioGroup = Radio.Group
export class AddOrderForm extends Component {
  constructor (props) {
    super(props)
    console.log(this.props, 'props')
    this.state = {
      modalObj: this.props.modalObj,
      modalTitle: this.props.modalTitle,
      isEdit: this.props.isEdit
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err && !this.state.isEdit) {
        // let endTime = moment(values.endTime).format('YYYY-MM-DD')
        let params = {...values, endTime: values.endTime ? moment(values.endTime).format('YYYY-MM-DD HH:mm:ss') : moment.unix(parseInt(this.state.verifyObj.endTime.toString().slice(0, 10))).format('YYYY-MM-DD HH:mm:ss')}
        // console.log(params)
        // let formData = new FormData()
        // for (let i in values) {
        //   formData.append(i, values[i])
        // }
        // console.log(formData, 'formdata')
        ajax.publicOrder(params, response => {
          if (response.state.stateCode === 0) {
            message.success(response.state.stateMessage || '添加成功')
            this.props.onCancel()
            this.props.getOrder()
          } else {
            message.error(response.state.stateMessage || '添加失败，请重新填写')
            this.props.getOrder()
          }
        }, error => {
          console.log(error)
          message.error('添加失败，请重新填写')
          this.props.getOrder()
        })
      } else if (!err && this.state.isEdit) {
        let params = { ...values, endTime: values.endTime ? moment(values.endTime).format('YYYY-MM-DD HH:mm:ss') : moment.unix(parseInt(this.state.verifyObj.endTime.toString().slice(0, 10))).format('YYYY-MM-DD HH:mm:ss'), id: this.state.modalObj.id }

        ajax.updateOrder(params, response => {
          if (response.state.stateCode === 0) {
            message.success(response.state.stateMessage || '修改成功')
            this.props.onCancel()
            this.props.getOrder()
          } else {
            message.error(response.state.stateMessage || '编辑失败，请重新填写')
            this.props.getOrder()
          }
        }, error => {
          console.log(error)
          message.error('编辑失败，请重新填写')
          this.props.getOrder()
        })
      }
    })
  }
  handleCancel = () => {
    this.props.onCancel()
  }
  validateMobilephone = (rule, value, callback) => {
    console.log(rule, value)
    if (value) {
      let myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (value && myreg.test(value)) {
        callback()
      } else {
        let validatemobile = '请输入正确的手机号!'
        callback(validatemobile)
      }
    } else {
      callback()
    }
  }
  handleNumberChange = (rule, value, callback) => {
    console.log(rule, value)
    if (value) {
      let myreg = /(^[1-9]\d*(\.\d{1,2})?$)|(^ 0(\.\d{1,2}) ? $)/
      if (value && myreg.test(value)) {
        callback()
      } else {
        let validatemobile = '请输入正确的价钱!'
        callback(validatemobile)
      }
    } else {
      callback()
    }
  }
  validateOriginalLevel = (rule, value, callback) => {
    console.log(rule, value)
    if (value) {
      let myreg = /(^[0-9]+$)/
      if (value && myreg.test(value)) {
        callback()
      } else {
        let validateOriginLevel = '请输入正确的原创度!'
        callback(validateOriginLevel)
      }
    } else {
      callback()
    }
  }
  onChange=(date, dateString) => {
    this.setState({
      endTime: dateString
    })
  }
  componentWillReceiveProps (nextprops) {
    if (this.props.modalObj) {
      this.setState({
        modalObj: nextprops.modalObj,
        isEdit: nextprops.isEdit,
        modalTitle: nextprops.modalTitle
      })
    }
  }
  render () {
    console.log(this.props, this.state.modalObj, moment.unix(parseInt(this.state.modalObj.endTime.toString().slice(0, 10))).format('YYYY-MM-DD HH:mm:ss'))
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 }
      }
    }
    const { getFieldDecorator } = this.props.form
    const text = '原创度最高为100，最低为0'
    return (
      <Form onSubmit={this.handleSubmit} >
        <FormItem {...formItemLayout} label='文章数量'>
          {getFieldDecorator('total', {
            initialValue: this.state.modalObj.total,
            rules: [{required: true, message: '请输入文章数量'}]
          })(
            <InputNumber min={1} style={{width: '180px'}} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='定价'>
          {getFieldDecorator('merchantPrice', {
            initialValue: this.state.modalObj.merchantPrice,
            rules: [{ required: true, message: '请输入定价!' },
              {
                validator: this.handleNumberChange
              }
            ]
          })(
            <InputNumber style={{width: '180px'}} placeholder='请输入定价' disabled={this.state.modalTitle === '发布订单' ? this.state.isEdit : true} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='文章领域'>
          {getFieldDecorator('eassyType', {
            initialValue: this.state.modalObj.eassyType,
            rules: [{
              required: true, message: '请输入文章领域!'
            }]
          })(
            <Input placeholder='请输入文章领域' disabled={this.state.modalTitle === '发布订单' ? this.state.isEdit : true} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='备注'>
          {getFieldDecorator('notes', {
            initialValue: this.state.modalObj.notes,
            rules: []
          })(
            <Input placeholder='请输入备注' disabled={this.state.modalTitle === '发布订单' ? this.state.isEdit : true} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='订单标题'>
          {getFieldDecorator('orderTitle', {
            initialValue: this.state.modalObj.orderTitle,
            rules: [{
              required: true, message: '请输入订单标题!'
            }]
          })(
            <Input placeholder='请输入订单标题' disabled={this.state.modalTitle === '发布订单' ? this.state.isEdit : true} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='原创度要求'>
          {getFieldDecorator('originalLevel', {
            initialValue: this.state.modalObj.originalLevel,
            rules: [{
              required: true, message: '请输入原创度要求!'
            }, {
              validator: this.validateOriginalLevel
            }]
          })(
            <Input placeholder='请输入原创度要求' disabled={this.state.modalTitle === '发布订单' ? this.state.isEdit : true} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='图片数量要求'>
          {getFieldDecorator('picture', {
            initialValue: this.state.modalObj.picture,
            rules: [{
              required: true, message: '请输入图片数量要求!'
            }]
          })(
            <InputNumber min={0} disabled={this.state.modalTitle === '发布订单' ? this.state.isEdit : true} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='类型'>
          {getFieldDecorator('type', {
            initialValue: this.state.modalObj.type,
            rules: [{
              required: true, message: '请选择类型!'
            }]
          })(
            <RadioGroup>
              <Radio value={0} disabled={this.state.modalTitle === '发布订单' ? this.state.isEdit : true}>流量文</Radio>
              <Radio value={1} disabled={this.state.modalTitle === '发布订单' ? this.state.isEdit : true} >养号文</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='截止交稿时间'>
          {getFieldDecorator('endTime', {
            initialValue: this.state.modalObj.endTime ? moment(moment.unix(parseInt(this.state.modalObj.endTime.toString().slice(0, 10))).format('YYYY-MM-DD HH:mm:ss'), 'YYYY-MM-DD HH:mm:ss') : moment('2018-01-01 00:00:00', 'YYYY-MM-DD HH:mm:ss'),
            rules: [{
              required: true, message: '请选择截止交稿时间!'
            }]
          })(
            <DatePicker onChange={this.onChange} disabled={this.state.modalTitle === '发布订单' ? this.state.isEdit : true} format='YYYY-MM-DD HH:mm:ss' showTime />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='要求'>
          {getFieldDecorator('require', {
            initialValue: this.state.modalObj.require,
            rules: [{
              required: true, message: '请输入要求!'
            }]
          })(
            <Input placeholder='请输入要求' disabled={this.state.modalTitle === '发布订单' ? this.state.isEdit : true} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='字数要求'>
          {getFieldDecorator('wordCount', { initialValue: this.state.modalObj.wordCount,
            rules: [{
              required: true, message: '请输入字数要求!'
            }]
          })(
            <InputNumber min={1} disabled={this.state.modalTitle === '发布订单' ? this.state.isEdit : true} />
          )}
        </FormItem>
        <FormItem>
          <Row>
            <Col span={6} offset={6}>
              <Button onClick={this.handleCancel}>取消
              </Button>
            </Col>
            <Col span={6} offset={2}>
              <Button type='primary' htmlType='submit' className='login-form-button'>确定</Button>
            </Col>
          </Row>
        </FormItem>
      </Form>
    )
  }
}
const AddOrder = Form.create()(AddOrderForm)
AddOrderForm.propTypes = {
  form: PropTypes.object,
  onCancel: PropTypes.func
}
export default AddOrder
