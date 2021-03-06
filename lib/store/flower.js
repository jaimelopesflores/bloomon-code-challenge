
'use strict';

const { debug, error } = require('..//utils/logger');
const maxStorage = process.env.MAX_STORAGE || 256;

let inMemoryHashMap = {};

// gets a flower
function get(flower) {
  debug({ module: 'flower-store', flower, inMemoryHashMap }, 'Get flower');
  return inMemoryHashMap[flower];
}

// updates a flower
function update(flower, value) {
  debug({ module: 'flower-store', flower, value, inMemoryHashMap }, 'Update flower');
  inMemoryHashMap[flower] = value;;
}

// counts the total of all flowers
function count() {
  return Object.keys(inMemoryHashMap)
    .map((key) => get(key))
    .reduce((acc, curr) => acc + curr);
}

// stores a flower
function add(flower) {

  const [ name, size ] = flower.split('');

  if (!/[a-z]/g.test(name) || !/S|L/.test(size)) {
    return debug({ module: 'flower-store', flower }, 'Flower name is not valid. Ignoring.');
  }

  if (!inMemoryHashMap[flower]) {
    inMemoryHashMap[flower] = 0;
  }

  ++inMemoryHashMap[flower];

  // validating the maximum size
  if (count() > maxStorage) {
    error({ module: 'flower-store', maxStorage }, 'The number of flowers exceeded the maximum allowed. Stopping the app.');
    return process.exit(1);
  }

  debug({ module: 'flower-store', inMemoryHashMap }, 'Adding flower');
};


module.exports = {
  get,
  update,
  count,
  add
};
