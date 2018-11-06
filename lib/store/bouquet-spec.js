
'use strict';

const { debug } = require('..//utils/logger');
const parser = require('../parser/bouquet-spec');
const maxStorage = process.env.MAX_STORAGE || 256;

let inMemoryList = [];

// get all bouquet specs
function getAll() {
  return inMemoryList;
}

// stores a flower
function add(spec) {

  const [ name, size, ...flowers ] = spec.split('');

  if (!/[A-Z]/g.test(name) || !/S|L/.test(size)) {
    return debug({ module: 'bouquet-spec-store',  }, 'Bouquet spec is not valid');
  }

  inMemoryList.push(parser(spec));
  debug({ module: 'bouquet-spec-store', inMemoryList }, 'Adding bouquet');
};


module.exports = {
  getAll,
  add
};
