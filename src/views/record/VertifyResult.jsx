import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ajax from '../../api'
import { Form, Input, Button, Row, Col, message, Radio, Tooltip, Icon, InputNumber } from 'antd'
// const Option = Select.Option
const RadioGroup = Radio.Group
const RadioButton = Radio.Button
const FormItem = Form.Item
export class AuditFormForm extends Component {
  state = {

  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        let params = {
          id: this.props.orderEssayId,
          status: values.status,
          userId: this.props.userId,
          result: values.result,
          originalLevel: values.originalLevel
        }
        ajax.merchantOrderAuditing(params, response => {
          if (response.state.stateCode === 0) {
            message.success(response.state.stateMessage || '审核成功')
            this.props.getUserInfo()
            this.handleCancel()
          } else {
            message.error(response.state.stateMessage || '审核失败，请重试')
            this.props.getUserInfo()
          }
        }, error => {
          console.log(error)
          message.error('审核失败，请重试')
          this.props.getUserInfo()
          this.handleCancel()
        })
      }
    })
  }
  handleCancel = () => {
    this.props.onCancel()
  }

  getUserInfo = () => {
    ajax.getUserInfo({}, response => {
      if (response.state.stateCode === 0) {
        this.setState({
          userType: response.data.type
        })
      } else {
        message.error('请求失败，请稍后再试')
      }
    }, error => {
      console.log(error)
    })
  }
  componentWillMount () {
    this.getUserInfo()
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
    const text = '原创度最高为100，最低为0'
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} >
        {
          this.state.userType === 2 ? <FormItem
            {...formItemLayout}
            label='审核状态'
          >
            {getFieldDecorator('status', {
              rules: [{ required: true, message: '请选择审核状态!' }]
            })(
              <RadioGroup>
                <RadioButton value={5}>退稿</RadioButton>
                <RadioButton value={4}>审核通过</RadioButton>
              </RadioGroup>
            )}
          </FormItem> : ''
        }
        {
          this.state.userType === 2 ? <FormItem {...formItemLayout} label='审核原创度'>
            {getFieldDecorator('originalLevel', {
              rules: [{ required: true, message: '请输入原创度!' }]
            })(
              <div>
                <InputNumber style={{ width: '230px' }} min={0} max={100} placeholder='请输入原创度' /> <Tooltip placement='bottom' title={text}>
                  <Icon type='question-circle' theme='outlined' />
                </Tooltip>
              </div>
            )}
          </FormItem> : ''
        }
        {
          this.state.userType === 2 ? <FormItem {...formItemLayout} label='审核结果'>
            {getFieldDecorator('result', {
              rules: [{ required: true, message: '请输入审核结果!' }]
            })(
              <Input placeholder='请输入审核结果' />
            )}
          </FormItem> : ''
        }

        {
          this.state.userType === 3 ? <FormItem
            {...formItemLayout}
            label='审核状态'
          >
            {getFieldDecorator('status', {
              rules: [{ required: true, message: '请选择审核状态!' }]
            })(
              <RadioGroup>
                <RadioButton value={1}>退稿</RadioButton>
                <RadioButton value={2}>收稿</RadioButton>
              </RadioGroup>
            )}
          </FormItem> : ''
        }
        <FormItem>
          <Row>
            <Col span={6} offset={6}><Button onClick={this.handleCancel}>取消
            </Button></Col>
            <Col span={6} offset={2}><Button type='primary' htmlType='submit' className='login-form-button'>审核通过</Button></Col>
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
