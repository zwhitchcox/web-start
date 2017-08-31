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
        }
      ]
    },
    plugins: [],
    target: 'node',
    node: {
      __dirname: true,
    }
  },
  {
    entry: `${__dirname}/src/app.js`,
    output: {
      path: path.resolve(__dirname, 'dist/public'),
      filename: 'browser.js',
    },
    plugins: [
      new Html({template: path.resolve(__dirname, 'src/index.html')}),
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
        {
          test: /\.css$/,
          use: [
            { loader: "style-loader" },
            { loader: "css-loader" }
          ]
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            use: 'url-loader?limit=100000'
        },
      ]
    },
    target: 'web',
  }
]
