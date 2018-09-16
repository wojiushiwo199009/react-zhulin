import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ajax from '../../api'
import { Form, Input, Button, Row, Col, message, Select } from 'antd'
const Option = Select.Option

const FormItem = Form.Item
export class AuditFormForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        let params = {
          userOrderId: this.props.userOrderId,
          total: parseInt(values.total)
        }
        ajax.WriterOrderDelete(params, response => {
          if (response.state.stateCode === 0) {
            message.success(response.state.stateMessage || '取消预约成功')
            this.props.getWriterOrder()
            this.props.onCancel()
          } else {
            message.error('取消预约失败，请重试')
            this.props.getWriterOrder()
          }
        }, error => {
          console.log(error)
          message.error('取消预约失败，请重试')
          this.props.getWriterOrder()
          this.props.onCancel()
        })
      }
    })
  }
  handleCancel = () => {
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
        <FormItem {...formItemLayout} label='取消预约数量'>
          {getFieldDecorator('total', {
            rules: [{ required: true, message: '请输入取消预约数量!' }]
          })(
            <Input placeholder='请输入取消预约数量' />
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
const AuditForm = Form.create()(AuditFormForm)
AuditFormForm.propTypes = {
  form: PropTypes.object,
  handleOk: PropTypes.func,
  getUserList: PropTypes.func,
  onCancel: PropTypes.func
}
export default AuditForm
