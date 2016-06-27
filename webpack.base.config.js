var path = require("path");
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var marked = require('marked');
var renderer = new marked.Renderer();

renderer.link = function(href, title, text) {
  var attrs = 'href="' + href + '"';
  if (title) attrs += 'title="' + title + '"';
  if (/^https?:\/\/.+$/.test(href)) attrs += 'target="_blank"';
  return '<a '+ attrs +'>' + text + '</a>';
}


module.exports = {
  context: __dirname,

  entry: {
    main: './app/scripts/main',
  },

  output: {
    path: path.resolve('./app/bundles/'),
    filename: "bundle.js",
    libraryTarget: 'umd',
  },

  module: {
    loaders: [
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        exclude: path.join(__dirname, 'app/images/portfolio'),
        loaders: [
          'url?limit=10000?hash=sha512&digest=hex&name=images/[name]-[hash].[ext]',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}',
        ],
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        include: path.join(__dirname, 'app/images/portfolio'),
        loaders: [
          'url?limit=10000?hash=sha512&digest=hex&name=images/[name]-[hash].[ext]',
        ],
      },
      {
        test: /\.(woff2?|ttf|eot)$/,
        loaders: ['url?limit=10000&name=fonts/[name].[ext]'],
      },
      {
        test: /\.md$/,
        loader: 'html!markdown?gfm=false',
      },
    ],
  },

  markdownLoader: {
    renderer: renderer,
  },

  postcss: [autoprefixer],

  plugins: [
    new ExtractTextPlugin('styles/[name]-[hash].css'),
  ],

  resolve: {
    extensions: ['', '.js', '.jsx']
  },
}
