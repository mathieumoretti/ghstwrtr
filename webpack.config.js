const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  title: "Development",
  template: "./client/src/index.html",
  filename: "./index.html"
});

module.exports = {
  entry: './client/src/index.js',
  output: {
    path: path.join(__dirname, './client/dist'),
    filename: 'index_bundle.js'
  },
  plugins: [htmlPlugin],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [htmlPlugin]
};