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

function image(href, title, alt) {
  // console.log(href, title, alt);
  const fullPath = '/blog/top-15-questions-to-ask-a-potential-co-founder';
  return `<img class="post-img" src="${fullPath}${href}" title="${alt}" alt="${alt}" />`;
}

// let gotMeta = false;
// const walkTokens = (token) => {
//   console.log(token);
//   if (token.type === 'hr') {
//     // console.log(token);
//     // token.depth += 1;
//   }
// };

// const tokenizer = {
//   codespan(src) {
//     // console.log(src);
//     const match = src.match(/^\$+([^\$\n]+?)\$+/);
//     if (match) {
//       return {
//         type: 'codespan',
//         raw: match[0],
//         text: match[1].trim(),
//       };
//     }

//     // return false to use original codespan tokenizer
//     return false;
//   },
// };

// overrrides
const renderer = { heading, image };
const opts = {
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
