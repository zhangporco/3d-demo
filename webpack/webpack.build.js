const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, '../dist');
module.exports = function (env) {
	return {
		mode: 'production',
		entry: path.join(__dirname, '../src/index.js'),
		output: {
			path: BUILD_DIR,
			filename: 'bundle.js',
		},
		resolve: {
			extensions: [ '.js', '.vue' ],
			alias: {
				'vue$': 'vue/dist/vue.common.js'
			}
		},
		module: {
			rules: [
				{
					test: /\.vue$/,
					loader: `vue-loader`,
				},
				{
					test: /\.js$/,
					loader: `babel-loader`,
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
			])
		]
	};
};
