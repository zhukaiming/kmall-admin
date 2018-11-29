

import React,{ Component } from 'react';
import { getUsername } from 'util';
import { Card, Col, Row } from 'antd';
import MyLayout from 'common/layout';
import { connect } from 'react-redux';
import { actionCreators } from './store';
class Home extends Component{
	componentDidMount(){
		//调用handlegetcount,
		//发送ajax
		this.props.handlegetcount();
	}
	render(){
		return (
			<div>
			<MyLayout>
			  <div style={{ background: '#ECECEC', padding: '30px' }}>
			    <Row gutter={16}>
			      <Col span={8}>
			        <Card title="用户" bordered={false}>{this.props.usernum}</Card>
			      </Col>
			      <Col span={8}>
			        <Card title="订单数" bordered={false}>{this.props.ordernum}</Card>
			      </Col>
			      <Col span={8}>
			        <Card title="商品数" bordered={false}>{this.props.productnum}</Card>
			      </Col>
			    </Row>
			  </div>
	        </MyLayout>
	        </div>
			)
	}
}

//isFeting:state.get('login').get('isFeting')
const mapStateToProps = (state)=>{
  console.log('233...',state.get('home'))
  return{
  	usernum:state.get('home').get('usernum'),
  	ordernum:state.get('home').get('ordernum'),
  	productnum:state.get('home').get('productnum')
  }
}

//映射handlegetcount方法到组件的props上
//组件加载完之后调用handlegetcount方法,通过派发action发送ajax请求
//请求成功之后再次派发一个action去更新store.state数据
const mapDispatchToProps = (dispatch)=>{
  return{
    handlegetcount:()=>{
      const action = actionCreators.getCountAction();
      dispatch(action)
    }
  }
}

// export default Home;
export default connect(mapStateToProps,mapDispatchToProps)(Home);