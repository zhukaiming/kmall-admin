
//
import { createStore,applyMiddleware  } from 'redux';
import reducer from './reducer.js';
//安装redux的中间件,处理异步请求
//可以让dispatch(action)方法接收函数
import thunk from 'redux-thunk';
//
const midleware = [thunk];
//redux-logger中间件,协助开发
import { createLogger } from 'redux-logger'
//如果不是生产环境的话,显示调试状态信息
if(process.env.NODE_ENV != 'production'){
	const logger = createLogger();
	midleware.push(logger)
}

const store = createStore(reducer,applyMiddleware(...midleware));

export default store;