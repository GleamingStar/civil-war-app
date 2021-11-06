const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  target: 'node',
  node: {
    __dirname: false,
  },
  entry: './src/server/server.ts',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      server: path.resolve(__dirname, './src/server'),
      shared: path.resolve(__dirname, './src/shared'),
    },
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};