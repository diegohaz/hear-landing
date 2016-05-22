var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

module.exports = {
  entry: [
    'babel-polyfill',
    path.join(__dirname, 'src', 'app.js')
  ],
  resolve: {
    modulesDirectories: ['node_modules']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js'
  },
  module: {
    loaders: [
      { test: /\.js$/,    loader: 'babel', exclude: /node_modules/ },
      { test: /\.s?css$/, loader: 'style!css?camelCase&modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]!sass!postcss' },
      { test: /\.png$/,   loader: 'url?prefix=images/&limit=8000&mimetype=image/png' },
      { test: /\.jpg$/,   loader: 'url?prefix=images/&limit=8000&mimetype=image/jpeg' },
      { test: /\.svg$/,   loader: 'url?prefix=images/&limit=8000&mimetype=image/svg+xml' },
      { test: /\.woff$/,  loader: 'url?prefix=fonts/&limit=8000&mimetype=application/font-woff' },
      { test: /\.ttf$/,   loader: 'file?prefix=fonts/' },
      { test: /\.eot$/,   loader: 'file?prefix=fonts/' }
    ]
  },
  postcss: function() {
    return [autoprefixer];
  }
};
