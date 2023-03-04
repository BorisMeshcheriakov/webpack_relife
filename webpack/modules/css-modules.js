const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const { config } = require('../configuration');

const cssLoader = {
	loader: 'css-loader',
	options: {
		sourceMap: true,
		modules: true,
		importLoaders: 1,
		modules: {
			localIdentName: '[local]_[hash:base64:5]',
			mode: 'local',
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

const sassLoader = {
	loader: 'sass-loader',
	options: {
		sourceMap: true,
	},
};

const cssModules = {
	test: /\.module\.scss$/i,
	use: [
		config.IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
		cssLoader,
		postcssLoader,
		sassLoader,
	],
};

module.exports = cssModules;
