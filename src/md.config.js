const marked = require('marked');

function heading(txt, lv) {
  console.log(lv);
  console.log(txt);
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
marked.use({ renderer });

// test
console.log(marked.parse('## Some heading here'));

module.exports = marked;
