const path = require('path');

module.exports = {
  entry: './src/index.js', // Your entry point
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    fallback: {
      "buffer": require.resolve("buffer/"),
      "timers": require.resolve("timers-browserify")
    }
  },
  module: {
    rules: [
      // Other loaders for JSX, CSS, etc.
    ]
  },
  plugins: [
    // Any plugins you need
  ],
  // Other Webpack configuration options
};
