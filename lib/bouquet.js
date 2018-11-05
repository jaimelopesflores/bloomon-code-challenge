'use strict';

const { info } = require('./utils/logger');

let inMemoryHashMap = {};

// gets a flower
function get(flower) {
  return inMemoryHashMap[flower];
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
  info({ module: 'bouquet', inMemoryHashMap }, 'adding flower');
};

module.exports = {
  get,
  store
};
