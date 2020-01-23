const { readdirSync } = require('fs');
const { join } = require('path');

const pattern = /\.js$/;

module.exports = readdirSync(__dirname)
  .map((name) => join(__dirname, name))
  .filter((path) => path !== __filename && pattern.test(path))
  .map((path) => require(path));
