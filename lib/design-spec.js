
// parse the specification
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
        flower = { assigned: 0 };
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
