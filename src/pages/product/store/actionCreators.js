
//封装actions的函数
import * as types from './actionType.js';
import axios from 'axios';
import { message } from 'antd';
import { proajax } from 'util';
import { 
  GET_PRODUCY_DETAIL,
  GET_CATEGORY,
  CAHNGE_CATEGORY,
  UPDATA_ORDER,
  ADD_PRODUCT,
  GET_Product,
  UPDATA_PRODUCT_ORDER,
  UPDATA_PRODUCT_STATUS,
  GET_SEARCH_PRODUCT
   } from 'api';

const getSaveRequst = ()=>{
	return{
		type:types.SAVE_REQUST
	}
}
//
const getSaveDone = ()=>{
	return{
		type:types.SAVE_DONE
	}
}

//获取分类分页
const GetCategoriesPage = (payload)=>{
  return{
    type:types.GET_PAGE_CATEGORIES,
    payload
  }
}
//


//
export const GetSetCategoryAction = (parentCategoryId,categoryId)=>{
  return{
    type:types.GET_SET_CATEGORY,
    payload:{
      parentCategoryId,
      categoryId
    }
  }
}

//
export const GetSetImagesAction = (fileList)=>{
  return{
    type:types.GET_SET_IMAGES,
    payload:fileList
  }
}

//GetSetDetailAction

export const GetSetDetailAction = (value)=>{
  return{
    type:types.GET_SET_DETAIL,
    payload:value
  }
}
//
export const categoryErr = ()=>{
  return{
    type:types.CATEGORY_ERR
  }
}

//
export const GetSetEditProduct = (payload)=>{
  return{
    type:types.GET_SET_EDITPRODUCT,
    payload
  }
}

//GetCategoryPageAction
//商品提交,商品编辑
export const getSaveAction = (err,values)=>{
	//返回一个函数
	//函数接收dispatch参数
	//发送ajax请求到服务端
  //发送商品数据信息到服务器
	return (dispatch,getState)=>{
	    // dispatch(getAddRequst());
        //getState方法返回的是整个store的数据
        //获取product组件的数据信息
        //
        let method = 'post';
        if(values.id){
          method='put'
        }
        dispatch(getSaveRequst());
        const state = getState().get('product');
        const categoryId = state.get('categoryId')
        //如果没有选择所属分类
        if(!categoryId){
          dispatch(categoryErr());
          return;
        }
        if(err){
          return;
        }
        //console.log('123',state)
        proajax({
          method: method,
          url: ADD_PRODUCT,
          data:{
            //
            ...values,
            category:categoryId,
            images:state.get('images'),
            detail:state.get('value')
          }
        })
        .then((result)=>{
          console.log('666',result.data)
          if(result.code == 0){
              //dispatch(GetoneCategories(result.data));// 
              message.success(result.message)
              window.location.href = '/product'//
            dispatch(getSaveDone());
          }else{
            message.error('获取失败')
          }
          
        })
        .catch((e)=>{
          message.error('网络错误')
          dispatch(getSaveDone());
        })      
     }
}


//更新order
export const updataOrderAction = (id,newOrder)=>{
  return (dispatch,getState)=>{//获取category上的state
        const state = getState().get('product');
        proajax({
          method: 'put',
          url: UPDATA_PRODUCT_ORDER,
          data:{
            id:id,
            order:newOrder,
            page:state.get('current')//
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


//获取当前分页
export const GetProductPageAction = (page)=>{
  //返回一个函数
  //函数接收dispatch参数
  //发送ajax请求到服务端
  return (dispatch)=>{
        proajax({
          method: 'get',
          url: GET_Product,
          data: {
            page:page,
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

//编辑商品，查看商品
export const SetProductDetailAction = (productId)=>{
  //返回一个函数
  //函数接收dispatch参数
  //发送ajax请求到服务端
  return (dispatch)=>{
        proajax({
          method: 'get',
          url: GET_PRODUCY_DETAIL,
          data: {
            id:productId,
          }
        })
        .then((result)=>{
          if(result.code == 0){
            dispatch(GetSetEditProduct(result.data));//
          }else{
            message.error('获取分类数据失败')
          }
        })
        .catch((e)=>{
          message.error('网络错误')
        })      
     }
}

//更新状态

export const updataStatusAction = (id,newStatus)=>{
  return (dispatch,getState)=>{//获取category上的state
        const state = getState().get('product');
        proajax({
          method: 'put',
          url: UPDATA_PRODUCT_STATUS,
          data:{
            id:id,
            status:newStatus,
            page:state.get('current')//
          }
        })
        .then((result)=>{
          if(result.code == 0){
            message.success(result.message)
            //console.log('order...',result.data)
          }else{
            message.error('获取失败')
            dispatch(GetCategoriesPage(result.data));//

          }
        })
        .catch((e)=>{
          message.error('网络错误')
        })      
     }
}

//搜索
export const getSearchAction = (keyWord,page=1)=>{
  return (dispatch)=>{
        proajax({
          method: 'get',
          url: GET_SEARCH_PRODUCT,
          data: {
            page,
            keyWord
          }
        })
        .then((result)=>{
          console.log('res...',result)
          if(result.code == 0){
            dispatch(GetCategoriesPage(result.data));
          }else{
            message.error('搜索失败')
          }
        })
        .catch((e)=>{
          message.error('网络错误')
        })      
     }  
}

