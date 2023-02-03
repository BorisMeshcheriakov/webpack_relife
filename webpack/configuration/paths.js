const path = require('path');

module.exports = {
  // Source files
  src: path.resolve(__dirname, '../../src'),
  sass: path.resolve(__dirname, '../../src/sass'),

  // Production build files
  build: path.resolve(__dirname, '../../dist'),

  // Static files that get copied to build folder
  public: path.resolve(__dirname, '../../public'),
};
