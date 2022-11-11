const Builder = require('./Builder');

const config = require('./config');
const builder = new Builder(config);

// TODO:
// only run build on files that have changed
// https://www.codingninjas.com/codestudio/library/nodemon

(() => {
  const len = config.length;
  for (let i = 0; i < len; i++) {
    builder.run(i);
  }
})();
