import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ajax from '../../api'
import { Form, InputNumber, Button, Row, Col, message, Select, Modal } from 'antd'
const Option = Select.Option
const confirm = Modal.confirm

const FormItem = Form.Item
export class DeleteForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let params = {
          userOrderId: this.props.userOrderId,
          total: parseInt(values.total)
        }
        this.showConfirm(params)
      }
    })
  }
  WriterOrderDelete (params) {
    ajax.WriterOrderDelete(params, response => {
      if (response.state.stateCode === 0) {
        message.success(response.state.stateMessage || '取消预约成功')
        this.props.getWriterOrder()
        this.handleCancel()
      } else {
        message.error('取消预约失败，请重试')
        this.props.getWriterOrder()
      }
    }, error => {
      console.log(error)
      message.error('取消预约失败，请重试')
      this.props.getWriterOrder()
      this.handleCancel()
    })
  }
  handleCancel = () => {
    this.props.onCancel()
  }
  showConfirm (params) {
    let self = this
    confirm({
      title: '取消订单有可能会减少信用分，确定要取消吗?',
      onOk () {
        self.WriterOrderDelete(params)
      },
      onCancel () {
        console.log('Cancel')
      }
    })
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
      <div>

        <Form onSubmit={this.handleSubmit} >
          <FormItem {...formItemLayout} label='取消预约数量'>
            {getFieldDecorator('total', {
              rules: [{ required: true, message: '请输入取消预约数量!' }]
            })(
              <InputNumber min={0} max={this.props.orderNum} style={{width: '280px'}} placeholder='请输入取消预约数量' />
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
      </div>

    )
  }
}
const DeleteFormOrder = Form.create()(DeleteForm)
DeleteForm.propTypes = {
  form: PropTypes.object,
  handleOk: PropTypes.func,
  getUserList: PropTypes.func,
  onCancel: PropTypes.func
}
export default DeleteFormOrder
