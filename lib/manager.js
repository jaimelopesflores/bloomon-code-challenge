const events = require('events');
const fs = require('fs');
const readline = require('readline');
const { parse } = require('./design-spec');

const emitter = new events.EventEmitter();

const read = (filePath) => {

  let designSpecs = [];
  let isFlower = false;

  let reader = readline.createInterface({ input: fs.createReadStream(filePath) });
  reader.on('close', () => emitter.emit('onFinish'));
  reader.on('line', (line) => {

    if (!line.trim()) {

      isFlower = true;
      emitter.emit('onDesignSpecs', designSpecs);
    }
    else if (!isFlower) {

      designSpecs.push(parse(line));
    }
    else {

      emitter.emit('onFlower', line);
    }
  });
};

module.exports = {
  events: emitter,
  read
}
