/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
	verbose: true,
	moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
	moduleDirectories: ['node_modules', 'src'],
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		'^.+\\.(css|scss)$': 'identity-obj-proxy',
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/fileMocks.js',
	},
};
