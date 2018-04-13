const parse = (spec) => {

  // parsing the design and the size
  let [design, size, ...other] = spec.split('');
  let definition = other.join('');

  let designSpec = {
    spec,
    design,
    size,
    flowers: []
  };

  let flower;

  while (definition) {

    let index = definition.search(/[a-z]/);
    let attribute;
    let value;

    switch (index) {
      default:
        flower = {};
        attribute = 'quantity';
        designSpec.flowers.push(flower);
        break;
      case 0:
        index = 1;
        attribute = 'name';
        break;
      case -1:
        index = definition.length;
        break;
    }

    value = definition.substring(0, index);
    definition = definition.substr(index);

    if (!definition) {
      designSpec.max = parseInt(value);
    }
    else {
      flower[attribute] = isFinite(value) ? parseInt(value) : value;
    }
  }
  return designSpec;
}

module.exports = {
  parse
}
