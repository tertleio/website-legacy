const Builder = require('./Builder');

const hbsConfig = require('./hbs.config');
const builder = new Builder(hbsConfig);

// TODO:
// only run build on files that have changed
// https://www.codingninjas.com/codestudio/library/nodemon

(() => {
  const len = hbsConfig.length;
  for (let i = 0; i < len; i++) {
    builder.run(i);
  }
})();
