const test = require('tape');
const { get, add } = require('../lib/store/flower');

test('should add a flower', (assert) => {

  add('dL');
  add('dL');
  add('dL');

  const qtt = get('dL');

  assert.equal(qtt, 3);

  assert.end();
});

test('should ignore due to wrong name', (assert) => {

  add('jL');
  add('JL');

  const qtt = get('jL');

  assert.equal(qtt, 1);

  assert.end();
});

test('should ignore due to wrong size', (assert) => {

  add('pS');
  add('ps');
  add('pX');
  add('px');

  const qtt = get('pS');

  assert.equal(qtt, 1);

  assert.end();
});
