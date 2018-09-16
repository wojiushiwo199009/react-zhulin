import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ajax from '../../api'
import { Form, Input, Row, Col, message, Upload, Button, Icon, InputNumber } from 'antd'
import { axiosUrl } from '../../api/axios'
const FormItem = Form.Item
export class AddRowForm extends Component {
  state = {
    fileName: '',
    essayTitle: '',
    upDateCreate: this.props.upDateCreate,
    fileList: []
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        let params = {
          userOrderId: parseInt(this.props.userOrderId),
          fileName: this.state.fileName,
          essayTitle: values.essayTitle
        }
        console.log(params, 'pamsa')
        ajax.WriterCreateEssay(params, response => {
          if (response.state.stateCode === 0) {
            let msg = response.state.stateMessage || '创建成功'
            message.success(msg)
            this.handleCancel()
            document.location.reload()
          } else {
            let msg = response.state.stateMessage || '创建失败，请重新填写'
            message.error(msg)
            this.props.getWriterEssayList()
          }
        }, error => {
          console.log(error)
          message.error('创建失败，请重新填写')
          this.props.getWriterEssayList()
          this.handleCancel()
        })
      }
    })
  }
  handleCancel = () => {
    this.props.onCancel()
  }
  componentWillReceiveProps (nextProps) {
    console.log(nextProps, 'next')
    if (this.state.upDateCreate !== nextProps.upDateCreate) {
      this.setState({
        fileList: [],
        essayTitle: ''
      })
    }
  }
  handleChange = (info) => {
    console.log(info, 'info')
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 文件上传成功`)
      this.setState({
        fileName: info.file.response.data
      })
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败`)
    }
    let fileList = info.fileList
    console.log(fileList, '1111flistes')
    this.setState({ fileList })
    fileList = fileList.slice(-1)
    console.log(fileList, '2222flistes')
  }
  render () {
    console.log(this.props, 'lllllllll')
    let self = this
    const PicUrl = `${axiosUrl}/user/file/upload`
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
    const props = {
      name: 'file',
      action: PicUrl,
      accept: '.docx',
      onChange: this.handleChange,
      headers: {
        authorization: 'authorization-text'
      }
    }
    return (
      <Form onSubmit={this.handleSubmit} >
        <FormItem {...formItemLayout} label='文章标题'>
          {getFieldDecorator('essayTitle', {
            initialValue: this.state.essayTitle,
            rules: [{ required: true, message: '请输入文章标题!' }
            ]
          })(
            <Input placeholder='请输入文章标题' />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label='文件名称'>
          {getFieldDecorator('filename', {
            rules: [{ required: true, message: '请输入文件名称!' }
            ]
          })(
            <Upload {...props} fileList={this.state.fileList}>
              <Button>
                <Icon type='upload' /> Click to Upload
              </Button>
            </Upload>
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
  getWriterEssayList: PropTypes.func,
  onCancel: PropTypes.func
}
export default AddRow
