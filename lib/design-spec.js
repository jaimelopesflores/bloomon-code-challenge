'use strict';

const { info, warn, error } = require('./utils/logger');

// parse the specification
const parse = (spec) => {

  // parsing the design and the size
  const [name, size, ...other] = spec.split('');
  let definition = other.join('');
  let designSpec = { name, size, flowers: {} };
  let quantity = 0;

  while (definition) {

    let index = definition.search(/[a-z]/);

    switch (index) {
      case 0:
        const flowerName = definition.substring(0, 1);
        designSpec.flowers[flowerName] = parseInt(quantity);
        definition = definition.substr(1);
        break;
      default:
        quantity = definition.substring(0, index);
        definition = definition.substr(index);
        break;
    }
  }

  info({ module: 'design-spec', designSpec }, 'Parsing the bouquet spec');

  return designSpec;
};

// parse the flower string
const parseFlower = (flowerSpec) => {

  let [name, size] = flowerSpec.split('');

  return {
    name,
    size
  };
};

// get the total assigned
const totalAssigned = (spec) => spec.flowers.length === 1 ?
  spec.flowers[0].assigned :
  spec.flowers.reduce((acc, current, index) => {
    return (index === 1 ? acc.assigned : acc) + current.assigned;
  });

// get the total assigned for only extra flowers
const totalAssignedExtra = (spec) => spec.flowers.length === 1 ?
  (spec.flowers[0].quantity ? 0 : spec.flowers[0].assigned) :
  spec.flowers.reduce((acc, current, index) => {
    return (index === 1 ? (acc.quantity ? 0 : acc.assigned) : acc) + (current.quantity ? 0 : current.assigned);
  });

// get the total spaces available for extra flowers (not defined in the specification
const totalAvailableExtra = (spec) => {

  let flowers = spec.flowers;
  if (flowers.length === 1) {
    return  flowers[0].quantity ?  spec.max - flowers[0].quantity : spec.max;
  }
  return spec.max - flowers.reduce((acc, current, index) => {
    return (index === 1 ? (acc.quantity ? acc.quantity : 0) : acc) + (current.quantity ? current.quantity : 0);
  });
};

// output the spec in the format <design name><design size><flower1 qtt><flower1 name> ...
const toString = (spec) => {

  let flowers = '';
  spec.flowers.map((flower) => flowers += `${flower.assigned}${flower.name}`);
  console.log(`${spec.design}${spec.size}${flowers}`);
};

module.exports = {
  parse,
  parseFlower,
  totalAssigned,
  totalAssignedExtra,
  totalAvailableExtra,
  toString
}
