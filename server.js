const express = require('express');
const webpack = require('webpack');
const WebpackDevMiddleWare = require('webpack-dev-middleware');

const app = express();

const devConfig = require('./webpack.dev.config');
const proConfig = require('./webpack.pro.config');

const env = process.argv.filter(a => a.startsWith('halo='))[0].split('=')[1];
const config = env === 'development' ? devConfig : proConfig;
const compiler = webpack(config);

app.use(WebpackDevMiddleWare(compiler, {
  publicPath: config.output.publicPath,
  index: true
}));

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
})