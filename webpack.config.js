const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = [
  {
    entry: './src/client/index.tsx',
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist/client'),
    },
  },
  {
    entry: './src/server.tsx',
    mode: 'development',
    target: 'node',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.pug$/,
          use: ['pug-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
      new NodemonPlugin({
        // If using more than one entry, you can specify
        // which output file will be restarted.
        script: './dist/server.js',

        // What to watch.
        watch: path.resolve('./dist'),

        // Unlike the cli option, delay here is in milliseconds (also note that it's a string).
        // Here's 1 second delay:
        delay: '1000',

        // Environment variables to pass to the script to be restarted
        env: {
          NODE_ENV: 'development',
        },
      }), // Dong
      new CopyPlugin({
        patterns: [{ from: 'src/views', to: 'client/views' }],
      }),
    ],
    output: {
      filename: 'server.js',
      path: path.resolve(__dirname, 'dist'),
    },
  },
];
