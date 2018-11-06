const readline = require('readline');
const { debug } = require('./utils/logger');
const bouquetSpecStore = require('./store/bouquet-spec');
const flowerStore = require('./store/flower');
const { checkAvailability, build } = require('./bouquet');
const { BOUQUET_DEFINITION, FLOWER_INPUT } = require('./constants');

// start the process
async function run() {

  let state = BOUQUET_DEFINITION;
  const specs = [];
  const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  debug({ module: 'manager' }, 'Waiting for input')

  reader.on('line', (line) => {

    if (!line.trim()) {
      state = FLOWER_INPUT;
      return debug({ module: 'manager' }, 'Reading flower stream');
    }

    switch (state) {
      case BOUQUET_DEFINITION:
        bouquetSpecStore.add(line.trim());
        break;
      case FLOWER_INPUT:
        flowerStore.add(line.trim());
        checkAvailability(specs);
        break;
      default: return;
    }
  });
};


module.exports = run;
