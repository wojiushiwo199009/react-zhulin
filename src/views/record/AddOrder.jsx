import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import ajax from '../../api'
import { Form, Input, Button, Row, Col, message, DatePicker, Radio, InputNumber } from 'antd'
// 商户修改订单的时候，根据订单字段order_status的状态判断修改哪些字段。当order_status为0或8时，可以修改所有的字段，当order_status为1或2时只能修改文章数量total
const FormItem = Form.Item
const RadioGroup = Radio.Group
export class AddOrderForm extends Component {
  constructor (props) {
    super(props)
    console.log(this.props, 'props')
    this.state = {
      modalObj: this.props.modalObj,
      isEdit: this.props.isEdit
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err && !this.state.isEdit) {
        // let endTime = moment(values.endTime).format('YYYY-MM-DD')
        let params = {...values, endTime: this.state.endTime}
        ajax.publicOrder(params, response => {
          if (response.code === 106) {
            message.success(response.msg)
            this.props.getOrder()
          } else {
            message.error('添加失败，请重新填写')
            this.props.getOrder()
          }
        }, error => {
          console.log(error)
          message.error('添加失败，请重新填写')
          this.props.getOrder()
        })
      } else if (!err && this.state.isEdit) {
        let params = { ...values, endTime: this.state.endTime, id: this.state.modalObj.id }

        ajax.updateOrder(params, response => {
          if (response.code === 106) {
            message.success(response.msg)
            this.props.getOrder()
          } else {
            message.error('编辑失败，请重新填写')
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
    const number = parseInt(value || 0, 10)
    if (value) {
      if (!isNaN(number)) {
        callback()
      } else {
        let validatemobile = '请输入价钱!'
        callback(validatemobile)
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
    console.log(this.props, 'pppppp')
    if (this.props.modalObj) {
      this.setState({
        modalObj: nextprops.modalObj,
        isEdit: nextprops.isEdit
      })
    }
  }
  render () {
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
    const config = {
      rules: [{ type: 'string', required: true, message: '请选择截止交稿时间!' }]
    }
    return (
      <Form onSubmit={this.handleSubmit} >
        <FormItem {...formItemLayout} label='文章数量'>
          {getFieldDecorator('total', { initialValue: this.state.modalObj.total })(
            <InputNumber min={1} max={10} />
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
            <Input placeholder='请输入定价' />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='文章领域'>
          {getFieldDecorator('eassyType', {
            initialValue: this.state.modalObj.eassyType,
            rules: [{
              required: true, message: '请输入文章领域!'
            }]
          })(
            <Input placeholder='请输入文章领域' />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='备注'>
          {getFieldDecorator('notes', {
            initialValue: this.state.modalObj.notes,
            rules: []
          })(
            <Input placeholder='请输入备注' />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='订单标题'>
          {getFieldDecorator('orderTitle', {
            initialValue: this.state.modalObj.orderTitle,
            rules: [{
              required: true, message: '请输入订单标题!'
            }]
          })(
            <Input placeholder='请输入订单标题' />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='原创度要求'>
          {getFieldDecorator('originalLevel', {
            initialValue: this.state.modalObj.originalLevel,
            rules: [{
              required: true, message: '请输入原创度要求!'
            }]
          })(
            <Input placeholder='请输入原创度要求' />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='图片数量要求'>
          {getFieldDecorator('picture', {
            initialValue: this.state.modalObj.picture,
            rules: [{
              required: true, message: '请输入图片数量要求!'
            }]
          })(
            <InputNumber min={1} max={10} />
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
              <Radio value='0'>流量文</Radio>
              <Radio value='1'>养号文</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='截止交稿时间'>
          {getFieldDecorator('endTime', {initialValue: moment(this.state.modalObj.endTime, 'YYYY-MM-DD')}, config)(
            <DatePicker onChange={this.onChange} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='要求'>
          {getFieldDecorator('require', {
            initialValue: this.state.modalObj.require,
            rules: [{
              required: true, message: '请输入要求!'
            }]
          })(
            <Input placeholder='请输入要求' />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='字数要求'>
          {getFieldDecorator('wordCount', { initialValue: this.state.modalObj.wordCount })(
            <InputNumber min={1} />
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
