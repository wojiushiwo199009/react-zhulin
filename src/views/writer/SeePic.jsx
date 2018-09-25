import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ajax from '../../api'
import { Carousel, message } from 'antd'
import { axiosUrl } from '../../api/axios'
import './writer.scss'
export class SeePic extends Component {
state={
  ImageArr: [
    {
      pictureName: '',
      picturePixel: ''
    }
  ],
  orderEssayId: this.props.orderEssayId
}
onChange=(a, b, c) => {
  console.log(a, b, c)
}
componentWillReceiveProps (nextProps) {
  this.setState({
    orderEssayId: nextProps.orderEssayId
  }, () => {
    this.SeePic()
  })
}
SeePic=() => {
  ajax.getOrderPicList({ orderEssayId: this.state.orderEssayId }, response => {
    if (response.state.stateCode === 0) {
      this.setState({
        ImageArr: response.data
      })
    } else {
      let msg = response.state.stateMessage || '查看失败，请重试'
      message.error(msg)
    }
  }, error => {
    console.log(error)
    message.error('查看失败，请重试')
  })
}
componentDidMount () {
  console.log(this.props.orderEssayId, 'iiiiiiiii')
  this.SeePic()
}
render () {
  let axiosImgUrl = axiosUrl + '/user/file/'
  return (
    <div className='see-pic'>
      <Carousel afterChange={this.onChange}>
        {
          this.state.ImageArr.map((item, index) => {
            let ImgSrc = axiosImgUrl + item.pictureName
            return (
              <div className='pic' key={index}>
                <img src={ImgSrc} alt='' style={{height: '100%', width: '100%', display: 'block', margin: '0 auto'}} />
                <h4>{item.picturePixel}</h4>
              </div>
            )
          })
        }
      </Carousel>
    </div>
  )
}
}
SeePic.propTypes = {
  orderEssayId: PropTypes.number
}
export default SeePic
