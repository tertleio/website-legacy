// store the components
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

module.exports = class Builder {
  constructor(config) {
    this.config = config;
  }

  getFile(pathname) {
    return fs.readFileSync(path.resolve(__dirname, pathname), 'utf-8');
  }

  getStruct({ read, vars }) {
    const files = read.map((path) => this.getFile(path));
    return { content: files, vars };
  }

  compose({ content, vars }) {
    const compiled = [];

    while (content.length) {
      const currContent = content.shift();
      const template = handlebars.compile(currContent);
      const compiledHtml = template(vars);
      compiled.push({ vars: compiledHtml });
    }

    return compiled;
  }

  writeFile(writepath, file) {
    fs.writeFileSync(path.resolve(__dirname, writepath), file.toString());
  }

  run(idx) {
    // TODO: error handling
    const readPrebuild = this.getStruct(this.config[idx].prebuild);
    const prebuilt = this.compose(readPrebuild);

    // map prebuilt onto next step
    const readBuild = this.getStruct({
      read: this.config[idx].build.read,
      vars: {
        header: prebuilt[0].vars,
        page: prebuilt[1].vars,
        footer: prebuilt[2].vars,
      },
    });

    // prebuilt needs to have the right keys here
    const built = this.compose(readBuild);
    console.log(built);

    this.writeFile(this.config[idx].write, built[0].vars);
  }
};
