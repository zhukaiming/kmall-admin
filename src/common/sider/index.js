

import React,{ Component } from 'react';
import { getUsername } from 'util';
import './index.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Sider } = Layout;
import { NavLink } from 'react-router-dom';
import User from 'pages/user';
class MySider extends Component{
	render(){
		return (
				<div className="Sider">
			      <Sider width={200} style={{ background: '#fff' }}>
			        <Menu
			          mode="inline"
			          style={{ minHeight: '600px', borderRight: 0 }}
			        >
			            <Menu.Item key="1">
			            	<NavLink exact to="/"><Icon type="smile-o" />首页</NavLink>
			            </Menu.Item>
			            <Menu.Item key="2">
			            	<NavLink to="/user"><Icon type="user" />用户列表</NavLink>
			            </Menu.Item>
			            <Menu.Item key="3">
			            <NavLink to="/category"><Icon type="bars" />分类管理</NavLink>
			            </Menu.Item>
			            <Menu.Item key="4">
			            	<NavLink to="/product"><Icon type="appstore-o" />商品管理</NavLink>
			            </Menu.Item>

			        </Menu>
			      </Sider>					
				</div>
			)
	}
}

export default MySider;