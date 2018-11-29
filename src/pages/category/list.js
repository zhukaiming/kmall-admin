

import React,{Component} from 'react';
import MyLayout from 'common/layout';
import CategoryAdd from './add.js';
import { Table,Breadcrumb,Button,Divider,InputNumber,Modal,Input   } from 'antd';
import { connect } from 'react-redux';
import './index.css'
import { actionCreators } from './store';
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
import moment  from 'moment';


//react-router 4.0 对于接受参数采用 { this.props.match.params.id }
//如下例子：<Route path="list/:id"></Router> 
//<Link to="list/123456"></Link>
//获取参数值的方式是：{ this.props.match.params.id }
class CategoryList extends Component{
  constructor(props){
    super(props)
      console.log(this.props.match.params)
    //存储父级分类id 
    this.state={
      pid:this.props.match.params.pid || 0
    }

  }

  componentDidMount(){
    //调用handlegetUser,发送ajax请求
    //this.state.pid：父级分类id
    this.props.handlegetPage(this.state.pid,1);
    //
    //this.props.handleOk()
  }
  //当点击查看子分类,把父级分类的id更新为该一级分类,页面数据更新为该一级分类的二级分类
  componentDidUpdate(prevProps, prevState){
  //
    let oldPath = prevProps.location.pathname;
    let newPath = this.props.location.pathname;
    //如果新的路径和老的路径相同,更新父级分类的id
    if(oldPath != newPath){
      let newPid = this.props.match.params.pid || 0;
      //更新pid属性
      //显示二级分类

      this.setState({
        pid:newPid
      },()=>{
        this.props.handlegetPage(newPid,1)
      })
    }
  }

  //
/*  handleCancelout(e){
    console.log(e);
    this.setState({
      visible: false,
    });
    //this.props.handleCancel();
  }*/
	render(){
    // console.log('s:::',this.props.updataName)
    const pid = this.state.pid;
    const data=this.props.list.map((category)=>{
      console.log('kkk',category)//
      return {
        key:category.get('_id'),
        id:category.get('_id'),
        name:category.get('name'),
        order:category.get('order'),
      }
    }).toJS();//转化immutable对象
    const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    }, 
    {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '排序',
      dataIndex: 'order',
      key: 'order',
      render:(order,record)=>(
        <InputNumber 
          defaultValue={order} 
          //
          onBlur={(e)=>{
            //console.log(e.target.value)
            this.props.handleUpdataOrder(record.id,pid,e.target.value)
          }}
          />
      )
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;"
          //定义一个onClick事件,把id和name穿进去
          onClick={
            ()=>this.props.handleUpdataModal(record.id,record.name)
          }
          >
            更新名称

          </a>
                <Divider type="vertical" />
                <Link to={"/category/"+record.id}>查看子分类</Link>          
        </span>
      ),
    }
    ];
    // console.log('2:::',this.props.updataName)
		return(
			<MyLayout>
				<div className="list">
          <Breadcrumb>
            <Breadcrumb.Item>Category</Breadcrumb.Item>
            <Breadcrumb.Item><a href="">分类列表</a></Breadcrumb.Item>
          </Breadcrumb>
          <div>
            <h3 style={{ 'float':'left' ,'marginTop':'6px' }}>父级分类:{ pid }</h3>
          </div>
          <div className="clearfix">
						<Link to="/category/add">
              <Button type="primary" style={{ 'float':'right' }}>新增分类</Button>
            </Link>
          </div> 
					<div>
						<Table 
						 	dataSource={data} 
						 	columns={columns}
              pagination = {
                {
                defaultCurrent:this.props.current,
                current:this.props.current,
                total:this.props.total,
                pageSize:this.props.pageSize
                }
              }
              onChange={(pagination)=>{
                console.log('pagination...',pagination)
                //
                this.props.handlegetPage(pid,pagination.current)
              }}
              loading={
                {
                  spinning:this.props.isPageFeting,
                  tip:'正在加载'
                }
              }
						/>
          <Modal
            title="修改分类"
            visible={this.props.updataVisible}
            onOk={()=>{
              this.props.handleUpdataCategoryName(pid)}}
            onCancel={this.props.handleCancel}
          >
            <p>
              <Input 
                defaultValue={this.props.updataName}
                //e.target.value
                onChange={(e)=>{
                  this.props.handleChangeName(e.target.value)
                }}
                />
            </p>
          </Modal>
					</div>
				</div>
			</MyLayout>
			)
	}
}

//映射store的state方法到组件的props上
const mapStateToProps = (state)=>{
  return {
      isPageFeting:state.get('category').get('isPageFeting'),
      current:state.get('category').get('current'),
      total:state.get('category').get('total'),
      pageSize:state.get('category').get('pageSize'),
      list:state.get('category').get('list'),
      updataVisible:state.get('category').get('updataVisible'),
      updataId:state.get('category').get('updataId'),
      updataName:state.get('category').get('updataName')
      //handleCancel:state.get('category').get('handleCancel'),

  }
}
//
//映射handlegetcount方法到组件的props上
//组件加载完之后调用handlegetcount方法,通过派发action发送ajax请求
//请求成功之后再次派发一个action去更新store.state数据
const mapDispatchToProps = (dispatch)=>{
  return{
    handlegetPage:(pid,page)=>{
      dispatch(actionCreators.GetCategoryPageAction(pid,page))
    },
    handleUpdataModal:(updataId,updataName)=>{
      dispatch(actionCreators.upDataModalAction(updataId,updataName))
    },
    handleCancel:()=>{
      dispatch(actionCreators.handleCancelAction())
    },
    handleChangeName:(newName)=>{
      dispatch(actionCreators.changeNameAction(newName))
    },
    handleUpdataCategoryName:(pid)=>{
      dispatch(actionCreators.updataCategoryAction(pid))
    },
    handleUpdataOrder:(id,pid,newOrder)=>{
      dispatch(actionCreators.updataOrderAction(id,pid,newOrder))
    }
  }
}

//

export default connect(mapStateToProps,mapDispatchToProps)(CategoryList);
