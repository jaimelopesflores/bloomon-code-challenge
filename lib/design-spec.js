const parse = (spec) => {

  // parsing the design and the size
  let [design, size, ...other] = spec.split('');
  let definition = other.join('');

  let designSpec = {
    spec,
    design,
    size,
    flowers: [],
    toString() {
      let flowers = '';
      this.flowers.map((flower) => flowers += `${flower.assigned}${flower.name}`);
      console.log(`${this.design}${this.size}${flowers}`);
    },
    totalAssigned() {
      return this.flowers.length === 1 ? this.flowers[0].assigned : this.flowers.reduce((acc, current, index) => {
        return (index === 1 ? acc.assigned : acc) + current.assigned;
      })
    },
    totalAssignedExtra() {
      return this.flowers.length === 1 ? (this.flowers[0].quantity ? 0 : this.flowers[0].assigned) : this.flowers.reduce((acc, current, index) => {
        return (index === 1 ? (acc.quantity ? 0 : acc.assigned) : acc) + (current.quantity ? 0 : current.assigned);
      })
    },
    totalAvailableForExtra() {
      let flowers = this.flowers;
      if (flowers.length === 1) {
        return  flowers[0].quantity ?  this.max - flowers[0].quantity : this.max;
      }
      return this.max - flowers.reduce((acc, current, index) => {

        return (index === 1 ? (acc.quantity ? acc.quantity : 0) : acc) + (current.quantity ? current.quantity : 0);
      });
    }
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
}

const parseFlower = (flowerSpec) => {

  let [name, size] = flowerSpec.split('');

  return {
    name,
    size
  };
}

module.exports = {
  parse,
  parseFlower
}
