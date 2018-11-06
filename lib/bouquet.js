'use strict';

const { info } = require('./utils/logger');
const flowersStore = require('./store/flowers');

// checking the availability of the stored flowers
function checkAvailability(specs) {

  const specsToBuild = [];
  specs.forEach((spec) => {

    const { flowers, size } = spec;
    const valid = Object
      .keys(flowers)
      .map((name) => {
        const flower = `${name}${size}`;
        return flowersStore.get(flower) >= flowers[name];
      })
      .filter((hasEnough) => !hasEnough);

    if (valid.length === 0) {
      specsToBuild.push(spec);
    }
  });

  info({ module: 'bouquet', specsToBuild }, 'Specs available to build');
  return specsToBuild;
}

function build(specs) {

  specs.forEach((spec) => {

    const { flowers, size } = spec;
    const valid = Object
      .keys(flowers)
      .forEach((name) => {
        const flower = `${name}${size}`;
        const qtt =  flowersStore.get(flower);
        flowersStore.update(flower, qtt - flower[name]);
      });

    info({ module: 'bouquet' }, spec.spec);
  });
}

module.exports = {
  build,
  checkAvailability
};
