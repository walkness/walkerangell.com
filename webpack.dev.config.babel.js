/* eslint-disable import/no-extraneous-dependencies */

import os from 'os';
import path from 'path';
import webpack from 'webpack';
import Clean from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import config from './webpack.base.config.babel';

// Use webpack dev server
config.entry = [
  'webpack-dev-server/client?http://0.0.0.0:3000',
  'webpack/hot/only-dev-server',
  './app/scripts/main',
];

// Tell django to use this URL to load packages and not use STATIC_URL + bundle_name
config.output.publicPath = `//${os.hostname()}:3000/app/bundles/`;

// Add HotModuleReplacementPlugin and BundleTracker plugins
config.plugins = config.plugins.concat([

  new Clean(['app/bundles']),

  new webpack.HotModuleReplacementPlugin(),

  new webpack.NoErrorsPlugin(),

  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
      APP_ENV: JSON.stringify('browser'),
    },
  }),
]);

config.module.loaders.push(
  {
    test: /app\/scripts\/.*\.(js|jsx)$/,
    include: path.join(__dirname, 'app'),
    loaders: ['react-hot', 'babel'],
  },
  {
    test: /\.scss$/,
    include: path.join(__dirname, 'app'),
    loader: 'style-loader!css-loader!postcss-loader!sass-loader',
  }
);

module.exports = config;
