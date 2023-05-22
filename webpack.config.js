const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
        url: false,
        zlib: require.resolve("browserify-zlib"),
        querystring: require.resolve("querystring-es3"),
        path: require.resolve("path-browserify"),
        util: require.resolve("util/"),
        stream: require.resolve("stream-browserify"),
        fs: false,
        http: require.resolve('stream-http'),
        crypto: require.resolve('crypto-browserify'),
        assert: require.resolve('assert/')
      },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    // Add the IgnorePlugin to exclude the 'net' module
    new webpack.IgnorePlugin({ resourceRegExp: /^net$/ })
  ]
};
