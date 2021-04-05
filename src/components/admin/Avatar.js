import React from 'react'
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import BaseUrl from '../../BaseUrl';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('Siz faqat JPG/PNG fayllarni yuklay olasiz!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Rasmning hajmi 2MBdan oshmasligi kerak!');
  }
  return isJpgOrPng && isLt2M;
}

class Avatar extends React.Component {
  state = {
    loading: false,
  };



  componentDidUpdate(prevProps) {
    if(this.props.values != prevProps.values) {
        this.setState({
            imageUrl: this.props.values.rasm !="" ? (BaseUrl + this.props.values.rasm):null
        })
    }
  }
  componentDidMount() {
    this.setState({
      imageUrl: this.props.values.rasm !="" ? (BaseUrl + this.props.values.rasm):null
    })
    
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.props.setValues({
          ...this.props.values,
          rasm: info.file.response
      })
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  render() {
    const { loading, imageUrl } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Avatar</div>
      </div>
    );
    return (
      <Upload
        name="photo"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={`${BaseUrl}photo`}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    );
  }
}

export default Avatar;