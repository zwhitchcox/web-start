const path = require('path')
const root = path.resolve(__dirname, '..')
const config = require(`${root}/webpack.config`)
const webpack = require('webpack')
const cp = require('child_process')

config.devtool = 'source-map'
const compiler = webpack(config)
let server;
compiler.watch({}, (err, stats) => {
  if (handleErrors(err, stats)) return

  if (server) server.kill('SIGTERM')
  server = cp.spawn('node', [`${root}/dist/server.js`], {stdio: 'inherit'})
})

process.on('exit', () => server && server.kill('SIGTERM'))

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
