'use strict';
const doc = document;

const scroll = () => {
  const elNavCta = doc.querySelector('.header .ctaOne');
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
    const elCurrentActive = menuRoot.querySelector('.--active');
    const elItem = menuRoot.querySelector(`li:nth-of-type(${at1BaseIdx}) a`);
    const elTitle = doc.querySelector('#dropdown a span');

    if (elItem) {
      elCurrentActive.className = '';
      elItem.className = '--active';
      elTitle.innerText = elItem.dataset.short;
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

  function init() {
    const [sections, sectionSums, header] = getHeights();
    const sectionCount = sections.length;
    let activeIdx = 0;
    let isRabbitShowing = true;

    function handler(yPos) {
      for (let i = 0; i < sectionCount; i++) {
        if (i === activeIdx) continue;

        // Hero Handler
        const isHeroVis = yPos > sectionSums[0] - 400 ? false : true;
        if (!isHeroVis && isRabbitShowing) {
          showRabbitAndCta(isHeroVis);
          isRabbitShowing = false;
        }
        if (isHeroVis && !isRabbitShowing) {
          showRabbitAndCta(isHeroVis);
          isRabbitShowing = true;
        }

        // Title handler
        const min = sectionSums[i - 1] + header;
        const isAfterMinPos = i === 0 ? true : yPos > min;
        if (!isAfterMinPos) continue;

        const max = sectionSums[i] + header;
        const isBeforeMaxPos = i === sectionCount ? true : yPos < max;
        if (!isBeforeMaxPos) continue;

        replaceTitle(i + 1);
        activeIdx = i;
      }
    }

    (() => {
      const passive = { passive: true };
      const once = { once: true };

      window.addEventListener('scroll', () => handler(window.scrollY), passive);
      window.addEventListener(
        'resize',
        () => {
          window.removeEventListener('scroll', () => handler(window.scrollY));

          setTimeout(() => {
            init();
            // TODO:
            // reinitializing hero flex height sometimes
            // reading wrong values in handler
          }, 2000);
        },
        once,
        passive
      );
    })();
  }

  init();
};

export default scroll;
