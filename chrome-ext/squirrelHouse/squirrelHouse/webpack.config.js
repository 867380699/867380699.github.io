const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    popup: ['./src/popup.js', './src/styles/popup.scss'],
    background: './src/background.js',
  },
  optimization: {
    splitChunks: {
      name: 'base',
      chunks: 'all',
      minSize: 15000,
    }
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerPort: 8899
    }),
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