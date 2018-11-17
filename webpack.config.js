const path = require('path');
// webpackモジュールを読み込む
const webpack = require('webpack');
// html-webpack-pluginモジュールを読み込む
const HtmlWebpackPlugin = require('html-webpack-plugin');


const src = path.join(__dirname, 'src');
const dist = path.join(__dirname, 'dist');

module.exports = {
  // developmentモードで実行します
  mode: 'development',
  // ビルドを実行するファイルパス
  entry: path.resolve(src, 'js/index.js'),
  output:{
    // 生成されるファイル
    filename: 'index.bundle.js',
    // 生成先のディレクトリ
    path: dist
  },
  resolve: {
    // import文のパス指定にnode_modulesを省略できるようにする
    modules: ['node_modules'],
    // .jsまたは.jsxの拡張子を省略できるようにする
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        // ルールを適用するファイルの正規表現
        test: /\.(js|jsx)$/,
        // nodemodules以下のファイルには適用しないようにする
        exclude: /node_modules/,
        // 使用するloader
        loader: 'babel-loader'
      }
    ]
  },
  devServer: {
    contentBase: dist, //開発サーバを立ち上げる参照ディレクトリ
    hot: true, // hot-reloadを有効にする
    port: 3000 //サーバのポート番号
  },
  plugins: [
    // hot-reloadを有効にするプラグイン
    new webpack.HotModuleReplacementPlugin(),
    // HtmlWebpackPluginプラグインを追加
    new HtmlWebpackPlugin()
  ],
  // sourceMappingの設定
  devtool: 'cheap-module-eval-source-map'
};