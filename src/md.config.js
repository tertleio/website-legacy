const marked = require('marked');

function heading(txt, lv) {
  const escTxt = txt.toLowerCase().replace(/[^\w]+/g, '-');
  switch (lv) {
    case 1:
      return `
        <h${lv} class="h2">
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

const tokenizer = {
  codespan(src) {
    console.log('tokenizer:', src);
    console.log('ran');
    const match = src.match(/^\$+([^\$\n]+?)\$+/);
    if (match) {
      return {
        type: 'codespan',
        raw: match[0],
        text: match[1].trim(),
      };
    }

    // return false to use original codespan tokenizer
    return false;
  },
};

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

// overide
marked.use(renderer, opts, tokenizer);

// test
// console.log(marked.parse('## Some heading here'));

module.exports = marked;
