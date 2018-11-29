
//获取图片组件
import React,{Component} from 'react';

import { Upload, Icon, Modal } from 'antd';
class UpDateImg extends React.Component {
  constructor(props){
    super(props)
    this.state={
      previewVisible: false,
      previewImage: '',
      fileList: [],     
    }
    this.handlePreview = this.handlePreview.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }
  //回填图片
  static getDerivedStateFromProps(props,state){
    //console.log('sasd...',props.fileList.length)
    if(props.fileList.length > 0 && state.fileList.length == 0){
      return{
        fileList:props.fileList
      }
    }
    return null;
  }
  handleCancel(){
    this.setState({ previewVisible: false })
  }

  handlePreview(file){
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  //
  handleChange({ fileList }){//把图片地址传送给父组件
    console.log('ooo...',fileList)
    //
    this.setState({ fileList },()=>{//
      this.props.getImg(fileList.map((file)=>{//遍历数组,只返回图片的地址
        return file.response
      }).join(','))//
    })
  }
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action={this.props.action}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          //客戶端發送請求的時候會把cookie發送到服務器端,服務器端根據發送過來的信息判斷用戶有沒有登錄
          //
          withCredentials={true}          
        >
          {fileList.length >= this.props.max ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default UpDateImg;