/*
 * @Author: Porco
 * @Date: 2019-09-09 14:34:54
 * @LastEditTime: 2019-11-29 15:34:32
 * @Description: 请填写文件注释
 */
const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, '../dist');
const PUBLIC_DIR = path.resolve(__dirname, '../public');
const PORT = 8081;

module.exports = function () {
	return {
		mode: 'development',
		entry: path.join(__dirname, '../src/index.js'),
		output: {
			path: BUILD_DIR,
			filename: 'bundle.js',
		},
		devServer: {
			contentBase: PUBLIC_DIR,
			host: '0.0.0.0',
			open: false,
			port: PORT,
			inline: true,
		},
		resolve: {
			extensions: [ '.js', '.vue' ],
			alias: {
				'vue$': 'vue/dist/vue.common.js',
				'jquery': path.resolve(__dirname, '../node_modules/jquery/src/jquery')
			}
		},
		module: {
			rules:  [
				{
					test: /\.vue$/,
					loader: `vue-loader`,
				},
				{
					test: /\.js$/,
					loader: `babel-loader`,
					options: {
						plugins: [
							"@babel/plugin-syntax-dynamic-import"
						]
					}
				},
				{
					test: /\.css$/,
					use: [
						'vue-style-loader',
						'css-loader',
					]
				},
				{
					test: /\.scss$/,
					use: [
						'vue-style-loader',
						'css-loader',
						{
							loader: 'sass-loader',
						},
					],
				},
				{
					test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
					loader: 'url-loader',
				},
				{
					test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
					loader: 'file-loader',
				},
			]
		},
		plugins: [
			new VueLoaderPlugin(),
			new HtmlWebpackPlugin({
				inject: true,
				template: path.resolve(__dirname, '../index.html')
			}),
			new CopyWebpackPlugin([
				{ from: path.resolve(__dirname, '../public'), to: BUILD_DIR },
			]),
			new webpack.EnvironmentPlugin({
				NODE_ENV: 'dev',
				DEBUG: true
			})
		]
	};
};
