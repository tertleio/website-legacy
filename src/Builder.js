const fs = require('fs');
const path = require('path');
const { ylw, grn } = require('./utils/logs');

module.exports = class Builder {
  constructor(config, hbs, md) {
    this.count = 0;
    this.config = config;
    this.hbs = hbs;
    this.md = md;
  }

  getFile(pathname) {
    return fs.readFileSync(path.resolve(__dirname, pathname), 'utf-8');
  }

  getStruct({ read, vars }, newVars = false) {
    if (newVars) {
      let i = 0;
      for (const key in vars) {
        if (vars[key]) continue; // has a value to be used from config
        vars[key] += newVars[i].vars;
        i++;
      }
    }
    const filesWithExt = read.map((path) => {
      const split = path.split('.');
      const ext = split[split.length - 1];
      return { ext, content: this.getFile(path) };
    });
    return { files: filesWithExt, vars };
  }

  compose({ files, vars }) {
    const compiled = [];

    while (files.length) {
      let html;
      const currFile = files.shift();
      const withVars = currFile.ext === 'hbs';
      const helper = withVars ? this.hbs : this.md;
      const template = helper(currFile.content);
      html = withVars ? template(vars) : template;
      compiled.push({ vars: html });
    }

    return compiled;
  }

  writeFile(writepath, file) {
    fs.writeFileSync(path.resolve(__dirname, writepath), file);
  }

  run(idx) {
    if (this.count === 0) console.log(`⏳ Builder ${this.count} starting...`);
    const { name, prebuild, build, write } = this.config[idx];
    this.count++;

    console.log(`🟧 i:`, ylw(name));
    const readPrebuild = this.getStruct(prebuild);
    const prebuilt = this.compose(readPrebuild);

    const readBuild = this.getStruct(build, prebuilt);
    const built = this.compose(readBuild);

    this.writeFile(write, built[0].vars);
    console.log('✅ o:', grn(write));
  }
};
