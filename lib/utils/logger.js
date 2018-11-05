'use strict';

const bunyan = require('bunyan');
const bformat = require('bunyan-format');
const consoleStream = {
  level: 'trace',
  stream: new bformat({
    levelInString: true,
    outputMode: 'long'
  }, process.stdout)
};

const logger = bunyan.createLogger({
  name: 'bloomon-code-challenge',
  streams: [consoleStream]
});

function log(level, ...args) {
  if (process.env.DEBUG) {
    logger[level](...args);
  }
}

const info = (...args) => log('info', ...args);
const warn = (...args) => log('warn', ...args);
const error = (...args) => log('error', ...args);

module.exports = {
  info,
  warn,
  error
};
