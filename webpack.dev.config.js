const {merge} = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const DotenvWebpack = require('dotenv-webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('./webpack.base.config');
const APP_PATH = path.resolve(__dirname, 'client');
const BUILD_PATH = path.resolve(APP_PATH, 'build');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: '[name].bundle.js',
    path: BUILD_PATH,
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HTMLWebpackPlugin({
      title: 'dev',
      template: path.resolve(__dirname, './client/public/index.html')
    }),
    new DotenvWebpack({
      path: path.resolve(__dirname, '.dev.env')
    })
  ]
});