'use strict';

const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const del = require('del');
const colors = require('colors');

const app_source = path.resolve(__dirname, 'app');
const app_entry = path.resolve(app_source, 'index.js');
const app_template = path.resolve(app_source, 'index.html');

const mock_entry = path.resolve(__dirname, 'mock', 'index.js');

const dist_base = path.resolve(__dirname, 'dist');
const dist_page = path.resolve(dist_base, 'index.html');

del.sync(dist_base);
console.warn(`DELETE: ${ dist_base }\n`.cyan);

const WebpackDevEnvironment = process.env.NODE_ENV === 'dev';
const WebpackMockEnvironment = process.env.NODE_ENV === 'mock';

let WebpackConfig = {
  entry: {
    'app': app_entry
  },
  output: {
    path: dist_base,
    publicPath: '/',
    filename: `[name]-[chunkhash:8].min.js`,
    chunkFilename: `[name]-[chunkhash:8].min.js`
  },
  module : {
    rules: [
      {
          enforce: 'pre',
          test: /\.js$/,
          use: 'source-map-loader'
      },
      {
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader',
              query: {
                  presets: ['es2015', 'stage-3'],
                  plugins: ['transform-class-properties', 'transform-decorators-legacy']
              }
            }
          ]
      },
      {
          test: /\.scss$/,
          use: ExtractTextWebpackPlugin.extract('css-loader?sourceMap!sass-loader?sourceMap'),
      },
      {
          test: /\.eot|\.svg|\.ttf|\.woff|\.woff2$/,
          use: 'url-loader?limit=10240&name=font/[name].[ext]'
      }
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin(`[name]-[contenthash:8].min.css`),
    new HtmlWebpackPlugin({
      filename: dist_page,
      template: app_template,
      inject: true,
      minify: {
          collapseWhitespace: true
      }
    })
  ],
  externals: {
    'vue': 'Vue',
    'vuex': 'Vuex',
    'axios': 'axios',
    'vue-router': 'VueRouter',
    'element-ui': 'ELEMENT',
    'vue-class-component': 'VueClassComponent'
  },
  devtool: "source-map"
}

if (WebpackDevEnvironment || WebpackMockEnvironment) {
  WebpackConfig.output.filename = WebpackConfig.output.chunkFilename = `[name]-[hash:8].min.js`;
}

if (WebpackMockEnvironment) {
  WebpackConfig.entry.mock = mock_entry;
}

module.exports = WebpackConfig;
