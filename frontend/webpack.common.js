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
      '@model': path.resolve(__dirname, './src/model/index.ts'),
      '@utils': path.resolve(__dirname, './src/utils/index.ts'),
      '@api': path.resolve(__dirname, './src/api/index.ts'),
      '@atoms$': path.resolve(__dirname, './src/components/atoms/index.tsx'),
      '@molecules$': path.resolve(__dirname, './src/components/molecules/index.tsx'),
      '@organisms$': path.resolve(__dirname, './src/components/organisms/index.tsx'),
      '@templates$': path.resolve(__dirname, './src/components/templates/index.tsx'),
      '@pages$': path.resolve(__dirname, './src/pages/index.tsx')
    },
  },
};
