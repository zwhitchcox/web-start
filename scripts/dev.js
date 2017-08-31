const path = require('path')
const root = path.resolve(__dirname, '..')
const config = require(`${root}/webpack.config`)
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const cp = require('child_process')

const [ serverConf, webConf] = config
config.forEach(conf => {
  conf.devtool = 'source-map'
  conf.plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"development"',
  }))
})


const serverCompiler = webpack(serverConf)
let server;
serverCompiler.watch({}, (err, stats) => {
  if (handleErrors(err, stats)) return
  if (server) server.kill('SIGTERM')
  server = cp.spawn('node', [`${root}/dist/server.js`], {stdio: 'inherit'})
})

process.on('exit', () => server && server.kill('SIGTERM'))

const webCompiler = webpack(webConf)
const devServer = new WebpackDevServer(webCompiler, {
  stats: {
    colors: true,
    debug: true,
  },
})
devServer.listen(9000, '127.0.0.1', () => console.log('starting server on localhost:9000'))

function handleErrors(err, stats) {
  const info = stats.toJson()
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return true;
  }
  if (stats.hasErrors()) {
    console.log(require('utf8').encode(info.errors[0]))
    return true
  }
  if (stats.hasWarnings()) {
    //console.log(require('utf8').encode(info.warnings[0])) 
  }
}
