/* eslint-disable import/no-extraneous-dependencies */

import path from 'path';
import webpack from 'webpack';
import Clean from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import StaticSiteGeneratorPlugin from 'static-site-generator-webpack-plugin';
import routes from './data/routes.js';

import config from './webpack.base.config.babel';

config.output.path = path.resolve('./build');
config.output.filename = 'scripts/[name]-[hash].js';
config.output.publicPath = '//d2hsdu90o9mztm.cloudfront.net/';

// Add HotModuleReplacementPlugin and BundleTracker plugins
config.plugins = config.plugins.concat([
  new Clean(['build']),

  // removes a lot of debugging code in React
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
      APP_ENV: JSON.stringify('browser'),
    },
  }),

  // keeps hashes consistent between compilations
  new webpack.optimize.OccurenceOrderPlugin(),

  // minifies code
  new webpack.optimize.UglifyJsPlugin({
    output: {
      comments: false,
    },
    compressor: {
      warnings: false,
    },
  }),

  new StaticSiteGeneratorPlugin('main', routes),
]);

const cssNano = {
  discardComments: { removeAll: true },
};

config.module.loaders.push(
  {
    test: /app\/scripts\/.*\.(js|jsx)$/,
    exclude: /node_modules|\.tmp|vendor/,
    loaders: ['babel'],
  },
  {
    test: /\.scss$/,
    exclude: /node_modules|\.tmp|vendor/,
    loader: ExtractTextPlugin.extract(
      'style-loader',
      `css-loader?${JSON.stringify(cssNano)}!postcss-loader!sass-loader!sass-resources-loader`,
    ),
  }
);

module.exports = config;
