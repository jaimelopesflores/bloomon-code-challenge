#!/usr/bin/env node

const { init, manage } = require('../lib/manager');
const [,, ...args] = process.argv;

if (args.length !== 1) {
  console.error('[error] This tool expect 1 argument');
  return process.exit(1);
}

init(process.argv[2]);
