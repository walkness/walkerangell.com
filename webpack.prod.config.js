var path = require("path")
var webpack = require('webpack')
var Clean = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
var routes = require('./data/routes.js');

var config = require('./webpack.base.config.js')

config.output.path = require('path').resolve('./build')
config.output.filename = 'scripts/[name]-[hash].js'
config.output.publicPath = '//d16o2nvjav3td9.cloudfront.net/'

// Add HotModuleReplacementPlugin and BundleTracker plugins
config.plugins = config.plugins.concat([
  new Clean(['build']),

  // removes a lot of debugging code in React
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production'),
      'APP_ENV': JSON.stringify('browser'),
  }}),

  // keeps hashes consistent between compilations
  new webpack.optimize.OccurenceOrderPlugin(),

  // minifies code
  new webpack.optimize.UglifyJsPlugin({
    output: {
      comments: false
    },
    compressor: {
      warnings: false
    }
  }),

  new StaticSiteGeneratorPlugin('main', routes)
])

var cssNano = {
  discardComments: {removeAll: true}
}

config.module.loaders.push(
  {
    test: /app\/scripts\/.*\.(js|jsx)$/,
    exclude: /node_modules|\.tmp|vendor/,
    loaders: ['babel'],
  },
  {
    test: /\.scss$/,
    exclude: /node_modules|\.tmp|vendor/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader?' + JSON.stringify(cssNano) + '!postcss-loader!sass-loader!sass-resources-loader'),
  }
)

module.exports = config
