const Builder = require('./Builder');
const handlebars = require('handlebars');

const config = require('./main.config');
const marked = require('./md.config');
const builder = new Builder(config, handlebars.compile, marked.parse);
// const mdBuilder = new Builder(mdConfig, marked.parse);

// TODO:
// only run build on files that have changed
// https://www.codingninjas.com/codestudio/library/nodemon

(() => {
  // const len = config.length;
  // for (let i = 0; i < len; i++) {
  //   builder.run(i);
  // }
  builder.run(0);
  // const mdToHtml = mdBuilder.runMd();
  // console.log(mdToHtml);
})();
