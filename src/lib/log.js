const chalk = require('chalk');
const ProgressBar = require('progress');

const prefix = ' Moltin ';

function log(...args) {
  console.log(chalk.black.bgGreen(prefix), ...args);
}

function warn(...args) {
  console.warn(chalk.black.bgYellow(prefix), ...args);
}

function getProgressBar(typeName, count) {
  return new ProgressBar(`${chalk.black.bgBlue(prefix)} Fetching ${typeName} :id :bar :percent`, {
    total: count,
    clear: true,
  });
}

module.exports = { log, warn, getProgressBar };
