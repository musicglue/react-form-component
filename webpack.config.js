const path = require('path');

module.exports = {
  devtool: 'eval',
  entry: ['./demo'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  plugins: [],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /(node_modules)/,
      },
      {
        test: /\.sass$/,
        exclude: /(node_modules)/,
        loader: 'style!css!sass?indentedSyntax=true',
      },
      {
        test: /\.(ttf|eot|svg)(\?.*)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.woff(2)?(\?.*)?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff',
      },
    ],
  },
  resolve: {
    fallback: path.join(__dirname, 'node_modules'),
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
};
