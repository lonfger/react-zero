const {merge} = require('webpack-merge');
const path = require('path');
const DotenvWebpack = require('dotenv-webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'client', 'build'),
    publicPath: '/'
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'dev',
      template: path.resolve(__dirname, './client/public/index.html')
    }),
    new DotenvWebpack({
      path: path.resolve(__dirname, '.dev.env')
    })
  ]
});