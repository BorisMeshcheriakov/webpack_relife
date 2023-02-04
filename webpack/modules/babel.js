const babel = {
	test: /\.js$/,
	exclude: /node_modules/,

	use: {
		loader: 'babel-loader',
		options: {
			presets: ['@babel/react', '@babel/preset-env', '@babel/preset-typescript'],
		},
	},
};

module.exports = babel;
