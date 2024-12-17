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
      };
      return webpackConfig;
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
      }),
    ],
  },
};
