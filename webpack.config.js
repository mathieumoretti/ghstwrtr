const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

var plugin = new HtmlWebPackPlugin({
  template: './client/src/views/index.pug'
});

const config = {
  entry: {
    app: path.join(__dirname, './client/src/app.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].bundle.js",
  },
  devServer: {
    port: 3000,
  },
  plugins: [
    plugin
  ],
  module: {
    rules: [
      { 
        test: /\.pug$/,
        use: ["pug-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  }
}

module.exports = (env, argv) => {
  if (argv.mode === 'development') {}
  if (argv.mode === 'production') {}
  return config;
}

