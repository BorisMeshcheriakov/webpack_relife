const path = require('path');

module.exports = {
	// Source files
	src: path.resolve(__dirname, '..', '..', 'src'),

	// Production build files
	build: path.resolve(__dirname, '..', '..', 'build'),

	// Static files that get copied to build folder
	public: path.resolve(__dirname, '..', '..', 'public'),

	styles: path.resolve(__dirname, '..', '..', 'src', 'shared', 'styles'),

	core: path.resolve(__dirname, '..', '..', 'src', 'core'),

	library: path.resolve(__dirname, '..', '..', 'src', 'library'),

	resources: path.resolve(__dirname, '..', '..', 'src', 'resources'),
};
