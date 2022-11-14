'use strict';
const doc = document;

const scroll = (page, useCta = true, usePeekaboo = false) => {
  const elNavCta = doc.querySelector('.header .ctaOne');
  const elOverlay = doc.getElementById('overlay-peekaboo');
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
    const elTitle = doc.querySelector('#menu-content-root a span');

    elCurrentActive.className = '';
    elItem.className = '--active';
    elTitle.innerText = elItem.dataset.short;
  }

  function showRabbit(shouldShow) {
    if (shouldShow) {
      elOverlay.style['animation-name'] = 'show-rabbit';
      return true;
    } else {
      elOverlay.style['animation-name'] = 'hide-rabbit';
      return false;
    }
  }

  function showPrimaryCta(shouldShow) {
    elNavCta.style = 'transition: all 0.5s;';

    if (shouldShow) {
      elNavCta.className = 'btn btn--primary';
      return true;
    } else {
      elNavCta.className = 'btn btn--secondary';
      return false;
    }
  }

  function init() {
    const [sections, sectionSums, header] = getHeights();
    const sectionCount = sections.length;
    let activeIdx = 0;
    let isRabbitShowing = true;
    let isCtaShowing = false;
    let triggerPos = page === 'home' ? sectionSums[0] - 450 : 400;

    function handler(yPos) {
      for (let i = 0; i < sectionCount; i++) {
        if (i === activeIdx) continue;

        // page fold in view
        const isAboveFold = yPos < triggerPos;
        if (isAboveFold) {
          if (usePeekaboo) {
            if (!isRabbitShowing) isRabbitShowing = showRabbit(true);
          }
          if (useCta) {
            if (!!isCtaShowing) isCtaShowing = showPrimaryCta(false);
          }
        } else {
          if (usePeekaboo) {
            if (!!isRabbitShowing) isRabbitShowing = showRabbit(false);
          }
          if (useCta) {
            if (!isCtaShowing) isCtaShowing = showPrimaryCta(true);
          }
        }

        // content menu titles
        const min = sectionSums[i - 1] - 1;
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
