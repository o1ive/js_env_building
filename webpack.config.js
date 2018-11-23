const path = require('path');
// webpackモジュールを読み込む
const webpack = require('webpack');
// html-webpack-pluginモジュールを読み込む
const HtmlWebpackPlugin = require('html-webpack-plugin');
// mini-css-extract-pluginの追加
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');


const src = path.join(__dirname, 'src');
const dist = path.join(__dirname, 'dist');

module.exports = {
  // developmentモードで実行します
  mode: 'development',
  // ビルドを実行するファイルパス
  entry: path.resolve(src, 'js/render.jsx'),
  output: {
    // 生成されるファイル
    filename: 'index.bundle.js',
    // 生成先のディレクトリ
    path: dist,
  },
  resolve: {
    // import文のパス指定にnode_modulesを省略できるようにする
    modules: ['node_modules'],
    // .jsまたは.jsxの拡張子を省略できるようにする
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        // ルールを適用するファイルの正規表現
        test: /\.(js|jsx)$/,
        // nodemodules以下のファイルには適用しないようにする
        exclude: /node_modules/,
        enforce: 'pre',
        // 使用するloader
        loader: 'eslint-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      { // CSSの設定を追加する
        test: /\.css$/,
        exclude: /node_modules/,
        // loaderを使用する場合はuseを使う
        use: [MiniCSSExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
  devServer: {
    contentBase: dist, // 開発サーバを立ち上げる参照ディレクトリ
    hot: true, // hot-reloadを有効にする
    port: 3000, // サーバのポート番号
  },
  plugins: [
    // hot-reloadを有効にするプラグイン
    new webpack.HotModuleReplacementPlugin(),
    // HtmlWebpackPluginプラグインを追加
    new HtmlWebpackPlugin({
      // templateの設定を追加
      template: path.resolve(src, 'html/index.html'),
    }),
    new MiniCSSExtractPlugin(), // MiniCSSExtractPluginを追加
  ],
  // sourceMappingの設定
  devtool: 'cheap-module-eval-source-map',
};
