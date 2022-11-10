// store the components
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

class Builder {
  constructor(config) {
    this.config = config;
  }

  getFile(pathname) {
    return fs.readFileSync(path.resolve(__dirname, pathname), 'utf-8');
  }

  compose(component, vars) {
    console.log(vars);
    const template = handlebars.compile(component);
    const htmlFile = template({ ...vars });

    return htmlFile;
  }

  // write file

  run() {
    const file = this.getFile(this.config[0].read);
    const composed = this.compose(file, this.config[0].vars);
    console.log(composed);
  }
}

const builder = new Builder(config);
builder.run();
