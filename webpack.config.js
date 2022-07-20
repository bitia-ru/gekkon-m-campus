const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const BUILD_DIR = path.resolve(__dirname, 'public');
const SRC_DIR = path.resolve(__dirname, 'src');


module.exports = () => ({
  entry: ['./src/v1/index.js'],
  output: {
    path: BUILD_DIR,
    filename: 'index-mob.js',
    publicPath: '/',
  },
  devtool: 'source-map',
  resolve: {
    alias: {
      '@': SRC_DIR,
    },
    fallback: {
      "crypto": false,
      "buffer": false
    },
    extensions: ['.js', '.jsx'],
  },
  performance: {
    maxEntrypointSize: 1572864*2,
    maxAssetSize: 1572864*2
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(pdf|jpg|png|gif|svg|ico|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'assets/[path][name]-[hash].[ext]',
          },
        },
      },
    ],
  },
  devServer: {
    static: BUILD_DIR,
    compress: false,
    port: 3042,
    host: 'localhost',
    historyApiFallback: {
      index: 'index.html'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new webpack.EnvironmentPlugin({
      API_URL: '/api',
      SENTRY_DSN: 'https://dc2e6ebcb5dd4d66a373d0331098cdae:905d88eaf1ae4f479b389fd2739afada@bugs.bitia.ru/18',
      CLIENT_ID: '',
    }),
  ],
});
