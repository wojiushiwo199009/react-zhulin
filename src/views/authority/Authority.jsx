import React from 'react'
import PropTypes from 'prop-types'
import { Table, Input, InputNumber, Popconfirm, Form, Button, Modal, message, Divider } from 'antd'
import AddRow from './AddRow'
import Assign from './Assign'
import ajax from '../../api'
import './authority.scss'
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
                      message: `请输入 ${title}!`
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
      pagination: {
        current: 1,
        pageSize: 10,
        total: 1
      },
      data: [{
        id: '',
        key: '0',
        number: '',
        account: '',
        name: '',
        code: ''
      }],
      count: 2,
      editingKey: '',
      visible: false,
      assignVisible: false,
      userId: ''
    }
    this.columns = [
      {
        title: '序号',
        dataIndex: 'number',
        render: (text, record, index) => {
          return index + 1
        }
      },
      {
        title: '姓名',
        dataIndex: 'name',
        editable: true
      },
      {
        title: '账号',
        dataIndex: 'account'
      },
      {
        title: '邀请码',
        dataIndex: 'code',
        editable: true
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
              <a onClick={() => this.assign(record)}>分派</a>
            </div>
          )
        }
      }
    ]
  }
  assign=(record) => {
    this.setState({
      assignVisible: true,
      userId: record.id
    })
  }
  handleDelete = (record) => {
    console.log(record)
    // const dataSource = [...this.state.data]
    ajax.deleteUser({ id: record.id }, response => {
      if (response.state.stateCode === 0) {
        let msg = response.state.stateMessage || '删除成功'
        message.success(msg)
        this.getUserList()
      } else {
        let msg = response.state.stateMessage || '删除成功'
        message.error(msg)
        this.getUserList()
      }
    }, error => {
      console.log(error)
      message.error('删除失败，请重试')
      this.getUserList()
    })
  }

  isEditing = (record) => {
    return record.key === this.state.editingKey
  };

  edit (record) {
    this.setState({editingKey: record.key, id: record.id, password: record.password})
  }

  save (form, key) {
    console.log(form, key)
    let self = this
    form.validateFields((error, row) => {
      console.log(row)
      if (error) {
        return
      }
      let params = {...row, id: this.state.id, password: this.state.password}
      ajax.updateUser(params, response => {
        if (response.state.stateCode === 0) {
          message.success(response.state.stateMessage || '修改成功')
          self.setState({ editingKey: '' }, () => {
            self.getUserList()
          })
        } else {
          message.error(response.state.stateMessage || '修改失败，请重试')
          self.setState({ editingKey: '' }, () => {
            self.getUserList()
          })
        }
      }, error => {
        console.log(error)
        message.error('修改失败，请重试')
        self.setState({ editingKey: '' }, () => {
          self.getUserList()
        })
      })
    })
  }

  cancel = () => {
    this.setState({ editingKey: '' })
  }

  onSearch=(val) => {
    console.log(val)
    ajax.getUserList({phoneNumber: val}, response => {
      if (response.state.stateCode === 0) {
        this.setState({
          data: response.data
        })
      } else {
        message.error('查询失败，请重试')
      }
    }, error => {
      console.log(error)
      message.error('查询失败，请重试')
    })
  }
  showModal = () => {
    this.setState({
      visible: true
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
  handleAssignCancel=() => {
    this.setState({
      assignVisible: false
    })
  }
  handleTableChange = (pagination) => {
    const pager = { ...this.state.pagination }
    pager.current = pagination.current
    this.setState({
      pagination: pager
    }, () => {
      this.getUserList()
    })
  }
  getUserList=() => {
    ajax.getUserList({
      pageCount: this.state.pagination.pageSize,
      pageId: this.state.pagination.current
    }, response => {
      if (response.state.stateCode === 0) {
        response.data.map((item, index) => {
          item.key = index + ''
        })
        this.setState({
          data: response.data,
          pagination: { ...this.state.pagination, total: response.data.totalElements }
        })
      } else {
        message.error('查询失败，请重试')
      }
    }, error => {
      console.log(error)
      message.error('查询失败，请重试')
    })
  }
  componentDidMount () {
    this.getUserList()
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
      <div className='authority'>
        <Button onClick={this.showModal} type='primary' style={{ marginBottom: 16 }}>
          添加管理员
        </Button>
        <Modal title='添加管理员'
          visible={visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <AddRow handleOk={this.handleOk} onCancel={this.handleCancel} getUserList={this.getUserList} />
        </Modal>
        <Search
          placeholder='请输入手机号'
          onSearch={this.onSearch}
          enterButton
          style={{ width: 240, float: 'right' }}
        />
        <Table
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          rowClassName='editable-row'
          pagination={this.state.pagination} onChange={this.handleTableChange}
        />
        <Modal title='分派'
          visible={this.state.assignVisible}
          onCancel={this.handleAssignCancel}
          footer={null}
        >
          <Assign userId={this.state.userId} onCancel={this.handleAssignCancel} getUserList={this.getUserList} />
        </Modal>
      </div>
    )
  }
}

EditableCell.propTypes = {
  form: PropTypes.object,
  index: PropTypes.string
}
