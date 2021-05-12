const path = require('path');
const qs = require('querystring');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');

const ROOT_PATH = __dirname;
const APP_PATH = path.resolve(ROOT_PATH, 'client');
const WEBPACK_HOT_MIDDLEWARE = `webpack-hot-middleware/client?${qs.stringify({
  reload: true,
  ansiColors: '00FF00',
  color: '#ff0000',
  timeout: 20000,
  path: '/_webpack_hmr'
})}`;

module.exports = {
  entry: [path.resolve(APP_PATH, 'src/index.tsx'), WEBPACK_HOT_MIDDLEWARE],
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