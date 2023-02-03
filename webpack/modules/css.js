// Import dependencies.
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

// Import Configuration.
const { config, paths } = require('../configuration');

/**
 * Default modules loader for CSS.
 */

const cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: true,
    importLoaders: 1,
    modules: {
      localIdentName: '[local]_[hash:base64:5]',
    },
  },
};

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [autoprefixer],
    },
    sourceMap: true,
  },
};

const sassLoader = { loader: 'sass-loader', options: { sourceMap: true } };

const css = {
  test: /\.(sass|scss|css)$/,
  use: [
    config.IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
    cssLoader,
    postcssLoader,
    sassLoader,
  ],
  exclude: /node_modules/,
  resolve: {
    alias: {
      '@sass': paths.sass,
    },
  },
};

module.exports = css;
