const Builder = require('./Builder');

const config = require('./config');
const builder = new Builder(config);

(() => {
  const built = builder.run(0);
  console.log(built);
})();
