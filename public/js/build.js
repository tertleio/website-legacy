'use strict';
import loadHtml from './utils/loadHtml.js';

const headerHtml = await loadHtml('../components/header.html', import.meta.url);
const footerHtml = await loadHtml('../components/footer.html', import.meta.url);

class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = headerHtml;
  }
}

class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = footerHtml;
  }
}

function initComponents() {
  customElements.define(`component-header`, Header);
  customElements.define(`component-footer`, Footer);
}

export default initComponents;
