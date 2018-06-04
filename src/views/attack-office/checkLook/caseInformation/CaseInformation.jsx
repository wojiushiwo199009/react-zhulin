
// 案件资料查看
import React, { Component} from 'react'
import { Tabs, Button } from 'antd'
import './CaseInformation.scss'

const TabPane = Tabs.TabPane
function callback (key) {
  console.log(key)
}

export default class CaseInformation extends Component {
   // 档案查看 下载文档
   downloadFile = () => {
     console.log(11)
   }
   render () {
     return (
       <div>
         <div className='caseInformation'>
           <Tabs defaultActiveKey='1' onChange={callback}>
             <TabPane tab='车主信息' key='1' >
               <div>
                 <div className='downloadFileBox'> <Button type='primary' onClick={this.downloadFile}>下载文档</Button></div>
               </div>

             </TabPane>
             <TabPane tab='车辆轨迹' key='2'>案件资料查看</TabPane>
             <TabPane tab='失踪点及逃窜轨迹' key='3'>本案嫌疑人库</TabPane>
           </Tabs>
         </div>

       </div>
     )
   }
}
