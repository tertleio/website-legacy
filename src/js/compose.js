'use strict';
const doc = document;
import loadHtml from './utils/loadHtml.js';

// get all the h2's in the document
const h2s = doc.querySelectorAll('h2');
// edit components.xml to add the new component
// render innerHtml of the new component
// OR
// create a pre-build step to rennder all variations of the new component

// Conditional Rendering
function conditionalRendering() {
  const elsH2 = doc.querySelectorAll('h2');

  // content menu

  // cta's

  // logo

  // matrix
}

const compose = async () => {
  const path = '../components';
  const headerHtml = await loadHtml(`${path}/header.xml`, import.meta.url);
  const footerHtml = await loadHtml(`${path}/footer.xml`, import.meta.url);

  const elHeader = doc.getElementById('header');
  const elFooter = doc.getElementById('footer');

  elHeader.innerHTML = headerHtml;
  elFooter.innerHTML = footerHtml;
};

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

// const components = () => {
//   customElements.define(`component-header`, Header);
//   customElements.define(`component-footer`, Footer);
// };

export default compose;
