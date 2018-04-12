const test = require('tape');
const { parse } = require('../lib/design-spec');

test('should parse an design specification', (assert) => {

  let bouquetSpec = parse('');

  // testing the design specifications
  assert.ok(/[A-Z]/.test(bouquetSpec.design), 'should be a capital letter');
  assert.ok(/S|L/.test(bouquetSpec.size), 'should be the capital letter S or L');

  // testing the flower names
  bouquetSpec.flowers.forEach((flower) => assert.ok(/[a-z]/.test(flower.name), 'should be a smal letter'));

  let total = bouquetSpec.flowers.reduce((acc, current, index) => (index === 0 ? acc.quantity : acc) + curr.quantity);

  assert.ok(total <= bouquetSpec.max, 'should be less or equal the maximum allowed');

  assert.end();

});
