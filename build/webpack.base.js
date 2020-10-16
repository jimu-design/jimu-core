const { distPath, theme } = require('./config');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

function resolve(p) {
  return path.join(__dirname, p);
}
module.exports = {
  output: {
    path: distPath,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(css|less)$/,
        use: [
          { loader: 'style-loader', options: {} },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
              sourceMap: true,
            },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=10240',
      },
      {
        test: /\.(html|tpl)$/,
        loader: 'html-loader',
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.less'],
    alias: {
      '@': resolve('../src'),
      '@shared': resolve('../src/jimu-editor/shared'),
      '@hooks': resolve('../src/jimu-editor/hooks'),
      '@hoc': resolve('../src/jimu-editor/hoc'),
      '@config': resolve('../src/jimu-editor/config'),
      '@utils': resolve('../src/jimu-editor/utils'),
    },
  },
  externals: {
    swiper: 'Swiper',
  },
  plugins: [new CleanWebpackPlugin()],
};
