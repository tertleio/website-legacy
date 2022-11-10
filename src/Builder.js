// store the components
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

module.exports = class sBuilder {
  constructor(config) {
    this.config = config;
  }

  getFile(pathname) {
    return fs.readFileSync(path.resolve(__dirname, pathname), 'utf-8');
  }

  getFiles(filepaths = []) {
    const files = filepaths.map((fp) => this.getFile(fp));
    return files;
  }

  compose(components = [], vars) {
    const htmlFiles = [];

    while (components.length) {
      const current = components.shift();
      const template = handlebars.compile(current);
      const compiledHtml = template({ ...vars });
      htmlFiles.push(compiledHtml);
    }

    return htmlFiles;
  }

  // write file

  run(idx) {
    const files = this.getFiles(this.config[idx].read);
    const prebuilt = this.compose(files, this.config[idx].vars);
    const built = this.compose(prebuilt, this.config[idx].vars);
    return built;
  }
};
