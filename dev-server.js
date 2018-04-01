// @flow

const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const express = require("express");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");

const mainApp = express();
const compiler = webpack(webpackConfig);

mainApp.use(
  webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  })
);

mainApp.use(webpackHotMiddleware(compiler));

mainApp.listen(8080);

mainApp.use(express.static("./dist/"));

mainApp.get("/*", function(req, res) {
  res.sendFile(__dirname + "/dist/index.html");
});
