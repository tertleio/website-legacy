'use strict';
const doc = document;

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

const scroll = () => {
  const elNavCta = doc.getElementById('nav-cta');
  const elOverlay = doc.getElementById('overlay');
  const els = doc.querySelectorAll('.container');
  const heights = [...els].map((el) => el.offsetHeight);
  const len = els.length;
  const headerHeight = els[0];
  const footerHeight = els[els.length - 1];
  console.log(els);
  console.log(heights);

  // el.style.height = `${el.scrollHeight}px`;
  // el.pageYOffset = el.offsetTop
  // const elContentHeight = elContent.offsetHeight;
  // const elContentTop = elContent.offsetTop;
  // const elContentBottom = elContentHeight - elContentTop;

  // Rabbit & cta
  function scrollListener() {
    window.addEventListener('scroll', () => {
      onScroll(window.scrollY);

      // if (window.pageYOffset > 500) {
      //   elNavCta.className = 'btn btn--primary';
      //   elOverlay.style['animation-name'] = 'hide-rabbit';
      // } else {
      //   elNavCta.className = 'btn btn--secondary';
      //   elOverlay.style['animation-name'] = 'show-rabbit';
      // }
    });
  }

  function onScroll(yPos) {
    const padding = 90;

    const hero = heights[1];
    const features = heights[2];
    // const faq = heights[3];

    const heroTop = 0;
    const featuresTop = hero + padding * 2;
    const faqTop = hero + features + padding * 2;

    if (yPos === 0) {
      console.log('is at top');
    }

    if (yPos > heroTop && yPos < featuresTop) {
      console.log('at hero');
    }

    if (yPos > featuresTop && yPos < faqTop) {
      console.log('at features');
    }

    if (yPos > faqTop) {
      console.log('at faq');
    }

    // if (yPos > heights[2]) {
    //   console.log('at faq');
    // }

    // for (let i = 1; i < len - 1; i++) {
    //   if (yPos > heights[i] && yPos < heights[i + 1]) {
    //     els[i].classList.add('--active');
    //   } else els[i].classList.remove('--active');
    // }
  }

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

  scrollListener();
};

export default scroll;
