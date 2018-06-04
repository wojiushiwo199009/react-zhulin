
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { List, Card } from 'antd'
import Suspicon from '../../../../assets/images/u311.jpg'
import ajax from '../../../../api'
export default class Victim extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hasData: true,
      plateCode: this.props.plateCode,
      victims: [
        {
          idCardNum: 1,
          name: '小马',
          sex: 1,
          age: 32, // 年龄
          height: 180, // 身高
          captureTimes: '2次', // 位置信息
          releaseTime: 20180702 // 出所时间
        },
        {
          idCardNum: 2,
          name: '小马',
          sex: 0,
          age: 32, // 年龄
          height: 180, // 身高
          captureTimes: '2次', // 位置信息
          releaseTime: 20180702 // 出所时间
        }
      ]
    }
  }
  // 得到嫌疑人库数据
  getVictimeData () {
    ajax.searchVictim({ plateCode: this.state.plateCode }, response => {
      if (response.code === 101) {
        this.setState({
          hasData: true,
          victims: response.victims
        })
      }
    }, error => {
      console.log(error)
    })
  }
  componentDidMount () {
    // this.getVictimeData()
  }
  render () {
    return (
      <div>
        {this.state.hasData && <List
          grid={{ gutter: 1, xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 6 }}
          dataSource={this.state.victims}
          renderItem={item => (
            <List.Item >
              <Card style={{ background: 'rgba(29, 45, 71, 1)', border: '0', position: 'relative', padding: '0' }}>
                <div style={{ background: 'rgba(29, 45, 71, 1)', cursor: 'pointer' }} key={item.idCardNum}>
                  <div style={{ textAlign: 'center' }}>
                    <img src={Suspicon} alt='' style={{ height: '140px' }} />
                  </div>
                  <div style={{ color: '#0099ff', textAlign: 'center', marginTop: '5px' }}>
                    <span >{item.name}&nbsp;&nbsp;</span>
                    <span >{item.sex === '1' ? '男' : '女'}</span>
                    <span style={{ margin: '0 5%' }}>{item.age}</span>
                  </div>
                  <div style={{ color: '#ffffff', textAlign: 'center', marginTop: '5px' }}>
                    <span style={{ margin: '0 5%' }}>身高：{item.height}</span>
                  </div>
                  <div style={{ color: '#ffffff', textAlign: 'center', marginTop: '5px' }}>
                    <span style={{ margin: '0 5%' }}>打处次数：{item.captureTimes}</span>
                  </div>
                  <div style={{ color: '#ffffff', textAlign: 'center', marginTop: '5px' }}>
                    <span style={{ margin: '0 5%' }}>出所时间：{item.releaseTime}</span>
                  </div>
                </div>
              </Card>
            </List.Item>
          )}
        />}
      </div>
    )
  }
}
Victim.propTypes = {
  plateCode: PropTypes.string
}
