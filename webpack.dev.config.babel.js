/* eslint-disable no-console */
import chalk from 'chalk'
import dotenv from 'dotenv'
import HtmlWepackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import webpack from 'webpack'
import optimize from './config/webpack/optimize'
import DEV_TOOLS from './config/webpack/devtools'
import appPaths from './config/paths'

dotenv.config()

const PORT = process.env.REACT_APP_PORT || 3000
const { API_URL } = process.env
const environment = 'development'
const devtool = DEV_TOOLS[environment]

console.log(chalk.green('Bundling client files for development...'))

export default {
  name: 'client',
  target: 'web',
  mode: environment,
  devtool,
  entry: {
    index: './client/index.js'
  },
  output: {
    path: `${appPaths.appBuild}/client`,
    publicPath: '/',
    filename: 'static/js/[name].min.js',
  },
  optimization: optimize(environment, 'server'),
  devServer: {
    contentBase: './dist',
    port: PORT,
    proxy: {
      '/api': API_URL
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            rootMode: 'upward',
          },
        },
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: {
          loader: 'file-loader',
          options: {
            emitFile: false,
          },
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              bypassOnDebug: true,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              name: 'images/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'NODE_ENV', 'API_URL'
    ]),
    new HtmlWepackPlugin({
      template: appPaths.appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].css'
    })
  ]
}
