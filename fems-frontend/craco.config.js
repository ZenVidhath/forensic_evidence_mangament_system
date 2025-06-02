const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  webpack: {
    plugins: [
      new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.(js|css|html|svg)$/,
        threshold: 8192,
      })
    ]
  }
};
