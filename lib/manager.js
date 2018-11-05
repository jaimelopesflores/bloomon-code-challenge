const readline = require('readline');
const { info, warn, error } = require('./utils/logger');
const { parse } = require('./design-spec');
const { store } = require('./bouquet');
const { BOUQUET_DEFINITION, FLOWER_INPUT } = require('./constants');

// start the process
async function run() {

  info({ module: 'manager' }, 'Waiting for the input');

  let state = BOUQUET_DEFINITION;
  const specs = [];
  const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  reader.on('close', () => specs.map((spec) => toString(spec)));
  reader.on('line', (line) => {

    if (!line.trim()) {
      if (state !== FLOWER_INPUT) {
        info({ module: 'manager' }, 'State change. Start listening to the flower input.');
        return state = FLOWER_INPUT;
      }
    }

    info({ module: 'manager', line, state }, 'Line received');

    switch (state) {
      case BOUQUET_DEFINITION:
        return specs.push(parse(line));
      case FLOWER_INPUT:
        return store(line.trim());
      default: return;
    }
  });
};


module.exports = run;
