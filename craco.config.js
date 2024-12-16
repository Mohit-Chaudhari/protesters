// craco.config.js
module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        webpackConfig.resolve.fallback = {
          "timers": require.resolve("timers-browserify"),
          "buffer": require.resolve("buffer/"),
          "util": require.resolve("util/"),
        };
        return webpackConfig;
      },
    },
  };
  