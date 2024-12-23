const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        timers: require.resolve('timers-browserify'),
        buffer: require.resolve('buffer/'),
        util: require.resolve('util/'),
        assert: require.resolve('assert/'),
        os: require.resolve('os-browserify/browser'),
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'), // Added stream polyfill
        process: require.resolve('process/browser.js'), // Added .js extension for process
      };

      return webpackConfig;
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser.js',  // Ensure process is available globally
        Buffer: ['buffer', 'Buffer'],  // Make Buffer available globally
      }),
    ],
  },
};
