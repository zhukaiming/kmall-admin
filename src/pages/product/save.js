

//商品分类
import React,{Component} from 'react';
import MyLayout from 'common/layout';
import { connect } from 'react-redux';
import { Table,Breadcrumb,InputNumber } from 'antd';
import { actionCreators } from './store';
import CreateSelect from './category-selector.js';
import UpDateImg from 'common/upload-img';

import RichEditor from 'common/rich-editor';

import {GET_PRODUCT_IMG,UPDATA_PRODUCT_DETAIL_IMAGE} from 'api';


import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import {
// 使用BrowserRouter时,页面刷新会向服务器发送请求,而HashRouter不会
// 使用BrowserRouter时devServer的historyApiFallback:true	
  BrowserRouter as Router,
  // HashRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
const FormItem = Form.Item;
const Option = Select.Option;

class NormalCategoryForm extends Component{
	constructor(props){
		super(props)
		this.handleSubmit=this.handleSubmit.bind(this)
		//通过判断有没有productId来判断是编辑操作还是新增
		this.state={
			productId : this.props.match.params.productId
		}
	}
	//
  componentDidMount(productId){
    //handleGetCategory,发送ajax请求
    if(this.state.productId){
    	this.props.handleProductDetail(this.state.productId)

    }
  }
  //处理提交事件
  //获取组件信息,然后发送到后台,进行数据更新处理
	handleSubmit(e){
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		    //console.log('Received values of form: ', values);
		    //判断编辑还是提交
		    values.id=this.state.productId;
		    this.props.handleSave(err,values)
		});
	}
	//从store中获取这些数据
	render(){
		const {
			categoryIdvalidataStatus,
			categoryIdhelp,
			parentCategoryId,
			categoryId,
			images,
			detail,
			name,
			stock,
			price,
			description
		} = this.props;
		//图片回填
		let fileList = [];
		console.log('img',images)
		if(images){
			fileList = images.split(',').map((img,index)=>({
					uid: index, 
					status: 'done',
					url:img
			}))
		}
		//console.log('aaa:',this.props.categories)
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 22 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 2,
        },
        sm: {
          span: 16,
          offset: 2,
        },
      }
    };
    ////传递GetCategoryId方法函数到子组件,获取子组件的分类id
    // pid,id：分类的父id和子id
    //商品分类:
		//发送parentCategoryId和categoryId到子组件,
		// parentCategoryId={parentCategoryId}
		// categoryId={categoryId}		    
		return (
				<div>
					<MyLayout>
						<div>
				          <Breadcrumb>
				            <Breadcrumb.Item>Category</Breadcrumb.Item>
				            <Breadcrumb.Item>
				            	{
				            		this.state.productId
				            		? '编辑商品'
				            		: '添加商品'

				            	}
				            </Breadcrumb.Item>
				          </Breadcrumb>
					      <Form onSubmit={this.handleSubmit} className="login-form">
					        <FormItem
					          {...formItemLayout}
					          label="商品名称"
					        >
					          {getFieldDecorator('name', {
					            rules: [{
					              required: true, message: '请输入分类',
					            }],
					            initialValue:name
					          })(
					            <Input 
					            	style={{ width: 400 }}
					            />
					          )}
					        </FormItem>
					        <FormItem
					          {...formItemLayout}
					          label="商品描述"
					        >
					          {getFieldDecorator('description', {
					            rules: [{
					              required: true, message: '请输入分类',
					            }],
					            initialValue:description
					          })(
					            <Input 
					            	style={{ width: 400 }}
					            />
					          )}
					        </FormItem>
					        <FormItem
					          {...formItemLayout}
					          label="商品分类"
					          required={true}
					          validateStatus={this.props.categoryIdvalidataStatus}
					          help={this.props.categoryIdhelp}
					        >
					        	<CreateSelect
											parentCategoryId={parentCategoryId}
											categoryId={categoryId}
					        		GetCategoryId = {(parentCategoryId,categoryId)=>{
					        			//console.log(pid,id)
					        			this.props.handleCategory(parentCategoryId,categoryId);
					        		}}
					        	/>

					        </FormItem>
					        <FormItem
					          {...formItemLayout}
					          label="商品价格"
					        >
					          {getFieldDecorator('price', {
					            rules: [{
					              required: true, message: '请输入分类',
					            }],
					            initialValue:price
					          })(
					            <InputNumber
					            	style={{ width: 400 }}
					              formatter={value => `${value}元`}
					              parser={value=>value.replace('元')}

					            />
					          )}
					        </FormItem>
					        <FormItem
					          {...formItemLayout}
					          label="商品库存"
					        >
					          {getFieldDecorator('stock', {
					            rules: [{
					              required: true, message: '请输入分类',
					            }],
					            initialValue:stock
					          })(
					            <InputNumber
					            	style={{ width: 400 }}
					              formatter={value => `${value}件`}
					              parser={value=>value.replace('件')}
					            />
					          )}
					        </FormItem>
					        <FormItem
					          {...formItemLayout}
					          label="商品图片"
					        >
					        <UpDateImg
					        	action={GET_PRODUCT_IMG}
					        	fileList={fileList}
					        	max={3}
					        	//接收子组件传过来的图片地址
					        	getImg={
					        		(fileList)=>{
					        			console.log('save..',fileList)
					        			this.props.handleImages(fileList);
					        		}
					        	}
					        />
					        </FormItem>
					        <FormItem
					          {...formItemLayout}
					          label="商品详情"
					        >
					        <RichEditor
					        	url = { UPDATA_PRODUCT_DETAIL_IMAGE }
					        	GetRichEditorValue={
					        		(value)=>{
					        			//console.log('value',value)
					        			this.props.handleDetail(value);
					        		}
					        	}
					        	detail={detail}
					        />
					        </FormItem>
					        <FormItem {...tailFormItemLayout}>
					          <Button 
					          	type="primary"
					          	onClick={this.handleSubmit}
					          	loading={this.props.isAddFeting} 
					          	>提交</Button>
					        </FormItem>
					      </Form>
						</div>
					</MyLayout>
				</div>
			)
	}
}

//映射store 的state
const mapStateToProps = (state)=>{
  console.log(state)
  return{
    categoryIdvalidataStatus:state.get('product').get('categoryIdvalidataStatus'),
    categoryIdhelp:state.get('product').get('categoryIdhelp'),
		parentCategoryId:state.get('product').get('parentCategoryId'),
		categoryId:state.get('product').get('categoryId'),
		images:state.get('product').get('images'),
		detail:state.get('product').get('detail'),
		name:state.get('product').get('name'),
		stock:state.get('product').get('stock'),
		price:state.get('product').get('price'),
		description:state.get('product').get('description'),
 	/*name:state.get('category').get('name'),
    pid:state.get('category').get('pid')*/
  }
}
//
const mapDispatchToProps = (dispatch)=>{
  return{
    handleSave:(err,values)=>{
      dispatch(actionCreators.getSaveAction(err,values))
    },
    handleCategory:(parentCategoryId,categoryId)=>{
    	dispatch(actionCreators.GetSetCategoryAction(parentCategoryId,categoryId))
    },
    handleImages:(fileList)=>{
    	dispatch(actionCreators.GetSetImagesAction(fileList))
    },
    handleDetail:(value)=>{
    	dispatch(actionCreators.GetSetDetailAction(value))
    },
    handleProductDetail:(productId)=>{
    	dispatch(actionCreators.SetProductDetailAction(productId))
    }

  }
}

const ProductAdd=  Form.create()(NormalCategoryForm)

export default connect(mapStateToProps,mapDispatchToProps)(ProductAdd);
