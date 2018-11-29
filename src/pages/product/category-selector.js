

//父组件传递一个方法给子组件,子组件通过给这个方法传递参数,把信息传递给父组件
//
import React,{Component} from 'react';
import MyLayout from 'common/layout';
import { proajax } from 'util';
import * as types from './store/actionType.js';
import { Select  } from 'antd';
import { GET_CATEGORY } from 'api';
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

const Option = Select.Option;
class CreateSelect extends Component{
	constructor(props){
		super(props)
    //存储数据
		this.state={
			levalOneCategories:[],
			levalOneCategoriesId:'',
			levalTwoCategories:[],
			levalTwoCategoriesId:'',
      needToLoadLevalTwo:false,
      isChanged:false
		}
		this.handleOneCategory = this.handleOneCategory.bind(this)
		this.handleTwoCategory = this.handleTwoCategory.bind(this)
	}
  componentDidMount(){
  	this.loadOneCategory();//执行函数,发送ajax请求
  }
  //props是父组件传来的parentCategoryId和categoryId
  //回填商品分类
  //props发生变化,更新state的场景
  static getDerivedStateFromProps(props,state){
    console.log('props',props)
    console.log('state',state)
    // console.log('state.....1',props.parentCategoryId)
    // console.log('state.....2',state.levalOneCategoriesId)
    //
    const levalOneCategoriesIdChanged = props.parentCategoryId !== state.levalOneCategoriesId;
    const levalTwoCategoriesIdChanged = props.categoryId !== state.levalTwoCategoriesId;
    //
    if(state.levalOneCategoriesIdChanged && !props.parentCategoryId && !props.categoryId){
      return null;
    }
    //如果分类id没有改变,不更新state
    if(!levalOneCategoriesIdChanged && !levalTwoCategoriesIdChanged){
      return null;
    }
    //
    if(state.isChanged){
      return null;
    }

    if(props.parentCategoryId == 0){//只有一级分类
      return {
        levalOneCategoriesId:props.categoryId,//
        levalTwoCategoriesId:'',
        isChanged:true     
      }
    }else{
      return {
        levalOneCategoriesId:props.parentCategoryId,
        levalTwoCategoriesId:props.categoryId,
        needToLoadLevalTwo:true,
        isChanged:true  
      }
    }
    return null;
  }
  //获取二级分类
  componentDidUpdate(){
    console.log('this.state.needToLoadLevalTwo',this.state.needToLoadLevalTwo)
    if(this.state.needToLoadLevalTwo){
      this.loadTwoCategory();
      this.setState({
        needToLoadLevalTwo:false
      })
    }
  }
  //获取一级分类
  loadOneCategory(){
        proajax({
          method: 'get',
          url: GET_CATEGORY,
          data:{
          	pid:0
          }
        })
        .then((result)=>{
          //console.log('res::',result.data)
          //
          if(result.code == 0){
            //从服务器端接收所有的一级分类
          	this.setState({
          		levalOneCategories:result.data
          	})
          }
        })
  }
   //选择一级分类一级分类
  // value:选择的一级分类的id
  handleOneCategory(value){
    //console.log('value',value)
  	this.setState({
  			levalOneCategoriesId:value,
			  levalTwoCategories:[],//当每次选择一级分类之后,置空,更新二级分类
			  levalTwoCategoriesId:''
  	},()=>{//加载二级分类
  		this.loadTwoCategory();
      this.onValueChange()//获取一级分类id
  	})
  }
  //chuli二级分类
  loadTwoCategory(){
        proajax({
          method: 'get',
          url: GET_CATEGORY,
          data:{
          	pid:this.state.levalOneCategoriesId//一级分类的id
          }
        })
        .then((result)=>{
          if(result.code == 0){
          	this.setState({
          		levalTwoCategories:result.data//更新获取二级分类
          	})
          }
        }) 	
  }
  //
  handleTwoCategory(value){
    this.setState({
        levalTwoCategoriesId:value,
    },()=>{
      this.onValueChange()
    })
  }
  //
  //父组件传递GetCategoryId方法到子组件,子组件通过传递levalOneCategoriesId,levalTwoCategoriesId
  //参数给该方法,暴露levalOneCategoriesId和levalTwoCategoriesId给父组件
  onValueChange(){
    const {levalOneCategoriesId,levalTwoCategoriesId} = this.state;
    //如果选择的是二级分类，父id是一级分类,id是它本身
    //如果选择的是一级分类，父id:pid=0，id是该一级分类
    if(levalTwoCategoriesId){
      this.props.GetCategoryId(levalOneCategoriesId,levalTwoCategoriesId)
    }else{
      this.props.GetCategoryId(0,levalOneCategoriesId)
    }
  }
	render(){
    //定义变量
    //levalTwoOptions.length：没有二级分类的话,清除后面的框
	  const {levalOneCategories,levalOneCategoriesId,levalTwoCategories,levalTwoCategoriesId} = this.state;
  	const levalOneOptions = levalOneCategories.map(category => <Option key={category._id} value = {category._id}>{category.name}</Option>);
  	const levalTwoOptions = levalTwoCategories.map(category => <Option key={category._id} value = {category._id}>{category.name}</Option>);
		return (
	      <div>
	        <Select 
	        	style={{ width: 400 }}
	        	onChange={this.handleOneCategory}
            disabled={this.props.disabled}
            defaultValue={ levalOneCategoriesId }
            value={ levalOneCategoriesId }
	        	>
	          {levalOneOptions}
	        </Select>
          {
            levalTwoOptions.length
            ? <Select
              style={{ width: 400 }}
              defaultValue={ levalTwoCategoriesId }
              value={ levalTwoCategoriesId }
              onChange={this.handleTwoCategory}
              disabled={this.props.disabled}
              >
              {levalTwoOptions}
            </Select>
          : null
          }

	      </div>				
			)
	}
}

export default CreateSelect;