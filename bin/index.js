
const { init, manage } = require('../lib/manager');

if (process.argv.length !== 3) {
  console.error('This tool expect 1 argument');
  return process.exit(1);
}

init(process.argv[2]);
