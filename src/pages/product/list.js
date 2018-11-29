

import React,{Component} from 'react';
import MyLayout from 'common/layout';
import ProductAdd from './save.js';
import ProductDetail from './detail.js';
import { Table,Breadcrumb,Button,Divider,InputNumber,Modal,Input,Switch   } from 'antd';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import {
// 使用BrowserRouter时,页面刷新会向服务器发送请求,而HashRouter不会
// 使用BrowserRouter时devServer的historyApiFallback:true	
  BrowserRouter as Router,
  // HashRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import moment  from 'moment';

const Search = Input.Search;
//react-router 4.0 对于接受参数采用 { this.props.match.params.id }
//如下例子：<Route path="list/:id"></Router> 
//<Link to="list/123456"></Link>
//获取参数值的方式是：{ this.props.match.params.id }
class ProductList extends Component{
  constructor(props){
    super(props)
      console.log(this.props.match.params)
    //存储父级分类id 
/*    this.state={
      pid:this.props.match.params.pid || 0
    }*/

  }

  componentDidMount(){
    //调用handlegetUser,发送ajax请求
    //this.state.pid：父级分类id
    this.props.handlegetPage(1);
    //
    //this.props.handleOk()
  }
  //
	render(){
    // console.log('s:::',this.props.updataName)
    //const pid = this.state.pid;
    const { keyWord } = this.props;
    const data=this.props.list.map((product)=>{
      return {
        key:product.get('_id'),
        id:product.get('_id'),
        name:product.get('name'),
        status:product.get('status'),

        order:product.get('order'),
      }
    }).toJS();//转化immutable对象
    const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    }, 
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render:(status,record)=>{
      	return(
      			<span>
      				<Switch 
      					checkedChildren = "在售"
      					unCheckedChildren = "下架"
      					defaultChecked = {record.status == '0' ? true : false}
      					onChange = {(checked)=>{
      						this.props.handleStatus(record.id,checked ? '0' : '1')
      					}}
      				/>
      			</span>
      		)
      }
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
            this.props.handleUpdataOrder(record.id,e.target.value)
          }}
          />
      )
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <Link to={"/product/save/"+record.id}>
            编辑
          </Link>
	        <Divider type="vertical" />
	        <Link to={"/product/detail/"+record.id}>
	        	查看
	        </Link>  
        </span>
      ),
    }
    ];
    // console.log('2:::',this.props.updataName)
		return(
			<MyLayout>
				<div className="list">
          <Breadcrumb>
            <Breadcrumb.Item>Product</Breadcrumb.Item>
            <Breadcrumb.Item><a href="">商品列表</a></Breadcrumb.Item>
          </Breadcrumb>
          <div className="clearfix">
            <Search
              placeholder="搜索"
              onSearch={value => {
                this.props.handleSearch(value)
              }}
              enterButton
              style={{ width: 200 }}
            />
						<Link to="/product/save">
              <Button type="primary" style={{ 'float':'right' }}>新增</Button>
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
                if(keyWord){
                  this.props.handleSearch(keyWord,pagination.current)
                }else{
                 this.props.handlegetPage(pagination.current) 
                }
              }}
              loading={
                {
                  spinning:this.props.isAddFeting,
                  tip:'正在加载'
                }
              }
						/>
					</div>
				</div>
			</MyLayout>
			)
	}
}

//映射store的state方法到组件的props上
const mapStateToProps = (state)=>{
  return {
      isAddFeting:state.get('product').get('isAddFeting'),
      current:state.get('product').get('current'),
      total:state.get('product').get('total'),
      pageSize:state.get('product').get('pageSize'),
      list:state.get('product').get('list'),
      keyWord:state.get('product').get('keyWord'),

      //handleCancel:state.get('category').get('handleCancel'),

  }
}
//
//映射handlegetcount方法到组件的props上
//组件加载完之后调用handlegetcount方法,通过派发action发送ajax请求
//请求成功之后再次派发一个action去更新store.state数据
const mapDispatchToProps = (dispatch)=>{
  return{
  	//分页
    handlegetPage:(page)=>{
      dispatch(actionCreators.GetProductPageAction(page))
    },
    //排序
    handleUpdataOrder:(id,newOrder)=>{
      dispatch(actionCreators.updataOrderAction(id,newOrder))
    },
    handleStatus:(id,newStatus)=>{
    	dispatch(actionCreators.updataStatusAction(id,newStatus))
    },
    handleSearch:(keyWord,page)=>{
      dispatch(actionCreators.getSearchAction(keyWord,page))
    }
  }
}

//

export default connect(mapStateToProps,mapDispatchToProps)(ProductList);

//id 名称 状态 排序 操作