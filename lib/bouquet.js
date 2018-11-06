'use strict';

const { info, error } = require('./utils/logger');
const maxStorage = process.env.MAX_STORAGE || 256;

let inMemoryHashMap = {};

// gets a flower
function get(flower) {
  return inMemoryHashMap[flower];
}

function count() {
  return Object.keys(inMemoryHashMap)
    .map((key) => get(key))
    .reduce((acc, curr) => acc + curr);
}

// stores a flower
function store(flower) {

  const [ name, size ] = flower.split('');

  if (!/[a-z]/g.test(name)) {
    return info({ module: 'bouquet', flower }, 'Flower name is not valid. Ignoring.');
  }
  if (!/S|L/.test(size)) {
    return info({ module: 'bouquet', flower }, 'Flower size is not valid. Ignoring.');
  }

  if (!inMemoryHashMap[flower]) {
    inMemoryHashMap[flower] = 0;
  }

  ++inMemoryHashMap[flower];

  // validating the maximum size
  if (count() > maxStorage) {
    error({ module: 'bouquet', maxStorage }, 'The number of flowers exceeded the maximum allowed. Stopping the app.');
    return process.exit(1);
  }

  info({ module: 'bouquet', inMemoryHashMap }, 'Adding flower');
};

// checking the availability of the stored flowers
function checkAvailability(specs) {

  const specsToBuild = [];
  specs.forEach((spec) => {

    const { flowers, size } = spec;
    const valid = Object
      .keys(flowers)
      .map((name) => {
        const flower = `${name}${size}`;
        return get(flower) >= flowers[name];
      })
      .filter((hasEnough) => !hasEnough);

    if (valid.length === 0) {
      specsToBuild.push(spec);
    }
  });

  info({ module: 'bouquet', specsToBuild }, 'Specs available to build');
}

module.exports = {
  checkAvailability,
  get,
  store
};
