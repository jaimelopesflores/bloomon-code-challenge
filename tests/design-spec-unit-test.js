const test = require('tape');
const { parse } = require('../lib/design-spec-parser');

test('should parse an design specification', (assert) => {

  let bouquetSpec = parse('AL10r5t8d30');

  // testing the design specifications
  assert.ok(/[A-Z]/.test(bouquetSpec.design), 'should be a capital letter');
  assert.ok(/S|L/.test(bouquetSpec.size), 'should be the capital letter S or L');

  // testing the flower names
  bouquetSpec.flowers.forEach((flower) => assert.ok(/[a-z]/.test(flower.name), 'should be a small letter'));

  // testing the total count
  let total = bouquetSpec.flowers.reduce((acc, current, index) => (index === 1 ? acc.quantity : acc) + current.quantity);

  assert.deepEqual(total, 23, 'should be 23');
  assert.ok(total <= bouquetSpec.max, 'should be less or equal the maximum allowed');

  assert.end();
});
