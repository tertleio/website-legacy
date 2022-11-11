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

  getStruct({ read, vars }, newVars = false) {
    if (newVars) {
      let i = 0;
      for (const key in vars) {
        vars[key] += newVars[i].vars;
        i++;
      }
    }
    const files = read.map((path) => this.getFile(path));
    return { content: files, vars };
  }

  compose({ content, vars }) {
    let compiled = [];

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
    const prebuilt = this.compose(readPrebuild, this.config[idx].build.vars);

    const readBuild = this.getStruct(this.config[idx].build, prebuilt);
    const built = this.compose(readBuild);

    this.writeFile(this.config[idx].write, built[0].vars);
  }
};
