
//封装actions的函数
import axios from 'axios';
import { message } from 'antd';
import { proajax,setUsername } from 'util';
import { GET_USER } from 'api';
import * as types from './actionType.js';
//paylod服务器端获取的数据
const getPageActionDone = (payload)=>{
	return{
		type:types.LOGIN_USER,
    payload
	}
}
const getCategoryDone = ()=>{
  return{
    type:types.LOGIN_DONE
  }
}
export const getPageAction = (page)=>{
	//返回一个函数
	//函数接收dispatch参数
  //在api定义请求地址url
	//发送ajax请求到服务端
  console.log(page)
	return (dispatch)=>{
        proajax({
          method:'get',
          url: GET_USER,
          data:{
            page:page
          }
        })
        .then((result)=>{//接收服务器传过来的数据
          console.log('count...',result)
          if(result.code == 0){
             //console.log('datapage...',result.data)
          	//成功的话进入首页
          	//然后存储用户信息在浏览器
          	//window.localStorage.setItem('username',result.data.username);
          	// setUsername(result.data.username)
            // window.location.href='/';
            dispatch(getPageActionDone(result.data));//派发action
          }else if(result.code == 10){
            message.error('获取统计数据失败')
          }
        })
        .catch((e)=>{
          message.error('获取统计数据网络错误')
        })      
     }
}

