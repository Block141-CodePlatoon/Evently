const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        "http": require.resolve("stream-http"),
        "buffer": require.resolve("buffer/"),
        "url": require.resolve("url/"),
        "crypto": require.resolve("crypto-browserify"),
        "net": require.resolve("net-browserify"),
        "tls": require.resolve("tls-browserify"),
        "https": require.resolve("https-browserify"),
        "os": require.resolve("os-browserify/browser"),
        "zlib": require.resolve("browserify-zlib"),
        "stream": require.resolve("stream-browserify"),
        "querystring": require.resolve("querystring-es3"),
        "path": require.resolve("path-browserify"),
      };
      webpackConfig.plugins = [
        ...webpackConfig.plugins,
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
        }),
      ];
      return webpackConfig;
    },
  },
};
