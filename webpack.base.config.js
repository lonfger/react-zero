const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');

const ROOT_PATH = __dirname;
const APP_PATH = path.resolve(ROOT_PATH, 'client');
const BUILD_PATH = path.resolve(APP_PATH, 'build');

module.exports = {
  entry: path.resolve(APP_PATH, 'src/index.tsx'),
  devServer: {
    contentBase:  BUILD_PATH,
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
      contentBase: BUILD_PATH,
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
      '*': path.resolve(APP_PATH, 'src/*')
    }
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    })
  ]
}