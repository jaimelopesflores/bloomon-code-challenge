'use strict';

const { debug, info } = require('./utils/logger');
const bouquetSpecStore = require('./store/bouquet-spec');
const flowerStore = require('./store/flower');

// checking the availability of the stored flowers
function checkAvailability() {

  const specs = bouquetSpecStore.getAll();
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
      build(spec);
    }
  });
}

function build(spec) {
  debug({ module: 'bouquet', spec }, 'Building spec');

  const { flowers, size } = spec;
  const valid = Object
    .keys(flowers)
    .forEach((name) => {
      const flower = `${name}${size}`;
      const qtt =  flowerStore.get(flower);
      flowerStore.update(flower, qtt - flowers[name]);
    });

  info(spec.spec);
}

module.exports = {
  build,
  checkAvailability
};
