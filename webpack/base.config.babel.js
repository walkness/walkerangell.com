/* eslint-disable import/no-extraneous-dependencies */

import path from 'path';
import webpack from 'webpack';
import marked from 'marked';

export const cssModulesGeneratedScopedName = '[local]__[hash:base64:5]';

const renderer = new marked.Renderer();

renderer.link = function (href, title, text) {
  let attrs = `href="${href}"`;
  if (title) {
    attrs += ` title="${title}"`;
  }
  if (/^https?:\/\/.+$/.test(href)) {
    attrs += ' target="_blank"';
  }
  return `<a ${attrs}>${text}</a>`;
};

const context = path.resolve(__dirname, '../');

export default {
  context,

  entry: {
    main: [
      'babel-polyfill',
      path.resolve(__dirname, '../app/scripts/main'),
    ],
  },

  output: {
    path: path.resolve(__dirname, '../app/bundles/'),
    filename: 'bundle.js',
    libraryTarget: 'umd',
  },

  module: {
    rules: [
      {
        test: /app\/scripts\/.*\.(js|jsx)$/,
        include: path.join(__dirname, '../app'),
        loader: 'babel-loader',
        query: {
          plugins: [
            ['react-css-modules', {
              context,
              generateScopedName: cssModulesGeneratedScopedName,
              filetypes: {
                '.scss': {
                  syntax: 'postcss-scss',
                },
              },
              webpackHotModuleReloading: true,
            }],
          ],
        },
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        exclude: [
          path.join(__dirname, '../app/images/portfolio'),
          path.join(__dirname, '../app/images/favicon'),
        ],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              hash: 'sha512',
              digest: 'hex',
              name: 'images/[name]-[hash].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            query: {
              mozjpeg: {
                progressive: true,
              },
              optipng: {
                optimizationLevel: 7,
              },
              gifsicle: {
                interlaced: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ],
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        include: path.join(__dirname, '../app/images/portfolio'),
        loader: 'url-loader',
        options: {
          limit: 10000,
          hash: 'sha512',
          digest: 'hex',
          name: 'images/[name]-[hash].[ext]',
        },
      },
      {
        include: path.join(__dirname, '../app/images/favicon'),
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
      {
        test: /\.(woff2?|ttf|eot)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[ext]',
        },
      },
      {
        test: /\.md$/,
        use: [
          'html-loader',
          {
            loader: 'markdown-loader',
            options: {
              gfm: false,
              renderer,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      context,
      options: {
        sassLoader: {
          sourceMaps: true,
          includePaths: [context],
        },
        context,
      },
    }),
    new webpack.NamedModulesPlugin(),
  ],

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      AppComponents: path.resolve(__dirname, '../app/scripts/views/App/components'),
      AppViews: path.resolve(__dirname, '../app/scripts/views/App/views'),
      Styles: path.resolve(__dirname, '../app/styles'),
      styles: path.resolve(__dirname, '../app/styles'),
      images: path.resolve(__dirname, '../app/images'),
      config: path.resolve(__dirname, '../app/scripts/config'),
      views: path.resolve(__dirname, '../app/scripts/views'),
      data: path.resolve(__dirname, '../data'),
    },
  },
};
