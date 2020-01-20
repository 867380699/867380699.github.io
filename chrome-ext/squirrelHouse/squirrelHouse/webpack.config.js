const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    popup: ['./src/popup.js', './src/styles/popup.scss'],
    background: './src/background.js',
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CopyPlugin([
      {
        from: 'src/images', to: 'images'
      },
      {
        from: 'src/*.html', to: '[name].html'
      },
      {
        from: 'src/*.json', to: '[name].json'
      }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", 'sass-loader',],
      }
    ]
  },
  mode: 'development',
  // mode: 'production',
};