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

  // if (read.hasOwnProperty(key)) {
  //   if (i === 0) {
  //     nextVars = vars;
  //   }

  //   if (key ==='meta') {
  //     nextVars = parseMeta(read[key]);
  //   } else {

  getFile(pathname) {
    return fs.readFileSync(path.resolve(__dirname, pathname), 'utf-8');
  }

  getStruct({ read, vars }, passVars = false) {
    let data = [];
    let nextVars = {};
    // console.log('passVars', passVars);
    if (passVars) vars = { ...vars, ...passVars };

    for (const i of read) {
      for (const key in i) {
        const path = i[key];
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
        data.push({ key, ext, content: file });
        // nextVars[key] += file;
      }
    }

    // console.log(data);

    //   return { ext, content: file };
    // });

    // if (newVars) {
    //   let i = 0;
    //   for (const key in vars) {
    //     if (vars[key]) continue; // has a value to be used from config
    //     vars[key] += newVars[i].vars;
    //     i++;
    //   }
    // }

    // console.log(data);s
    return { data, vars, nextVars };
  }

  construct({ data, vars, nextVars }) {
    const constructed = {};
    console.log(nextVars);

    while (data.length) {
      let html;
      const curr = data.shift();
      const withVars = curr.ext === 'hbs';
      const helper = withVars ? this.hbs : this.md;
      const template = helper(curr.content);
      html = withVars ? template(vars) : template;
      // console.log('data', data);
      constructed[curr.key] = html;
    }

    return { ...nextVars, ...constructed };
  }

  writeFile(writepath, file) {
    fs.writeFileSync(path.resolve(__dirname, writepath), file);
  }

  run(idx) {
    if (this.count === 0) console.log(`⏳ Builder ${this.count} starting...`);
    const { name, prebuild, build, write } = this.config[idx];
    this.count++;

    // 1. read prebuild files, with keys
    // 2. somplify vars and pass them around to all steps? or optionally pass them per step

    console.log(`🟧 i:`, ylw(name));
    const prebuildStruct = this.getStruct(prebuild);
    // console.log(prebuildStruct);

    // 1. construct prebuild
    // 2. return the construction as nextVars
    const prebuilt = this.construct(prebuildStruct);
    // console.log(prebuilt);

    const buildStruct = this.getStruct(build, prebuilt);
    console.log('BUILD STRUCT', buildStruct);
    const built = this.construct(buildStruct);
    // console.log(built.layout);

    this.writeFile(write, built.layout);
    console.log('✅ o:', grn(write));
  }
};
