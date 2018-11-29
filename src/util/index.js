
//摘离ajax,优化
//axios里面,使用params传递数据
//data:
// `data`是要作为请求体发送的数据
//仅适用于请求方法'PUT'，'POST'和'PATCH' 
import axios from 'axios';
export const proajax=(options)=>{
	return new Promise((resolve,reject)=>{
		const params = {
		  method: options.method || 'get',
		  url: options.url || '',
		  //客戶端發送請求的時候會把cookie發送到服務器端,服務器端根據發送過來的信息判斷用戶有沒有登錄
		  withCredentials:true			
		}
		switch(params.method.toUpperCase()){
			case 'GET':
			case 'DELETE':
				params.params=options.data
			break;
			default:
				params.data=options.data
		}
		console.log('params',params)
		axios(params)
		.then(result=>{
          let data = result.data;
          if(data.code == 10){
          	//
          	removeUsername();
          	window.location.href='/login';
          	reject(data.message)
          }else{
          	resolve(data)
          }
          resolve(data)
		})
		.catch(err=>{
			reject(err)
		})
	})
}

//储存用户名
export const setUsername = (username)=>{
	window.localStorage.setItem('username',username)
}
//获取
export const getUsername = ()=>{
	return window.localStorage.getItem('username')
}
//删除
export const removeUsername = ()=>{
	window.localStorage.removeItem('username')
}
