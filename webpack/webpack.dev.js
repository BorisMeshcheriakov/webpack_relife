const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { paths, config } = require('./configuration');
const { eslintWebpackPlugin, providePlugin } = require('./plugins');

const devServer = {
	open: true,
	compress: false,
	port: config.PORT,
	host: config.HOST,
	hot: true,
	historyApiFallback: { index: '/', disableDotRule: true },
	proxy: {
		context: ['/api/**', '/media/**'],
		target: 'https://api-relife.nicecode.biz/',
		changeOrigin: true,
	},
	client: {
		progress: false,
		reconnect: 5,
	},
	static: [
		{
			watch: true,
			directory: paths.public,
		},
	],
};

const plugins = [eslintWebpackPlugin, providePlugin];

const dev = {
	plugins,
	devServer,
	devtool: 'cheap-module-source-map',
};

module.exports = merge(common, dev);
