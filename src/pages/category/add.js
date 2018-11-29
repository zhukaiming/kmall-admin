

import React,{Component} from 'react';
import MyLayout from 'common/layout';
import CategoryList from './list.js';
import { Table,Breadcrumb  } from 'antd';
import { connect } from 'react-redux';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import { actionCreators } from './store';
const FormItem = Form.Item;
const Option = Select.Option;

class NormalCategoryForm extends Component{
	constructor(props){
		super(props)
		this.handleSubmit=this.handleSubmit.bind(this)
	}
  componentDidMount(){
    //handleGetCategory,发送ajax请求
    //获取一级分类
    this.props.handleGetOneCategory()
  }
	handleSubmit(e){
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
		    //console.log('Received values of form: ', values);
		    this.props.handleAdd(values)
		  }
		});
	}
	render(){
		console.log('aaa:',this.props.categories)
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      }
    };
		return(
			<MyLayout>
				<div className="category">
		          <Breadcrumb>
		            <Breadcrumb.Item>Category</Breadcrumb.Item>
		            <Breadcrumb.Item><a href="">分类列表</a></Breadcrumb.Item>
		          </Breadcrumb>
			      <Form onSubmit={this.handleSubmit} className="login-form">
			        <FormItem
			          {...formItemLayout}
			          label="分类"
			        >
			          {getFieldDecorator('name', {
			            rules: [{
			              required: true, message: '请输入分类',
			            }],
			          })(
			            <Input />
			          )}
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label="分类"
			        >
			          {getFieldDecorator('pid', {//父节点
			            rules: [{
			              required: true, message: '请选择父级分类',
			            }],
			          })(
							    <Select initialValue="0" style={{ width: 120 }}>
							      <Option value="0">根分类</Option>
							     {
							     	this.props.oneCategories.map((category)=>{
							     		return <Option key={category.get('_id')} value={category.get('_id')}>跟分类/{category.get('name')}</Option>
							     	})
							     }
							    </Select>
			          )}
			        </FormItem>
			        <FormItem {...tailFormItemLayout}>
			          <Button 
			          	type="primary"
			          	onClick={this.handleSubmit}
			          	loading={this.props.isAddFeting} 
			          	>新增分类</Button>
			        </FormItem>
			      </Form>
				</div>
			</MyLayout>
		)
	}
}


//
const mapStateToProps = (state)=>{
  console.log(state)
  return{
    isAddFeting:state.get('category').get('isAddFeting'),
    oneCategories:state.get('category').get('oneCategories'),
 /*   name:state.get('category').get('name'),
    pid:state.get('category').get('pid')*/
  }
}
//
const mapDispatchToProps = (dispatch)=>{
  return{
    handleAdd:(values)=>{
      dispatch(actionCreators.getAddAction(values))
    },
    handleGetOneCategory:()=>{
    	dispatch(actionCreators.GetCategoryOneAction())
    }
  }
}
const CategoryAdd=  Form.create()(NormalCategoryForm)
//const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
//
export default connect(mapStateToProps,mapDispatchToProps)(CategoryAdd);
