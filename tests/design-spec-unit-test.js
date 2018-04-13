const test = require('tape');
const { parse, parseFlower } = require('../lib/design-spec');

test('should parse a design specification', (assert) => {

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

  bouquetSpec = parse('ab10r5t8d30');

  // testing the design specifications
  assert.notOk(/[A-Z]/.test(bouquetSpec.design), 'should not be a small letter');
  assert.notOk(/S|L/.test(bouquetSpec.size), 'should be the capital letter S or L');

  assert.end();
});

test('should parse a flower', (assert) => {

  let flowerSpec = parseFlower('sL');

  // testing the flower specifications
  assert.ok(/[a-z]/.test(flowerSpec.name), 'should be a small letter');
  assert.ok(/S|L/.test(flowerSpec.size), 'should be the capital letter S or L');

  flowerSpec = parse('sA');

  // testing the flowerspecifications
  assert.notOk(/[a-a]/.test(flowerSpec.design), 'should not be a small letter');
  assert.notOk(/S|L/.test(flowerSpec.size), 'should be the capital letter S or L');

  assert.end();
});
