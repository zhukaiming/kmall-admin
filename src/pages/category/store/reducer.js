

// state=defaultState,action
import * as types from './actionType.js';
const { fromJS } = require('immutable');
const defaultState=fromJS({//包装为一个immutable对象Map
		isAddFeting:false,
		isPageFeting:false,
    current:0,
    total:0,
    pageSize:0,
    list:[],
		oneCategories:[],
		updataName:'',
		updataId:'',
		updataVisible:false
})
//
export default (state=defaultState,action)=>{

	if(action.type == types.ADD_REQUST){
		return state.set('isAddFeting',true)
	}
	if(action.type == types.ADD_DONE){
		return state.set('isAddFeting',false)
	}
	if(action.type == types.GET_CATEGORIES){
		//immutable对象的set方法
		return state.set('oneCategories',fromJS(action.payload))
	}

	if(action.type == types.UPDATA_MODAL){
		//immutable对象的set方法
		return state.merge({
			updataVisible:true,
			updataName:action.payload.updataName,
			updataId:action.payload.updataId
		})
	}

	if(action.type == types.CANCEL_OUT){
		//immutable对象的set方法
		return state.set('updataVisible',false)
	}
	
	//
	/*
	if(action.type == types.GET_PAGE_CATEGORIES){
		//immutable对象的set方法
		return state.set('oneCategories',fromJS(action.payload))
	}	
	*/
	if(action.type == types.GET_PAGE_CATEGORIES){

		return state.merge({
			current:action.payload.current,
			total:action.payload.total,
			pageSize:action.payload.pageSize,
			list:fromJS(action.payload.list)//
		})

	}
	
	if(action.type == types.CHANGE_NAME){
		//immutable对象的set方法
		return state.set('updataName',action.payload)
	}
	
	if(action.type == types.UPDATA_CATEGORY){

		return state.merge({
			updataVisible:false
		})

	}
	return state;
}