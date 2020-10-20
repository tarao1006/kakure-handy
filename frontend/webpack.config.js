const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src/index.tsx"),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    alias: {
      '@dataset': path.resolve(__dirname, './dataset')
    },
  },
  devServer: {
    contentBase: path.relative(__dirname, 'dist'),
    host: '0.0.0.0',
    port: 8080,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'FIREBASE_API_KEY',
      'FIREBASE_AUTH_DOMAIN',
      'BACKEND_API_BASE']
    )
  ]
}
