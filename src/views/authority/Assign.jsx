import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ajax from '../../api'
import { Form, Input, Button, Row, Col, message, Select } from 'antd'

const FormItem = Form.Item
const Option = Select.Option
export class AssignForm extends Component {
  state={
    bussinessArr: [
      {
        key: '1',
        id: '2',
        name: 'gjx',
        value: 'sss'
      }
    ],
    writerArr: [
      {
        key: '12',
        id: '22',
        name: 'gjx',
        value: 'sss'
      }
    ],
    adminArr: [
      {
        key: '2',
        id: '222',
        name: 'gjx',
        value: 'sss'
      }
    ]
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        let params = {
          name: values.name,
          phoneNumber: values.mobilephone,
          password: values.password,
          code: values.code
        }
        ajax.addUser(params, response => {
          if (response.state.stateCode === 0) {
            let msg = response.state.stateMessage || '添加成功'
            message.success(msg)
            this.props.getUserList()
            this.handleCancel()
          } else {
            let msg = response.state.stateMessage || '添加失败，请重新填写'
            message.error(msg)
            this.props.getUserList()
          }
        }, error => {
          console.log(error)
          message.error('添加失败，请重新填写')
          this.props.getUserList()
          this.handleCancel()
        })
      }
    })
  }
  handleCancel = () => {
    this.props.onCancel()
  }
  BussinessChange=() => {

  }
  WriterChange=() => {

  }
  AdminChange=() => {

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
        <FormItem {...formItemLayout} label='商家'>
          {getFieldDecorator('bussiness', {
          })(
            <Select placeholder='请选择商家' onChange={this.BussinessChange}>
              {
                this.state.bussinessArr.map((item, index) => {
                  return <Option key={index} value={item.value}>{item.name}</Option>
                })
              }
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='写手'>
          {getFieldDecorator('writer', {
          })(
            <Select placeholder='请选择写手' onChange={this.WriterChange}>
              {
                this.state.writerArr.map((item, index) => {
                  return <Option key={index} value={item.value}>{item.name}</Option>
                })
              }
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='管理员'>
          {getFieldDecorator('admin', {
            rules: [{
              required: true, message: '请选择管理员!'
            }]
          })(
            <Select placeholder='请选择管理员' onChange={this.AdminChange}>
              {
                this.state.adminArr.map((item, index) => {
                  return <Option key={index} value={item.value}>{item.name}</Option>
                })
              }
            </Select>
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
const Assign = Form.create()(AssignForm)
AssignForm.propTypes = {
  form: PropTypes.object,
  getUserList: PropTypes.func,
  onCancel: PropTypes.func
}
export default Assign
