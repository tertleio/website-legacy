'use strict';
const doc = document;
import loadHtml from './utils/loadHtml.js';

function getVarsFor(page) {
  switch (page) {
    case 'founders':
      return {
        logoSrc: './assets/logo.svg',
        showFooterVisual: false,
        primaryCtaTxt: 'get started',
        primaryCtaLink: '',
        secondaryCtaTxt: 'Login',
        secondaryCtaLink: 'https://app.tertle.io/join',
      };
    case 'investors':
      return {
        logoSrc: './assets/logo.svg',
        showFooterVisual: false,
        primaryCtaTxt: 'JOIN WAITLIST',
        primaryCtaLink: '',
        secondaryCtaTxt: 'For Founders',
        secondaryCtaLink: './founders.html',
      };
    case 'contractors':
      return {
        logoSrc: './assets/logo.svg',
        showFooterVisual: false,
        primaryCtaTxt: 'CONTRACTOR CTA',
        primaryCtaLink: '',
        secondaryCtaTxt: 'For Hirers',
        secondaryCtaLink: '',
      };
    case 'hirers':
      return {
        logoSrc: './assets/logo.svg',
        showFooterVisual: false,
        primaryCtaTxt: 'HIRER CTA',
        primaryCtaLink: '',
        secondaryCtaTxt: 'For Contractors',
        secondaryCtaLink: '',
      };
  }
}

function render(vars) {
  const elsH2 = doc.querySelectorAll('h2');
  const elMenu = doc.getElementById('menu-content');
  const elsPrimaryCta = doc.querySelectorAll('.ctaOne');
  const elSecondaryCta = doc.querySelector('.ctaTwo');
  // const elLogo = doc.querySelector('');

  elsH2.forEach((h2, i) => {
    // CONTENT MENU
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

  // CTAs
  elsPrimaryCta.forEach((pCta) => (pCta.innerText = vars.primaryCtaTxt));
  elSecondaryCta.innerText = vars.secondaryCtaTxt;
  elSecondaryCta.href = vars.secondaryCtaLink;

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
