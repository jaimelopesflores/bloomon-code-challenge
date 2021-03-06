'use strict';

module.exports = function(spec) {

  // parsing the design and the size
  const [name, size, ...other] = spec.split('');
  let definition = other.join('');
  let designSpec = { spec, name, size, flowers: {} };
  let quantity = 0;

  while (definition) {

    let index = definition.search(/[a-z]/);

    switch (index) {
      case 0:
        const flowerName = definition.substring(0, 1);
        designSpec.flowers[flowerName] = parseInt(quantity);
        index = 1;
        break;
      default:
        quantity = definition.substring(0, index);
        break;
    }
    definition = definition.substr(index);
  }

  return designSpec;
};

