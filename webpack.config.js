const path = require("path");
const fs = require("fs");

const REL_CLIENT_DIR = path.join('client', 'src');
const REL_PAGE_DIR = path.join(REL_CLIENT_DIR, "pages", path.sep);
const REL_TEMPLATE_DIR = path.join(REL_CLIENT_DIR, "templates", path.sep);

const ABS_ROOT_DIR = __dirname;
const ABS_CLIENT_DIR = path.join(ABS_ROOT_DIR, REL_CLIENT_DIR);
const ABS_PAGE_DIR = path.join(ABS_ROOT_DIR, REL_PAGE_DIR);
const ABS_TEMPLATE_DIR = path.join(ABS_ROOT_DIR, REL_TEMPLATE_DIR);

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

const jsFiles = getFilesFromDir(ABS_PAGE_DIR, [".js"]);
const entry = jsFiles.reduce( (obj, filePath) => {
  const entryChunkName = filePath.replace(path.extname(filePath), "").replace(ABS_PAGE_DIR, "");
  obj[entryChunkName] = `${filePath}`;
  return obj;
}, {});

const HtmlWebPackPlugin = require("html-webpack-plugin");
const pugFiles = getFilesFromDir(ABS_TEMPLATE_DIR, [".pug"]);

const htmlPlugins = pugFiles.map( filePath => {
  const fileName = filePath.replace(ABS_TEMPLATE_DIR, "");
  return new HtmlWebPackPlugin({
    chunks:[fileName.replace(path.extname(fileName), "")],
    template: path.join(REL_TEMPLATE_DIR, fileName),
    filename: fileName.replace(path.extname(fileName), ".html"),
    favicon: path.join(ABS_CLIENT_DIR, "favicon.ico"),
  })
});

const config = {
  entry: entry,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].bundle.js",
    publicPath: '/'
  },
  plugins: [...htmlPlugins],
  devServer: {
    publicPath: "/",
    proxy: {
      '/**': {
        target: 'http://localhost:3333',
        secure: false,
        changeOrigin: true,        
      },      
    },
    historyApiFallback: true,
      contentBase: './',
      hot: true
  },
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
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name:'[name].[ext]',
          outputPath:'assets' //the icons will be stored in dist/assets folder
        }
      }
    ]
  }
}

module.exports = (env, argv) => {
  if (argv.mode === 'development') {}
  if (argv.mode === 'production') {}
  return config;
}

