import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ajax from '../../api'
import { Form, Button, Row, Col, message, InputNumber } from 'antd'

const FormItem = Form.Item
export class AddRowForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        let params = {
          money: values.money
        }
        ajax.WriterFinaceCreate(params, response => {
          if (response.state.stateCode === 0) {
            let msg = response.state.stateMessage || '提现成功'
            message.success(msg)
            this.props.getUserList()
            this.handleCancel()
          } else {
            let msg = response.state.stateMessage || '提现失败，请重新填写'
            message.error(msg)
            this.props.getUserList()
          }
        }, error => {
          console.log(error)
          message.error('提现失败，请重新填写')
          this.props.getUserList()
          this.handleCancel()
        })
      }
    })
  }
  handleCancel=() => {
    this.props.onCancel()
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
    return (
      <Form onSubmit={this.handleSubmit} >
        <FormItem {...formItemLayout} label='提现金额'>
          {getFieldDecorator('money', {
            rules: [{ required: true, message: '请输入提现金额!' }]
          })(
            <InputNumber placeholder='请输入提现金额' />
          )}
        </FormItem>
        <FormItem>
          <Row>
            <Col span={6} offset={6}><Button onClick={this.handleCancel}>取消
            </Button></Col>
            <Col span={6} offset={2}><Button type='primary' htmlType='submit' className='login-form-button'>确定</Button></Col>
          </Row>
        </FormItem>
      </Form>
    )
  }
}
const AddRow = Form.create()(AddRowForm)
AddRowForm.propTypes = {
  form: PropTypes.object,
  handleOk: PropTypes.func,
  getUserList: PropTypes.func,
  onCancel: PropTypes.func
}
export default AddRow
