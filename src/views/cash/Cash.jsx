import React from 'react'
import PropTypes from 'prop-types'
import { Table, Input, InputNumber, Popconfirm, Form, Button, Modal, message, Divider } from 'antd'
import AddRow from './AddRow'
import Assign from './Assign'
import ajax from '../../api'

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

class CashCell extends React.Component {
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
CashCell.propTypes = {
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
        id: '',
        key: '0',
        number: '',
        account: '',
        name: '',
        code: ''
      }],
      userType: '',
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
          return (
            <div>
              {
                <Popconfirm title='确定打款吗?' onConfirm={() => this.handleMoney(record)}>
                  <a href='javascript:;' className='delete'>打款<Divider type='vertical' /></a>
                </Popconfirm>
              }
            </div>
          )
        }
      }
    ]
  }

  handleMoney = (record) => {
    console.log(record)
    // const dataSource = [...this.state.data]
    ajax.adminFinmceMakemoney({ id: record.id }, response => {
      if (response.state.stateCode === 0) {
        let msg = response.state.stateMessage || '打款成功'
        message.success(msg)
        this.getUserList()
      } else {
        let msg = response.state.stateMessage || '打款成功'
        message.error(msg)
        this.getUserList()
      }
    }, error => {
      console.log(error)
      message.error('打款失败，请重试')
      this.getUserList()
    })
  }

  isEditing = (record) => {
    return record.key === this.state.editingKey
  };

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
  handleAssignCancel = () => {
    this.setState({
      assignVisible: false
    })
  }
  getUserList = () => {
    ajax.getUserList({}, response => {
      if (response.state.stateCode === 0) {
        response.data.map((item, index) => {
          item.key = index + ''
        })
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
  getUserInfo = () => {
    ajax.getUserInfo({}, response => {
      if (response.state.stateCode === 0) {
        this.setState({
          userType: response.data.type
        })
      }
    }, error => {
      console.log(error)
    })
  }
  componentWillMount () {
    this.getUserInfo()
  }
  componentDidMount () {
    this.getUserList()// beizhu
  }
  render () {
    const { visible } = this.state
    const components = {
      body: {
        row: EditableFormRow,
        cell: CashCell
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
        {
          this.state.userType === 4 ? <Button onClick={this.showModal} type='primary' style={{ marginBottom: 16, float: 'right' }}>
            申请提现
          </Button> : ''
        }

        <Modal title='申请提现'
          visible={visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <AddRow onCancel={this.handleCancel} getUserList={this.getUserList} />
        </Modal>
        <Table
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          rowClassName='editable-row'
        />
        <Modal title='分派'
          visible={this.state.assignVisible}
          onCancel={this.handleAssignCancel}
          footer={null}
        >
          <Assign userId={this.state.userId} handleOk={this.handleOk} onCancel={this.handleCancel} getUserList={this.getUserList} />
        </Modal>
      </div>
    )
  }
}

CashCell.propTypes = {
  form: PropTypes.object,
  index: PropTypes.string
}
