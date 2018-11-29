

import React,{ Component } from 'react';
import { getUsername } from 'util';
import { Table,Breadcrumb  } from 'antd';
import MyLayout from 'common/layout';
import { connect } from 'react-redux';
import { actionCreators } from './store';
//
import moment  from 'moment';
const columns = [
{
  title: '用户名',
  dataIndex: 'username',
  key: 'name',
}, 
{
  title: '是否为管理员',
  dataIndex: 'isAdmin',
  key: 'isAdmin',
  render:isAdmin=>(
      isAdmin ? '是' : '否'
    )
},
{
  title: '手机',
  dataIndex: 'phone',
  key: 'phone',
},
{
  title: '邮箱',
  dataIndex: 'email',
  key: 'email',
},
{
  title: '日期',
  dataIndex: 'createdAt',
  key: 'time',  
}
];

const dataSource = [{
  key: '1',
  username: 'admin',
  isAdmin: true,
  address: '西湖区湖底公园1号'
}, {
  key: '2',
  username: 'text',
  isAdmin: false,
  address: '西湖区湖底公园1号'
}];


class User extends Component{
  constructor(props){
    super(props)
  }
  componentDidMount(){
    //调用handlegetUser,发送ajax请求
    this.props.handlegetPage(1)
  }
	render(){
    const data=this.props.list.map((user)=>{
      console.log('kkk',user)//
      return {
        key:user.get('_id'),
        username:user.get('username'),
        phone:user.get('phone'),
        email:user.get('email'),
        createdAt:moment(user.get('createdAt')).format('YYYY MM DD,h:mm:ss')
      }
    }).toJS();//转化immutable对象
    console.log('data',data)
		return (
				<div>
					<MyLayout>
          <Breadcrumb>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item><a href="">用户列表</a></Breadcrumb.Item>
          </Breadcrumb>
					 <Table 
             dataSource={data} 
             columns={columns}
             pagination = {
                {
                defaultCurrent:this.props.defaultCurrent,
                total:this.props.total,
                pageSize:this.props.pageSize
                }
             }
             onChange={(pagination)=>{
                console.log('pagination...',pagination)
                this.props.handlegetPage(pagination.current)
             }}
             loading={
                {
                  spinning:this.props.isFeting,
                  tip:'正在加载'
                }
             }
            />
					</MyLayout>
				</div>
			)
	}
}
//映射store的state方法到组件的props上
const mapStateToProps = (state)=>{
  console.log('123..',state)
  return {
/*    [
    username:state.get('user').get('username'),
    isAdmin:false
    ]*/
/*    dataSource:state.get('User').get('dataSource'),
    columns:state.get('User').get('columns'),
    pagination:state.get('User').get('pagination')*/
      isFeting:state.get('user').get('isFeting'),
      current:state.get('user').get('defaultCurrent'),
      total:state.get('user').get('total'),
      pageSize:state.get('user').get('pageSize'),
      list:state.get('user').get('list')
  }
}
//
//映射handlegetcount方法到组件的props上
//组件加载完之后调用handlegetcount方法,通过派发action发送ajax请求
//请求成功之后再次派发一个action去更新store.state数据
const mapDispatchToProps = (dispatch)=>{
  return{
    handlegetPage:(page)=>{
      const action = actionCreators.getPageAction(page);
      dispatch(action)
    }
  }
}
//
export default connect(mapStateToProps,mapDispatchToProps)(User);