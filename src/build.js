// store the components
const handlebars = require('handlebars');
const getVarsFor = require('./getVars');
const fs = require('fs');
const path = require('path');

const config = [
  {
    page: 'home',
    read: './components/header.hbs',
    write: './somePath',
    vars: {
      userType: 'founder',
      logoSrc: './assets/logo.svg',
      primaryCtaTxt: 'Sign Up',
      primaryCtaLink: 'https://app.tertle.io/join',
      secondaryCtaTxt: 'Login',
      secondaryCtaLink: 'https://app.tertle.io/login',
      showFooterVisual: false,
      useModal: false,
    },
  },
];

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
