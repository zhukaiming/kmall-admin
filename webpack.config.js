	

//配置
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const publicPath = "/";
module.exports = {
	mode:'development',
	//入口文件
	entry: './src/index.js',
	//出口文件
	output: {
		//
		filename: 'bundle.js',
		//path.resolve() 方法会把一个路径或路径片段的序列解析为一个绝对路径。
		publicPath:publicPath,
		path: path.resolve(__dirname, 'dist')
	},
	//配置别名
	resolve:{
		alias:{
			pages:path.resolve(__dirname,'./src/pages'),
			util:path.resolve(__dirname,'./src/util'),
			api:path.resolve(__dirname,'./src/api'),
			common:path.resolve(__dirname,'./src/common')
		}
	},
   	module: {//
		rules: [//
			{
		  		test: /\.css$/,
		        use: [
		          {
		            loader: MiniCssExtractPlugin.loader,
		            options: {
		              // you can specify a publicPath here
		              // by default it use publicPath in webpackOptions.output
		              publicPath: '../'
		            }
		          },
		          "css-loader"
		        ]
			},
			{
				test:/\.(png|jpg|gif)$/,
				use:[
					'url-loader'
				]
			},
		    {//
		        test:/\.js$/,
		        exclude: /(node_modules)/,
		        use: {
		            loader: 'babel-loader',
		            options: {
		                presets: ['env','es2015','react','stage-3'],
		                //按需加载#
		                //只加载用到的组件
						plugins: [
						   ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }] // `style: true` 会加载 less 文件
						 ]		                
		            }
		        }               
		    }			
		]
   	},
   	//自动生成html
	plugins:[
	    new htmlWebpackPlugin({
	    	//模板文件
	        template:'./src/index.html',
	        filename:'index.html',
	        inject:true,
	        hash:true
	    }),
	    new CleanWebpackPlugin(['dist']),//清除文件
	    new MiniCssExtractPlugin({})
	],
	devServer:{//实时重新加载页面
		contentBase: './dist',
		historyApiFallback:true,
		//port:3002
	}
}
