const Builder = require('./Builder');

const config = require('./config');
const builder = new Builder(config);

(() => {
  builder.run(0);
})();
