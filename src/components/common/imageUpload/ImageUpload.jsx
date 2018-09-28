import { Upload, Icon, Modal } from 'antd'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ajax from '../../../api'
import './ImageUpload.scss'

export default class ImageUpload extends Component {
  constructor (props) {
    super(props)
    // this.data = this.props.data
    console.log(this.props)
  }
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [
    ],
    data: {
      id: null,
      caseFileId: 0,
      imgType: 0,
      url: '',
      imgDesc: ''}
  };

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    })
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.listFile) {
      let listFile = nextProps.listFile
      for (let i = 0; i < listFile.length; i++) {
        this.setState({
          fileList: nextProps.listFile
        })
      }
    }
  }
  componentDidMount () {
    if (this.props.listFile) {
      let listFile = this.props.listFile
      for (let i = 0; i < listFile.length; i++) {
        this.setState({
          fileList: this.props.listFile
        })
      }
    }
  }
  // handleChange = ({ fileList }) => this.setState({ fileList })
  handleRemove=(file) => {
    // console.log(file, 'file')
    let imgUrls = file.url ? file.url : file.response.data.picPath
    ajax.deleteCaseImg({url: imgUrls}, response => {
      if (response.code === 101) {
      }
    }, error => {
      console.log(error)
    })
    this.props.removeImg(file)
    console.log(this.state.remove, 'hh')
  }
  handleChange = ({ fileList }) => {
    fileList = fileList.filter((file) => {
      if (file.response) {
        this.setState({
          data: {
            uid: Math.random(),
            id: this.props.data.id,
            url: file.response.data.picPath,
            caseFileId: this.props.data.caseFileId,
            imgType: this.props.data.imgType,
            imgDesc: this.props.data.imgDesc
          }
        })
        console.log(this.state.data, 'response')

        this.props.caseImgsAll(this.state.data)
      }
      return true
    })
    this.setState({ fileList })
    // this.props.trajectoryMapDesc(this.state.fileList.length)
    console.log(this.state.fileList, 'fileList')
  }

  render () {
    const { previewVisible, previewImage, fileList } = this.state
    const uploadButton = (
      <div>
        <Icon type='plus' />
        <div className='ant-upload-text'>点击上传</div>
      </div>
    )
    return (
      <div className='clearfix'>
        <Upload
          action='http://172.16.20.52:8080/casefile/uploadPicture'
          listType='picture-card'
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          data={this.props.data}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal destroyOnClose={true} visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt='example' style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}
ImageUpload.propTypes = {
  data: PropTypes.object,
  caseImgsAll: PropTypes.func,
  listFile: PropTypes.array,
  removeImg: PropTypes.func
}
