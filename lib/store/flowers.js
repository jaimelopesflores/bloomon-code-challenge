
'use strict';

const { info, error } = require('..//utils/logger');
const maxStorage = process.env.MAX_STORAGE || 256;

let inMemoryHashMap = {};

// gets a flower
function get(flower) {
  return inMemoryHashMap[flower];
}

// updates a flower
function update(flower, value) {
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

  if (!/[a-z]/g.test(name)) {
    return info({ module: 'flowers-store', flower }, 'Flower name is not valid. Ignoring.');
  }
  if (!/S|L/.test(size)) {
    return info({ module: 'flowers-store', flower }, 'Flower size is not valid. Ignoring.');
  }

  if (!inMemoryHashMap[flower]) {
    inMemoryHashMap[flower] = 0;
  }

  ++inMemoryHashMap[flower];

  // validating the maximum size
  if (count() > maxStorage) {
    error({ module: 'flowers-store', maxStorage }, 'The number of flowers exceeded the maximum allowed. Stopping the app.');
    return process.exit(1);
  }

  info({ module: 'flowers-store', inMemoryHashMap }, 'Adding flower');
};


module.exports = {
  get,
  update,
  count,
  add
};
