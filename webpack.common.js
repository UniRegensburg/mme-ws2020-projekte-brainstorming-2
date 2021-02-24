const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./app/src/index.js",
  // plugins: [
  // 	new HtmlWebpackPlugin({
  // 		title: 'Brainstorming',
  // 	}),
  // ],
  output: {
    filename: "build.js",
    path: path.resolve(__dirname, "app", "dist", "resources", "js"),
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
