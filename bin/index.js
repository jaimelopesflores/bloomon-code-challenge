#!/usr/bin/env node

const { start } = require('../lib/manager');
const [,, ...args] = process.argv;

if (args.length !== 1) {
  console.error('[error] This tool expect 1 argument');
  return process.exit(1);
}

start(args[0]);
