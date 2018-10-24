const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin('css/[name]-css.css');
const extractSASS = new ExtractTextPlugin('css/[name]-sass.css');
const extractLESS = new ExtractTextPlugin('css/[name]-less.css');
const rm = require("rimraf");
module.exports = {
  context: path.resolve(__dirname, "../"),
  entry: {
    app: "./src/index.js"
  },
  module: {
    rules: [{
        test: /\.(html)$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-loader'
      },
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: 'babel-loader'
      },
      {
        // test 表示测试什么文件类型
        test: /\.css$/,
        // 使用 'style-loader','css-loader'
        use: extractCSS.extract({
          fallback: 'style-loader', // 回滚
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require("autoprefixer") /*在这里添加*/
              ]
            }
          }],
          publicPath: '../' //解决css背景图的路径问题
        })
      },
      {
        test: /\.less$/,
        // loader:'style-loader!css-loader!less-loader',
        use: extractLESS.extract({ //分离less编译后的css文件
          use: [{
            loader: "css-loader"
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require("autoprefixer") /*在这里添加*/
              ]
            }
          }, {
            loader: "less-loader"
          }],
          fallback: "style-loader"
        })
      },
      {
        test: /\.(sass|scss)$/,
        use: extractSASS.extract({ //分离less编译后的css文件
          use: [{
            loader: "css-loader"
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require("autoprefixer") /*在这里添加*/
              ]
            }
          }, {
            loader: "sass-loader"
          }],
          fallback: "style-loader"
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'file-loader'
        }]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["dist"], {
      root: path.resolve(__dirname, "../"),
      print: true
    }),
    new HtmlWebpackPlugin({
      file: "index.html",
      template: "./src/index.html"
    }),
    extractCSS,
    extractSASS,
    extractLESS,
  ],
  optimization: {
    splitChunks: {
      name: "common"
    }
  },
  output: {
    filename: "js/[name].bundle.js",
    path: path.resolve(__dirname, "../dist")
  },
};