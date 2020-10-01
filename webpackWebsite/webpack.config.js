const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: [
    './src/index.js',
  ],
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, './dist/assets'),
    publicPath: '',
    library: 'dakotaEwigmanWebsite',
    libraryTarget: 'window',
    libraryExport: 'default',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin(),
    new ESLintPlugin(),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, './dist/index.html'),
      // filename: 'index.html',
      template: path.resolve(__dirname, './src/template.html'),
      inject: 'head',
      hash: true,
      publicPath: 'assets',
    }),
  ],
  resolve: {
    // alias: {

    // },
    extensions: ['*', '.js'],
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          chunks: 'all',
          test: /[\\/]node_modules/,
          priority: -10,
        },
        default: {
          minChunks: 1,
          priority: -10,
          reuseExistingChunk: true,
        },
      },
    },
  },
  // externals: {

  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          // 'eslint-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'file-loader' },
        ],
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'file-loader' },
          { loader: 'less-loader' },
        ],
      },
      {
        test: /\.png$/,
        use: [
          { loader: 'url-loader?limit=10000' },
        ],
      },
      {
        test: /\.jpg$/,
        use: [
          { loader: 'file-loader' },
        ],
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          { loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
        ],
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          { loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
        ],
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          { loader: 'file-loader' },
        ],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          { loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
        ],
      },
    ],
  },
};
