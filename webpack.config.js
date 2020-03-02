const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const favIcon = "./src/favicon.ico"
const baseTemplate = "./src/base_template.html"

const pageNames = [
  "index",

  "professional_lecturer",
  "professional_nyaga",
  "professional_akb48",
  "professional_gundam_heroes",
  "professional_rtk13",
  "professional_taishi",

  "school_dotsncircles",
  "school_hit",
  "school_echolight",
  "school_nightmare",
  "school_godsloveme"
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
        test: /\.(png|svg|jpg|gif|pdf)$/,
        use: ["file-loader"],
      }
    ]
  },
  resolve: {
    extensions: ['html', '.js', '.jsx'],
    alias: {
      components: path.resolve(__dirname, './src/components/'),
      img: path.resolve(__dirname, './src/img/'),
      css: path.resolve(__dirname, './src/css/'),
      downloads: path.resolve(__dirname, './src/downloads/')
    }
  },

  entry: entries,

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: htmlWebPackPlugins
};