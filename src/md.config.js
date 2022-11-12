const marked = require('marked');

function heading(txt, lv) {
  const escTxt = txt.toLowerCase().replace(/[^\w]+/g, '-');
  switch (lv) {
    case 1:
      return `
        <h${lv} class="h2>
          ${txt}
        </h${lv}>`;
    case 2:
      return `
        <h${lv} id=${escTxt}
          class="h3"
          data-short="Somethig short"
          data-long="Somthing a bit longer lulz like this"
          data-emoji=""
        >
          ${txt}
        </h${lv}>`;
    default:
      throw Error(`Invalid level '${lv}' in heading fn`);
  }
}

// overrrides
const renderer = { heading };
const opts = {
  pedantic: true,
  gfm: true,
  breaks: true,
  sanitize: false,
  smartypants: true,
  xhtml: false,
};
marked.use({ renderer }, { ...opts });

// test
// console.log(marked.parse('## Some heading here'));

module.exports = marked;
