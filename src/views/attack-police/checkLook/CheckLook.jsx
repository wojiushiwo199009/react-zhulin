
// 查看一案一档
import React, { Component} from 'react'
import { Tabs, Button } from 'antd'
import PDFObject from 'pdfobject'
import ajax from '../../../api'
import './CheckLook.scss'
import Empty from '../../../components/common/empty/Empty'
import Victim from '../../attack-office/checkLook/victim/Victim'
import CaseInformation from '../../check-vehicle-police/HomePage'

const TabPane = Tabs.TabPane
function callback (key) {
  console.log(key)
}

export default class CheckLook extends Component {
  constructor () {
    super()
    this.state = {
      fileSrc: '',
      plateCode: '',
      caseId: '',
      hasData: false
    }
  }
  // 得到档案查看中的pdf方法
  getSearchCasePdf (caseId) {
    ajax.searchCasePdf({ caseId: caseId }, response => {
      console.log(response, 'statisticsSuspectCount')
      if (response.code === 101) {
        this.setState({
          hasData: true,
          fileSrc: response.data.pdfUrl
        }, () => {
          let pdfContainer = this.refs.pdf
          PDFObject.embed(this.state.fileSrc, pdfContainer)
        })
      }
    }, error => {
      console.log(error)
    })
  }

  componentDidMount () {
    let Index = location.hash.indexOf('=')
    let caseId = parseInt(location.hash.slice(Index + 1))
    console.log(caseId)
    this.getSearchCasePdf(caseId)
  }
  render () {
    return (
      <div>
        <div className='checkLook'>
          <Tabs defaultActiveKey='1' onChange={callback}>
            <TabPane tab='档案查看' key='1' >
              <div className='fiels'>
                {
                  this.state.hasData ? <div ref='pdf' id='example1' /> : <Empty msg='暂无数据' />
                }
                {
                  this.state.hasData ? <div className='downloadFileBox'>
                    <Button type='warning' disabled style={{ marginLeft: '10px', marginRight: '10px' }} onClick={this.noFiles}>本案无研判材料</Button>
                  </div> : ''
                }
              </div>
            </TabPane>
            <TabPane tab='案件资料查看' key='2'>
              <div><CaseInformation /></div>
            </TabPane>
            <TabPane tab='本案嫌疑人库' key='3'>
              <Victim plateCode={this.state.plateCode} />
            </TabPane>
          </Tabs>
        </div>

      </div>
    )
  }
}
