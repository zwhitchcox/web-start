const express = require('express')
const app = express()
const path = require('path')
const projectRoot = path.resolve(__dirname, '..')

app.use(express.static(`${projectRoot}/dist/public`))
app.listen(3000, err => (err && console.log(err)) || console.log('listening'))
