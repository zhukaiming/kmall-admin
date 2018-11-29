
//合并reducers
// import { combineReducers } from 'redux';
//redux-immutable里面的combineReducers方法生成的store中的state方法是immutable对象
import { combineReducers } from 'redux-immutable';
import { reducer as loginReducer } from 'pages/login/store';
import { reducer as homeReducer } from 'pages/home/store';
import { reducer as userReducer } from 'pages/user/store';
import { reducer as categoryReducer } from 'pages/category/store';
import { reducer as productReducer } from 'pages/product/store';

//合并引入的reducer,state下面新建了todolist属性,它存储着对应reducer的数据
//再由store把state返回给组件
export default combineReducers({
	login:loginReducer,
	home:homeReducer,
	user:userReducer,
	category:categoryReducer,
	product:productReducer


})