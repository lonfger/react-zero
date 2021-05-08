const {merge} = require('webpack-merge');
const path = require('path');
const DotenvWebpack = require('dotenv-webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, 'client', 'build'),
    publicPath: '/client'
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'pro',
      template: path.resolve(__dirname, './client/public/index.html')
    }),
    new DotenvWebpack({
      path: path.resolve(__dirname, '.dev.env')
    })
  ]
});