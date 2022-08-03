'use strict';
const doc = document;
import loadHtml from './utils/loadHtml.js';

const headerHtml = await loadHtml('../components/header.xml', import.meta.url);
const footerHtml = await loadHtml('../components/footer.xml', import.meta.url);

// console.log(headerHtml);

const initComponents = () => {
  const elHeader = doc.getElementById('header');
  const elFooter = doc.getElementById('footerlol');

  // console.log(elFooter);

  elHeader.innerHTML = headerHtml;
  elFooter.innerHTML = footerHtml;
};

// Not widely supported yet
// class Header extends HTMLElement {
//   constructor() {
//     super();
//   }

//   connectedCallback() {
//     this.innerHTML = headerHtml;
//   }
// }

// class Footer extends HTMLElement {
//   constructor() {
//     super();
//   }

//   connectedCallback() {
//     this.innerHTML = footerHtml;
//   }
// }

// const initComponents = () => {
//   customElements.define(`component-header`, Header);
//   customElements.define(`component-footer`, Footer);
// };

export default initComponents;
