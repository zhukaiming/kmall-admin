//
import React,{Component} from 'react';
import MyLayout from 'common/layout';
import CategoryList from './list.js';
import CategoryAdd from './add.js';
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
class Category extends Component{
	render(){
		return(
				<div>
					<Switch>
						<Route path="/category/add" component={ CategoryAdd } />
					
						<Route path="/category/:pid?" component={ CategoryList } />
					</Switch>	
				</div>
			)
	}
}
//
export default Category;
