const path = require('path')

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname),
    filename: './dist/main.js',
  },
  module: {
    rules: [
      {
        test: [/\.js?$/],
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
          },
        },
      },
    ],
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
}
