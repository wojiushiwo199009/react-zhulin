import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ajax from '../../api'
import { Form, Button, Row, Col, message, Input } from 'antd'
const FormItem = Form.Item
export class AddOrderForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      orderObj: this.props.orderObj
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let params = {
          orderId: this.state.orderObj.orderId,
          total: parseInt(values.total)
        }
        ajax.getWriterOrder(params, response => {
          if (response.state.stateCode === 0) {
            message.success(response.state.stateMessage || '预约成功')
            this.props.onCancel()
            this.props.getOrder()
          } else {
            message.error(response.state.stateMessage || '预约失败，请重试')
            this.props.getOrder()
          }
        }, error => {
          console.log(error)
          message.error('预约失败，请重试')
          this.props.onCancel()
          this.props.getOrder()
        })
      }
    })
  }
  handleCancel = () => {
    this.props.onCancel()
  }
  validateOriginalLevel = (rule, value, callback) => {
    if (value) {
      let myreg = /(^[1-9]+$)/
      if (value && myreg.test(value)) {
        callback()
      } else {
        let validatemobile = '请输入正确的预约数量!'
        callback(validatemobile)
      }
    } else {
      callback()
    }
  }
  componentWillReceiveProps (nextProps) {
    this.setState({
      orderObj: nextProps.orderObj
    })
  }
  render () {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 }
      }
    }
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} >
        <FormItem {...formItemLayout} label='预订数量'>
          {getFieldDecorator('total', {
            initialValue: '',
            rules: [{ required: true, message: '请填写预订数量!' }, {
              validator: this.validateOriginalLevel
            }]
          })(
            <Input placeholder='请填写预订数量' />
          )}
        </FormItem>
        <FormItem>
          <Row>
            <Col span={6} offset={6}>
              <Button onClick={this.handleCancel}>取消</Button>
            </Col>
            <Col span={6} offset={1}>
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
