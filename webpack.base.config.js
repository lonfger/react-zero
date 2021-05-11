const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: path.resolve(__dirname, './client/src/index.tsx'),
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname,'./client/build'),
    compress: true,
    open: true,
    stats: {
      errorDetails: true,
      colors: true,
      chunks: false,
      hash: true,
      version: true,
      source: true,
      warnings: true,
      noInfo: true,
      contentBase: './client/build',
      hot: true,
      modules: false,
      errors: true,
      reasons: true,
    }
  },
  module: {
    rules: [
      {
        test: /\.(jsx|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env']
          }
        }
      },
      {
        test: /\.css/,
        use: [
          {loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              module: true
            }
          },
          {loader: 'sass-loader'}
        ]
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        type: 'asset'
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '*': path.resolve(__dirname, './client/src/*')
    }
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    })
  ]
}