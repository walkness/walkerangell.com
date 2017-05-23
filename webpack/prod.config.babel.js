/* eslint-disable import/no-extraneous-dependencies */

import path from 'path';
import webpack from 'webpack';
import Clean from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import StaticSiteGeneratorPlugin from 'static-site-generator-webpack-plugin';

import routes from '../data/routes';

import config from './base.config.babel';

config.output.path = path.resolve(__dirname, '../build');
config.output.filename = 'scripts/[name]-[hash].js';
config.output.publicPath = '//d2hsdu90o9mztm.cloudfront.net/';

// Add HotModuleReplacementPlugin and BundleTracker plugins
config.plugins = config.plugins.concat([
  new Clean([path.resolve(__dirname, '../build')]),

  // removes a lot of debugging code in React
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
      APP_ENV: JSON.stringify('browser'),
    },
  }),

  new ExtractTextPlugin({
    filename: 'styles/[name]-[hash].css',
    allChunks: true,
  }),
  // minifies code
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
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
  autoprefixer: false,
  discardComments: {
    removeAll: true,
  },
};

config.module.rules.push(
  {
    test: /\.scss$/,
    exclude: /node_modules|\.tmp|vendor/,
    loader: ExtractTextPlugin.extract({
      use: [
        {
          loader: 'css-loader',
          options: {
            minimize: cssNano,
            importLoaders: 2,
          },
        },
        'postcss-loader',
        'sass-loader',
      ],
      fallback: 'style-loader',
    }),
  },
);

config.devtool = 'source-map';

export default config;
