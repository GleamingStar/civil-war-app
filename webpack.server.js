const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = () => {
  dotenv.config();

  return {
    mode: process.env.NODE_ENV,
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
    plugins: [
      new webpack.EnvironmentPlugin({
        RIOT_API_KEY: process.env.RIOT_API_KEY,
        DATABASE_IP: process.env.DATABASE_IP,
        DATABASE_USER: process.env.DATABASE_USER,
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
      }),
    ],
  };
};
