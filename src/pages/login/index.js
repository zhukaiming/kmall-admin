
import React,{Component} from 'react';
//message全局提示
import { Form, Icon, Input, Button,message } from 'antd';
import axios from 'axios';
import './index.css';
import { actionCreators } from './store';
import { connect } from 'react-redux';
const FormItem = Form.Item;

class NormalLoginForm  extends React.Component{
	constructor(props){
		super(props)

		this.handleSubmit = this.handleSubmit.bind(this);
	}
  handleSubmit(e){
  	//阻止默认行为
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      //如果成功的话
      if (!err) {
        console.log(values)
        
        this.props.handleLogin(values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
    	<div className="login">
      <Form className="login-form">
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名' },{pattern:/^[a-z|\d]{3,6}$/,message:"用户名为3-6个字符"}]
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' },{pattern:/^[a-z|\d]{3,8}$/,message:"密码为3-8个字符"}],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Button 
            type="primary" 
            onClick={this.handleSubmit} 
            loading={this.props.isFeting}
            className="login-form-button">
            登录
          </Button>
        </FormItem>
      </Form>
      </div>
    )
  }
}

const Login=  Form.create()(NormalLoginForm)

const mapStateToProps = (state)=>{
  console.log(state)
  return{
    isFeting:state.get('login').get('isFeting')
  }
}
//
const mapDispatchToProps = (dispatch)=>{
  return{
    handleLogin:(values)=>{
      const action = actionCreators.getLoginAction(values);
      dispatch(action)
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);

