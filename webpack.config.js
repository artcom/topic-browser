/* eslint-disable import/no-commonjs */
const webpack = require("webpack")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = (env, { mode }) => ({
  devtool: mode === "development" ? "eval-source-map" : "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  plugins: [
    mode === "production" && new CopyWebpackPlugin({
      patterns: [
        { from: "public/index.html", to: "index.html" },
        { from: "public/css/", to: "css/" }
      ]
    }),
    new webpack.EnvironmentPlugin({
      HTTP_BROKER_URI: null,
      WS_BROKER_URI: null,
      USERNAME: null,
      PASSWORD: null
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.ProvidePlugin({
      process: "process/browser.js",
      Buffer: ["buffer", "Buffer"]
    })
  ].filter(Boolean)
})
