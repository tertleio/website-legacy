'use strict';
const doc = document;
import loadHtml from './utils/loadHtml.js';

function getVarsFor(page) {
  switch (page) {
    case 'founders':
      return {
        logoSrc: './assets/logo.svg',
        showFooterVisual: false,
        primaryCtaTxt: 'JOIN TERTLE',
        secondaryCtaTxt: 'For Investors',
      };
    case 'investors':
      return {
        logoSrc: './assets/logo.svg',
        showFooterVisual: false,
        primaryCtaTxt: 'JOIN TERTLE',
        secondaryCtaTxt: 'For Founders',
      };
    case 'seekers':
      return {
        logoSrc: './assets/logo.svg',
        showFooterVisual: false,
        primaryCtaTxt: 'JOIN WAITLIST',
        secondaryCtaTxt: 'For Hirers',
      };
    case 'hirers':
      return {
        logoSrc: './assets/logo.svg',
        showFooterVisual: false,
        primaryCtaTxt: 'JOIN WAITLIST',
        secondaryCtaTxt: 'For Contractors',
      };
  }
}

function render(vars) {
  const elsH2 = doc.querySelectorAll('h2');
  const elMenu = doc.getElementById('menu-content');

  elsH2.forEach((h2, i) => {
    if (i === 0) return; // skip first hero h2

    const hashTag = '#' + h2.innerText.split(' ').join('-').toLowerCase();
    const h2D = h2.dataset;
    const newLi = `
                  <li class="closeOnE">
                    <a 
                      href="${hashTag}" 
                      data-short="${h2D.short}"
                      data-long="${h2D.long}"
                      >
                      <span>${h2D.emoji}</span>${h2D.long}
                    </a>
                  </li>`;

    elMenu.innerHTML += newLi;
  });

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

  const filename = window.location.pathname.split('/')[2];
  const pagename = filename.split('.', [1]);
  const vars = getVarsFor(pagename);
  render(vars);
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
