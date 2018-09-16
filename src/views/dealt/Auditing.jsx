import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ajax from '../../api'
import { Form, Input, Button, Row, Col, message, Select, Radio } from 'antd'
const Option = Select.Option
const RadioGroup = Radio.Group
const RadioButton = Radio.Button
const FormItem = Form.Item
export class AuditFormForm extends Component {
  state={
    statusArr: [
      {
        name: '待提交信息',
        value: 1
      },
      {
        name: '待审核',
        value: 2
      },
      {
        name: '审核成功',
        value: 3
      },
      {
        name: '审核失败',
        value: 4
      },
      {
        name: '禁用',
        value: 5
      }
    ]
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        let params = {
          id: this.props.userId,
          result: values.result,
          status: values.status
        }
        ajax.AdminUserAuditing(params, response => {
          if (response.state.stateCode === 0) {
            message.success(response.state.stateMessage || '审核成功')
            this.props.AdminUserList()
          } else {
            message.error(response.state.stateMessage || '审核失败，请重试')
            this.props.AdminUserList()
          }
        }, error => {
          console.log(error)
          message.error('审核失败，请重试')
          this.props.AdminUserList()
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
        <FormItem
          {...formItemLayout}
          label='审核状态'
        >
          {getFieldDecorator('status', {
            rules: [{ required: true, message: '请选择审核状态!' }]
          })(
            <RadioGroup>
              <RadioButton value={3}>审核成功</RadioButton>
              <RadioButton value={4}>审核失败</RadioButton>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='审核结果'>
          {getFieldDecorator('result', {
            rules: [{ required: true, message: '请输入审核结果!' }]
          })(
            <Input placeholder='请输入审核结果' />
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
