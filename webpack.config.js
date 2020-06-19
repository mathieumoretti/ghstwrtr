const path = require("path");
const fs = require("fs");

function getFilesFromDir(dir, fileTypes) {
    const filesToReturn = [];
    function walkDir(currentPath) {
      const files = fs.readdirSync(currentPath);
      for (let i in files) {
        const curFile = path.join(currentPath, files[i]);      
        if (fs.statSync(curFile).isFile() && fileTypes.indexOf(path.extname(curFile)) != -1) {
          filesToReturn.push(curFile);
        } else if (fs.statSync(curFile).isDirectory()) {
          walkDir(curFile);
        }
      }
    };
    walkDir(dir);
    return filesToReturn; 
}

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
    proxy: {
      '/api/**': {
        target: 'http://localhost:3333',
        secure: false,
        changeOrigin: true,
      }
    },
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

