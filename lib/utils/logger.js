'use strict';

function log(level, ...args) {
  console[level](...args);
}

const info = (...args) => log('info', ...args);
const warn = (...args) => log('warn', ...args);
const error = (...args) => log('error', ...args);

module.exports = {
  info,
  warn,
  error
};
