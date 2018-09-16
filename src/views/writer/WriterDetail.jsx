import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import {Table, Input, InputNumber, Popconfirm, Form, Button, Modal, message, Divider, Row, Col} from 'antd'
import ajax from '../../api'
import CreateEssay from './CreateEssay'
import EditOrder from './EditOrder'
import SeePic from './SeePic'
import './writer.scss'
import { axiosUrl } from '../../api/axios'
const Search = Input.Search

const FormItem = Form.Item
const EditableContext = React.createContext()

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
)

const EditableFormRow = Form.create()(EditableRow)
EditableRow.propTypes = {
  form: PropTypes.object,
  index: PropTypes.string
}

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />
    }
    return <Input />
  };

  render () {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props
    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      required: true,
                      message: `Please Input ${title}!`
                    }],
                    initialValue: record[dataIndex]
                  })(this.getInput())}
                </FormItem>
              ) : restProps.children}
            </td>
          )
        }}
      </EditableContext.Consumer>
    )
  }
}
EditableCell.propTypes = {
  editable: PropTypes.boolean,
  editing: PropTypes.boolean,
  dataIndex: PropTypes.string,
  title: PropTypes.string,
  inputType: PropTypes.string,
  record: PropTypes.object,
  index: PropTypes.string,
  handleSave: PropTypes.func
}

