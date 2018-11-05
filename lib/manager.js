const readline = require('readline');
const { manage } = require('./bouquet');
const { parse, parseFlower, toString } = require('./design-spec');
const { BOUQUET_DEFINITION } = require('./constants');

// start the process
async function run(filePath) {

  const state = 'bouquet_definition';
  const specs = [];
  const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  reader.on('close', () => specs.map((spec) => toString(spec)));
  reader.on('line', (line) => {

    if (!line.trim()) {
      isFlower = true;
    }
    else if (!isFlower) {
      specs.push(parse(line));
    }
    else {
      manage(specs, parseFlower(line));
    }
  });
};


module.exports = run;
