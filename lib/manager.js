const readline = require('readline');
const { info, warn, error } = require('./utils/logger');
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

  reader.on('line', (line) => {

    if (!line.trim()) {
      return state = FLOWER_INPUT;
    }

    switch (state) {
      case BOUQUET_DEFINITION:
        bouquetSpecStore.add(line.trim());
        break;
      case FLOWER_INPUT:
        flowerStore.add(line.trim());
        const specsToBuild = checkAvailability(specs);
        build(specsToBuild);
        break;
      default: return;
    }
  });
};


module.exports = run;
