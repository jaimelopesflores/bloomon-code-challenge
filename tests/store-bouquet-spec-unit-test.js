const test = require('tape');
const parse = require('../lib/parser/bouquet-spec');

test('should parse a bouquet spec', (assert) => {

  let bouquetSpec = parse('AL10r5t8d');

  assert.equal(bouquetSpec.name, 'A');
  assert.equal(bouquetSpec.size, 'L');
  assert.equal(bouquetSpec.flowers.r, 10);
  assert.equal(bouquetSpec.flowers.t,5);
  assert.equal(bouquetSpec.flowers.d, 8);

  assert.end();
});
