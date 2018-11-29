


//
import React,{ Component } from 'react';
import Simditor from 'simditor';
import 'simditor/styles/simditor.css';
import $ from 'jquery';
class RichEditor extends React.Component {

	constructor(props){
		super(props)

		this.toolbar = [
		  'title',
		  'bold',
		  'italic',
		  'underline',
		  'strikethrough',
		  'fontScale',
		  'color',
		  'ol',        
		  'ul',          
		  'blockquote',
		  'code',    
		  'table',
		  'link',
		  'image',
		  'hr',            
		  'indent',
		  'outdent',
		  'alignment'
		]
		this.state={
			isLoaded:false
		}
		//Ajax跨域请求COOKIE无法带上的解决办法
		$.ajaxSetup({
       xhrFields: {
         withCredentials: true
      },
		})
	}
	//
  componentDidMount(){	
  	//jQ对象
  		this.editor = new Simditor({
		  textarea: $(this.textarea),
		 	toolbar:this.toolbar,
		 	upload:{
		 		url:this.props.url,
		 		fileKey:'upload'
		 	}
		  //optional options
		});
  	//jQ对象上的on事件
  	//传递子组件的value到父组件
	  this.editor.on('valuechanged',()=>{
	  	console.log('sss')
	  	//只要value发生变化,就已经被加载过,把isload设为true，不再执行下面的更新
	  	this.setState({
  			isLoaded:true
  		},()=>{
	  		this.props.GetRichEditorValue(this.editor.getValue())
  		})
	  })
  }
  //更新
  componentDidUpdate(){
  	//传的有值且没被加载过
  	console.log('detail',this.props.detail)
  	console.log('pro',this.props)
  	if(this.props.detail && !this.state.isLoaded){
  		this.editor.setValue(this.props.detail)
  		this.setState({
  			isLoaded:true
  		})
  	}
  }
  //
	render(){

		return (
			<div>
				<textarea ref={(textarea)=>{this.textarea = textarea}}></textarea>
			</div>
			)
	}
}

export default RichEditor;