export default class EditableTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      picVisable: false,
      upDateCreate: false,
      orderEssayId: 0,
      orderEssayRecords: [{
        id: '',
        key: '1',
        essayTitle: 'John Brown',
        eassyFile: '',
        originalLevel: 32,
        pictureTotal: 32,
        status: 'New York No. 1 Lake Park',
        result: 'lll'
      }],
      count: 2,
      editingKey: '',
      visible: false,
      editVisible: false,
      userOrderId: ''
    }
    this.columns = [
      {
        title: '文章标题',
        dataIndex: 'essayTitle'
      },
      {
        title: 'Word标题',
        dataIndex: 'eassyFile'
      },
      {
        title: '原创度',
        dataIndex: 'originalLevel'
      }, {
        title: '图片数量',
        dataIndex: 'pictureTotal'
      }, {
        title: '状态',
        dataIndex: 'status',
        render: (text, record) => {
          return (
            <div>
              {
                text === 0 ? <span>待管理员审核</span> : (text === 1) ? <span>商家退稿</span> : (text === 2) ? <span>收稿成功</span> : (text === 3) ? <span>商家已打款</span> : (text === 4) ? <span>待商家审核</span> : (text === 5) ? <span>管理员退稿</span> : (text === 6) ? <span>管理员已打款</span> : ''
              }
            </div>
          )
        }
      },
      {
        title: '审核结果',
        dataIndex: 'result'
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {
          const editable = this.isEditing(record)
          return (
            <div>
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <a
                        href='javascript:;'
                        onClick={() => this.save(form, record.key)}
                        style={{ marginRight: 8 }}
                      >
                        保存<Divider type='vertical' />
                      </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                    title='确定取消吗?'
                    onConfirm={() => this.cancel(record.key)}
                  >
                    <a>取消<Divider type='vertical' /></a>
                  </Popconfirm>
                </span>
              ) : (
                <a onClick={() => this.edit(record)}>编辑<Divider type='vertical' /></a>

              )}
              {
                <Popconfirm title='确定删除吗?' onConfirm={() => this.handleDelete(record)}>
                  <a href='javascript:;' className='delete'>删除<Divider type='vertical' /></a>
                </Popconfirm>
              }
              {
                <a href='javascript:;' onClick={() => this.downLoad(record)}>下载<Divider type='vertical' /></a>
              }
              {
                <a href='javascript:;' onClick={() => this.seePic(record)}>查看图片</a>
              }
            </div>
          )
        }
      }
    ]
  }

  downLoad = (record) => {
    window.open(axiosUrl + '/order/essay/download?fileName=' + record.eassyFile, '_self')
  }

  handleDelete = (record) => {
    console.log(record)
    ajax.WriterDeleteEssay({ essayOrderId: record.id }, response => {
      if (response.state.stateCode === 0) {
        let msg = response.state.stateMessage || '删除成功'
        message.success(msg)
        this.getWriterEssayList()
      } else {
        let msg = response.state.stateMessage || '删除失败，请重试'
        message.error(msg)
        this.getWriterEssayList()
      }
    }, error => {
      console.log(error)
      message.error('删除失败，请重试')
      this.getWriterEssayList()
    })
  }
  seePic = (record) => {
    console.log(record)
    this.setState({
      orderEssayId: record.id,
      picVisable: true
    })
  }
  isEditing = (record) => {
    return record.key === this.state.editingKey
  };

  edit (record) {
    this.setState({editVisible: true, essayOrderId: record.id, filename: record.eassyFile, essayTitle: record.essayTitle})
  }

  save (form, key) {
    console.log(form, key)
    let self = this
    form.validateFields((error, row) => {
      console.log(row)
      if (error) {
        return
      }
      let params = { essayOrderId: this.state.essayOrderId, filename: row.eassyFile, essayTitle: row.essayTitle }
      console.log(params, 'ppp')
      ajax.WriterUpdateEssay(params, response => {
        if (response.state.stateCode === 0) {
          message.success(response.state.stateMessage || '修改成功')
          self.setState({ editingKey: '' }, () => {
            this.getWriterEssayList()
          })
        } else {
          message.error(response.state.stateMessage || '修改失败，请重试')
          self.setState({ editingKey: '' }, () => {
            this.getWriterEssayList()
          })
        }
      }, error => {
        console.log(error)
        message.error('修改失败，请重试')
        self.setState({ editingKey: '' }, () => {
          this.getWriterEssayList()
        })
      })
    })
  }

  cancel = () => {
    this.setState({ editingKey: '' })
  }

  showModal = () => {
    this.setState({
      visible: true,
      upDateCreate: !this.state.upDateCreate
    })
  }
  handleOk = () => {
    // 发送请求
    setTimeout(() => {
      this.setState({
        visible: false
      })
    }, 2000)
  }

  handleCancel = () => {
    console.log('Clicked cancel button')
    this.setState({
      visible: false
    })
  }
  getWriterEssayList = () => {
    ajax.getWriterEssayList({userOrderId: location.hash.split('=')[1]}, response => {
      if (response.state.stateCode === 0) {
        let resData = response.data.orderRecord
        response.data.orderEssayRecords.map((item, index) => {
          item.key = index + ''
        })
        this.setState({
          orderCode: resData.orderCode,
          eassyTotal: resData.eassyTotal,
          merchantPrice: resData.merchantPrice,
          eassyType: resData.eassyType,
          orderTitle: resData.orderTitle,
          originalLevel: resData.originalLevel,
          picture: resData.picture,
          type: resData.type,
          endTime: moment.unix(parseInt(resData.endTime.toString().slice(0, 10))).format('YYYY-MM-DD HH:mm:ss'),
          wordCount: resData.wordCount,
          userOrderId: location.hash.split('=')[1],
          data: response.data.orderEssayRecords
        })
      } else {
        message.error('查询失败，请重试')
      }
    }, error => {
      console.log(error)
      message.error('查询失败，请重试')
    })
  }
  handleEditCancel=() => {
    this.setState({
      editVisible: false
    })
  }
  handlePicCancel = () => {
    this.setState({
      picVisable: false
    })
  }
  componentDidMount () {
    this.getWriterEssayList()
  }
  render () {
    const { visible } = this.state
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    }

    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      }
    })

    return (
      <div className='writer-detail'>
        <div className='title'>
          <h3>订单号:{this.state.orderCode}<Button style={{float: 'right'}} onClick={this.showModal} type='primary'>
            创建文章
          </Button></h3>
          <Row>
            <Col span={8}>订单标题:{this.state.orderTitle}</Col>
            <Col span={8}>商户定价:{this.state.merchantPrice}</Col>
            <Col span={8}>文章领域:{this.state.eassyType}</Col>
          </Row>
          <Row>
            <Col span={8}>文章数量:{this.state.eassyTotal}</Col>
            <Col span={8}>原创度:{this.state.originalLevel}</Col>
            <Col span={8}>图片数量要求:{this.state.picture}</Col>
          </Row>
          <Row>
            <Col span={8}>字数要求:{this.state.wordCount}</Col>
            <Col span={8}>类型:{this.state.type}</Col>
            <Col span={8}>截止交稿时间:{this.state.endTime}</Col>
          </Row>
        </div>
        <Table
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          rowClassName='editable-row'
        />
        <Modal title='创建文章'
          visible={visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <CreateEssay getWriterEssayList={this.getWriterEssayList} userOrderId={this.state.userOrderId} onCancel={this.handleCancel} upDateCreate={this.state.upDateCreate} />
        </Modal>
        <Modal title='编辑'
          visible={this.state.editVisible}
          onCancel={this.handleEditCancel}
          footer={null}
        >
          <EditOrder getWriterEssayList={this.getWriterEssayList} essayTitle={this.state.essayTitle} filename={this.state.filename} essayOrderId={this.state.essayOrderId} onCancel={this.handleEditCancel} />
        </Modal>
        <Modal title={null}
          visible={this.state.picVisable}
          onCancel={this.handlePicCancel}
          footer={null}
          width={800}
          height={460}
          bodyStyle={{'background': '#1f2630', color: 'red'}}
        >
          <SeePic orderEssayId={this.state.orderEssayId} onCancel={this.handlePicCancel} />
        </Modal>
      </div>
    )
  }
}

EditableCell.propTypes = {
  form: PropTypes.object,
  index: PropTypes.string
}
