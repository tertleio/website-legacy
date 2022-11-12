const fs = require('fs');
const path = require('path');
const { ylw, grn } = require('./utils/logs');

module.exports = class Builder {
  constructor(config, hbs, md) {
    this.runCount = 0;
    this.config = config;
    this.hbs = hbs;
    this.md = md;
  }

  getFile(pathname) {
    // return ext type
    // console.log(pathname);
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
    const files = read.map((path) => this.getFile(path));
    return { content: files, vars };
  }

  compose({ content, vars }, helper) {
    const compiled = [];

    while (content.length) {
      const currContent = content.shift();
      const template = helper(currContent);
      const compiledHtml = template(vars);
      compiled.push({ vars: compiledHtml });
    }

    return compiled;
  }

  writeFile(writepath, file) {
    fs.writeFileSync(path.resolve(__dirname, writepath), file.toString());
  }

  run(idx) {
    if (this.runCount === 0) console.log('⏳ Builder starting...');
    this.runCount++;

    console.log(`🟧 i:`, ylw(this.config[idx].name));
    const readPrebuild = this.getStruct(this.config[idx].prebuild);
    const prebuilt = this.compose(readPrebuild, this.hbs);

    const readBuild = this.getStruct(this.config[idx].build, prebuilt);
    const built = this.compose(readBuild, this.hbs);

    this.writeFile(this.config[idx].write, built[0].vars);
    console.log('✅ o:', grn(this.config[idx].write));
  }

  runMd() {
    const file = this.getFile('./content/1/index.md');
    // console.log(file);
    const result = this.helper(file);
    return result;
    // render the file
  }
};
