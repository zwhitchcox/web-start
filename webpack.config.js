const webpack = require('webpack')
const Html = require('html-webpack-plugin')
const path = require('path')

module.exports = [
  {
    entry: `${__dirname}/src/server.js`,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'server.js',
    },
    module: {
      rules: [
        {
          test: /.js$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.js$/,
          use: ['source-map-loader'],
          enforce: 'pre',
        },
      ]
    },
    plugins: [],
    target: 'node',
    node: {
      __dirname: true,
    }
  },
  {
    entry: `${__dirname}/src/browser.js`,
    output: {
      path: path.resolve(__dirname, 'dist/public'),
      filename: 'browser.js',
    },
    plugins: [
      new Html(),
    ],
    module: {
      rules: [
        {
          test: /.js$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.js$/,
          use: ['source-map-loader'],
          enforce: 'pre',
        },
      ]
    },
    target: 'web',
  }
]
