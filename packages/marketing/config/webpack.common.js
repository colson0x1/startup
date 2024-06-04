module.exports = {
  module: {
    rules: [
      /* @ Loader */

      /* @ Babel */
      {
        // test: /\.m?js$/,
        // Enable support for JSX
        test: /\.(m?js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
