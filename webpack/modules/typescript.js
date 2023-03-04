const typeScript = {
	test: /\.(ts|tsx)$/,
	loader: 'ts-loader',
	exclude: /node_modules/,
	options: {
		transpileOnly: true,
	},
};

module.exports = typeScript;
