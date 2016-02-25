const webpack = require('webpack');
const Clean = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    all: './source/javascripts/all.js',
  },

  resolve: {
    root: __dirname + '/source/javascripts',
  },

  output: {
    path: __dirname + '/.tmp/dist',
    filename: 'javascripts/[name].js',
    publicPath: '/',
  },

  module: {
    loaders: [
      {
        test: /source\/javascripts\/.*\.js$/,
        exclude: /node_modules|\.tmp|vendor/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0'],
        },
      },
      { test: /(?:jquery[-_\.].+|bootstrap.*)\.js$/,
        loader: 'imports?jQuery=jquery,$=jquery,this=>window',
      },
      {
        test: /\.scss$/,
        exclude: /node_modules|\.tmp|vendor/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader'),
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'url?limit=10000?hash=sha512&digest=hex&name=images/[name].[ext]',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}',
        ],
      },
      {
        test: /\.(woff2?|ttf|eot)$/,
        loaders: ['url?limit=10000&name=fonts/[name].[ext]'],
      },
    ],
  },

  postcss: [autoprefixer],

  node: {
    console: true,
  },

  plugins: [
    new Clean(['.tmp']),
    new ExtractTextPlugin('stylesheets/[name].css'),
  ],
};
