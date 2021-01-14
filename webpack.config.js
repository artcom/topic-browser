/* eslint-disable import/no-commonjs */

const webpack = require("webpack")
const path = require("path")

module.exports = (env = {}) => ({
  mode: env.production ? "production" : "development",
  devtool: env.production ? "source-map" : "eval-source-map",
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
    new webpack.EnvironmentPlugin({
      HTTP_BROKER_URI: null,
      WS_BROKER_URI: null,
      USERNAME: null,
      PASSWORD: null
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    host: "0.0.0.0",
    disableHostCheck: true
  }
})
