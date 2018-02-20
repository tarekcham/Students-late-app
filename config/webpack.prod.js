const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css"
})

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
    stats: {
      colors: true
    }
  },
  module: {
    rules: [{
        test: /\.js$/,
        use: [{
          loader: 'babel-loader'
        }],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            { loader: 'css-loader', options: { minimize: true } },
            { loader: 'sass-loader' },
          ],
          fallback: 'style-loader'
        })
      },
      {
          test: /\.html$/,
          exclude: /node_modules/,
          use: {loader: 'html-loader'}
      },
      {
        test: /\.(jpg|gif|png)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'images/[name].[extractt]'
          }
        }]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    extractSass,
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin(),
    new MinifyPlugin()
  ]
}
