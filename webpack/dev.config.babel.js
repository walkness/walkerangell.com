/* eslint-disable import/no-extraneous-dependencies */

import os from 'os';
import path from 'path';
import webpack from 'webpack';
import Clean from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin';

import config from './base.config.babel';
import { name as projectName } from '../package.json';

// Use webpack dev server
config.entry.main = [
  'babel-polyfill',
  'react-hot-loader/patch',
  'webpack-dev-server/client?http://0.0.0.0:3000',
  'webpack/hot/only-dev-server',
  path.resolve(__dirname, '../app/scripts/main'),
];

// Tell django to use this URL to load packages and not use STATIC_URL + bundle_name
config.output.publicPath = '/';

// Add HotModuleReplacementPlugin and BundleTracker plugins
config.plugins = config.plugins.concat([
  new Clean([path.resolve(__dirname, '../app/bundles')]),

  new webpack.HotModuleReplacementPlugin(),

  new webpack.NoEmitOnErrorsPlugin(),

  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
      APP_ENV: JSON.stringify('browser'),
    },
  }),

  new HtmlWebpackPlugin({
    template: 'webpack/index.ejs',
    inject: true,
    title: projectName,
    alwaysWriteToDisk: true,
  }),

  new HtmlWebpackHarddiskPlugin(),
]);

config.module.rules.push(
  {
    test: /\.scss$/,
    include: path.join(__dirname, '../app'),
    use: [
      'style-loader',
      'css-loader',
      'postcss-loader',
      'sass-loader',
    ],
  },
);

config.devtool = 'inline-source-map';

config.devServer = {
  host: '0.0.0.0',
  port: 3000,

  historyApiFallback: true,

  hot: true,

  disableHostCheck: true,
};

export default config;
