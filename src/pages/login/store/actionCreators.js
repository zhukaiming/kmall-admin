
//封装actions的函数
import * as types from './actionType.js';
import axios from 'axios';
import { message } from 'antd';
import { proajax,setUsername } from 'util';
import { ADMIN_LOGIN } from 'api';

const getLoginRequst = ()=>{
	return{
		type:types.LOGIN_REQUST
	}
}
//
const getLoginDone = ()=>{
	return{
		type:types.LOGIN_DONE
	}
}
export const getLoginAction = (values)=>{
	//返回一个函数
	//函数接收dispatch参数
	//发送ajax请求到服务端
	return (dispatch)=>{

	    dispatch(getLoginRequst());
        proajax({
          method: 'post',
          url: ADMIN_LOGIN,
          data:values
        })
        .then((result)=>{
          //console.log('111',result)
          //result:{code,data}
          //接收result.data
          //let data = result.data;
          //成功
          if(result.code == 0){
          	//成功的话进入首页
          	//然后存储用户信息在浏览器
          	//window.localStorage.setItem('username',result.data.username);
          	setUsername(result.data.username);
            window.location.href='/';
          }else if(result.code == 1){
            message.error(result.message)
            dispatch(getLoginDone());
          }
        })
        .catch((e)=>{
          message.error('网络错误')
          dispatch(getLoginDone());
        })      
     }
}

