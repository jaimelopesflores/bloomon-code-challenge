const events = require('events');
const fs = require('fs');
const readline = require('readline');
const { parse, parseFlower } = require('./design-spec');

const specs = [];

const init = (filePath) => {

  let isFlower = false;

  let reader = readline.createInterface({ input: fs.createReadStream(filePath) });
  reader.on('close', () => specs.map((spec) => spec.toString()));
  reader.on('line', (line) => {

    if (!line.trim()) {

      isFlower = true;
    }
    else if (!isFlower) {

      specs.push(parse(line));
    }
    else {

      manage(parseFlower(line));
    }
  });
};

const manage = ({ name, size } /* flower name, size*/) => {

  // tryig to assign the flower to any spec
  for (let spec of specs) {

    if (spec.size !== size || spec.totalAssigned() >= spec.max) {
      continue;
    }

    // iterate through the flowers of the specification
    for (let flower of spec.flowers) {

      if (flower.name === name)

        // if flower has quantity means that the flower is on spec
        if (flower.quantity && flower.assigned < flower.quantity){

          if (!flower.assigned) {
            flower.assigned = 0;
          }

          flower.assigned += 1;
          return;
        }
    }
  }

  // tryig to assign the flower to any spec
  for (let spec of specs) {

    if (spec.size !== size || spec.totalAssigned() >= spec.max) {
      continue;
    }

    let totalAvailable = spec.totalAvailableForExtra();
    let totalAssigned = spec.totalAssignedExtra();

    if (totalAvailable > 0 && totalAssigned < totalAvailable) {

      for (let flower of spec.flowers) {

        if (flower.quantity) {
          continue;
        }

        if (flower.name === name) {

          flower.assigned += 1;
          return
        }
      }

      spec.flowers.push({
        name,
        assigned: 1
      });
      return;
    }
  }
}

module.exports = {
  init,
  manage
}
