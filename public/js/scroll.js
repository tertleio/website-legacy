'use strict';
const doc = document;

const scroll = () => {
  const elNavCta = doc.getElementById('nav-cta');
  const elOverlay = doc.getElementById('overlay');
  const menuRoot = doc.querySelector('#menu-content');

  function getDimensions() {
    const els = doc.querySelectorAll('.container');
    const heights = [...els].map((el) => el.offsetHeight);
    const sumHeights = heights.map((height, idx) => height * idx);

    return [heights, sumHeights];
  }

  function replaceTitle(atSectionIdx) {
    const elCurrentActive = menuRoot.querySelector('.--active');
    const elItem = menuRoot.querySelector(`li:nth-of-type(${atSectionIdx}) a`);
    const elTitle = doc.querySelector('#dropdown a span.title');

    if (elItem) {
      elCurrentActive.className = '';
      elItem.className = '--active';
      elTitle.textContent = elItem.dataset.title;
    }

    return atSectionIdx;
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
    const [heights, triggers] = getDimensions();
    const headlessTriggers = triggers.slice(0, -1);
    const headerHeight = heights[0];
    const sectionCount = headlessTriggers.length;
    window.addEventListener('scroll', () => handler(window.scrollY));

    function handler(yPos) {
      let activeIdx = 0;

      for (let i = 0; i < sectionCount; i++) {
        if (i === activeIdx) continue;

        const isBeforeSectionCut = yPos + headerHeight < triggers[i];
        let isAfterPrevSectionCut = yPos - headerHeight > triggers[i - 1];
        const isHeroVisibile = yPos > 500 ? false : true;

        if (isHeroVisibile) showRabbitAndCta(isHeroVisibile);

        if (isBeforeSectionCut && isAfterPrevSectionCut) {
          activeIdx = replaceTitle(i);

          break;
        }
      }
    }
  })();
};

export default scroll;

// const calcInViewport = (scrollY) => {
//   const scrollY = window.scrollY;
//   const heights = getHeights();
//   const heightsSum = heights.reduce((acc, curr) => acc + curr, 0);
//   const heightsSumMinusLast = heightsSum - heights[heights.length - 1];
//   const scrollYMinusLast = scrollY - heights[heights.length - 1];
//   const scrollYPercent = scrollYMinusLast / heightsSumMinusLast;
//   const scrollYPercentRounded = Math.round(scrollYPercent * 100);
// };

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
