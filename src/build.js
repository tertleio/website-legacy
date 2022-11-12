const Builder = require('./Builder');
const handlebars = require('handlebars');
const marked = require('./md.config');

const hbsConfig = require('./hbs.config');
const mdConfig = require('./md.config');
const hbsBuilder = new Builder(hbsConfig, handlebars);
const mdBuilder = new Builder(mdConfig, marked);

// TODO:
// only run build on files that have changed
// https://www.codingninjas.com/codestudio/library/nodemon

(() => {
  const len = hbsConfig.length;
  // for (let i = 0; i < len; i++) {
  //   hbsBuilder.run(i);
  // }

  // mdBuilder.testRun();
})();
