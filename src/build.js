const Builder = require('./Builder');

const config = require('./config');
const builder = new Builder(config);

(() => {
  for (let i = 0; i < config.length; i++) {
    builder.run(i);
  }
})();
