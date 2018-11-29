

import React,{ Component } from 'react';
import { Alert } from 'antd';
import { Link } from 'react-router-dom'
class Errorpage extends Component{
	render(){
		return (
			<div>
				<Alert message="Error Text" type="error" />
				<Link to="/">返回首页</Link>				
			</div>
			)
	}
}

export default Errorpage;