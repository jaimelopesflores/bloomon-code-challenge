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
  if (level === 'debug') {
    if (process.env.DEBUG) {
      logger[level](...args);
    }
    return;
  }
  (process.env.DEBUG ? logger : console)[level](...args);
}

const info = (...args) => log('info', ...args);
const debug = (...args) => log('debug', ...args);
const error = (...args) => log('error', ...args);

module.exports = {
  info,
  debug,
  error
};
