import React from 'react'
import PropTypes from 'prop-types'
import { Table, Input, InputNumber, Popconfirm, Form, Button, Modal, message, Divider } from 'antd'
import AddRow from './AddRow'
import moment from 'moment'
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
      pagination: {
        current: 1,
        pageSize: 10
      },
      data: [{
        id: '',
        key: '0',
        createAt: '',
        money: 0,
        account: '',
        status: ''
      }],
      userType: '',
      count: 2,
      editingKey: '',
      visible: false
    }
    this.columns = [
      {
        title: '申请时间',
        dataIndex: 'createAt',
        render: text => <span>{text ? moment.unix(parseInt(text.toString().slice(0, 10))).format('YYYY-MM-DD HH:mm:ss') : '--'}</span>
      },
      {
        title: '申请金额',
        dataIndex: 'money',
        editable: true
      },
      {
        title: '提现用户',
        dataIndex: 'account'
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: (text, record) => {
          return (
            text === 0 ? '待打款' : '已打款'
          )
        }
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {
          return (
            <div>
              {
                <Popconfirm title='确定打款吗?' onConfirm={() => this.handleMoney(record)}>
                  <a href='javascript:;'>打款</a>
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

  handleCancel = () => {
    console.log('Clicked cancel button')
    this.setState({
      visible: false
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
  WriterCashList = () => {
    ajax.WriterCashList({
      pageCount: this.state.pagination.pageSize,
      pageId: this.state.pagination.current}, response => {
      if (response.state.stateCode === 0) {
        this.setState({
          data: response.data
        })
      }
    }, error => {
      console.log(error)
    })
  }
   handleTableChange = (pagination) => {
     const pager = { ...this.state.pagination }
     pager.current = pagination.current
     this.setState({
       pagination: pager
     }, () => {
       this.WriterCashList()
     })
   }
   getUserInfo = () => {
     let self = this
     ajax.getUserInfo({}, response => {
       if (response.state.stateCode === 0) {
         self.setState({
           userType: response.data.type
         }, () => {
           if (self.state.userType === 4) {
             self.columns.map((item, index) => {
               if (item.dataIndex === 'operation') {
                 self.columns.splice(index, 1)
               }
             })
           }
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
     this.WriterCashList()// beizhu
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
           this.state.userType === 4 ? <div style={{overflow: 'hidden'}}> <Button onClick={this.showModal} type='primary' style={{ marginBottom: 16, float: 'right' }}>
            申请提现
           </Button></div> : ''
         }

         <Modal title='申请提现'
           visible={visible}
           onCancel={this.handleCancel}
           footer={null}
         >
           <AddRow onCancel={this.handleCancel} WriterCashList={this.WriterCashList} />
         </Modal>
         <Table
           components={components}
           bordered
           dataSource={this.state.data}
           columns={columns}
           rowClassName='editable-row'
           pagination={this.state.pagination} onChange={this.handleTableChange}
         />
       </div>
     )
   }
}

CashCell.propTypes = {
  form: PropTypes.object,
  index: PropTypes.string
}
