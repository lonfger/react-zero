const express = require('express');
const path = require('path');
const bs = require('browser-sync');

const app = express();
const SERVER_PATH = path.resolve(__dirname, 'server');
const devConfig = require('./webpack.dev.config');
const proConfig = require('./webpack.pro.config');


const env = process.argv.filter(a => a.startsWith('halo='))[0].split('=')[1];
const isDev = env === 'development'

app.set('views', path.resolve(SERVER_PATH, 'views'));
app.set('view engine', 'pug');

if (isDev) {
  const webpack = require('webpack');
  const WebpackDevMiddleware = require('webpack-dev-middleware');
  const WebpackHotMiddleWare = require('webpack-hot-middleware')
  const config = isDev ? devConfig : proConfig;
  const compiler = webpack(config);

  app.use(WebpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true
    }
  }));

  app.use(WebpackHotMiddleWare(compiler));
  
  app.listen(3000, () => {
    bs.init({
      open: false,
      ui: false,
      notify: false,
      proxy: 'localhost:3000',
      files: ['./client/**'],
      port: 8080
    })
    console.log('Example app listening on port 3000!');
  })
}
