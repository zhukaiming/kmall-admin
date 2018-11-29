
//封装actions的函数
import * as types from './actionType.js';
import axios from 'axios';
import { message } from 'antd';
import { proajax } from 'util';
import { ADD_CATEGORY,GET_CATEGORY,CAHNGE_CATEGORY,UPDATA_ORDER } from 'api';

const getAddRequst = ()=>{
	return{
		type:types.ADD_REQUST
	}
}
//
const getAddDone = ()=>{
	return{
		type:types.ADD_DONE
	}
}
//获取分类
const GetoneCategories = (payload)=>{
  return{
    type:types.GET_CATEGORIES,
    payload
  }
}
//
//获取分类分页
const GetCategoriesPage = (payload)=>{
  return{
    type:types.GET_PAGE_CATEGORIES,
    payload
  }
}
//

const upDataCategoryName = (payload)=>{
  return{
    type:types.UPDATA_CATEGORY,
    payload
  }
}
//更改分类
//存储updataId,updataName,更新分类
export const upDataModalAction = (updataId,updataName)=>{
  return{
    type:types.UPDATA_MODAL,
    payload:{
      updataId,
      updataName
    }
  }
}

//存储，更新
export const handleCancelAction = ()=>{
  return{
    type:types.CANCEL_OUT
  }
}

//GetCategoryPageAction
//添加分类
export const getAddAction = (values)=>{
	//返回一个函数
	//函数接收dispatch参数
	//发送ajax请求到服务端
	return (dispatch)=>{
	    // dispatch(getAddRequst());
        proajax({
          method: 'post',
          url: ADD_CATEGORY,
          data:values
        })
        .then((result)=>{
          console.log('666',result)
          if(result.code == 0){
            if(result.data){//如果添加的是一级分类,从新更新一级分类
              dispatch(GetoneCategories(result.data));// 
            }
            message.success('添加分类成功')
          }else{
            message.error('获取失败')
          }
          
        })
        .catch((e)=>{
          message.error('网络错误')
          dispatch(getAddDone());
        })      
     }
}

//获取一级分类
export const GetCategoryOneAction = ()=>{
  //返回一个函数
  //函数接收dispatch参数
  //发送ajax请求到服务端
  return (dispatch)=>{
        proajax({
          method: 'get',
          url: GET_CATEGORY,
          data: {
            pid:0//获取根分类的所有一级分类
          }
        })
        .then((result)=>{
          if(result.code == 0){
            console.log('set...',result)
            dispatch(GetoneCategories(result.data));//
          }else{
            message.error('获取失败')
          }
        })
        .catch((e)=>{
          message.error('网络错误')
        })      
     }
}
//
//获取当前pid的分页
export const GetCategoryPageAction = (pid,page)=>{
  //返回一个函数
  //函数接收dispatch参数
  //发送ajax请求到服务端
  return (dispatch)=>{
        proajax({
          method: 'get',
          url: GET_CATEGORY,
          data: {
            pid:pid,//获取根分类的所有一级分类
            page:page
          }
        })
        .then((result)=>{
          if(result.code == 0){
            console.log('get...',result.data)
            dispatch(GetCategoriesPage(result.data));//
          }else{
            message.error('获取失败')
          }
        })
        .catch((e)=>{
          message.error('网络错误')
        })      
     }
}

//更改名称
export const changeNameAction = (payload)=>{
  return{
    type:types.CHANGE_NAME,
    payload
  }
}

//更新分类名称

export const updataCategoryAction = (pid)=>{
  return (dispatch,getState)=>{//获取category上的state
        const state = getState().get('category');
        proajax({
          method: 'put',
          url: CAHNGE_CATEGORY,
          data:{
            id:state.get('updataId'),
            name:state.get('updataName'),
            pid:pid,
            page:state.get('current')//当前页码
          }
        })
        .then((result)=>{
          if(result.code == 0){
            console.log('getup...',result.data)
            dispatch(GetCategoriesPage(result.data));//
            message.success('添加分类成功')
            dispatch(handleCancelAction())

          }else{
            message.error('获取失败')
          }
        })
        .catch((e)=>{
          message.error('网络错误')
        })      
     }
}


//更新order
export const updataOrderAction = (id,pid,newOrder)=>{
  return (dispatch)=>{//获取category上的state
        proajax({
          method: 'put',
          url: UPDATA_ORDER,
          data:{
            id:id,
            pid:pid,
            order:newOrder
          }
        })
        .then((result)=>{
          if(result.code == 0){
            console.log('order...',result.data)
            dispatch(GetCategoriesPage(result.data));//
          }else{
            message.error('获取失败')
          }
        })
        .catch((e)=>{
          message.error('网络错误')
        })      
     }
}

