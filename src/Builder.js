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
    let nextVars;

    // console.log('NEW VARS', newVars);

    const files = read.map((path) => {
      let file = this.getFile(path);
      const split = path.split('.');
      const ext = split[split.length - 1];

      if (ext === 'md') {
        if (file.startsWith('---')) {
          const { content: c, meta: m } = parseMeta(file);
          file = c;
          nextVars = {
            author: m.Author,
            est: m.Est,
            date: m.Date,
          };
        } else {
          console.log(`⚠️  '${red(path)}' should contain a meta header'`);
        }
      }

      return { ext, content: file };
    });

    if (newVars) {
      let i = 0;
      for (const key in vars) {
        if (vars[key]) continue; // has a value to be used from config
        vars[key] += newVars[i].vars;
        i++;
      }
    }

    return { files, vars, nextVars };
  }

  compose({ files, vars }) {
    const compiled = [];
    console.log('COMPOSE', vars);

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
    debug && console.log(readPrebuild);
    const prebuilt = this.compose(readPrebuild);
    debug && verbose && console.log(prebuilt);

    // console.log('nextVars', readPrebuild.nextVars);
    // console.log(typeof prebuilt);
    // console.log(readPrebuild.nextVars);
    // console.log(prebuilt);

    if (readPrebuild.nextVars) {
      prebuilt.push({ vars: readPrebuild.nextVars.author });
      prebuilt.push({ vars: readPrebuild.nextVars.est });
      prebuilt.push({ vars: readPrebuild.nextVars.date });
    }
    let readBuild = this.getStruct(build, prebuilt);
    debug && console.log(readBuild);
    const built = this.compose(readBuild);
    debug && verbose && console.log(built);

    this.writeFile(write, built[0].vars);
    console.log('✅ o:', grn(write));
  }
};
