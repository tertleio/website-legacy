'use strict';
const doc = document;
import loadHtml from './utils/loadHtml.js';

function getVarsFor(page) {
  switch (page) {
    case 'founders':
      return {
        logoSrc: './assets/logo.svg',
        showFooterVisual: false,
        primaryCtaTxt: 'FOUNDER CTA',
        secondaryCtaTxt: 'Login',
      };
    case 'investors':
      return {
        logoSrc: './assets/logo.svg',
        showFooterVisual: false,
        primaryCtaTxt: 'INVESTOR CTA',
        secondaryCtaTxt: 'For Founders',
      };
    case 'contractors':
      return {
        logoSrc: './assets/logo.svg',
        showFooterVisual: false,
        primaryCtaTxt: 'CONTRACTOR CTA',
        secondaryCtaTxt: 'For Hirers',
      };
    case 'hirers':
      return {
        logoSrc: './assets/logo.svg',
        showFooterVisual: false,
        primaryCtaTxt: 'HIRER CTA',
        secondaryCtaTxt: 'For Contractors',
      };
  }
}

function render(vars) {
  // Els
  const elsH2 = doc.querySelectorAll('h2');
  const elMenu = doc.getElementById('menu-content');
  const elsPrimaryCta = doc.querySelectorAll('.ctaOne');
  const elSecondaryCta = doc.querySelector('.ctaTwo');
  // const elLogo = doc.querySelector('');

  elsH2.forEach((h2, i) => {
    // Content Menu
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

  // CTA's
  elsPrimaryCta.forEach((pCta) => {
    pCta.innerText = vars.primaryCtaTxt;
  });

  console.log(elSecondaryCta);

  elSecondaryCta.innerText = vars.secondaryCtaTxt;

  // TODO:
  // Logo
  // Footer Image
}

const compose = async () => {
  const path = '../components';
  const headerHtml = await loadHtml(`${path}/header.xml`, import.meta.url);
  const footerHtml = await loadHtml(`${path}/footer.xml`, import.meta.url);

  const elHeader = doc.getElementById('header');
  const elFooter = doc.getElementById('footer');

  const pathname = window.location.pathname.split('/');
  const filename = pathname[pathname.length - 1];
  const [pagename] = filename.split('.', [1]); // TODO: remove when ext is removed
  const vars = getVarsFor(pagename);

  elHeader.innerHTML = headerHtml;
  elFooter.innerHTML = footerHtml;
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
