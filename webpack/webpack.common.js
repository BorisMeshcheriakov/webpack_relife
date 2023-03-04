/// const HtmlWebpackPlugin = require('html-webpack-plugin')
const { htmlWebpackPlugin } = require('./plugins');
const { paths, config } = require('./configuration');
const { typeScript, css, babel, assets, esbuild, cssModules } = require('./modules');
const path = require('path');
require('../node_modules/react-phone-number-input/');
/**
 * Entry point for the bundle.
 */
const entry = [`${paths.src}/index.tsx`];

/**
 * Set output file name and path.
 */
const output = {
	publicPath: '/',
	path: paths.build,
	filename: config.JS_FILE_OUTPUT,
	clean: true,
};

/**
 * Shared plugins.
 */
const plugins = [htmlWebpackPlugin];

/**
 * Shared modules.
 */
const modules = {
	rules: [esbuild, css, cssModules, assets],
};

/**
 * Resolve extensions.
 * Alias for @src set to paths.src directory.
 */
const resolve = {
	extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', 'css', 'scss'],
	preferRelative: true,
	alias: {
		'@src': paths.src,
		'@styles': paths.styles,
		core: paths.core,
		library: paths.library,
		resources: paths.resources,
		modules: paths.modules,
		shared: paths.shared,
	},
	fallback: {
		'react/jsx-runtime': 'react/jsx-runtime.js',
		'react/jsx-dev-runtime': 'react/jsx-dev-runtime.js',
	},
	modules: ['node_modules'],
};

const optimization = {
	splitChunks: {
		chunks: 'all',
	},
};

/**
 * Webpack common configuration.
 */
module.exports = {
	entry,
	output,
	optimization,
	plugins,
	resolve,
	module: modules,
	context: __dirname,
	target: config.IS_DEV ? 'web' : 'browserslist',
	mode: config.IS_DEV ? 'development' : 'production',
};
