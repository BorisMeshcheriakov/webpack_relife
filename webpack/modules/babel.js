const babel = {
	test: /\.(mjs|js|jsx)$/,
	exclude: /node_modules/,
	use: {
		loader: 'babel-loader',
		options: {
			presets: ['@babel/react', '@babel/preset-env'],
		},
	},
};

module.exports = babel;
