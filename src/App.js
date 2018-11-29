
import React,{Component} from 'react';

import Login from 'pages/login';
import Home from 'pages/home';
import User from 'pages/user';
import Category from 'pages/category';
import Product from 'pages/product';
import { getUsername } from 'util';
import './App.css';
import  Errorpage  from 'common/err'
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
//ES68
//定义组件，必须继承React.Compoment
//处理业务逻辑,容器组件
//访问根路径,如果用户名存在,执行<Component {...props},渲染home组件,如果没有,自动跳到登录界面
//Switch:成功匹配到第一个，后面的就不在执行
class App extends Component{
	render(){
		const ProtectedRouter = ({ component:Component,...rest})=>(
			<Route 
				{...rest} 
				render={props=>(
				getUsername()
				? <Component {...props} />
				: <Redirect to="/login" />
			)}
			 />
		)

		const LoginRouter = ({ component: Component, ...rest }) =>{
			if(getUsername()){
				return <Redirect to="/" />
			}else{ 
				return <Route {...rest} component={ Component } />
			}
		}

		return(
			<Router forceRefresh={true}>
				<div>
					<Switch>
						<ProtectedRouter exact path="/" component={ Home } />
						<ProtectedRouter  path="/user" component={ User } />
						<ProtectedRouter  path="/category" component={ Category } />
						<ProtectedRouter  path="/product" component={ Product } />
						<LoginRouter path="/login" component={ Login } />
						<Route component={ Errorpage } />
					</Switch>
				</div>
			</Router>
		)
	}
}

export default App;