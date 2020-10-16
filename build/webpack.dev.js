const webpack = require('webpack');
const merge = require('webpack-merge');
const { host, port } = require('./config');
const webpackBaseConfig = require('./webpack.base.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { distPath } = require('./config');

module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  entry: [
    `webpack-dev-server/client?http://${host}:${port}`,
    'webpack/hot/only-dev-server',
    path.join(__dirname, `../fixtures/index.tsx`),
  ],
  devtool: 'inline-source-map',
  module: {},
  output: {
    publicPath: '/',
    filename: 'assets/[hash:8].[name].js',
    chunkFilename: 'assets/[contenthash:8].[name].js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({}),
    new HtmlWebpackPlugin({
      hash: false,
      template: path.join(__dirname, '../fixtures/index.html'),
      filename: 'index.html',
    }),
  ],
  devServer: {
    port,
    inline: true,
    hot: true,
    disableHostCheck: true,
    historyApiFallback: true, // using html5 router.
    contentBase: distPath,
    useLocalIp: true,
  },
});
