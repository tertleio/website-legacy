'use strict';
const doc = document;

const scroll = () => {
  const elNavCta = doc.getElementById('nav-cta');
  const elOverlay = doc.getElementById('overlay');
  const menuRoot = doc.querySelector('#menu-content');

  function getHeights() {
    const els = doc.querySelectorAll('.container');
    const elsHeight = [...els].map((el) => el.offsetHeight);
    return elsHeight;
  }

  function replaceTitle(i) {
    const elCurrentActive = menuRoot.querySelector('.--active');
    const elItem = menuRoot.querySelector(`li:nth-of-type(${i}) a`);
    const elTitle = doc.querySelector('#dropdown a span.title');

    if (elCurrentActive && elItem) {
      elCurrentActive.className = '';
      elItem.className = '--active';
      elTitle.textContent = elItem.dataset.title;
    }

    return i;
  }

  function showRabbitAndCta(shouldShow) {
    if (shouldShow) {
      elNavCta.className = 'btn btn--secondary';
      elOverlay.style['animation-name'] = 'show-rabbit';
    } else {
      elNavCta.className = 'btn btn--primary';
      elOverlay.style['animation-name'] = 'hide-rabbit';
    }
  }

  (() => {
    let activeIdx = 0;
    window.addEventListener('scroll', () => handler(window.scrollY));

    let heights = getHeights();
    // const len = heights.length;
    const hero = heights[1];
    const features = heights[2];
    // const faq = heights[3];

    const padding = 90;
    const heroTop = 0;
    const featuresTop = hero + padding * 2;
    const faqTop = hero + features + padding * 2;

    function handler(yPos) {
      if (activeIdx !== 0) {
        if (yPos === 0 || yPos < featuresTop) activeIdx = replaceTitle(0);
        const isHeroVisibile = yPos > 500 ? false : true;
        showRabbitAndCta(isHeroVisibile);
      }

      if (activeIdx !== 1) {
        if (yPos > heroTop && yPos < featuresTop) activeIdx = replaceTitle(1);
      }

      if (activeIdx !== 2) {
        if (yPos > featuresTop && yPos < faqTop) activeIdx = replaceTitle(2);
      }

      if (activeIdx !== 3) {
        if (yPos > faqTop) activeIdx = replaceTitle(3);
      }
    }
  })();
};

export default scroll;

// class Scroll {
//   constructor() {
//     this.el = doc.querySelector('.container');
//     this.el.addEventListener('scroll', () => this.handleScroll());
//   }

//   handleScroll() {
//     console.timeLog('handling');
//     const scrollTop = this.el.scrollTop;
//     const scrollHeight = this.el.scrollHeight;
//     const clientHeight = this.el.clientHeight;
//     const isAtBottom = scrollTop + clientHeight >= scrollHeight;

//     if (isAtBottom) {
//       console.log('at bottom');
//     }
//   }
// }

// function onView() {
//   for (let i = 0; i < els.length; i++) {
//     if (
//       els[i].getBoundingClientRect().top < window.innerHeight * 0.5 &&
//       els[i].getBoundingClientRect().bottom > window.innerHeight * 0.5
//     ) {
//       els[i].classList.add('active');
//     } else {
//       els[i].classList.remove('active');
//     }
//   }
// }

// el.style.height = `${el.scrollHeight}px`;
// el.pageYOffset = el.offsetTop
// const elContentHeight = elContent.offsetHeight;
// const elContentTop = elContent.offsetTop;
// const elContentBottom = elContentHeight - elContentTop;
