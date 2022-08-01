'use strict';
const doc = document;

const scroll = () => {
  const elNavCta = doc.getElementById('nav-cta');
  const elOverlay = doc.getElementById('overlay');
  const menuRoot = doc.querySelector('#menu-content');

  function getHeights() {
    const els = doc.querySelectorAll('.container');
    const allHeights = [...els].map((el) => el.offsetHeight);

    const header = allHeights.shift();
    const footer = allHeights.pop();
    const sections = [...allHeights];
    const sectionSums = [];

    while (allHeights.length) {
      const sum = allHeights.reduce((acc, curr) => acc + curr);
      sectionSums.unshift(sum);
      allHeights.pop();
    }

    return [sections, sectionSums, header, footer];
  }

  function replaceTitle(at1BaseIdx) {
    console.log('REPLACING AT SECTION', at1BaseIdx);
    const elCurrentActive = menuRoot.querySelector('.--active');
    const elItem = menuRoot.querySelector(`li:nth-of-type(${at1BaseIdx}) a`);
    const elTitle = doc.querySelector('#dropdown a span.title');

    console.log('EL__ITEM', elItem);

    if (elItem) {
      elCurrentActive.className = '';
      elItem.className = '--active';
      elTitle.textContent = elItem.dataset.title;
    }
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
    const [sections, sectionSums, header, footer] = getHeights();
    const sectionCount = sections.length;
    console.log('SECTIONS', sections);
    console.log('SECTION_SUMS', sectionSums);
    console.log('HEADER', header);
    console.log('FOOTER', footer);
    console.log('SECTION_COUNT', sectionCount);

    function handler(yPos) {
      let activeIdx = 0;
      console.log(yPos);

      for (let i = 0; i < sectionCount; i++) {
        // if (i === activeIdx) continue;

        const min = sectionSums[i - 1] + header;
        const max = sectionSums[i] + header;
        const isAfterMinPos = i === 0 ? true : yPos > min;
        const isBeforeMaxPos = i === sectionCount ? true : yPos < max;

        console.log('min', min);
        console.log('max', max);
        // const isHeroVisibile = yPos > sections[1] ? false : false;

        // if (isHeroVisibile) {
        //   console.log('running');
        //   showRabbitAndCta(isHeroVisibile);
        // }

        if (isAfterMinPos && isBeforeMaxPos) {
          console.log('CHAING AT PX', yPos);
          replaceTitle(i + 1);
          activeIdx = i;
          break;
        }
      }
    }

    function addListeners() {
      window.addEventListener('scroll', () => handler(window.scrollY));
      window.addEventListener(
        'resize',
        () => {
          console.log('resized');
          window.removeEventListener('scroll', () => handler(window.scrollY));
          addListeners();
        },
        { once: true, passive: true }
      );
    }

    addListeners();
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
