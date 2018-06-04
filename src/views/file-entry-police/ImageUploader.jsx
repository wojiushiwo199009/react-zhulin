import React from 'react'
import {Input} from 'antd'
import PropTypes from 'prop-types'
import ImageUploadText from '../../components/common/imageUploadText/ImageUploadText'

export default class ImageUploader extends React.Component {
  constructor (props) {
    super(props)
    this.state = ({
      imgs: [],
      imgDesc: props.imgDesc
    })
  }
  getFileList = (fileList) => {
    console.log(fileList)
    let imgs = fileList.map(file => {
      return {
        id: this.props.data.id,
        imgUrl: file.response && file.response.data.picPath,
        caseFileId: this.props.data.caseFileId,
        imgType: this.props.data.imgType
      }
    })
    this.setState({imgs}, () => { console.log(this.state.imgs.length) })
    console.log(imgs, 'imgs')
  }
  onChange = (e, no) => {
    this.state.imgDesc[no - 1] = e.target.value
    this.setState({imgDesc: this.state.imgDesc})
    // console.log(this.state.imgDesc, 'imgDesc')
    this.state.imgDesc.map = (item) => {
      this.setState({

      })
    }
  }

  render () {
    return [
      <ImageUploadText key='uploader' getFileList={this.getFileList} data={this.props.data} />,
      <div key='input'>
        {this.state.imgs.length > 0 &&
          <Input placeholder='请输入简单截图说明' style={{width: '200px', height: '120px', marginRight: '8px'}} type='textarea'
            onChange={(e) => this.onChange(e, 1)}
            value={this.state.imgDesc[0]} />

        }
        {this.state.imgs.length > 1 &&
          <Input placeholder='请输入简单截图说明' style={{width: '200px', height: '120px', marginRight: '8px'}} type='textarea'
            onChange={(e) => this.onChange(e, 2)}
            value={this.state.imgDesc[1]} />

        }
        {this.state.imgs.length > 2 &&
          <Input placeholder='请输入简单截图说明' style={{width: '200px', height: '120px'}} type='textarea'
            onChange={(e) => this.onChange(e, 3)}
            value={this.state.imgDesc[2]} />
        }
      </div>
    ]
  }
}
ImageUploader.propTypes = {
  data: PropTypes.object,
  imgDesc: PropTypes.array
}
ImageUploader.defaultProps = {
  imgDesc: ['', '', '']
}
