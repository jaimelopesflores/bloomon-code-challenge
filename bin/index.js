
const { events, init, manage } = require('../lib/manager');

let designSpecs;

events.on('onDesignSpecs', (specs) => {

  designSpecs = specs;
});


events.on('onFinish', () => {

  console.log('finish');

  designSpecs.map((spec) => {

    console.log('>>>>>>>>>>>>>');
    console.log(spec.spec);
    console.log(spec.totalAssigned());
    spec.flowers.map((flower) => {
      console.log('***');
      console.log(`name :${flower.name}`);
      console.log(`assigned :${flower.assigned}`);
      console.log(`quantity :${flower.quantity}`);
      console.log(`not in spec :${flower.notInSpec}`);
    })
  });

});

init(process.argv[2]);
