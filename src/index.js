//配置入口文件

//引入react,用react的语法
import React from 'react';
//ReactDOM用来把组件挂载到DOM节点上
import ReactDOM from 'react-dom';
import App from './App';
import store from './store/index.js';
import { Provider } from 'react-redux';
//把<App />插入到<div id="root">中
/*让所有的组件都可以使用store*/
ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>	
		,document.getElementById('root')
);