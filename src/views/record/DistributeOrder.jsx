import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ajax from '../../api'
import { Form, Button, Row, Col, message, Select, Input } from 'antd'
const FormItem = Form.Item
const Option = Select.Option
export class AddOrderForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userId: '',
      distributeObj: this.props.distributeObj,
      userList: [
        {
          key: '1',
          id: 'aaa',
          name: 'abc'
        }
      ]
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let params = {
          orderId: this.state.distributeObj.id,
          appointTotal: parseInt(values.appointTotal),
          userId: values.userId
        }
        ajax.getAdminMerchantOrderDistribute(params, response => {
          if (response.state.stateCode === 0) {
            message.success(response.state.stateMessage || '分配成功')
            this.handleCancel()
            this.getOrder()
          } else {
            message.error(response.state.stateMessage || '分配失败，请重试')
            this.handleCancel()
            this.getOrder()
          }
        }, error => {
          console.log(error)
          message.error('分配失败，请重试')
          this.handleCancel()
          this.getOrder()
        })
      }
    })
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
  handleCancel = () => {
    this.props.onCancel()
  }
  handleChange = (value) => {
    console.log(value, 'v')
    this.setState({
      userId: value
    })
  }
  componentWillMount () {
    ajax.getWriterList({}, response => {
      if (response.state.stateCode === 0) {
        response.data.map((item, index) => {
          item.key = item.account
        })
        this.setState({
          userList: response.data
        })
      }
    }, error => {
      console.log(error)
    })
  }
  componentWillReceiveProps (nextProps) {
    this.setState({
      distributeObj: nextProps.distributeObj
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
        <FormItem {...formItemLayout} label='预约数量'>
          {getFieldDecorator('appointTotal', {
            initialValue: '',
            rules: [{ required: true, message: '请填写预约数量!' }, {
              validator: this.validateOriginalLevel
            }]
          })(
            <Input placeholder='请填写预约数量' />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='选择用户'>
          {getFieldDecorator('userId', {
            initialValue: '',
            rules: [{ required: true, message: '请选择用户!' }]
          })(
            <Select style={{ width: 295 }} onChange={this.handleChange}>
              {
                this.state.userList.map((item, index) => {
                  return <Option key={index} value={item.id}>{item.account} - {item.name}</Option>
                })
              }
            </Select>
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
