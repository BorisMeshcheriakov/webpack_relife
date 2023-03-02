const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const {
	miniCssExtractPlugin,
	cleanWebpackPlugin,
	imageMinimizerWebpackPlugin,
	esbuildPlugin,
} = require('./plugins');

// Заменяем на esbuild plugin
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');

const plugins = [cleanWebpackPlugin, miniCssExtractPlugin];

/**
 * Webpack production configuration.
 */
const WebpackConfig = {
	plugins,
	optimization: {
		minimize: true,
		minimizer: [esbuildPlugin, imageMinimizerWebpackPlugin],
	},
};

module.exports = merge(common, WebpackConfig);
