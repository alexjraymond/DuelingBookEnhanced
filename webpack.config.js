const path = require('path');

module.exports = {
  entry: {
    content_script: './src/content_script.tsx',
    background: './src/background.ts'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/js'),
    module: true,
    libraryTarget: 'module',
    environment: {
      module: true
    }
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  // Prevent splitting into chunks
  optimization: {
    splitChunks: {
      chunks: 'async'
    }
  }
}; 