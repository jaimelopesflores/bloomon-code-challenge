const readline = require('readline');
const { info, warn, error } = require('./utils/logger');
const { manage } = require('./bouquet');
const { parse, parseFlower, toString } = require('./design-spec');
const { BOUQUET_DEFINITION, FLOWER_INPUT } = require('./constants');

// start the process
async function run(filePath) {

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

      info({ module: 'manager' }, 'State change. Start listening to the flower input.');
      return state = FLOWER_INPUT;
    }

    info({ module: 'manager', line, state }, 'Line received');

    switch (state) {
      case BOUQUET_DEFINITION: return specs.push(parse(line));
      case FLOWER_INPUT:
        manage(specs, parseFlower(line));
    }
    console.log(specs);
  });
};


module.exports = run;
