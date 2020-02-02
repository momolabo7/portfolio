const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const favIcon = "./src/favicon.ico"
const baseTemplate = "./src/base_template.html"

const pageNames = [
  "index",
  "professional",
  "professional_lecturer",
  "professional_nyaga"
]

const htmlWebPackPlugins = [];
const entries = {}
for (let name of pageNames) {
  let page = new HtmlWebPackPlugin({
    template: baseTemplate,
    filename: name + ".html",
    favicon: favIcon,
    chunks: [name]
  });
  htmlWebPackPlugins.push(page);
  entries[name] = './src/pages/' + name + '.jsx'
}

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      }
    ]
  },
  resolve: {
    extensions: ['html', '.js', '.jsx'],
    alias: {
      components: path.resolve(__dirname, './src/components/'),
      img: path.resolve(__dirname, './src/img/'),
      css: path.resolve(__dirname, './src/css/')
    }
  },

  entry: entries,

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: htmlWebPackPlugins
};