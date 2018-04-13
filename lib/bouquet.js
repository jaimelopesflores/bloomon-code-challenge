const { totalAssigned, totalAssignedExtra, totalAvailableExtra } = require('./design-spec');

// manage the bouquets flowers assign
const manage = (specs, { name, size } /* flower name, size*/) => {

  // tryig to assign the flower to any spec
  for (let spec of specs) {

    if (spec.size !== size || totalAssigned(spec) >= spec.max) {
      continue;
    }

    // iterate through the flowers of the specification
    for (let flower of spec.flowers) {

      if (flower.name === name)

        // if flower has quantity means that the flower is on spec
        if (flower.quantity && flower.assigned < flower.quantity){

          return flower.assigned += 1;
        }
    }
  }

  // tryig to assign the extra flower to an uncomplete bouquet
  for (let spec of specs) {

    // size and total assignment validation
    if (spec.size !== size || totalAssigned(spec) >= spec.max) {
      continue;
    }

    // verify if there is any extra space availagle
    if (totalAvailableExtra(spec) > 0 && totalAssignedExtra(spec) < totalAvailableExtra(spec)) {

      for (let flower of spec.flowers) {

        if (flower.quantity) {
          continue;
        }

        if (flower.name === name) {

          return flower.assigned += 1;
        }
      }

      return spec.flowers.push({
        name,
        assigned: 1
      });
    }
  }
};

module.exports = {
  manage
};
