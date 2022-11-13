const fs = require('fs');
const path = require('path');
const { ylw, grn, red } = require('./utils/logs');
const parseMeta = require('./utils/parseMeta');

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
    const files = read.map((path) => {
      let file = this.getFile(path);

      const split = path.split('.');
      const ext = split[split.length - 1];
      let meta;

      if (ext === 'md' && file.startsWith('---')) {
        const { meta: m, content: c } = parseMeta(file);
        meta = m;
        file = c;
      } else {
        console.log(`⚠️  '${red(path)}' should contain a meta header'`);
      }

      return { ext, meta, content: file };
    });

    if (newVars) {
      let i = 0;
      for (const key in vars) {
        if (vars[key]) continue; // has a value to be used from config
        vars[key] += newVars[i].vars;
        i++;
      }
    }

    return { files, vars };
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

  run(idx, debug = false, verbose = false) {
    if (this.count === 0) console.log(`⏳ Builder ${this.count} starting...`);
    const { name, prebuild, build, write } = this.config[idx];
    this.count++;

    console.log(`🟧 i:`, ylw(name));
    const readPrebuild = this.getStruct(prebuild);
    debug && console.log(readPreBuild);
    const prebuilt = this.compose(readPrebuild);
    debug && verbose && console.log(readPreBuild);

    const readBuild = this.getStruct(build, prebuilt);
    debug && console.log(readPreBuild);
    const built = this.compose(readBuild);
    debug && verbose && console.log(readPreBuild);

    this.writeFile(write, built[0].vars);
    console.log('✅ o:', grn(write));
  }
};
