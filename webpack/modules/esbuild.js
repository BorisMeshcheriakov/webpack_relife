const esbuild = {
	rules: [
		{
			// Match js, jsx, ts & tsx files
			test: /\.[jt]sx?$/,
			loader: 'esbuild-loader',
			exclude: /node_modules/,
			options: {
				// JavaScript version to compile to
				target: 'es2015',
			},
		},
	],
};

module.exports = esbuild;
