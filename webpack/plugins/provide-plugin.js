const webpack = require('webpack');

const provide = new webpack.ProvidePlugin({
	React: 'react',
	$: 'jquery',
	_: 'lodash',
});

module.exports = provide;
