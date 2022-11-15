const Builder = require('./Builder');
const { getFile } = new Builder();

const handlebars = require('handlebars');
const config = require('./main.config');
const marked = require('./md.config');
const prettierConfig = JSON.parse(getFile('../.prettierrc'));
const builder = new Builder(
  config,
  handlebars.compile,
  marked.parse,
  prettierConfig
);

// TODO:
// only run build on files that have changed
// https://www.codingninjas.com/codestudio/library/nodemon

(() => {
  const len = config.length;
  for (let i = 0; i < len; i++) {
    builder.run(i);
  }

  //test
  // builder.run(0);
})();
