const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const parseMeta = require('./utils/parseMeta');
const parseExt = require('./utils/parseExt');
const convertDate = require('./utils/convertDate');
const { ylw, grn, red } = require('./utils/logs');

module.exports = class Builder {
  constructor(config, hbs, md, prettierConfig) {
    this.count = 0;
    this.config = config;
    this.hbs = hbs;
    this.md = md;
    this.prettierConfig = prettierConfig;
  }

  getFile(pathname) {
    return fs.readFileSync(path.resolve(__dirname, pathname), 'utf-8');
  }

  getStruct({ read, vars }, passVars = false) {
    let data = [];
    let nextVars = {};
    if (passVars) vars = { ...vars, ...passVars };

    for (const i of read) {
      for (const key in i) {
        const path = i[key];
        const ext = parseExt(path);
        let file = this.getFile(path);

        if (ext === 'md') {
          if (file.startsWith('---')) {
            const { content: c, meta: m } = parseMeta(file);
            file = c;
            nextVars = {
              author: m.Author,
              est: m.Est, // TODO: auto estimate based on wordcount
              date: convertDate(Date.now()),
            };
          } else {
            console.log(`⚠️  '${red(path)}' should contain a meta header'`);
          }
        }
        data.push({ key, ext, content: file });
      }
    }

    return { data, vars, nextVars };
  }

  construct({ data, vars, nextVars }) {
    const constructed = {};

    while (data.length) {
      let html;
      const curr = data.shift();
      const withVars = curr.ext === 'hbs';
      const helper = withVars ? this.hbs : this.md;
      const template = helper(curr.content);
      html = withVars ? template(vars) : template;
      constructed[curr.key] = html;
    }

    return { ...nextVars, ...constructed };
  }

  writeFile(writepath, file) {
    fs.writeFileSync(path.resolve(__dirname, writepath), file);
  }

  run(idx) {
    if (this.count === 0) console.log(`⏳ Builder starting at idx '${idx}'...`);
    const { name, prebuild, build, write } = this.config[idx];
    this.count++;

    console.log(`🔶 i:`, ylw(name));
    const prebuiltStruct = this.getStruct(prebuild);
    const prebuilt = this.construct(prebuiltStruct);

    const builtStruct = this.getStruct(build, prebuilt);
    const built = this.construct(builtStruct);

    const prettified = prettier.format(built.layout, {
      ...this.prettierConfig,
      parser: 'html',
    });

    this.writeFile(write, prettified);
    console.log('✅ o:', grn(write));
  }
};
