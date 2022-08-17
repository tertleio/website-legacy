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
    // case 'investors':
    //   return {
    //     idx: 2,
    //     logoSrc: './assets/logo.svg',
    //     showFooterVisual: false,
    //     primaryCtaTxt: 'Join Waitlist',
    //     primaryCtaLink: null,
    //     secondaryCtaTxt: 'For Founders',
    //     secondaryCtaLink: './founders.html',
    //   };
    case 'contractors':
      return {
        idx: 2,
        logoSrc: './assets/logo.svg',
        showFooterVisual: false,
        primaryCtaTxt: 'Join Waitlist',
        primaryCtaLink: null,
        secondaryCtaTxt: 'For Hirers',
        secondaryCtaLink: '',
      };
    case 'hirers':
      return {
        idx: 3,
        logoSrc: './assets/logo.svg',
        showFooterVisual: false,
        primaryCtaTxt: 'Join Waitlist',
        primaryCtaLink: null,
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

  // Cta
  elsPrimaryCta.forEach((pCta) => {
    pCta.innerText = vars.primaryCtaTxt;
    if (vars.primaryCtaLink) pCta.href = vars.primaryCtaLink;
  });
  elSecondaryCta.innerText = vars.secondaryCtaTxt;
  elSecondaryCta.href = vars.secondaryCtaLink;

  // Active Product Menu
  const elProductMenu = doc.getElementById('menu-products');
  const elBurgerMenu = doc.querySelector('.menu-burger');

  const elPMenu = elProductMenu.querySelector(`li:nth-of-type(${vars.idx}) a`);
  const elBMenu = elBurgerMenu.querySelector(
    `li:nth-of-type(${vars.idx + 1}) a`
  );
  elPMenu.classList.add('--active');
  elBMenu.classList.add('--active');

  // TODO:
  // Logo
  // Footer Image
}

const compose = async (pagename) => {
  const path = '../components';
  const headerHtml = await loadHtml(`${path}/header.xml`, import.meta.url);
  const footerHtml = await loadHtml(`${path}/footer.xml`, import.meta.url);

  const elHeader = doc.getElementById('header');
  const elFooter = doc.getElementById('footer');

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
