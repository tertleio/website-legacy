// const { match } = require('assert');
const marked = require('marked');

function heading(txt, lv) {
  let escTxt = txt.toLowerCase().replace(/[^\w]+/g, '-');
  escTxt = escTxt.replace(/amp/, '&'); // &amp; -> & for id anchors
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
          data-short="${txt}"
          data-long="${txt}"
          data-emoji=""
        >
          ${txt}
        </h${lv}>`;
    default:
      return `</h${lv}>${txt}</h${lv}>`;
  }
}

// overrrides
const renderer = { heading };
const opts = {
  baseUrl: '/assets/blog/',
  pedantic: true,
  gfm: true,
  breaks: true,
  sanitize: false,
  smartypants: true,
  xhtml: false,
};

// override
marked.use({ renderer }, opts);

// test
// console.log(marked.parse('## Some heading here'));

module.exports = marked;
