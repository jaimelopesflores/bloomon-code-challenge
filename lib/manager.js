const readline = require('readline');
const { info, warn, error } = require('./utils/logger');
const { manage } = require('./bouquet');
const { parse, parseFlower, toString } = require('./design-spec');
const { BOUQUET_DEFINITION, FLOWER_INPUT } = require('./constants');

// start the process
async function run(filePath) {

  const state = BOUQUET_DEFINITION;
  const specs = [];
  const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  reader.on('close', () => specs.map((spec) => toString(spec)));
  reader.on('line', (line) => {

    info('Line received', { module: 'manager', line, state });

    if (!line.trim()) {
      return state = FLOWER_INPUT;
    }

    switch (state) {
      case BOUQUET_DEFINITION: return specs.push(parse(line));
      case FLOWER_INPUT:
        manage(specs, parseFlower(line));
    }
    console.log(specs);
  });
};


module.exports = run;
