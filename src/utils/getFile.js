const fs = require('fs');

function getFile(filepath) {
  return fs.readFileSync(
    path.resolve(__dirname, `../templates${filepath}`),
    'utf-8'
  );
}

module.exports = getHtmlFile;
