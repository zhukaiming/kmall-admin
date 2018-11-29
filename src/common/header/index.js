

import React,{ Component } from 'react';
import { getUsername } from 'util';
import { Layout, Menu, Dropdown,Breadcrumb, Icon } from 'antd';
import './index.css';
import { proajax,setUsername,removeUsername } from 'util';
import { LOGIN_OUT } from 'api';
const { SubMenu } = Menu;
const { Header} = Layout;
class MyHeader extends Component{
	constructor(props){
		super(props)
		this.handleOut = this.handleOut.bind(this);
	}
	handleOut(){
		proajax({
			url:LOGIN_OUT
		})
		.then((result)=>{
			removeUsername();
			window.location.href='/login'
		})
	}
	render(){
		const menu = (
		  <Menu>
		    <Menu.Item onClick={this.handleOut} key="0">
		      <a href="#"><Icon type="logout" style={{ fontSize: 16, color: '#08c' }} />退出</a>
		    </Menu.Item>
		  </Menu>
		)
		return (
				<div className = "Header">
				    <Header className="header">
				      <div className="logo">Kmall</div>
					  <Dropdown className="dropdown" overlay={menu} trigger={['click']}>
					    <a className="ant-dropdown-link" href="#">
					      {getUsername()} <Icon type="down" />
					    </a>
					  </Dropdown>
				    </Header>					
				</div>
			)
	}
}

export default MyHeader;