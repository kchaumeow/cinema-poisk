const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack", "url-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      favicon: "src/favicon.ico",
      manifest: "public/manifest.json",
    }),
    new ForkTsCheckerWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env.TOKEN": JSON.stringify(process.env.TOKEN || ""),
    }),
  ],
  devServer: {
    static: [{ directory: path.resolve(__dirname, "dist") }],
    historyApiFallback: true,
    compress: true,
    port: 7070,
    open: true,
    hot: true,
  },
};
