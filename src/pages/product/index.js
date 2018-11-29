//
import React,{Component} from 'react';
import MyLayout from 'common/layout';
import ProductList from './list.js';
import ProductAdd from './save.js';
import ProductDetail from './detail.js';
import {
// 使用BrowserRouter时,页面刷新会向服务器发送请求,而HashRouter不会
// 使用BrowserRouter时devServer的historyApiFallback:true	
  BrowserRouter as Router,
  // HashRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'

///category/:pid?
//加上?的作用是,如果没有pid参数的话匹配/category,有的话当参数匹配
class Product extends Component{
	render(){
		return(
				<div>
					<Switch>
						<Route path="/product/save/:productId?" component={ ProductAdd } />
						<Route path="/product/detail/:productId" component={ ProductDetail } />
						<Route path="/product" component={ ProductList } />
					</Switch>	
				</div>
			)
	}
}
//
export default Product;
