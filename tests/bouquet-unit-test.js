const test = require('tape');
const { get, store } = require('../lib/bouquet');

test('should store a flower', (assert) => {

  store('dL');
  store('dL');
  store('dL');

  const qtt = get('dL');

  assert.equal(qtt, 3);

  assert.end();
});

test('should ignore due to wrong name', (assert) => {

  store('jL');
  store('JL');

  const qtt = get('jL');

  assert.equal(qtt, 1);

  assert.end();
});

test('should ignore due to wrong size', (assert) => {

  store('pS');
  store('ps');
  store('pX');
  store('px');

  const qtt = get('pS');

  assert.equal(qtt, 1);

  assert.end();
});
