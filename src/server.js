const express = require('express')
const app = express()
const path = require('path')
const projectRoot = path.resolve(__dirname, '..')
const httpProxy = require('http-proxy')

if (process.env.NODE_ENV === 'production')
  app.use(express.static(`${projectRoot}/dist/public`))
else {
  const proxy = httpProxy.createProxyServer()
  app.use((req, res) => {
    proxy.web(req, res, { target: 'http://127.0.0.1:9000' })
  })
}
app.listen(4000, err => (err && console.log(err)) || console.log('Server listening on http://localhost:4000'))
