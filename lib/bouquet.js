'use strict';

const { info } = require('./utils/logger');
const flowerStore = require('./store/flower');

// checking the availability of the stored flowers
function checkAvailability(specs) {

  const specsToBuild = [];
  specs.forEach((spec) => {

    const { flowers, size } = spec;
    const valid = Object
      .keys(flowers)
      .map((name) => {
        const flower = `${name}${size}`;
        return flowerStore.get(flower) >= flowers[name];
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
        const qtt =  flowerStore.get(flower);
        flowerStore.update(flower, qtt - flower[name]);
      });

    info({ module: 'bouquet' }, spec.spec);
  });
}

module.exports = {
  build,
  checkAvailability
};
