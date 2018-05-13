// @flow
const webpack = require("webpack");
const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      // <-- key to reducing React's size
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new CopyWebpackPlugin([
      {
        from: "./src/content",
        to: "content",
        ignore: [".DS_Store"]
      },
      {
        from: "./src/favicons",
        to: "",
        ignore: [".DS_Store"]
      },
      {
        from: "./src/assets",
        to: "assets",
        ignore: [".DS_Store"]
      },
      {
        from: "./src/index.html",
        to: ""
      }
    ]),
    new UglifyJsPlugin({
      sourceMap: true
    }),
    new CompressionPlugin({
      test: /\.js/,
      asset: "[path][query]"
    })
  ],
  entry: ["./src/index.js"],
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.(eot|ttf|woff|woff2|otf|jpg|png)$/,
        use: "file-loader?name=[name].[ext]"
      },
      {
        test: /\.json$/,
        enforce: "pre",
        use: "gzip-loader"
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/"
  }
};
