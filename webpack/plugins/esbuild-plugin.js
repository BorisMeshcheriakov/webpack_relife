const { EsbuildPlugin } = require('esbuild-loader');

const esbuildPlugin = new EsbuildPlugin({
	target: 'es2015',
	css: true,
});

module.exports = esbuildPlugin;
