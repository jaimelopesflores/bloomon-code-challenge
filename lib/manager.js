const fs = require('fs');
const readline = require('readline');
const { manage } = require('./bouquet');
const { parse, parseFlower, toString } = require('./design-spec');

// start the process
const start = (filePath) => {

  let specs = [];
  let isFlower = false;
  let reader = readline.createInterface({ input: fs.createReadStream(filePath) });

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


module.exports = {
  start
};
