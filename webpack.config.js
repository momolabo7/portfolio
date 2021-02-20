const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const favIcon = "./src/favicon.ico"
const baseTemplate = "./src/base_template.html"

const pageNames = [
    "index",
    "about",

    "projects",
    "projects_flocking",
    "projects_npuzzle",
    "projects_handmade_dnc",
    "projects_mallory",
    "projects_karus_dream",
    "projects_pathfinding",

    "industry",
    "industry_lecturer",
    "industry_nyaga",
    "industry_akb48",
    "industry_gundam_heroes",
    "industry_rtk13",
    "industry_taishi",

    "student",
    "student_dotsncircles",
    "student_hit",
    "student_echolight",
    "student_nightmare",
    "student_godsloveme",
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
      },
      {
        test: /\.md$/i,
        use: 'raw-loader'
      }
    ]
  },
  stats: { children: false },
  resolve: {
    extensions: ['html', '.js', '.jsx'],
    alias: {
      components: path.resolve(__dirname, './src/components/'),
      img: path.resolve(__dirname, './src/img/'),
      css: path.resolve(__dirname, './src/css/'),
      downloads: path.resolve(__dirname, './src/downloads/'),
      md: path.resolve(__dirname, './src/md/')
    }
  },

  entry: entries,

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: htmlWebPackPlugins
};
