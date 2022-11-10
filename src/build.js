const Builder = require('./Builder');

const config = require('./config');
const builder = new Builder(config);

(() => {
  const prebuilt = builder.prebuild(0);
  const built = builder.build(0, prebuilt);
  console.log(built);
})();
