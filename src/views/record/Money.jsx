import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ajax from '../../api'
import { Form, Button, Row, Col, message, Input } from 'antd'
const FormItem = Form.Item
export class MoneyForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      money: this.props.money,
      moneyOrderId: this.props.moneyOrderId
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let params = {
          orderId: this.state.moneyOrderId
        }
        ajax.getMakeMoney(params, response => {
          if (response.state.stateCode === 0) {
            message.success(response.state.stateMessage || '打款成功')
            this.props.onCancel()
            this.props.getOrder()
          } else {
            message.error(response.state.stateMessage || '打款失败，请重试')
            this.props.getOrder()
          }
        }, error => {
          console.log(error)
          message.error('打款失败，请重试')
          this.props.onCancel()
          this.props.getOrder()
        })
      }
    })
  }
  handleCancel = () => {
    this.props.onCancel()
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      money: nextProps.money
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
        <FormItem {...formItemLayout} label='打款金额'>
          {getFieldDecorator('money', {})(
            <div>{this.state.money}</div>
          )}
        </FormItem>
        <FormItem>
          <Row>
            <Col span={6} offset={6}>
              <Button onClick={this.handleCancel}>取消</Button>
            </Col>
            <Col span={6} offset={1}>
              <Button type='primary' htmlType='submit' className='login-form-button'>确定打款</Button>
            </Col>
          </Row>
        </FormItem>
      </Form>
    )
  }
}
const Money = Form.create()(MoneyForm)
MoneyForm.propTypes = {
  form: PropTypes.object,
  onCancel: PropTypes.func
}
export default Money
