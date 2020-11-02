const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, "src/index.tsx"),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    alias: {
      '@dataset': path.resolve(__dirname, './dataset'),
      '@atoms$': path.resolve(__dirname, './src/components/atoms/index.tsx'),
      '@molecules$': path.resolve(__dirname, './src/components/molecules/index.tsx'),
      '@organisms$': path.resolve(__dirname, './src/components/organisms/index.tsx'),
      '@pages$': path.resolve(__dirname, './src/components/pages/index.tsx')
    },
  },
};
