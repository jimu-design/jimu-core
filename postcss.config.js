module.exports = {
  plugins: [
    require('precss'),
    require('autoprefixer'),
    require('postcss-pxtorem')({ propList: ['*'], exclude: () => {} }),
  ],
};
