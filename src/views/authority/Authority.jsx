import React from 'react'
import PropTypes from 'prop-types'
import { Table, Input, InputNumber, Popconfirm, Form, Button, Modal, message } from 'antd'
import AddRow from './AddRow'
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
      data: [{
        id: '11',
        key: '0',
        number: '32',
        accountNumber: '15081128239',
        name: 'gjx',
        code: '123'
      }, {
        id: '22',
        key: '1',
        number: '32',
        accountNumber: '15081128239',
        name: 'Edward King 1',
        code: '1233'
      }],
      count: 2,
      editingKey: '',
      visible: false
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
        dataIndex: 'accountNumber'
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
                        保存
                      </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                    title='确定取消吗?'
                    onConfirm={() => this.cancel(record.key)}
                  >
                    <a>取消</a>
                  </Popconfirm>
                </span>
              ) : (
                <a onClick={() => this.edit(record.key)}>编辑</a>
              )}
              {
                <Popconfirm title='确定删除吗?' onConfirm={() => this.handleDelete(record)}>
                  <a href='javascript:;' className='delete'>删除</a>
                </Popconfirm>
              }
            </div>
          )
        }
      }
    ]
  }
  handleDelete = (record) => {
    console.log(record)
    // const dataSource = [...this.state.data]
    ajax.deleteUser({ id: record.id }, response => {
      if (response.code === 106) {
        message.success(response.msg)
        // this.setState({ data: dataSource.filter(item => item.key !== record.key) })
        this.getUserList()
      } else {
        message.error('删除失败，请重试')
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

  edit (key) {
    this.setState({ editingKey: key })
  }

  save (form, key) {
    console.log(form, key)
    let self = this
    form.validateFields((error, row) => {
      console.log(row)
      if (error) {
        return
      }
      ajax.updateUser(row, response => {
        if (response.code === 106) {
          message.success(response.msg)
          // const newData = [...this.state.data]
          // const index = newData.findIndex(item => key === item.key)
          // if (index > -1) {
          //   const item = newData[index]
          //   newData.splice(index, 1, {
          //     ...item,
          //     ...row
          //   })
          //   this.setState({ data: newData, editingKey: '' })
          // } else {
          //   newData.push(row)
          //   this.setState({ data: newData, editingKey: '' })
          // }
          self.setState({ editingKey: '' }, () => {
            self.getUserList()
          })
        } else {
          message.error('修改失败，请重试')
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
  // handleAdd = () => {
  //   const { count, data } = this.state
  //   const newData = {
  //     key: count,
  //     name: `Edward King ${count}`,
  //     age: 32,
  //     address: `London, Park Lane no. ${count}`
  //   }
  //   this.setState({
  //     data: [...data, newData],
  //     count: count + 1
  //   })
  // }
  onSearch=(val) => {
    console.log(val)
    ajax.getUserList({phoneNumber: val}, response => {
      if (response.code === 106) {
        message.success(response.msg)
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
  getUserList=() => {
    ajax.getUserList({}, response => {
      if (response.code === 106) {
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
          footer={null}
        >
          <AddRow handleOk={this.handleOk} onCancel={this.handleCancel} />
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
        />
      </div>
    )
  }
}

EditableCell.propTypes = {
  form: PropTypes.object,
  index: PropTypes.string
}
