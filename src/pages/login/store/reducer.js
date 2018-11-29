

// state=defaultState,action
import * as types from './actionType.js';
const { fromJS } = require('immutable');
const defaultState=fromJS({//包装为一个immutable对象Map
	isFeting:false
})
//
//Redux是一个数据层框架
//接收action
//1.reducer是一个纯函数(给定固定的输入,就会有固定的输出)
//2.reducer负责处理逻辑但不改变数据,数据的改变由store负责
//3.action中的type在整个应用中必须唯一
//a.暴露数据更新后的state,返回到store,然后把store里面的state映射到组件的props
//进行数据的更新
//immutable特点:一旦创建就不能被更改,任何修改或添加删除都会返回一个新的immutable对象
//提高效率
//reducer也是一样修改的话会返回一个新的对象
export default (state=defaultState,action)=>{

	if(action.type == types.LOGIN_REQUST){
		/*
		//生成一个新的state
		//深copy
		const newState = JSON.parse(JSON.stringify(state));
		//
		newState.value = action.payload;
		//返回更新完的state
		return newState;
		*/
		//immutable对象的set方法
		return state.set('isFeting',true)
	}
	if(action.type == types.LOGIN_DONE){
		/*
		//生成一个新的state
		//深copy
		const newState = JSON.parse(JSON.stringify(state));
		//
		newState.value = action.payload;
		//返回更新完的state
		return newState;
		*/
		//immutable对象的set方法
		return state.set('isFeting',false)
	}
	return state;
}