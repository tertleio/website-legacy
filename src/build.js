const Builder = require('./Builder');

const config = require('./config');
const builder = new Builder(config);

(() => {
  const len = config.length;
  for (let i = 0; i < len; i++) {
    builder.run(i);
  }
})();
