const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		main: ['./src/main.js']		
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, '../dist')
	},
	devServer: {
		contentBase: "dist",
		overlay: true,
		hot: true,
		stats: {
			colors: true
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{ 
						loader: 'babel-loader'
					}
				],
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'sass-loader'
					},						
				]
			},
			{
				test: /\.css$/,
				use: [
					{ 
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
					}
				]
			},		
   {
      test: /\.html$/,
      exclude: /node_modules/,
      use: {loader: 'html-loader'}
   },
   {
				test: /\.(jpg|gif|png)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'images/[name].[ext]'
						}
					}
				]
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new HtmlWebpackPlugin()
	]
}