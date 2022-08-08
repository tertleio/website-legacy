'use strict';
const doc = document;
import loadHtml from './utils/loadHtml.js';

function getVarsFor(page) {
  switch (page) {
    case 'founders':
      return {
        idx: 1,
        logoSrc: './assets/logo.svg',
        showFooterVisual: false,
        primaryCtaTxt: 'Get Started',
        primaryCtaLink: 'https://app.tertle.io/join',
        secondaryCtaTxt: 'Login',
        secondaryCtaLink: 'https://app.tertle.io/login',
      };
    case 'investors':
      return {
        idx: 2,
        logoSrc: './assets/logo.svg',
        showFooterVisual: false,
        primaryCtaTxt: 'Join Waitlist',
        primaryCtaLink: '',
        secondaryCtaTxt: 'For Founders',
        secondaryCtaLink: './founders.html',
      };
    case 'contractors':
      return {
        idx: 3,
        logoSrc: './assets/logo.svg',
        showFooterVisual: false,
        primaryCtaTxt: 'Join Waitlist',
        primaryCtaLink: '',
        secondaryCtaTxt: 'For Hirers',
        secondaryCtaLink: '',
      };
    case 'hirers':
      return {
        idx: 4,
        logoSrc: './assets/logo.svg',
        showFooterVisual: false,
        primaryCtaTxt: 'Join Waitlist',
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

  // CTA
  elsPrimaryCta.forEach((pCta) => (pCta.innerText = vars.primaryCtaTxt));
  elSecondaryCta.innerText = vars.secondaryCtaTxt;
  elSecondaryCta.href = vars.secondaryCtaLink;

  // ACTIVE PRODUCT MENU
  const elProductMenu = doc.getElementById('menu-products');
  const elPMenu = elProductMenu.querySelector(`li:nth-of-type(${vars.idx}) a`);
  elPMenu.classList.add('--active');

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
