const { readdirSync } = require('fs');
const { join } = require('path');

const typesDir = join(__dirname, '../types');
const pattern = /\.js$/;

module.exports = readdirSync(typesDir)
  .map((name) => join(typesDir, name))
  .filter((path) => pattern.test(path))
  .map((path) => require(path));
