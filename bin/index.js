
const { events, read } = require('../lib/manager');

let designSpecs;

events.on('onDesignSpecs', (specs) => {

  console.log(specs);
  designSpecs = specs;
});

events.on('onFlower', (flower) => {

  console.log(flower);
});

events.on('onFinish', () => {

  console.log('finish');
});

read(process.argv[2]);
