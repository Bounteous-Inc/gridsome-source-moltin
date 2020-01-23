const chalk = require('chalk');
const ProgressBar = require('progress');

const prefix = ' Moltin ';

function log(...args) {
  console.log(chalk.black.bgBlue(prefix), ...args);
}

function warn(...args) {
  console.warn(chalk.black.bgYellow(prefix), ...args);
}

function success(...args) {
  console.log(chalk.black.bgGreen(prefix), ...args);
}

function getProgressBar(typeName, count) {
  return new ProgressBar(`${chalk.black.bgBlue(prefix)} Fetching ${typeName} × :current (:percent ETA :etas) ⸨:bar⸩`, {
    total: count,
    clear: true,
    complete: '█',
    incomplete: '░',
  });
}

module.exports = {
  log, warn, success, getProgressBar,
};
