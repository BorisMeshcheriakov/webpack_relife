const htmlWebpackPlugin = require('./html-webpack-plugin');
const miniCssExtractPlugin = require('./mini-css-extract-plugin');
const cleanWebpackPlugin = require('./clean-webpack-plugin');
const imageMinimizerWebpackPlugin = require('./image-minimizer-webpack-plugin');
const eslintWebpackPlugin = require('./eslint-webpack-plugin');
const esbuildPlugin = require('./esbuild-plugin');

module.exports = {
	htmlWebpackPlugin,
	miniCssExtractPlugin,
	cleanWebpackPlugin,
	imageMinimizerWebpackPlugin,
	eslintWebpackPlugin,
	esbuildPlugin,
};
